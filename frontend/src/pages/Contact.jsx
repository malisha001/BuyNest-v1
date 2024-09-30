import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsletterBox from '../components/NewsletterBox'

const Contact = () => {
  return (
    <div className="bg-gray-50 py-16 px-4 sm:px-10 lg:px-20">
      {/* Title Section */}
      <div className='text-center text-4xl font-bold pt-10 border-t border-gray-200'>
          <Title text1={'CONTACT'} text2={'US'} />
      </div>

      {/* Contact Information Section */}
      <div className='my-10 flex flex-col justify-center md:flex-row gap-10 mb-28'>
        {/* Image Section */}
        <img className='w-full md:max-w-[480px] rounded-lg shadow-md' src={assets.contact_img} alt="Contact Us" />

        {/* Contact Details Section */}
        <div className='flex flex-col justify-center items-start gap-6'>
          <p className='font-semibold text-2xl text-gray-800'>Our Store</p>
          <p className='text-lg text-gray-600'>
            Forever, 54709 Willms Station <br />
            Suite 350, Malabe, Sri Lanka
          </p>
          <p className='text-lg text-gray-600'>
            Tel: 071-565-587<br />
            Email: admin@sliit.lk
          </p>

          {/* Careers Section */}
          <p className='font-semibold text-2xl text-gray-800 mt-8'>Careers at Forever</p>
          <p className='text-lg text-gray-600'>
            Learn more about joining our team and explore available job opportunities.
          </p>
          <button className='border border-[#124271] text-[#124271] hover:bg-[#124271] hover:text-white px-8 py-3 rounded-full transition-all duration-500'>
            Explore Jobs
          </button>
        </div>
      </div>

      {/* Newsletter Box */}
      <NewsletterBox />
    </div>
  )
}

export default Contact
