import { FaEnvelope, FaMapMarkerAlt, FaPhoneAlt } from 'react-icons/fa'; // Icons for contact info

const ContactPage = () => {
  return (
    <div className="relative isolate px-6 pt-14 lg:px-8" style={{
        background: "linear-gradient(to right, white, #b3d7f8 50%, white)",
      }}>
      {/* Hero Section */}
      <div className="relative isolate px-6 pt-14 lg:px-8" style={{
      background: "linear-gradient(to right, white, #b3d7f8 50%, white)",
    }}>
        <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl md:text-6xl">
              Contact Us
            </h1>
            <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
              We would love to hear from you. Get in touch with us for any inquiries, feedback, or support.
            </p>
          </div>
        </div>
      </div>

      {/* Contact Form */}
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="bg-white shadow-xl rounded-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900">Send Us a Message</h2>
          <form className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                Your Message
              </label>
              <textarea
                id="message"
                name="message"
                rows="4"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div className="sm:col-span-2 text-center">
              <button
                type="submit"
                className="inline-flex items-center justify-center px-6 py-3 mt-4 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Contact Information */}
      <div className="bg-gray-100 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900">Contact Information</h2>
            <p className="mt-4 text-lg text-gray-500">
              If you prefer to contact us directly, here are the ways to reach us:
            </p>
          </div>
          <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-3">
            {/* Email */}
            <div className="text-center">
              <FaEnvelope className="w-12 h-12 text-blue-600 mx-auto" />
              <h3 className="mt-4 text-lg font-medium text-gray-900">Email</h3>
              <p className="mt-2 text-gray-600">support@example.com</p>
            </div>
            {/* Phone */}
            <div className="text-center">
              <FaPhoneAlt className="w-12 h-12 text-blue-600 mx-auto" />
              <h3 className="mt-4 text-lg font-medium text-gray-900">Phone</h3>
              <p className="mt-2 text-gray-600">+1 (800) 123-4567</p>
            </div>
            {/* Location */}
            <div className="text-center">
              <FaMapMarkerAlt className="w-12 h-12 text-blue-600 mx-auto" />
              <h3 className="mt-4 text-lg font-medium text-gray-900">Our Location</h3>
              <p className="mt-2 text-gray-600">123 AI Street, City, Country</p>
            </div>
          </div>
        </div>
      </div>

      {/* Map Section (Optional - You can integrate Google Maps here) */}
      <div className="mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 text-center">Find Us on the Map</h2>
          <div className="mt-6 h-64 bg-gray-200 rounded-md">
            {/* Example: Placeholder for Google Maps iframe */}
            <iframe
              className="w-full h-full rounded-md"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3105.0577855284025!2d-77.0368704!3d38.9071903!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89b7b7e2a06cd239%3A0x1d960bdbfb08d2c1!2sThe%20White%20House!5e0!3m2!1sen!2sus!4v1615182135695!5m2!1sen!2sus"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
