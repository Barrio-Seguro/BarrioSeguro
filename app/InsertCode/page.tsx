"use client"
import { useState } from 'react';
import { Input } from '@nextui-org/input';
import { Button } from '@nextui-org/button';
import { useRouter } from 'next/navigation';

export default function InsertCodePage() {
  const [code, setCode] = useState('');
  const router = useRouter();

  const handleJoin = async () => {
    try {

      const headers = new Headers();
      headers.append('accept', 'application/json');
      headers.append('access_token', process.env.NEXT_PUBLIC_BACKEND_API_KEY || ''); // Asegúrate de manejar el caso donde process.env.NEXT_PUBLIC_BACKEND_API_KEY sea undefined
      headers.append('Content-Type', 'application/json');
      headers.append('ngrok-skip-browser-warning', 'true'); // Agregar el encabezado para evitar la advertencia

      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/asociaciones`, {
        method: 'GET',
        headers: headers,
      });
      
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      const association = data.find((assoc: { id_asociacion: string; }) => assoc.id_asociacion === code);
      console.log(data)

      if (association) {
        router.push(`/Asociation/${code}`);
      } else {
        alert("Código de invitación no válido.");
      }
    } catch (error) {
      console.error('Error fetching associations:', error);
      alert("Error al verificar el código de invitación. Por favor, inténtelo de nuevo más tarde.");
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen gap-8">
      <div className="flex flex-col items-center w-full max-w-md p-4 bg-white rounded-xl shadow-md ">
        <p className='font-bold text-3xl text-[#115DA9]'>Ingrese su código</p>
        <Input type="text" label="Código de invitación" value={code} onChange={e => setCode(e.target.value)} className='w-full mt-4'/>
        <Button
          color='success'
          className="mt-4"
          onPress={handleJoin}
        >
          Unirse
        </Button>
      </div>

      <div className="flex flex-col items-center w-full max-w-md p-4 bg-white shadow-md rounded-xl">
        <p className="font-bold mt-2 text-[#115DA9]">*utilice el código brindado por su director de su asociación</p>
      </div>
    </div>
  );
}
