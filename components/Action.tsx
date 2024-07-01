"use client";
import { ReactNode, useEffect } from 'react';
import { Button } from "@nextui-org/button";
import { IconType } from 'react-icons';

interface ActionProps {
  icon?: IconType;
  text: string;
}

export const Action: React.FC<ActionProps> = ({ icon: Icon, text }) => {
  useEffect(() => {
    document.body.style.margin = '0';
    document.body.style.padding = '0';
  }, []);

  return (
    <>
      <style jsx global>{`
        body {
          margin: 0;
          padding: 0;
        }
      `}</style>
      <div className="text-black flex items-center justify-between bg-[#B4D9FE] rounded-lg border border-black p-4 h-32 hover:bg-[#60A5FA] cursor-pointer transition shadow-lg">
        {/* Sección izquierda con el icono */}
        <div className="flex w-1/4 items-center justify-center">
          {Icon && <Icon className="w-10 h-10" />}
        </div>
        {/* Raya vertical */}
        <div className="border-l border-black h-full mx-4"/>
        {/* Sección derecha con el texto y la flecha */}
        <div className="flex items-center w-3/4">
          <p className="mr-2 font-semibold">{text}</p>
          <svg className="w-1/4 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </>
  );
};
