import { useState, useRef, useEffect } from "react";
import Navbar from "./Navbar";
import JSZip from "jszip";
import emailjs from "@emailjs/browser";
import { db, storage } from "../firebase";
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { motion } from "framer-motion";
import gsap from "gsap";

const spaceTypeOptions = [
  { value: "", label: "Select Space Type", disabled: true },
  { value: "Residential", label: "Residential" },
  { value: "Offices", label: "Offices" },
  { value: "Hotels", label: "Hotels" },
  { value: "Educational Institutes", label: "Educational Institutes" },
  { value: "Spiritual Sites", label: "Spiritual Sites" },
  { value: "Studio", label: "Studio" },
  { value: "NGOs", label: "NGOs" },
  { value: "Other", label: "Other" },
];

const locationOptions = [
  { value: "", label: "Select Project Location", disabled: true },
  { value: "Kota", label: "Kota" },
  { value: "Jaipur", label: "Jaipur" },
  { value: "Delhi", label: "Delhi" },
  { value: "Gurugram", label: "Gurugram" },
  { value: "Noida", label: "Noida" },
  { value: "Other", label: "Other" },
];

const budgetOptions = [
  { value: "", label: "Select your estimated budget", disabled: true },
  { value: "less-than-50000", label: "Less than ₹50,000" },
  { value: "50000-100000", label: "₹50,000 – ₹1 Lakh" },
  { value: "100000-500000", label: "₹1 Lakh – ₹5 Lakhs" },
  { value: "more-than-500000", label: "More than ₹5 Lakhs" },
];

const FieldWrapper = ({ children, label, required, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 32 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.2 }}
    transition={{
      duration: 0.65,
      delay: index * 0.05,
      ease: [0.22, 1, 0.36, 1],
    }}
    className="mb-9"
  >
    <label
      className="roboto-condensed block text-[20px] uppercase tracking-[4px] font-medium mb-3"
      style={{ color: "#1f1e1e" }}
    >
      {label}
      {required && <span style={{ color: "#ee0653" }}> *</span>}
    </label>
    {children}
    <div
      className="mt-0 h-px w-full"
      style={{ background: "rgba(0,0,0,0.1)" }}
    />
  </motion.div>
);

const FocusInput = ({ tag: Tag = "input", ...props }) => {
  const [focused, setFocused] = useState(false);
  return (
    <div style={{ position: "relative" }}>
      <Tag
        {...props}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className="roboto-condensed w-full bg-transparent outline-none text-black placeholder-zinc-400"
        style={{
          fontSize: "clamp(1rem, 1.5vw, 1.2rem)",
          padding: "10px 0",
          border: "none",
          resize: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          height: "2px",
          width: focused ? "100%" : "0%",
          background: "linear-gradient(to right, #ee0653, #C9A847)",
          transition: "width 0.4s cubic-bezier(0.22,1,0.36,1)",
          borderRadius: "2px",
        }}
      />
    </div>
  );
};

const FocusSelect = ({ options, ...props }) => {
  const [focused, setFocused] = useState(false);
  return (
    <div style={{ position: "relative" }}>
      <select
        {...props}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className="roboto-condensed w-full bg-transparent outline-none text-zinc-700 cursor-pointer"
        style={{
          fontSize: "clamp(1rem, 1.5vw, 1.2rem)",
          padding: "10px 0",
          border: "none",
        }}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value} disabled={opt.disabled}>
            {opt.label}
          </option>
        ))}
      </select>
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          height: "2px",
          width: focused ? "100%" : "0%",
          background: "linear-gradient(to right, #ee0653, #C9A847)",
          transition: "width 0.4s cubic-bezier(0.22,1,0.36,1)",
          borderRadius: "2px",
        }}
      />
    </div>
  );
};

