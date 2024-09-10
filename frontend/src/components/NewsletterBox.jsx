import React from 'react'

const NewsletterBox = () => {

    const onSubmitHandler = (event) => {
        event.preventDefault();
    }

  return (
    <div className="my-16 px-4 sm:px-8 md:px-16">
      {/* Title Section (No Background) */}
      <div className="text-center">
        <p className="text-3xl font-semibold text-gray-900">Stay Updated with Our Latest Offers!</p>
        <p className="text-gray-600 mt-3">
          Join our newsletter to receive the latest updates, exclusive offers, and insider deals. Be the first to know!
        </p>
      </div>

      {/* Newsletter Box Section with Gradient Background */}
      <div className="relative py-8 px-6 mt-6 bg-gradient-to-br from-[#f8fafc] via-[#edf2f7] to-[#e2e8f0] rounded-xl shadow-lg text-center">

        {/* Subscription Form */}
        <form onSubmit={onSubmitHandler} className="w-full sm:w-3/4 lg:w-2/4 flex items-center gap-3 mx-auto my-6 border border-gray-300 rounded-lg overflow-hidden pl-3">
          <input 
            className="w-full outline-none p-3 text-gray-700" 
            type="email" 
            placeholder="Enter your email address" 
            required 
          />
          <button type="submit" className="bg-gray-900 hover:bg-gray-800 text-white text-sm px-6 py-3 rounded-lg transition-colors duration-300">
            SUBSCRIBE
          </button>
        </form>

        {/* Disclaimer */}
        <p className="text-xs text-gray-500 mt-3">
          We respect your privacy. Unsubscribe at any time.
        </p>
      </div>
    </div>
  )
}

export default NewsletterBox;
