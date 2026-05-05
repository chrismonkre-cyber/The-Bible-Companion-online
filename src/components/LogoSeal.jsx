import React from 'react';

const LOGO_URL = 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69a207975202b78c9fed1d29/bb84683c8_generated_image.png';

export default function LogoSeal({ size = 52 }) {
  return (
    <img
      src={LOGO_URL}
      alt="The Bible Companion seal"
      width={size}
      height={size}
      style={{ width: size, height: size, objectFit: 'contain', display: 'block' }}
    />
  );
}