import { db, storage } from "../firebase";
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import emailjs from "@emailjs/browser";
import { useState, useRef, useEffect } from "react";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";

const artistTypes = [
  "Madhubani Art",
  "Warli Art",
  "Pattachitra",
  "Kalamkari",
  "Gond Art",
  "Phad Art",
  "Tanjore Art",
  "Abstract Art",
  "Graffiti & Street Art",
  "Mandala Art",
  "Other",
];

const govtIds = ["Aadhaar Card", "PAN Card", "Driving License", "Passport"];

/* ── Reusable styled bits ── */

const SectionLabel = ({ children, required, eyebrow }) => (
  <div className="mb-4">
    {eyebrow && (
      <span
        className="roboto-condensed uppercase block mb-2"
        style={{ fontSize: "10px", letterSpacing: "3px", color: "#ee0653" }}
      >
        {eyebrow}
      </span>
    )}
    <h3
      className="roboto-condensed font-semibold text-black"
      style={{ fontSize: "clamp(1.2rem,1.8vw,1.5rem)" }}
    >
      {children}
      {required && <span style={{ color: "#ee0653" }}> *</span>}
    </h3>
  </div>
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
          fontSize: "1.05rem",
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
          background: "linear-gradient(to right,#ee0653,#C9A847)",
          transition: "width 0.4s cubic-bezier(0.22,1,0.36,1)",
          borderRadius: "2px",
        }}
      />
      <div
        className="absolute bottom-0 left-0 w-full h-px"
        style={{ background: "rgba(0,0,0,0.1)" }}
      />
    </div>
  );
};

const Pill = ({ active, onClick, children, accent = false }) => (
  <button
    type="button"
    onClick={onClick}
    className="roboto-condensed cursor-pointer transition-all duration-300"
    style={{
      padding: "10px 20px",
      borderRadius: "999px",
      fontSize: "0.9rem",
      background: active ? "linear-gradient(135deg,#ee0653,#c4003f)" : "#fff",
      color: active ? "#fff" : "#444",
      border: active ? "1px solid #ee0653" : "1px solid rgba(0,0,0,0.12)",
      boxShadow: active ? "0 6px 18px rgba(238,6,83,0.3)" : "none",
    }}
  >
    {children}
  </button>
);

const UploadZone = ({
  children,
  height = "260px",
  active,
  onDrop,
  onDragOver,
  onDragLeave,
  dragOver,
}) => (
  <label
    onDragOver={onDragOver}
    onDragLeave={onDragLeave}
    onDrop={onDrop}
    className="flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-300"
    style={{
      minHeight: height,
      borderRadius: "24px",
      border: dragOver
        ? "2px dashed #ee0653"
        : active
          ? "2px dashed rgba(238,6,83,0.4)"
          : "2px dashed rgba(0,0,0,0.12)",
      background: dragOver
        ? "rgba(238,6,83,0.03)"
        : active
          ? "rgba(238,6,83,0.02)"
          : "#fafafa",
      padding: "1.5rem",
      overflow: "hidden",
    }}
  >
    {children}
  </label>
);

/* ── Main Component ── */

