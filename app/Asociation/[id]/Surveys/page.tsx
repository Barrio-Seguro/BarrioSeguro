"use client"
import React from 'react';
import { Header } from '@/components/Header';
import Poll from '@/components/poll'; // Verifica la ruta correcta si usas alias.
import Link from 'next/link';
import Image from 'next/image';
const SurveysPage = () => {
  return (
    <>
       <div className="items-start">
      <Link href={"/Asociation/"}>
          <Image
            src="/logo2.png"
            alt="Asociation"
            width={200}
            height={20}
          />
      </Link>
      <p className="font-bold text-5xl text-[#115DA9] mt-20">{"Encuestas"}</p>
    
       <div className="flex flex-col mt-10 ">
        <p className=' text-xl mt-20 text-black text-left'>Encuestas Pendientes:</p>
      </div>
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 mt-2">
        <Poll 
          question="¿Quién se robó las PC de la FISI?"
          date="2024-05-20"
          options={["Opción A", "Opción B", "Opción C"]}
        />
        <Poll 
          question="¿En qué invertimos lo del mes de mayo?"
          date="2024-05-15"
          options={["Opción A", "Opción B", "Opción C", "Opción D"]}
        />
        <Poll 
          question="¿Pollada o Anticuchada?"
          date="2024-06-01"
          options={["Pollada", "Anticuchada"]}
        />
        <Poll 
          question="¿Cuándo reunirnos para la próxima asamblea?"
          date="2024-06-10"
          options={["Esta semana", "La próxima semana", "No definido"]}
        />
      </div>
      </div>
    </>
  );
}

export default SurveysPage;
