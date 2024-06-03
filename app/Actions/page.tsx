"use client"
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Action } from '@/components/Action';
import { BsHouses } from "react-icons/bs";
import { BsHouseUp } from "react-icons/bs";
import Link from 'next/link';

export default function ActionPage() {
  const router = useRouter();

  useEffect(() => {
    const storedCodes = localStorage.getItem('associationCodes');
    if (storedCodes) {
      const associationCodes = JSON.parse(storedCodes);
      const associationCode = Object.values(associationCodes)[0];
      if (associationCode) {
        router.push(`/Asociation/${associationCode}`);
      }
    }
  }, [router]);

  return (
    <div className="flex justify-center flex-col gap-12">
      <p className='font-bold text-2xl mb-16'>¿Qué acción desea realizar?</p>
      <Link href="/GenerateCode">
        <Action text={'Crear una asociación de viviendas'} icon={BsHouses} />
      </Link>
      <Link href={"/InsertCode"}>
        <Action text={'Ingresar como vecino de una asociación de viviendas'} icon={BsHouseUp} />
      </Link>
    </div>
  );
}
