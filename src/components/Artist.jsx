import { db, storage } from "../firebase";

import { collection, addDoc } from "firebase/firestore";

import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

import emailjs from "@emailjs/browser";

import { useState } from "react";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";

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

const Artist = () => {
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [experience, setExperience] = useState("");
  const navigate = useNavigate();

  const toggleType = (type) => {
    if (selectedTypes.includes(type)) {
      setSelectedTypes(selectedTypes.filter((item) => item !== type));
    } else {
      setSelectedTypes([...selectedTypes, type]);
    }
  };

  const [portfolio, setPortfolio] = useState(null);

  const [profileImage, setProfileImage] = useState(null);

  const [govtId, setGovtId] = useState(null);

  const [selectedGovtId, setSelectedGovtId] = useState("");

  const [showReviewModal, setShowReviewModal] = useState(false);

  const isFormValid =
    selectedTypes.length > 0 &&
    experience &&
    portfolio &&
    profileImage &&
    govtId &&
    selectedGovtId;

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
      // Upload Profile Image
      // =========================

      const profileRef = ref(
        storage,
        `artistProfiles/${Date.now()}_${profileImage.name}`,
      );

      await uploadBytes(profileRef, profileImage);

      const profileImageURL = await getDownloadURL(profileRef);

      // =========================
      // Upload Govt ID
      // =========================

      const govtIdRef = ref(
        storage,
        `artistGovtIds/${Date.now()}_${govtId.name}`,
      );

      await uploadBytes(govtIdRef, govtId);

      const govtIdURL = await getDownloadURL(govtIdRef);

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

      console.log("Email Sent");

      console.log("Confirmation Email Sent");

      // =========================
      // SUCCESS
      // =========================

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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            <div>
              <h3 className="text-xl sm:text-2xl mb-4">Your Name*</h3>

              <input
                type="text"
                name="name"
                placeholder="Enter your full name"
                required
                className="w-full border border-zinc-300 rounded-2xl px-5 py-4 bg-white outline-none text-lg focus:border-black duration-300"
              />
            </div>

            <div>
              <h3 className="text-xl sm:text-2xl mb-4">Email*</h3>

              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                required
                className="w-full border border-zinc-300 rounded-2xl px-5 py-4 bg-white outline-none text-lg focus:border-black duration-300"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            <div>
              <h3 className="text-xl sm:text-2xl mb-4">Phone*</h3>

              <input
                type="text"
                name="phone"
                placeholder="Enter your phone number"
                required
                className="w-full border border-zinc-300 rounded-2xl px-5 py-4 bg-white outline-none text-lg focus:border-black duration-300"
              />
            </div>

            <div>
              <h3 className="text-xl sm:text-2xl mb-4">City*</h3>

              <input
                type="text"
                name="city"
                placeholder="Enter your city"
                required
                className="w-full border border-zinc-300 rounded-2xl px-5 py-4 bg-white outline-none text-lg focus:border-black duration-300"
              />
            </div>
          </div>

          {/* Artist Profile Section */}
          <div className="mb-14 grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-10 items-start">
            {/* LEFT SIDE → Profile Photo */}
            <div>
              <h3 className="text-xl sm:text-2xl mb-4">Profile Photo*</h3>

              <label className="w-full min-h-[320px] border-2 border-dashed border-zinc-300 rounded-[2rem] flex flex-col items-center justify-center text-center px-5 cursor-pointer hover:border-black duration-300 overflow-hidden">
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => setProfileImage(e.target.files[0])}
                />

                {profileImage ? (
                  <div className="flex flex-col items-center">
                    <img
                      src={URL.createObjectURL(profileImage)}
                      alt=""
                      className="w-36 h-36 rounded-full object-cover"
                    />

                    <p className="mt-5 text-base break-all">
                      {profileImage.name}
                    </p>
                  </div>
                ) : (
                  <>
                    <h4 className="text-2xl font-light">
                      Upload Profile Photo
                    </h4>

                    <p className="mt-3 text-zinc-500 text-sm">
                      JPG, PNG or WEBP
                    </p>
                  </>
                )}
              </label>
            </div>

            {/* RIGHT SIDE */}
            <div>
              {/* Art Type */}
              <div>
                <h3 className="text-xl sm:text-2xl mb-4">Art Type*</h3>

                <div className="flex flex-wrap gap-3">
                  {artistTypes.map((type, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => toggleType(type)}
                      className={`px-5 py-3 rounded-full border text-sm duration-300 ${
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
                <div className="mt-6">
                  <input
                    type="text"
                    name="otherArtistType"
                    placeholder="Tell us your artist type"
                    required
                    className="w-full border border-zinc-300 rounded-2xl px-5 py-3.5 bg-white outline-none text-base focus:border-black duration-300"
                  />
                </div>
              )}

              {/* Experience */}
              <div className="mt-10">
                <h3 className="text-xl sm:text-2xl mb-4">
                  Professional Experience*
                </h3>

                <div className="flex flex-wrap gap-4">
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
            </div>
          </div>

          {/* About + Portfolio */}
          <div className="mb-14 grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            {/* LEFT → About */}
            <div>
              <h3 className="text-xl sm:text-2xl mb-4">
                Tell Us About Yourself*
              </h3>

              <textarea
                rows="12"
                name="about"
                placeholder="Share your artistic journey, style, inspirations, experience, and the kind of projects you enjoy working on..."
                required
                className="w-full border border-zinc-300 rounded-[2rem] px-5 py-5 bg-white outline-none text-base resize-none focus:border-black duration-300"
              />
            </div>

            {/* RIGHT → Portfolio */}
            <div>
              <h3 className="text-xl sm:text-2xl mb-4">Upload Portfolio*</h3>

              <label className="w-full min-h-[320px] border-2 border-dashed border-zinc-300 rounded-[2rem] flex flex-col items-center justify-center text-center px-5 cursor-pointer hover:border-black duration-300">
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
                    <h4 className="text-xl font-medium break-all">
                      {portfolio.name}
                    </h4>

                    <p className="mt-2 text-zinc-500 text-sm">
                      {(portfolio.size / (1024 * 1024)).toFixed(2)} MB
                    </p>

                    <p className="mt-4 text-green-600 text-sm">
                      PDF uploaded successfully
                    </p>
                  </div>
                ) : (
                  <>
                    <h4 className="text-2xl font-light">
                      Upload Portfolio PDF
                    </h4>

                    <p className="mt-3 text-zinc-500 text-sm">
                      Upload only 1 PDF (Max 15MB)
                    </p>
                  </>
                )}
              </label>
            </div>
          </div>

          <div className="mb-14">
            <h3 className="text-xl sm:text-2xl mb-6">Verification*</h3>

            {/* ID Selection */}
            <div className="flex flex-wrap gap-4 mb-8">
              {["Aadhaar Card", "PAN Card", "Driving License", "Passport"].map(
                (item, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => setSelectedGovtId(item)}
                    className={`px-5 py-3 rounded-full border duration-300 ${
                      selectedGovtId === item
                        ? "bg-black text-white border-black"
                        : "border-zinc-300 hover:border-black"
                    }`}
                  >
                    {item}
                  </button>
                ),
              )}
            </div>

            {/* Upload */}
            <label className="w-full min-h-[220px] border-2 border-dashed border-zinc-300 rounded-3xl flex flex-col items-center justify-center text-center px-5 cursor-pointer hover:border-black duration-300">
              <input
                type="file"
                accept="image/*,.pdf"
                className="hidden"
                onChange={(e) => setGovtId(e.target.files[0])}
              />

              {govtId ? (
                <div>
                  <h4 className="text-2xl font-light">{govtId.name}</h4>

                  <p className="mt-3 text-green-600">
                    Document uploaded successfully
                  </p>
                </div>
              ) : (
                <>
                  <h4 className="text-2xl sm:text-3xl font-light">
                    Upload Government ID
                  </h4>

                  <p className="mt-3 text-zinc-500">JPG, PNG or PDF</p>
                </>
              )}
            </label>
          </div>

          <button
            type="button"
            disabled={!isFormValid}
            onClick={() => setShowReviewModal(true)}
            className={`px-10 py-5 rounded-full text-lg sm:text-xl duration-300 flex items-center justify-center gap-3 ${
              isFormValid
                ? "bg-black text-white hover:opacity-85"
                : "bg-zinc-300 text-zinc-500 cursor-not-allowed"
            }`}
          >
            Review My Profile →
          </button>
        </form>

        {showReviewModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] flex items-center justify-center px-5">
            <div className="bg-white w-full max-w-3xl rounded-[2.5rem] p-8 sm:p-10 max-h-[90vh] overflow-y-auto">
              {/* Header */}
              <div className="flex items-center justify-between">
                <h2 className="text-4xl font-light">Review Your Profile</h2>

                <button
                  onClick={() => setShowReviewModal(false)}
                  className="border border-zinc-300 px-5 py-2 rounded-full"
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
                />

                <div>
                  <h3 className="text-3xl font-light">
                    {document.querySelector('input[name="name"]')?.value}
                  </h3>

                  <p className="mt-2 text-zinc-600">
                    {document.querySelector('input[name="city"]')?.value}
                  </p>

                  <p className="text-zinc-600">
                    {document.querySelector('input[name="email"]')?.value}
                  </p>

                  <p className="text-zinc-600">
                    {document.querySelector('input[name="phone"]')?.value}
                  </p>
                </div>
              </div>

              {/* Art Types */}
              <div className="mt-10">
                <h4 className="text-xl mb-5">Selected Art Types</h4>

                <div className="flex flex-wrap gap-3">
                  {finalArtistTypes.map((type, index) => (
                    <div
                      key={index}
                      className="px-4 py-2 rounded-full bg-zinc-100"
                    >
                      {type}
                    </div>
                  ))}
                </div>
              </div>

              {/* Verification */}
              <div className="mt-10">
                <h4 className="text-xl mb-3">Verification</h4>

                <p className="text-zinc-600">
                  {selectedGovtId} uploaded successfully
                </p>
              </div>

              {/* Buttons */}
              <div className="mt-14 flex gap-4">
                <button
                  onClick={() => setShowReviewModal(false)}
                  className="flex-1 border border-zinc-300 py-4 rounded-full"
                >
                  Back
                </button>

                <button
                  onClick={() => {
                    document.querySelector("form").requestSubmit();
                  }}
                  className="flex-1 bg-black text-white py-4 rounded-full"
                >
                  {isLoading ? "Submitting..." : "Submit Application"}
                </button>
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default Artist;
