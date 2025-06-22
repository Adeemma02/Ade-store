import { useState } from "react";
import { Mail, User, MessageSquare, Send } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate form submission (replace with API call in production)
    console.log("Form submitted:", formData);
    setSubmitted(true);
    setFormData({ name: "", email: "", message: "" });
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <section className="w-full px-4 md:px-8 lg:px-12 py-6 md:py-12 mx-auto bg-gradient-to-br from-gray-50 to-blue-50">
      <button
        onClick={() => navigate("/")}
        className="mb-4 text-blue-600 hover:underline flex items-center gap-2"
      >
        &larr; Home
      </button>
      <div className="flex flex-col justify-between items-start mb-6">
        <div className="w-full">
          <h2 className="text-xl sm:text-2xl text-center md:text-3xl font-bold text-gray-900 mb-2">
            Contact Us
          </h2>
          <p className="text-gray-600 text-center text-base">
            Have questions? Reach out to our team for support or inquiries.
          </p>
        </div>
      </div>
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-2xl shadow-md border border-gray-200">
        {submitted && (
          <div className="mb-4 bg-green-100 text-green-600 p-3 rounded-lg text-center font-medium">
            Thank you for your message! We'll get back to you soon.
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-900 mb-1">
              <User className="w-4 h-4 text-blue-600" />
              Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Your Name"
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none text-gray-600"
            />
          </div>
          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-900 mb-1">
              <Mail className="w-4 h-4 text-blue-600" />
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Your Email"
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none text-gray-600"
            />
          </div>
          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-900 mb-1">
              <MessageSquare className="w-4 h-4 text-blue-600" />
              Message
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              placeholder="Your Message"
              rows="5"
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none text-gray-600 resize-y"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2.5 px-6 rounded-xl font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
          >
            <Send className="w-4 h-4" />
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
};

export default ContactUs;