const BookConsultation = () => {
  const [files, setFiles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const pageRef = useRef(null);
  const headRef = useRef(null);
  const lineRef = useRef(null);

  const isFormValid = files.length > 0;

  useEffect(() => {
    const ctx = gsap.context(() => {
      const chars = headRef.current?.querySelectorAll(".char");
      if (chars?.length) {
        gsap.from(chars, {
          y: 90,
          opacity: 0,
          stagger: 0.025,
          duration: 0.85,
          ease: "power4.out",
          delay: 0.3,
        });
      }
      gsap.from(lineRef.current, {
        scaleX: 0,
        transformOrigin: "left",
        duration: 1.1,
        ease: "power3.out",
        delay: 0.6,
      });
    }, pageRef);
    return () => ctx.revert();
  }, []);

  const handleFileChange = (selectedFiles) => {
    if (selectedFiles.length > 5) {
      alert("Maximum 5 images allowed");
      return;
    }
    let total = 0;
    for (let f of selectedFiles) {
      if (!f.type.startsWith("image/")) {
        alert("Only image files are allowed");
        return;
      }
      total += f.size;
    }
    if (total > 10 * 1024 * 1024) {
      alert("Total images size must be under 10MB");
      return;
    }
    setFiles(selectedFiles);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    handleFileChange(Array.from(e.dataTransfer.files));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const form = e.target;

      const zip = new JSZip();
      files.forEach((file) => zip.file(file.name, file));
      const zipBlob = await zip.generateAsync({ type: "blob" });

      const zipRef = ref(
        storage,
        `consultations/${Date.now()}_space_images.zip`,
      );
      await uploadBytes(zipRef, zipBlob);
      const zipURL = await getDownloadURL(zipRef);

      const consultationData = {
        name: form.name.value,
        email: form.email.value,
        phone: form.phone.value,
        company: form.company.value,
        spaceType: form.spaceType.value,
        projectLocation: form.projectLocation.value,
        estimatedArea: form.estimatedArea.value,
        preferredTimeline: form.preferredTimeline.value,
        budget: form.budget.value,
        additionalRequirements: form.additionalRequirements.value,
        zipURL,
        createdAt: new Date(),
      };

      await addDoc(
        collection(db, "consultationApplications"),
        consultationData,
      );

      await emailjs.send(
        "service_52y6oom",
        "template_9v1najd",
        {
          to_email: "sarvalayworld@gmail.com",
          message: "Sarvalay Consultation request Received",
          name: consultationData.name,
          email: consultationData.email,
          phone: consultationData.phone,
          company: consultationData.company,
          spaceType: consultationData.spaceType,
          projectLocation: consultationData.projectLocation,
          additionalRequirements: consultationData.additionalRequirements,
          zipURL: consultationData.zipURL,
        },
        "rJ7snfOydxb6-ezAG",
      );

      setSubmitted(true);
      form.reset();
      setFiles([]);
    } catch (error) {
      console.log(error);
      alert("Submission failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div ref={pageRef} className="min-h-screen bg-white text-black">
      <Navbar />

      {/* Success modal */}
      {submitted && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{
            background: "rgba(0,0,0,0.7)",
            backdropFilter: "blur(12px)",
          }}
        >
          <motion.div
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="text-center px-10 py-14 rounded-3xl max-w-md mx-4"
            style={{ background: "#fff" }}
          >
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
              style={{ background: "rgba(238,6,83,0.1)" }}
            >
              <span style={{ fontSize: "28px", color: "#ee0653" }}>✓</span>
            </div>
            <h2
              className="roboto-condensed font-semibold text-black mb-3"
              style={{ fontSize: "1.8rem" }}
            >
              Submitted!
            </h2>
            <p
              className="roboto-condensed text-zinc-500 mb-8 leading-relaxed"
              style={{ fontSize: "0.95rem" }}
            >
              We've received your consultation request. Our team will reach out
              within 24 hours.
            </p>
            <button
              onClick={() => setSubmitted(false)}
              className="roboto-condensed px-8 py-3 rounded-xl text-white font-medium"
              style={{
                background: "linear-gradient(135deg,#ee0653,#c4003f)",
                boxShadow: "0 6px 20px rgba(238,6,83,0.35)",
              }}
            >
              Close
            </button>
          </motion.div>
        </div>
      )}

      <section className="pt-24 sm:pt-28 lg:pt-32 pb-24 px-5 sm:px-8 md:px-12 lg:px-20">
        <div className="max-w-6xl mx-auto">
          {/* ── Heading ── */}
          <div className="mb-16 sm:mb-20">
            <motion.div
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="flex items-center gap-3 mb-5"
            >
              <div className="w-5 h-px bg-red-500" />
              <span
                className="roboto-condensed uppercase text-[14px] tracking-[5px] font-medium"
                style={{ color: "#ee0653" }}
              >
                Book Consultation
              </span>
            </motion.div>

            <div ref={headRef} className="overflow-hidden pb-3">
              <h1
                className="roboto-condensed font-semibold leading-[1.05] tracking-tight"
                style={{ fontSize: "clamp(2.8rem, 8vw, 7rem)" }}
              >
                {"Let's build your".split("").map((ch, i) => (
                  <span
                    key={i}
                    className="char inline-block"
                    style={{ whiteSpace: ch === " " ? "pre" : "normal" }}
                  >
                    {ch === " " ? "\u00A0" : ch}
                  </span>
                ))}
                <br />
                {"next big project.".split("").map((ch, i) => (
                  <span
                    key={i + 30}
                    className="char inline-block"
                    style={{ whiteSpace: ch === " " ? "pre" : "normal" }}
                  >
                    {ch === " " ? "\u00A0" : ch}
                  </span>
                ))}
              </h1>
            </div>

            <div
              ref={lineRef}
              className="rounded-full mt-5"
              style={{
                width: "80px",
                height: "4px",
                background: "linear-gradient(to right,#ee0653,#C9A847)",
              }}
            />

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.7 }}
              className="roboto-condensed mt-7 text-zinc-500 max-w-xl leading-relaxed"
              style={{ fontSize: "clamp(0.88rem,1.2vw,1.05rem)" }}
            >
              Tell us about your vision, your space, and your requirements.
              We'll help transform your ideas into a premium art experience.
            </motion.p>
          </div>

          {/* ── Two column layout ── */}
          <div className="grid lg:grid-cols-[1fr_360px] gap-16 lg:gap-20 items-start">
            {/* ── Form ── */}
            <form onSubmit={handleSubmit} className="roboto-condensed">
              <FieldWrapper label="Your Name" required index={0}>
                <FocusInput
                  type="text"
                  name="name"
                  required
                  placeholder="Enter your full name"
                />
              </FieldWrapper>

              <FieldWrapper label="Email" required index={1}>
                <FocusInput
                  type="email"
                  name="email"
                  required
                  placeholder="Enter your email"
                />
              </FieldWrapper>

              <FieldWrapper label="Phone" required index={2}>
                <FocusInput
                  type="text"
                  name="phone"
                  required
                  placeholder="Enter your phone number"
                />
              </FieldWrapper>

              <FieldWrapper
                label="Organization / Company Name"
                required
                index={3}
              >
                <FocusInput
                  type="text"
                  name="company"
                  required
                  placeholder="Enter company name"
                />
              </FieldWrapper>

              {/* Upload */}
              <FieldWrapper label="Share Your Space" required index={4}>
                <label
                  onDragOver={(e) => {
                    e.preventDefault();
                    setDragOver(true);
                  }}
                  onDragLeave={() => setDragOver(false)}
                  onDrop={handleDrop}
                  className="flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-300 mt-2"
                  style={{
                    minHeight: "200px",
                    borderRadius: "20px",
                    border: dragOver
                      ? "2px dashed #ee0653"
                      : files.length > 0
                        ? "2px dashed rgba(238,6,83,0.4)"
                        : "2px dashed rgba(0,0,0,0.12)",
                    background: dragOver
                      ? "rgba(238,6,83,0.03)"
                      : files.length > 0
                        ? "rgba(238,6,83,0.02)"
                        : "#fafafa",
                    padding: "2rem",
                  }}
                >
                  <input
                    type="file"
                    required
                    multiple
                    accept="image/*"
                    onChange={(e) =>
                      handleFileChange(Array.from(e.target.files))
                    }
                    className="hidden"
                  />
                  {files.length > 0 ? (
                    <>
                      <div
                        className="w-10 h-10 rounded-full flex items-center justify-center mb-3"
                        style={{ background: "rgba(238,6,83,0.1)" }}
                      >
                        <span style={{ color: "#ee0653", fontSize: "18px" }}>
                          ✓
                        </span>
                      </div>
                      <p
                        className="roboto-condensed font-semibold text-black"
                        style={{ fontSize: "1.15rem" }}
                      >
                        {files.length} image{files.length > 1 ? "s" : ""}{" "}
                        selected
                      </p>
                      <p
                        className="roboto-condensed mt-1 text-zinc-400"
                        style={{ fontSize: "12px", letterSpacing: "1px" }}
                      >
                        Click to change
                      </p>
                    </>
                  ) : (
                    <>
                      <div
                        className="w-10 h-10 rounded-full flex items-center justify-center mb-3"
                        style={{ background: "rgba(0,0,0,0.05)" }}
                      >
                        <span style={{ fontSize: "18px", color: "#999" }}>
                          ↑
                        </span>
                      </div>
                      <p
                        className="roboto-condensed font-medium text-black"
                        style={{ fontSize: "1.1rem" }}
                      >
                        Drag & drop or click to upload
                      </p>
                      <p
                        className="roboto-condensed mt-1 text-zinc-400"
                        style={{ fontSize: "12px", letterSpacing: "1px" }}
                      >
                        Maximum 5 images · 10MB total
                      </p>
                    </>
                  )}
                </label>
              </FieldWrapper>

              <FieldWrapper label="Space Type" required index={5}>
                <FocusSelect
                  name="spaceType"
                  required
                  defaultValue=""
                  options={spaceTypeOptions}
                />
              </FieldWrapper>

              <FieldWrapper label="Project Location" required={false} index={6}>
                <FocusSelect
                  name="projectLocation"
                  defaultValue=""
                  options={locationOptions}
                />
              </FieldWrapper>

              <FieldWrapper label="Estimated Area" required={false} index={7}>
                <FocusInput
                  type="text"
                  name="estimatedArea"
                  placeholder="Example: 1200 sq.ft"
                />
              </FieldWrapper>

              <FieldWrapper
                label="Preferred Timeline"
                required={false}
                index={8}
              >
                <FocusInput
                  type="date"
                  name="preferredTimeline"
                  min={new Date().toISOString().split("T")[0]}
                />
              </FieldWrapper>

              <FieldWrapper label="Budget" required={false} index={9}>
                <FocusSelect
                  name="budget"
                  defaultValue=""
                  options={budgetOptions}
                />
              </FieldWrapper>

              <FieldWrapper
                label="Additional Requirements"
                required={false}
                index={10}
              >
                <FocusInput
                  tag="textarea"
                  name="additionalRequirements"
                  rows={5}
                  placeholder="Anything else you'd like us to know?"
                />
              </FieldWrapper>

              {/* Submit */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="mt-4"
              >
                <button
                  type="submit"
                  disabled={!isFormValid || isLoading}
                  className="group relative overflow-hidden flex items-center gap-4 px-10 py-4 rounded-2xl font-medium transition-all duration-300"
                  style={{
                    background:
                      isFormValid && !isLoading
                        ? "linear-gradient(135deg,#dc2626,#991b1b)"
                        : "rgba(0,0,0,0.12)",
                    color: isFormValid && !isLoading ? "#fff" : "#aaa",
                    boxShadow:
                      isFormValid && !isLoading
                        ? "0 8px 28px rgba(220,38,38,0.35)"
                        : "none",
                    cursor:
                      isFormValid && !isLoading ? "pointer" : "not-allowed",
                    fontSize: "clamp(0.9rem,1.1vw,1rem)",
                    letterSpacing: "0.04em",
                  }}
                  onMouseEnter={(e) => {
                    if (isFormValid && !isLoading) {
                      e.currentTarget.style.boxShadow =
                        "0 14px 40px rgba(220,38,38,0.5)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (isFormValid && !isLoading) {
                      e.currentTarget.style.boxShadow =
                        "0 8px 28px rgba(220,38,38,0.35)";
                    }
                  }}
                >
                  {isFormValid && !isLoading && (
                    <span
                      className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out"
                      style={{
                        background:
                          "linear-gradient(to right, transparent, rgba(255,255,255,0.15), transparent)",
                      }}
                    />
                  )}

                  <span className="relative">
                    {isLoading ? "Submitting..." : "Submit Consultation"}
                  </span>

                  {!isLoading && isFormValid && (
                    <span className="relative text-lg transition-transform duration-300 group-hover:translate-x-1">
                      →
                    </span>
                  )}
                </button>
              </motion.div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BookConsultation;
