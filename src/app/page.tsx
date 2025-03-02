// src/app/page.tsx
'use client';

import React, { useEffect, useState } from 'react';
import MobileHome from '@/components/device/mobile/MobileHome';
import DesktopHome from '@/components/device/desktop/DesktopHome'; // Your existing home component

export default function Home() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check initial screen size
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768); // 768px is standard tablet breakpoint
    };

    // Check on mount
    checkMobile();

    // Add resize listener
    window.addEventListener('resize', checkMobile);

    // Cleanup
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <>
      {isMobile ? <MobileHome /> : <DesktopHome />}
    </>
  );
}