// src/app/page.tsx

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import NET from 'vanta/dist/vanta.net.min';
import { ChakraProvider } from '@chakra-ui/react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Dashboard from '../components/Dashboard';
import theme from '../styles/theme';

const Home: React.FC = () => {
  const vantaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Ensure THREE is defined on the window object
    if (typeof window !== 'undefined') {
      (window as any).THREE = THREE;
    }

    let vantaEffect: any;
    if (vantaRef.current) {
      vantaEffect = NET({
        el: vantaRef.current,
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200.00,
        minWidth: 200.00,
        scale: 1.00,
        scaleMobile: 1.00,
        color: 0x3498db,
        backgroundColor: 0xffffff,
        points: 10.00,
        maxDistance: 25.00,
        spacing: 17.00,
        THREE: (window as any).THREE,
      });
    }

    if (localStorage.getItem('darkMode') === 'enabled') {
      document.documentElement.classList.add('dark');
    }

    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, []);

  return (
    <ChakraProvider theme={theme}>
      <div ref={vantaRef} className="fixed top-0 left-0 w-full h-full -z-10"></div>
      <Header />
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <h1 className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-8">CryptoQuest LP Arbitrage Bot</h1>
          <Dashboard />
        </div>
      </main>
      <Footer />
    </ChakraProvider>
  );
};

export default Home;