const Artist = () => {
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [experience, setExperience] = useState("");
  const [portfolio, setPortfolio] = useState(null);
  const [profileImage, setProfileImage] = useState(null);
  const [govtId, setGovtId] = useState(null);
  const [selectedGovtId, setSelectedGovtId] = useState("");
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [dragStates, setDragStates] = useState({
    profile: false,
    portfolio: false,
    govtId: false,
  });

  const navigate = useNavigate();
  const pageRef = useRef(null);
  const headRef = useRef(null);
  const lineRef = useRef(null);

  const isFormValid =
    selectedTypes.length > 0 &&
    experience &&
    portfolio &&
    profileImage &&
    govtId &&
    selectedGovtId;

  useEffect(() => {
    const ctx = gsap.context(() => {
      const chars = headRef.current?.querySelectorAll(".char");
      if (chars?.length) {
        gsap.from(chars, {
          y: 90,
          opacity: 0,
          stagger: 0.02,
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

  const toggleType = (type) => {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type],
    );
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.type !== "application/pdf") {
      alert("Only PDF files are allowed");
      e.target.value = "";
      return;
    }
    if (file.size > 15 * 1024 * 1024) {
      alert("File size should be less than 15MB");
      e.target.value = "";
      return;
    }
    setPortfolio(file);
  };

  const setDrag = (key, val) =>
    setDragStates((prev) => ({ ...prev, [key]: val }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const form = e.target;

      const profileRef = ref(
        storage,
        `artistProfiles/${Date.now()}_${profileImage.name}`,
      );
      await uploadBytes(profileRef, profileImage);
      const profileImageURL = await getDownloadURL(profileRef);

      const govtIdRef = ref(
        storage,
        `artistGovtIds/${Date.now()}_${govtId.name}`,
      );
      await uploadBytes(govtIdRef, govtId);
      const govtIdURL = await getDownloadURL(govtIdRef);

      const storageRef = ref(
        storage,
        `portfolios/${Date.now()}_${portfolio.name}`,
      );
      await uploadBytes(storageRef, portfolio);
      const portfolioURL = await getDownloadURL(storageRef);

      const otherArtistType = form.otherArtistType?.value || "";
      const artistData = {
        name: form.name.value,
        email: form.email.value,
        phone: form.phone.value,
        artistTypes: selectedTypes.includes("Other")
          ? [...selectedTypes.filter((t) => t !== "Other"), otherArtistType]
          : selectedTypes,
        experience,
        city: form.city.value,
        about: form.about.value,
        portfolioURL,
        createdAt: new Date(),
        profileImageURL,
        govtIdURL,
        selectedGovtId,
      };

      await addDoc(collection(db, "artistApplications"), artistData);

      await emailjs.send(
        "service_52y6oom",
        "template_alevyqd",
        {
          to_email: "sarvalayworld@gmail.com",
          message: "Sarvalay Artist Portfolio Received",
          name: artistData.name,
          email: artistData.email,
          phone: artistData.phone,
          artistTypes: artistData.artistTypes.join(", "),
          experience: artistData.experience,
          city: artistData.city,
          about: artistData.about,
          portfolioURL: artistData.portfolioURL,
          profileImageURL: artistData.profileImageURL,
          govtIdURL: artistData.govtIdURL,
          selectedGovtId: artistData.selectedGovtId,
        },
        "rJ7snfOydxb6-ezAG",
      );

      alert("Application submitted successfully!");
      form.reset();
      setSelectedTypes([]);
      setExperience("");
      setPortfolio(null);
      setProfileImage(null);
      setGovtId(null);
      setSelectedGovtId("");
      setShowReviewModal(false);
      navigate("/");
    } catch (error) {
      console.log("ERROR:", error);
      alert("Submission failed");
    } finally {
      setIsLoading(false);
    }
  };

  const finalArtistTypes = selectedTypes.includes("Other")
    ? [
        ...selectedTypes.filter((t) => t !== "Other"),
        document.querySelector('input[name="otherArtistType"]')?.value,
      ]
    : selectedTypes;

  return (
    <div ref={pageRef} className="min-h-screen bg-white text-black">
      <Navbar />

      <section className="roboto-condensed pt-24 sm:pt-28 lg:pt-32 pb-24 px-5 sm:px-8 md:px-12 lg:px-20">
        {/* ── Heading ── */}
        <div className="max-w-6xl mb-16 sm:mb-20">
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="flex items-center gap-3 mb-5"
          >
            <div className="w-5 h-px bg-red-500" />
            <span
              className="roboto-condensed uppercase text-[10px] tracking-[5px] font-medium"
              style={{ color: "#ee0653" }}
            >
              Join Our Artist Network
            </span>
          </motion.div>

          <div ref={headRef} className="overflow-visible">
            <h1
              className="font-semibold leading-none tracking-tight"
              style={{ fontSize: "clamp(2.6rem,7vw,6.2rem)" }}
            >
              {"Ready to create".split("").map((ch, i) => (
                <span
                  key={i}
                  className="char inline-block"
                  style={{ whiteSpace: ch === " " ? "pre" : "normal" }}
                >
                  {ch === " " ? "\u00A0" : ch}
                </span>
              ))}
              <br />

              <span className="char inline-block">something&nbsp;</span>

              <span className="text-[#ee0640] whitespace-nowrap">
                {"extraordinary?".split("").map((ch, i) => (
                  <span key={i} className="char inline-block">
                    {ch}
                  </span>
                ))}
              </span>
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
            className="mt-7 text-zinc-500 max-w-xl leading-relaxed"
            style={{ fontSize: "clamp(0.88rem,1.2vw,1.05rem)" }}
          >
            Join our creative network and collaborate with brands, creators, and
            visionary teams from around the world.
          </motion.p>
        </div>

        {/* ── Form ── */}
        <form
          className="max-w-5xl"
          onSubmit={handleSubmit}
          encType="multipart/form-data"
        >
          {/* Name + Email */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-10"
          >
            <div>
              <SectionLabel required>Your Name</SectionLabel>
              <FocusInput
                type="text"
                name="name"
                placeholder="Enter your full name"
                required
              />
            </div>
            <div>
              <SectionLabel required>Email</SectionLabel>
              <FocusInput
                type="email"
                name="email"
                placeholder="Enter your email"
                required
              />
            </div>
          </motion.div>

          {/* Phone + City */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-14"
          >
            <div>
              <SectionLabel required>Phone</SectionLabel>
              <FocusInput
                type="text"
                name="phone"
                placeholder="Enter your phone number"
                required
              />
            </div>
            <div>
              <SectionLabel required>City</SectionLabel>
              <FocusInput
                type="text"
                name="city"
                placeholder="Enter your city"
                required
              />
            </div>
          </motion.div>

          {/* Profile photo + Art type/Experience */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="mb-14 grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-10 items-start"
          >
            {/* Profile photo */}
            <div>
              <SectionLabel required eyebrow="Step 01">
                Profile Photo
              </SectionLabel>
              <UploadZone height="300px" active={!!profileImage}>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => setProfileImage(e.target.files[0])}
                />
                {profileImage ? (
                  <div className="flex flex-col items-center">
                    <div className="relative">
                      <img
                        src={URL.createObjectURL(profileImage)}
                        alt=""
                        className="w-32 h-32 rounded-full object-cover"
                        style={{ border: "3px solid #ee0653" }}
                      />
                      <div
                        className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full flex items-center justify-center"
                        style={{
                          background: "#ee0653",
                          border: "2px solid #fff",
                        }}
                      >
                        <span style={{ color: "#fff", fontSize: "12px" }}>
                          ✓
                        </span>
                      </div>
                    </div>
                    <p
                      className="mt-4 text-sm break-all text-zinc-500"
                      style={{ maxWidth: "180px" }}
                    >
                      {profileImage.name}
                    </p>
                  </div>
                ) : (
                  <>
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center mb-3"
                      style={{ background: "rgba(0,0,0,0.05)" }}
                    >
                      <span style={{ fontSize: "20px", color: "#999" }}>↑</span>
                    </div>
                    <h4 className="font-medium" style={{ fontSize: "1.1rem" }}>
                      Upload Profile Photo
                    </h4>
                    <p
                      className="mt-2 text-zinc-400"
                      style={{ fontSize: "12px", letterSpacing: "0.5px" }}
                    >
                      JPG, PNG or WEBP
                    </p>
                  </>
                )}
              </UploadZone>
            </div>

            {/* Art type + experience */}
            <div>
              <SectionLabel required eyebrow="Step 02">
                Art Type
              </SectionLabel>
              <div className="flex flex-wrap gap-2.5">
                {artistTypes.map((type, i) => (
                  <Pill
                    key={i}
                    active={selectedTypes.includes(type)}
                    onClick={() => toggleType(type)}
                  >
                    {type}
                  </Pill>
                ))}
              </div>
              <input
                type="hidden"
                name="artistTypes"
                value={selectedTypes.join(", ")}
              />

              <AnimatePresence>
                {selectedTypes.includes("Other") && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mt-5 overflow-hidden"
                  >
                    <FocusInput
                      type="text"
                      name="otherArtistType"
                      placeholder="Tell us your artist type"
                      required
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="mt-10">
                <SectionLabel required>Professional Experience</SectionLabel>
                <div className="flex gap-3">
                  {["Yes", "No"].map((item, i) => (
                    <Pill
                      key={i}
                      active={experience === item}
                      onClick={() => setExperience(item)}
                    >
                      {item}
                    </Pill>
                  ))}
                </div>
                <input type="hidden" name="experience" value={experience} />
              </div>
            </div>
          </motion.div>

          {/* About + Portfolio */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="mb-14 grid grid-cols-1 lg:grid-cols-2 gap-10 items-start"
          >
            <div>
              <SectionLabel required eyebrow="Step 03">
                Tell Us About Yourself
              </SectionLabel>
              <div className="relative">
                <textarea
                  rows="11"
                  name="about"
                  required
                  placeholder="Share your artistic journey, style, inspirations, experience, and the kind of projects you enjoy working on..."
                  className="roboto-condensed w-full outline-none text-base resize-none"
                  style={{
                    borderRadius: "24px",
                    border: "1px solid rgba(0,0,0,0.1)",
                    padding: "20px",
                    background: "#fafafa",
                  }}
                  onFocus={(e) => (e.target.style.borderColor = "#ee0653")}
                  onBlur={(e) =>
                    (e.target.style.borderColor = "rgba(0,0,0,0.1)")
                  }
                />
              </div>
            </div>

            <div>
              <SectionLabel required eyebrow="Step 04">
                Upload Portfolio
              </SectionLabel>
              <UploadZone
                height="280px"
                active={!!portfolio}
                dragOver={dragStates.portfolio}
                onDragOver={(e) => {
                  e.preventDefault();
                  setDrag("portfolio", true);
                }}
                onDragLeave={() => setDrag("portfolio", false)}
                onDrop={(e) => {
                  e.preventDefault();
                  setDrag("portfolio", false);
                  const file = e.dataTransfer.files[0];
                  if (file)
                    handleFileChange({ target: { files: [file], value: "" } });
                }}
              >
                <input
                  type="file"
                  required
                  name="portfolio"
                  accept=".pdf"
                  onChange={handleFileChange}
                  className="hidden"
                />
                {portfolio ? (
                  <div className="flex flex-col items-center">
                    <div
                      className="w-12 h-12 rounded-2xl flex items-center justify-center mb-3"
                      style={{ background: "rgba(238,6,83,0.1)" }}
                    >
                      <span style={{ color: "#ee0653", fontSize: "20px" }}>
                        📄
                      </span>
                    </div>
                    <h4
                      className="font-medium break-all"
                      style={{ fontSize: "1rem", maxWidth: "220px" }}
                    >
                      {portfolio.name}
                    </h4>
                    <p
                      className="mt-1 text-zinc-400"
                      style={{ fontSize: "12px" }}
                    >
                      {(portfolio.size / (1024 * 1024)).toFixed(2)} MB
                    </p>
                    <p
                      className="mt-3 flex items-center gap-1.5"
                      style={{ color: "#ee0653", fontSize: "12px" }}
                    >
                      <span>✓</span> PDF uploaded successfully
                    </p>
                  </div>
                ) : (
                  <>
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center mb-3"
                      style={{ background: "rgba(0,0,0,0.05)" }}
                    >
                      <span style={{ fontSize: "20px", color: "#999" }}>↑</span>
                    </div>
                    <h4 className="font-medium" style={{ fontSize: "1.1rem" }}>
                      Upload Portfolio PDF
                    </h4>
                    <p
                      className="mt-2 text-zinc-400"
                      style={{ fontSize: "12px" }}
                    >
                      Drag & drop or click · Max 15MB
                    </p>
                  </>
                )}
              </UploadZone>
            </div>
          </motion.div>

          {/* Verification */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="mb-14"
          >
            <SectionLabel required eyebrow="Step 05">
              Verification
            </SectionLabel>
            <div className="flex flex-wrap gap-2.5 mb-6">
              {govtIds.map((item, i) => (
                <Pill
                  key={i}
                  active={selectedGovtId === item}
                  onClick={() => setSelectedGovtId(item)}
                >
                  {item}
                </Pill>
              ))}
            </div>

            <UploadZone
              height="200px"
              active={!!govtId}
              dragOver={dragStates.govtId}
              onDragOver={(e) => {
                e.preventDefault();
                setDrag("govtId", true);
              }}
              onDragLeave={() => setDrag("govtId", false)}
              onDrop={(e) => {
                e.preventDefault();
                setDrag("govtId", false);
                const f = e.dataTransfer.files[0];
                if (f) setGovtId(f);
              }}
            >
              <input
                type="file"
                accept="image/*,.pdf"
                className="hidden"
                onChange={(e) => setGovtId(e.target.files[0])}
              />
              {govtId ? (
                <div className="flex flex-col items-center">
                  <h4
                    className="font-medium break-all"
                    style={{ fontSize: "1.1rem" }}
                  >
                    {govtId.name}
                  </h4>
                  <p
                    className="mt-2 flex items-center gap-1.5"
                    style={{ color: "#ee0653", fontSize: "12px" }}
                  >
                    <span>✓</span> Document uploaded successfully
                  </p>
                </div>
              ) : (
                <>
                  <h4 className="font-light" style={{ fontSize: "1.3rem" }}>
                    Upload Government ID
                  </h4>
                  <p
                    className="mt-2 text-zinc-400"
                    style={{ fontSize: "12px" }}
                  >
                    JPG, PNG or PDF
                  </p>
                </>
              )}
            </UploadZone>
          </motion.div>

          {/* Submit */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <button
              type="button"
              disabled={!isFormValid}
              onClick={() => setShowReviewModal(true)}
              className="group relative overflow-hidden flex items-center gap-4 px-10 py-4 rounded-2xl font-medium transition-all duration-300"
              style={{
                background: isFormValid
                  ? "linear-gradient(135deg,#dc2626,#991b1b)"
                  : "rgba(0,0,0,0.12)",
                color: isFormValid ? "#fff" : "#aaa",
                boxShadow: isFormValid
                  ? "0 8px 28px rgba(220,38,38,0.35)"
                  : "none",
                cursor: isFormValid ? "pointer" : "not-allowed",
                fontSize: "clamp(0.9rem,1.1vw,1rem)",
                letterSpacing: "0.04em",
              }}
              onMouseEnter={(e) => {
                if (isFormValid)
                  e.currentTarget.style.boxShadow =
                    "0 14px 40px rgba(220,38,38,0.5)";
              }}
              onMouseLeave={(e) => {
                if (isFormValid)
                  e.currentTarget.style.boxShadow =
                    "0 8px 28px rgba(220,38,38,0.35)";
              }}
            >
              {isFormValid && (
                <span
                  className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out"
                  style={{
                    background:
                      "linear-gradient(to right, transparent, rgba(255,255,255,0.15), transparent)",
                  }}
                />
              )}

              <span className="relative">Review My Profile</span>

              <span className="relative text-lg transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </button>
            {!isFormValid && (
              <p
                className="mt-3 uppercase"
                style={{
                  fontSize: "10px",
                  letterSpacing: "3px",
                  color: "#bbb",
                }}
              >
                Complete all required fields to continue
              </p>
            )}
          </motion.div>
        </form>

        {/* ── Review Modal ── */}
        <AnimatePresence>
          {showReviewModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] flex items-center justify-center px-5"
              style={{
                background: "rgba(0,0,0,0.65)",
                backdropFilter: "blur(12px)",
              }}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.92, opacity: 0 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="bg-white w-full max-w-3xl rounded-[28px] p-8 sm:p-10 max-h-[90vh] overflow-y-auto"
              >
                {/* Header */}
                <div className="flex items-center justify-between">
                  <div>
                    <span
                      className="roboto-condensed uppercase block mb-1"
                      style={{
                        fontSize: "10px",
                        letterSpacing: "3px",
                        color: "#ee0653",
                      }}
                    >
                      Almost there
                    </span>
                    <h2 className="font-semibold" style={{ fontSize: "2rem" }}>
                      Review Your Profile
                    </h2>
                  </div>
                  <button
                    onClick={() => setShowReviewModal(false)}
                    className="roboto-condensed px-5 py-2 rounded-full transition-colors duration-200 cursor-pointer"
                    style={{ border: "1px solid rgba(0,0,0,0.12)" }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.background = "#f5f5f5")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.background = "transparent")
                    }
                  >
                    Edit
                  </button>
                </div>

                {/* Artist */}
                <div className="mt-10 flex items-center gap-6">
                  <img
                    src={URL.createObjectURL(profileImage)}
                    alt=""
                    className="w-24 h-24 rounded-full object-cover"
                    style={{ border: "3px solid #ee0653" }}
                  />
                  <div>
                    <h3
                      className="font-semibold"
                      style={{ fontSize: "1.6rem" }}
                    >
                      {document.querySelector('input[name="name"]')?.value}
                    </h3>
                    <p
                      className="mt-1 text-zinc-500"
                      style={{ fontSize: "0.92rem" }}
                    >
                      {document.querySelector('input[name="city"]')?.value}
                    </p>
                    <p
                      className="text-zinc-500"
                      style={{ fontSize: "0.92rem" }}
                    >
                      {document.querySelector('input[name="email"]')?.value}
                    </p>
                    <p
                      className="text-zinc-500"
                      style={{ fontSize: "0.92rem" }}
                    >
                      {document.querySelector('input[name="phone"]')?.value}
                    </p>
                  </div>
                </div>

                {/* Art Types */}
                <div className="mt-10">
                  <p
                    className="roboto-condensed uppercase mb-4"
                    style={{
                      fontSize: "10px",
                      letterSpacing: "3px",
                      color: "#999",
                    }}
                  >
                    Selected Art Types
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {finalArtistTypes.map((type, i) => (
                      <div
                        key={i}
                        className="px-4 py-2 rounded-full text-sm"
                        style={{
                          background: "rgba(238,6,83,0.08)",
                          color: "#ee0653",
                        }}
                      >
                        {type}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Verification */}
                <div
                  className="mt-10 p-5 rounded-2xl flex items-center gap-4"
                  style={{ background: "#f8f5f1" }}
                >
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center"
                    style={{ background: "rgba(238,6,83,0.1)" }}
                  >
                    <span style={{ color: "#ee0653" }}>✓</span>
                  </div>
                  <div>
                    <p
                      className="roboto-condensed uppercase"
                      style={{
                        fontSize: "9px",
                        letterSpacing: "2.5px",
                        color: "#999",
                      }}
                    >
                      Verification
                    </p>
                    <p
                      className="font-medium mt-0.5"
                      style={{ fontSize: "0.95rem" }}
                    >
                      {selectedGovtId} uploaded successfully
                    </p>
                  </div>
                </div>

                {/* Buttons */}
                <div className="mt-12 flex gap-4">
                  <button
                    onClick={() => setShowReviewModal(false)}
                    className="flex-1 roboto-condensed py-4 rounded-2xl transition-colors duration-200 cursor-pointer"
                    style={{ border: "1px solid rgba(0,0,0,0.12)" }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.background = "#f5f5f5")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.background = "transparent")
                    }
                  >
                    Back
                  </button>

                  <button
                    onClick={() =>
                      document.querySelector("form").requestSubmit()
                    }
                    disabled={isLoading}
                    className="flex-1 roboto-condensed py-4 rounded-2xl text-white font-medium transition-all duration-300 cursor-pointer"
                    style={{
                      background: "linear-gradient(135deg,#dc2626,#991b1b)",
                      boxShadow: "0 8px 24px rgba(220,38,38,0.35)",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.boxShadow =
                        "0 12px 36px rgba(220,38,38,0.5)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.boxShadow =
                        "0 8px 24px rgba(220,38,38,0.35)")
                    }
                  >
                    {isLoading ? "Submitting..." : "Submit Application"}
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </div>
  );
};

export default Artist;
