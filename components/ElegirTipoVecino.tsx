// src/components/ElegirTipoVecino.tsx
'use client';  // Añadir esta línea

import React from 'react';

interface ElegirTipoVecinoProps {
  type: string;
  label: string;
  icon: React.ReactNode;
  onClick: (type: string) => void;
}

const ElegirTipoVecino: React.FC<ElegirTipoVecinoProps> = ({ type, label, icon, onClick }) => {
  return (
    <button
      onClick={() => onClick(type)}
      className="p-4 bg-green-500 text-white rounded-lg shadow-md flex flex-col items-center justify-center hover:bg-green-600"
    >
      {icon}
      <span>{label}</span>
    </button>
  );
};

export default ElegirTipoVecino;
