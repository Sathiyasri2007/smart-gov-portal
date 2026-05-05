import React from 'react';
import { FiMail, FiPhone, FiMapPin } from 'react-icons/fi';

const Footer = () => {
  return (
    <footer className="bg-primary text-white mt-12" style={{ color: 'white' }}>
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-4" style={{ color: 'white' }}>Smart Government Portal</h3>
            <p style={{ color: 'white' }}>Empowering citizens through accessible government schemes</p>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-4" style={{ color: 'white' }}>Quick Links</h3>
            <ul className="space-y-2" style={{ color: 'white' }}>
              <li className="hover:text-blue-grey-200 transition cursor-pointer">About Us</li>
              <li className="hover:text-blue-grey-200 transition cursor-pointer">Contact</li>
              <li className="hover:text-blue-grey-200 transition cursor-pointer">Privacy Policy</li>
              <li className="hover:text-blue-grey-200 transition cursor-pointer">Terms of Service</li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-4" style={{ color: 'white' }}>Contact</h3>
            <div className="space-y-2" style={{ color: 'white' }}>
              <div className="flex items-center hover:text-blue-grey-200 transition"><FiMail className="mr-2" /> info@smartgov.in</div>
              <div className="flex items-center hover:text-blue-grey-200 transition"><FiPhone className="mr-2" /> 1800-XXX-XXXX</div>
              <div className="flex items-center hover:text-blue-grey-200 transition"><FiMapPin className="mr-2" /> New Delhi, India</div>
            </div>
          </div>
        </div>
        <div className="border-t border-blue-grey-600 mt-8 pt-6 text-center" style={{ color: 'white' }}>
          © 2026 Smart Government Scheme Portal. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
