import { useState } from "react";

import Navbar from "./Navbar";
import JSZip from "jszip";

import emailjs from "@emailjs/browser";

import { db, storage } from "../firebase";

import { collection, addDoc } from "firebase/firestore";

import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const BookConsultation = () => {
  const [files, setFiles] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  const isFormValid = files.length > 0;

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);

    if (selectedFiles.length > 5) {
      alert("Maximum 5 images allowed");

      e.target.value = "";

      return;
    }

    let totalSize = 0;

    for (let file of selectedFiles) {
      if (!file.type.startsWith("image/")) {
        alert("Only image files are allowed");

        e.target.value = "";

        return;
      }

      totalSize += file.size;
    }

    // TOTAL MAX 10MB
    if (totalSize > 10 * 1024 * 1024) {
      alert("Total images size must be under 10MB");

      e.target.value = "";

      return;
    }

    setFiles(selectedFiles);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true);

      const form = e.target;

      // =========================
      // CREATE ZIP
      // =========================

      console.log("Creating ZIP...");

      const zip = new JSZip();

      files.forEach((file) => {
        zip.file(file.name, file);
      });

      const zipBlob = await zip.generateAsync({
        type: "blob",
      });

      console.log("ZIP Created");

      // =========================
      // UPLOAD ZIP TO FIREBASE
      // =========================

      const zipRef = ref(
        storage,
        `consultations/${Date.now()}_space_images.zip`,
      );

      console.log("Uploading ZIP...");

      await uploadBytes(zipRef, zipBlob);

      const zipURL = await getDownloadURL(zipRef);

      console.log("ZIP Uploaded:", zipURL);

      // =========================
      // SAVE TO FIRESTORE
      // =========================

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

      console.log("Saving to Firestore...");

      await addDoc(
        collection(db, "consultationApplications"),
        consultationData,
      );

      console.log("Saved in Firestore");

      // =========================
      // SEND EMAIL
      // =========================

      console.log("Sending Email...");

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

      // =========================
      // SUCCESS
      // =========================

      alert("Consultation submitted successfully!");

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
    <div className="min-h-screen bg-white text-black">
      {/* Navbar */}
      <Navbar />

      {/* Main Section */}
      <section className="pt-28 sm:pt-32 lg:pt-36 pb-20 px-5 sm:px-8 md:px-12 lg:px-20">
        {/* Heading */}
        <div className="max-w-6xl">
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[7rem] leading-none tracking-tight font-light">
            Let’s build your
            <br />
            next big project.
          </h1>

          <p className="mt-6 text-zinc-600 text-base sm:text-lg md:text-xl max-w-3xl leading-relaxed">
            Tell us about your vision, your space, and your requirements. We’ll
            help transform your ideas into a premium digital experience.
          </p>
        </div>

        {/* Form */}
        <form className="mt-16 sm:mt-20 max-w-5xl" onSubmit={handleSubmit}>
          {/* Your Name */}
          <div className="mb-10">
            <h3 className="text-xl sm:text-2xl mb-4">Your Name<span className="text-red-500">*</span></h3>

            <input
              type="text"
              required
              name="name"
              placeholder="Enter your full name"
              className="w-full border border-zinc-300 rounded-2xl px-5 py-4 bg-white outline-none text-lg focus:border-black duration-300"
            />
          </div>

          {/* Email */}
          <div className="mb-10">
            <h3 className="text-xl sm:text-2xl mb-4">Email<span className="text-red-500">*</span></h3>

            <input
              type="email"
              required
              name="email"
              placeholder="Enter your email"
              className="w-full border border-zinc-300 rounded-2xl px-5 py-4 bg-white outline-none text-lg focus:border-black duration-300"
            />
          </div>

          {/* Phone */}
          <div className="mb-10">
            <h3 className="text-xl sm:text-2xl mb-4">Phone<span className="text-red-500">*</span></h3>

            <input
              type="text"
              required
              name="phone"
              placeholder="Enter your phone number"
              className="w-full border border-zinc-300 rounded-2xl px-5 py-4 bg-white outline-none text-lg focus:border-black duration-300"
            />
          </div>

          {/* Company Name */}
          <div className="mb-10">
            <h3 className="text-xl sm:text-2xl mb-4">
              Organization/Company Name<span className="text-red-500">*</span>
            </h3>

            <input
              type="text"
              required
              name="company"
              placeholder="Enter company name"
              className="w-full border border-zinc-300 rounded-2xl px-5 py-4 bg-white outline-none text-lg focus:border-black duration-300"
            />
          </div>

          {/* Upload Space */}
          <div className="mb-10">
            <h3 className="text-xl sm:text-2xl mb-4">Share Your Space<span className="text-red-500">*</span></h3>

            <label className="w-full min-h-[240px] border-2 border-dashed border-zinc-300 rounded-3xl flex flex-col items-center justify-center text-center px-5 cursor-pointer hover:border-black duration-300">
              <input
                type="file"
                required
                multiple
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />

              {files.length > 0 ? (
                <div className="flex flex-col items-center">
                  <h4 className="text-2xl sm:text-3xl font-light">
                    {files.length} image(s) selected
                  </h4>

                  <p className="mt-3 text-zinc-500 text-sm sm:text-base">
                    Ready to upload
                  </p>
                </div>
              ) : (
                <>
                  <h4 className="text-2xl sm:text-3xl font-light">
                    Upload images
                  </h4>

                  <p className="mt-3 text-zinc-500 text-sm sm:text-base">
                    Maximum 5 images (10MB each)
                  </p>
                </>
              )}
            </label>
          </div>

          {/* Space Type */}
          <div className="mb-10">
            <h3 className="text-xl sm:text-2xl mb-4">Space Type*</h3>

            <input
              type="text"
              required
              name="spaceType"
              placeholder="Residential, Office, Studio, etc."
              className="w-full border border-zinc-300 rounded-2xl px-5 py-4 bg-white outline-none text-lg focus:border-black duration-300"
            />
          </div>

          {/* Project Location */}
          <div className="mb-10">
            <h3 className="text-xl sm:text-2xl mb-4">Project Location</h3>

            <input
              type="text"
              name="projectLocation"
              placeholder="Enter project location"
              className="w-full border border-zinc-300 rounded-2xl px-5 py-4 bg-white outline-none text-lg focus:border-black duration-300"
            />
          </div>

          {/* Estimated Area */}
          <div className="mb-10">
            <h3 className="text-xl sm:text-2xl mb-4">Estimated Area</h3>

            <input
              type="text"
              name="estimatedArea"
              placeholder="Example: 1200 sq.ft"
              className="w-full border border-zinc-300 rounded-2xl px-5 py-4 bg-white outline-none text-lg focus:border-black duration-300"
            />
          </div>

          {/* Preferred Time */}
          <div className="mb-10">
            <h3 className="text-xl sm:text-2xl mb-4">Preferred Timeline</h3>

            <input
              type="date"
              name="preferredTimeline"
              min={new Date().toISOString().split("T")[0]}
              className="w-full border border-zinc-300 rounded-2xl px-5 py-4 bg-white outline-none text-lg focus:border-black duration-300"
            />
          </div>

          {/* Budget */}
          <div className="mb-10">
            <h3 className="text-xl sm:text-2xl mb-4">Budget</h3>

            <select
              name="budget"
              defaultValue=""
              className="w-full border border-zinc-300 rounded-2xl px-5 py-4 bg-white outline-none text-lg focus:border-black duration-300 text-zinc-700"
            >
              <option value="" disabled>
                Select your estimated budget
              </option>

              <option value="less-than-50000">Less than ₹50,000</option>

              <option value="50000-100000">₹50,000 – ₹1 Lakh</option>

              <option value="100000-500000">₹1 Lakh – ₹5 Lakhs</option>

              <option value="more-than-500000">More than ₹5 Lakhs</option>
            </select>
          </div>

          {/* Additional Requirements */}
          <div className="mb-14">
            <h3 className="text-xl sm:text-2xl mb-4">
              Additional Requirements
            </h3>

            <textarea
              rows="6"
              name="additionalRequirements"
              placeholder="Anything else you'd like us to know?"
              className="w-full border border-zinc-300 rounded-2xl px-5 py-4 bg-white outline-none text-lg resize-none focus:border-black duration-300"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={!isFormValid || isLoading}
            className={`px-10 py-5 rounded-full text-lg sm:text-xl duration-300 ${
              isFormValid && !isLoading
                ? "bg-black text-white hover:opacity-85"
                : "bg-zinc-300 text-zinc-500 cursor-not-allowed"
            }`}
          >
            {isLoading ? "Submitting..." : "Submit"}
          </button>
        </form>
      </section>
    </div>
  );
};

export default BookConsultation;
