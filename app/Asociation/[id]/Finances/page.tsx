"use client"

import { Header } from '@/components/Header';
import { Advertisement } from '@/components/Advertisement';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';

interface Gasto {
  id_gasto: number,
  fecha_gasto: string,
  tit_gasto: string,
  monto_gastado: number,
  id_asociacion: string
}

export default function FinancesPage() {

  const [gastos, setGastos] = useState<Gasto[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGastos = async () => {
      try {
        const headers = new Headers();
        headers.append('accept', 'application/json');
        headers.append('access_token', process.env.NEXT_PUBLIC_BACKEND_API_KEY || '');
        headers.append('ngrok-skip-browser-warning', 'true'); // Agregar el encabezado para evitar la advertencia

        const response = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + '/gasto', {
          method: 'GET',
          headers: headers,
        });

        if (!response.ok) {
          throw new Error('Error al obtener los gastos');
        }

        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
          console.log('Response content-type:', contentType);
          throw new Error('La respuesta del servidor no es JSON');
        }

        const data = await response.json();

        console.log('Received data:', data);

        if (!Array.isArray(data)) {
          throw new Error('La respuesta del servidor no es una lista');
        }

        setGastos(data);

      } catch (error) {
        console.error('Error al obtener los gastos:', error);
        setError('Error al obtener los gastos');
      }
    };

    fetchGastos();
  }, []);

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
        <p className="font-bold text-5xl text-[#115DA9] mt-20">{"Finanzas"}</p>

        <div className="flex flex-col mt-10 gap-5">
          {error ? (
            <p className="text-red-500">Error: {error}</p>
          ) : (
            gastos.map((gasto) => (
              <div key={gasto.id_gasto} className="border-2 border-black p-5 rounded-2xl space-y-5">
                <Advertisement
                  type='Anuncio'
                  date={gasto.fecha_gasto}
                  title={gasto.tit_gasto}
                  description={`Monto Gastado: ${gasto.monto_gastado}`}
                  buttonText='Descargar Boleta'
                />
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}
