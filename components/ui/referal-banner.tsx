'use client';

import React, { useState } from 'react';
import Image from 'next/image';

const ReferralBanner: React.FC = () => {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    
    <div
      className="w-full max-w-[1400px] min-h-[50px] flex flex-wrap sm:flex-nowrap items-center justify-between px-6 py-3 rounded-md shadow-md mx-auto gap-3"
      style={{
        backgroundImage:
          'linear-gradient(90deg, #F6F6F6 0%, #FFFFFF 34.13%, #ACF9FE 68.23%, #9AC2FE 72.39%, #F6C9FF 78.36%, #FFFFFF 95.19%, #F9F9F9 100%)',
      }}
    >
      {/* Left Section */}
      <div className="flex items-start sm:items-center gap-4 text-sm text-[#1A1A1A] min-w-0">
        <Image
          src="/logo-gold.png"
          alt="Karosauda Logo"
          width={24}
          height={24}
        />
        <div className="leading-tight">
          <p className="font-semibold">Karosauda Referral Program</p>
          <p className="font-light">
            Get assured rewards on every 5 referrals – offer available till{' '}
            <span className="font-semibold">Jun, 2025</span>
          </p>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4 shrink-0">
        <a
          href="#"
          className="text-sm text-[#025AE0] font-medium whitespace-nowrap"
        >
          Refer and Earn →
        </a>

        <button
          onClick={() => setVisible(false)}
          className="w-5 h-5 p-0 flex items-center justify-center"
          aria-label="Close"
        >
          <Image
            src="/close-icon.png"
            alt="Close"
            width={20}
            height={20}
          />
        </button>
      </div>
    </div>
  );
};

export default ReferralBanner;
