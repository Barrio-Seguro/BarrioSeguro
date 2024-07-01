// src/components/NavigationBar.tsx
'use client'; // Asegúrate de incluir esta línea si estás utilizando Next.js

import React from 'react';
import { FaBell, FaUserCircle } from 'react-icons/fa';
import Link from 'next/link';

const NavigationBar: React.FC = () => {
  return (
    <nav className="bg-blue-500 p-4 flex justify-between items-center">
      <div className="text-white text-lg font-bold">
        <Link href="/">
          <a>BarrioSeguro</a>
        </Link>
      </div>
      <div className="flex items-center space-x-4">
        <Link href="/notifications">
          <a className="text-white">
            <FaBell size={24} />
          </a>
        </Link>
        <Link href="/profile">
          <a className="text-white">
            <FaUserCircle size={24} />
          </a>
        </Link>
      </div>
    </nav>
  );
};

export default NavigationBar;
