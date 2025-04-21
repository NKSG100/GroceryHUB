import React from "react";

const Contact = () => {
  return (
    <div className="min-h-screen bg-white px-4 py-12 flex flex-col items-center justify-center">
      <div className="max-w-5xl w-full space-y-16">
        {/* About Us Section */}
        <section className="p-8 bg-indigo-50 rounded-2xl shadow-md border border-indigo-100">
          <h2 className="text-4xl font-bold text-indigo-400 mb-6 text-center">
            About GroceryHUB
          </h2>
          <p className="text-gray-700 text-lg leading-relaxed text-center max-w-3xl mx-auto">
            Welcome to{" "}
            <span className="font-semibold text-indigo-400">GroceryHUB</span> –
            your one-stop destination for fresh fruits, vegetables, and daily
            essentials delivered straight to your doorstep! 🌽🥦🍎
            <br />
            <br />
            We are committed to bringing you the freshest produce, sourced
            directly from farms and local vendors, so you spend less time
            shopping and more time living. With a user-friendly interface,
            lightning-fast delivery, and unbeatable prices — GroceryHUB is here
            to revolutionize how you shop for groceries.
            <br />
            <br />
            Trusted by hundreds, loved by many – GroceryHUB is not just a store,
            it’s your reliable grocery partner.
          </p>
        </section>

        {/* Contact Us Section */}
        <section className="p-8 bg-indigo-50 rounded-2xl shadow-md border border-indigo-100">
          <h2 className="text-4xl font-bold text-indigo-400 mb-4 text-center">
            Contact Us
          </h2>
          <p className="text-gray-600 text-center mb-8">
            Have any questions, suggestions, or feedback? We'd love to hear from
            you!
          </p>

          <form className="space-y-6">
            <div className="flex flex-col md:flex-row md:space-x-4">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full border border-gray-300 bg-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                required
              />
              <input
                type="email"
                placeholder="Your Email"
                className="w-full border border-gray-300 rounded-lg bg-white px-4 py-3 mt-4 md:mt-0 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                required
              />
            </div>

            <input
              type="text"
              placeholder="Subject"
              className="w-full border border-gray-300 rounded-lg bg-white px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />

            <textarea
              placeholder="Your Message"
              rows="5"
              className="w-full border border-gray-300 rounded-lg bg-white px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              required
            ></textarea>

            <button
              type="submit"
              className="w-full bg-indigo-400 hover:bg-indigo-500 text-white font-semibold py-3 rounded-lg transition duration-300"
            >
              Send Message
            </button>
          </form>

          <div className="mt-12 grid md:grid-cols-3 gap-6 text-center">
            {/* Email Card */}
            <div className="bg-white border-2 border-indigo-200 w-70 h-30 rounded-2xl shadow-xl p-2 hover:shadow-2xl transition duration-300 relative overflow-hidden">
              <div className="absolute inset-0 bg-indigo-100 opacity-10 rounded-2xl blur-lg"></div>
              <div className="relative z-10 flex flex-col items-center">
                <svg
                  className="w-5 h-5 text-indigo-400 mb-3"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8m-18 8h18a2 2 0 002-2V6a2 2 0 00-2-2H3a2 2 0 00-2 2v8a2 2 0 002 2z"
                  />
                </svg>
                <h4 className="text-lg font-semibold text-gray-700">Email</h4>
                <a
                  href="mailto:groceryhub.support@gmail.com"
                  className="text-indigo-500 hover:underline mt-1 break-words"
                >
                  nksnamannks@gmail.com
                </a>
              </div>
            </div>

            {/* Location Card */}
            <div className="bg-white border-2 border-indigo-200 rounded-2xl w-70 h-30 shadow-xl p-2 hover:shadow-2xl transition duration-300 relative overflow-hidden">
              <div className="absolute inset-0 bg-indigo-100 opacity-10 rounded-2xl blur-lg"></div>
              <div className="relative z-10 flex flex-col items-center">
                <svg
                  className="mt-1 w-5 h-5 text-indigo-400 mb-3"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 11c1.657 0 3-1.343 3-3S13.657 5 12 5 9 6.343 9 8s1.343 3 3 3z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 8c0 7.5-7.5 13.5-7.5 13.5S4.5 15.5 4.5 8A7.5 7.5 0 0112 0a7.5 7.5 0 017.5 8z"
                  />
                </svg>
                <h4 className="text-lg font-semibold text-gray-700">
                  Location
                </h4>
                <p className="text-gray-600 mt-1">
                  Uttar Pradesh - India
                </p>
              </div>
            </div>

            {/* Phone Card */}
            <div className="bg-white border-2 border-indigo-200 rounded-2xl w-70 h-30 shadow-xl p-2 hover:shadow-2xl transition duration-300 relative overflow-hidden">
              <div className="absolute inset-0 bg-indigo-100 opacity-10 rounded-2xl blur-lg"></div>
              <div className="relative z-10 flex flex-col items-center">
                <svg
                  className="w-5 h-5 text-indigo-400 mb-3"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2 3.5A2.5 2.5 0 014.5 1h3A2.5 2.5 0 0110 3.5v.9a2.5 2.5 0 01-1.528 2.307L7.056 7.45a16.014 16.014 0 006.492 6.493l.744-1.417A2.5 2.5 0 0116.6 11h.9A2.5 2.5 0 0120 13.5v3A2.5 2.5 0 0117.5 19c-8.008 0-14.5-6.492-14.5-14.5z"
                  />
                </svg>
                <h4 className="text-lg font-semibold text-gray-700">Phone</h4>
                <p className="text-gray-600 mt-1">+91-7983293372</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Contact;
