// src/pages/Contact.jsx
import React from "react";

const Contact = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center px-6">
      <div className="max-w-lg w-full bg-gray-800 p-8 rounded-2xl shadow-lg">
        <h1 className="text-3xl font-bold text-[#01b4e4] mb-6 text-center">
          Contact Us
        </h1>
        <form className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Your Name"
            className="border border-gray-600 bg-gray-700 text-white p-3 rounded-md focus:ring-2 focus:ring-[#01b4e4] outline-none"
          />
          <input
            type="email"
            placeholder="Your Email"
            className="border border-gray-600 bg-gray-700 text-white p-3 rounded-md focus:ring-2 focus:ring-[#01b4e4] outline-none"
          />
          <textarea
            placeholder="Your Message"
            rows="5"
            className="border border-gray-600 bg-gray-700 text-white p-3 rounded-md focus:ring-2 focus:ring-[#01b4e4] outline-none"
          ></textarea>
          <button
            type="submit"
            className="bg-[#01b4e4] hover:bg-[#0287ab] text-white py-3 rounded-md font-semibold transition"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
