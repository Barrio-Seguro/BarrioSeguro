"use client"
import { useState } from 'react';
import LoginForm from '@/components/LoginForm';
import RegisterForm from '@/components/RegisterForm';
import CodeGenerator from '@/components/CodeGenerator';
import {Input} from '@nextui-org/input';
import Link from 'next/link';
import { Action } from '@/components/Action';
import { AiOutlineThunderbolt } from "react-icons/ai";
import { GrUserPolice } from "react-icons/gr";
import { HiOutlineWrenchScrewdriver } from "react-icons/hi2";
import { Header } from '@/components/Header';
import Image from 'next/image';
export default function CommunityMeetingsPage() {

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
      <p className="font-bold text-5xl text-[#115DA9] mt-20">{"Juntas Vecinales"}</p>
     <div className="min-h-min flex flex-col items-start justify-center gap-4 mt-2">
     </div>

      <div className="items-start space-y-5">
      <p className=' text-xl mt-20 text-black text-left'>Juntas pendientes:</p>
      <Action text={'Reparación de cableado eléctrico'} icon={AiOutlineThunderbolt}/>
      <Action text={'Renovación del personal de seguridad'} icon={GrUserPolice}/>
      <Action text={'Mantenimiento de las rejas'} icon={HiOutlineWrenchScrewdriver}/>
      </div>
     
      </div>      
    </>

  );
  }