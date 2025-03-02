import React, { useState } from "react";
import emailjs from "@emailjs/browser";

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const sendMail = () => {
    emailjs
      .send("service_m1ab3vk", "template_9ldnmxj", formData, "XiB1IohVJeNkzZWDO")
      .then(() => alert("Email Sent!!"))
      .catch((err) => console.error("Failed to send email:", err));
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-r from-gray-900 via-purple-700 to-pink-500 p-5">
      <div className="w-full max-w-md bg-gray-800 p-6 rounded-lg shadow-lg">
        <div className="text-center text-pink-500 text-2xl font-bold mb-4">CONTACT US</div>
        <div className="space-y-4">
          <input className="w-full p-2 bg-transparent border-b border-gray-600 text-white outline-none"
            type="text" id="name" placeholder="NAME" value={formData.name} onChange={handleChange} />
          <input className="w-full p-2 bg-transparent border-b border-gray-600 text-white outline-none"
            type="email" id="email" placeholder="EMAIL" value={formData.email} onChange={handleChange} />
          <input className="w-full p-2 bg-transparent border-b border-gray-600 text-white outline-none"
            type="text" id="subject" placeholder="SUBJECT" value={formData.subject} onChange={handleChange} />
          <input className="w-full p-2 bg-transparent border-b border-gray-600 text-white outline-none"
            type="text" id="message" placeholder="MESSAGE" value={formData.message} onChange={handleChange} />
          <div className="flex justify-end space-x-4">
            <button className="text-red-500 hover:text-red-700">CANCEL</button>
            <button className="text-pink-500 hover:text-pink-700" onClick={sendMail}>SEND</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
