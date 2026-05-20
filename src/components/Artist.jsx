import { db, storage } from "../firebase";

import { collection, addDoc } from "firebase/firestore";

import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

import emailjs from "@emailjs/browser";

import { useState } from "react";
import Navbar from "./Navbar";

const artistTypes = [
  "Photographer",
  "Graphic Designer",
  "Video Editor",
  "3D Artist",
  "Illustrator",
  "Animator",
  "UI/UX Designer",
  "Creative Developer",
  "Other",
];

const Artist = () => {
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [experience, setExperience] = useState("");

  const toggleType = (type) => {
    if (selectedTypes.includes(type)) {
      setSelectedTypes(selectedTypes.filter((item) => item !== type));
    } else {
      setSelectedTypes([...selectedTypes, type]);
    }
  };

  const [portfolio, setPortfolio] = useState(null);

  const isFormValid = selectedTypes.length > 0 && experience && portfolio;

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    // Allow only PDF
    if (file.type !== "application/pdf") {
      alert("Only PDF files are allowed");
      e.target.value = "";
      return;
    }

    // Max size 15MB
    if (file.size > 15 * 1024 * 1024) {
      alert("File size should be less than 15MB");
      e.target.value = "";
      return;
    }

    setPortfolio(file);
  };

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);

    try {
      console.log("Submitting form...");

      const form = e.target;

      // =========================
      // 1. Upload PDF to Firebase
      // =========================

      const storageRef = ref(
        storage,
        `portfolios/${Date.now()}_${portfolio.name}`,
      );

      console.log("Uploading PDF...");

      await uploadBytes(storageRef, portfolio);

      const portfolioURL = await getDownloadURL(storageRef);

      console.log("PDF Uploaded:", portfolioURL);

      // =========================
      // 2. Save data in Firestore
      // =========================

      const artistData = {
        name: form.name.value,
        email: form.email.value,
        phone: form.phone.value,
        artistTypes: selectedTypes,
        experience,
        city: form.city.value,
        about: form.about.value,
        portfolioURL,
        createdAt: new Date(),
      };

      console.log("Saving to Firestore...");

      await addDoc(collection(db, "artistApplications"), artistData);

      console.log("Saved in Firestore");

      // =========================
      // 3. Send Email
      // =========================

      console.log("Sending email...");

      await emailjs.send(
        "service_52y6oom",
        "template_alevyqd",
        {
          name: artistData.name,
          email: artistData.email,
          phone: artistData.phone,
          artistTypes: artistData.artistTypes.join(", "),
          experience: artistData.experience,
          city: artistData.city,
          about: artistData.about,
          portfolioURL: artistData.portfolioURL,
        },
        "rJ7snfOydxb6-ezAG",
      );

      console.log("Email Sent");

      // =========================
      // SUCCESS
      // =========================

      alert("Application submitted successfully!");

      form.reset();

      setSelectedTypes([]);
      setExperience("");
      setPortfolio(null);
    } catch (error) {
      console.log("ERROR:", error);

      alert("Submission failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-black">
      <Navbar />

      <section className="pt-28 sm:pt-32 lg:pt-36 pb-20 px-5 sm:px-8 md:px-12 lg:px-20">
        <div className="max-w-6xl">
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[7rem] leading-none tracking-tight font-light">
            Ready to create
            <br />
            something extraordinary?
          </h1>

          <p className="mt-6 text-zinc-600 text-base sm:text-lg md:text-xl max-w-2xl leading-relaxed">
            Join our creative network and collaborate with brands, creators, and
            visionary teams from around the world.
          </p>
        </div>

        <form
          className="mt-16 sm:mt-20 max-w-5xl"
          onSubmit={handleSubmit}
          encType="multipart/form-data"
        >
          {/* Name */}
          <div className="mb-10">
            <h3 className="text-xl sm:text-2xl mb-4">Your Name*</h3>

            <input
              type="text"
              name="name"
              placeholder="Enter your full name"
              required
              className="w-full border border-zinc-300 rounded-2xl px-5 py-4 bg-white outline-none text-lg focus:border-black duration-300"
            />
          </div>

          {/* Email */}
          <div className="mb-10">
            <h3 className="text-xl sm:text-2xl mb-4">Email*</h3>

            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              required
              className="w-full border border-zinc-300 rounded-2xl px-5 py-4 bg-white outline-none text-lg focus:border-black duration-300"
            />
          </div>

          {/* Phone */}
          <div className="mb-10">
            <h3 className="text-xl sm:text-2xl mb-4">Phone*</h3>

            <input
              type="text"
              name="phone"
              placeholder="Enter your phone number"
              required
              className="w-full border border-zinc-300 rounded-2xl px-5 py-4 bg-white outline-none text-lg focus:border-black duration-300"
            />
          </div>

          {/* Artist Type */}
          <div className="mb-10">
            <h3 className="text-xl sm:text-2xl mb-5">Artist Type*</h3>

            <div className="flex flex-wrap gap-4">
              {artistTypes.map((type, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => toggleType(type)}
                  className={`px-5 py-3 rounded-full border text-sm sm:text-base duration-300 ${
                    selectedTypes.includes(type)
                      ? "bg-black text-white border-black"
                      : "bg-white text-black border-zinc-300 hover:border-black"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
            <input
              type="hidden"
              name="artistTypes"
              value={selectedTypes.join(", ")}
            />
          </div>

          {/* Other */}
          {selectedTypes.includes("Other") && (
            <div className="mb-10">
              <h3 className="text-xl sm:text-2xl mb-4">Other</h3>

              <input
                type="text"
                name="otherArtistType"
                placeholder="Tell us your artist type"
                required
                className="w-full border border-zinc-300 rounded-2xl px-5 py-4 bg-white outline-none text-lg focus:border-black duration-300"
              />
            </div>
          )}

          {/* Experience */}
          <div className="mb-10">
            <h3 className="text-xl sm:text-2xl mb-5">
              Do you have professional experience?*
            </h3>

            <div className="flex gap-4">
              {["Yes", "No"].map((item, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setExperience(item)}
                  className={`px-6 py-3 rounded-full border duration-300 ${
                    experience === item
                      ? "bg-black text-white border-black"
                      : "border-zinc-300 hover:border-black"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
            <input type="hidden" name="experience" value={experience} />
          </div>

          {/* City */}
          <div className="mb-10">
            <h3 className="text-xl sm:text-2xl mb-4">City</h3>

            <input
              type="text"
              name="city"
              placeholder="Enter your city*"
              required
              className="w-full border border-zinc-300 rounded-2xl px-5 py-4 bg-white outline-none text-lg focus:border-black duration-300"
            />
          </div>

          {/* About */}
          <div className="mb-10">
            <h3 className="text-xl sm:text-2xl mb-4">
              Tell us about yourself*
            </h3>

            <textarea
              rows="6"
              name="about"
              placeholder="Write something about yourself..."
              required
              className="w-full border border-zinc-300 rounded-2xl px-5 py-4 bg-white outline-none text-lg resize-none focus:border-black duration-300"
            />
          </div>

          {/* Upload Portfolio */}
          <div className="mb-14">
            <h3 className="text-xl sm:text-2xl mb-4">Upload Portfolio*</h3>

            <label className="w-full min-h-[220px] border-2 border-dashed border-zinc-300 rounded-3xl flex flex-col items-center justify-center text-center px-5 cursor-pointer hover:border-black duration-300">
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
                  <h4 className="text-xl sm:text-2xl font-medium break-all">
                    {portfolio.name}
                  </h4>

                  <p className="mt-2 text-zinc-500 text-sm">
                    {(portfolio.size / (1024 * 1024)).toFixed(2)} MB
                  </p>

                  <p className="mt-4 text-green-600 text-sm sm:text-base">
                    PDF uploaded successfully
                  </p>
                </div>
              ) : (
                <>
                  <h4 className="text-2xl sm:text-3xl font-light">
                    Drop PDF here
                  </h4>

                  <p className="mt-3 text-zinc-500 text-sm sm:text-base">
                    Upload only 1 PDF (Max 15MB)
                  </p>
                </>
              )}
            </label>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={!isFormValid || isLoading}
            className={`px-10 py-5 rounded-full text-lg sm:text-xl duration-300 flex items-center justify-center gap-3 ${
              isFormValid && !isLoading
                ? "bg-black text-white hover:opacity-85"
                : "bg-zinc-300 text-zinc-500 cursor-not-allowed"
            }`}
          >
            {isLoading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Submitting...
              </>
            ) : (
              "Submit Application"
            )}
          </button>
        </form>
      </section>
    </div>
  );
};

export default Artist;
