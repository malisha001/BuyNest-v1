import React from 'react';
import Title from '../components/Title';
import { assets } from '../assets/assets';
import NewsletterBox from '../components/NewsletterBox';

const About = () => {
  return (
    <div className="bg-gray-50 py-16 px-4 sm:px-10 lg:px-20">
      {/* About Us Section */}
      <div className='text-center text-4xl font-bold pt-10 border-t border-gray-200'>
        <Title text1={'ABOUT'} text2={'FOREVER'} />
      </div>

      {/* About Us Content */}
      <div className='my-10 flex flex-col md:flex-row gap-16'>
        {/* Image Section */}
        <img className='w-full md:max-w-[450px] rounded-lg shadow-md' src={assets.about_img} alt="About Forever" />

        {/* Text Section */}
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
          <p className="leading-relaxed text-lg">
            Forever was born from a passion for innovation and a vision to revolutionize online shopping.
            Our goal is to create a platform where everyone – including those with visual impairments – can enjoy a seamless, accessible, and enjoyable shopping experience.
          </p>
          <p className="leading-relaxed text-lg">
            Our journey started with the belief that shopping should be inclusive for all. We have curated a diverse selection of high-quality products, from fashion and beauty to home essentials. With accessibility as a core focus, our store is designed to help visually impaired customers explore, navigate, and make informed purchases effortlessly.
          </p>
          <b className='text-gray-800 text-xl'>Our Mission</b>
          <p className="leading-relaxed text-lg">
            At Forever, we aim to empower every customer, offering convenience, variety, and inclusivity through accessible features. We believe in the power of choice and work tirelessly to ensure every shopper feels confident and supported.
          </p>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className='text-center text-4xl font-bold py-8'>
        <Title text1={'WHY'} text2={'CHOOSE US'} />
      </div>

      {/* Feature Cards Section */}
      <div className='grid grid-cols-1 md:grid-cols-3 gap-10 mb-20'>
        <div className='border px-10 py-8 flex flex-col gap-5 rounded-lg shadow-lg hover:shadow-xl transition-all'>
          <b className='text-xl text-gray-800'>Accessible Shopping Experience:</b>
          <p className='text-lg text-gray-600'>
            We are committed to accessibility for all. Our website supports voice navigation, screen readers, and real-time assistance for visually impaired customers, ensuring a smooth and inclusive shopping experience.
          </p>
        </div>
        <div className='border px-10 py-8 flex flex-col gap-5 rounded-lg shadow-lg hover:shadow-xl transition-all'>
          <b className='text-xl text-gray-800'>Quality Assurance:</b>
          <p className='text-lg text-gray-600'>
            Every product is carefully selected and reviewed to meet our high standards, ensuring you only receive the best quality products.
          </p>
        </div>
        <div className='border px-10 py-8 flex flex-col gap-5 rounded-lg shadow-lg hover:shadow-xl transition-all'>
          <b className='text-xl text-gray-800'>Inclusive Support and Assistance:</b>
          <p className='text-lg text-gray-600'>
            Our real-time human assistance allows visually impaired customers to connect with helpers for personalized support, helping with product recommendations and navigating the site to complete their purchases.
          </p>
        </div>
      </div>

      {/* Newsletter Box */}
      <NewsletterBox />
    </div>
  );
};

export default About;
