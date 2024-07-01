"use client"
import { useEffect, useState } from 'react';
import { Header } from '@/components/Header';
import Staff from '@/components/Staff';
import ModificarButton from '@/components/ModificarButtons';

// Definición de la interfaz para el tipo de datos de vecinos
interface Vecino {
  dni: number;
  nombre: string;
  apellido: string;
  direccion: string;
  genero: string;
  clas_vecino: string;
  id_asociacion: string;
  num_celular: string;
  correo: string;
  contraseña: string;
}

export default function SecurityPage() {
  //conjunto de vecinos
  const [vecinos, setVecinos] = useState<Vecino[]>([]);

  useEffect(() => {
    const fetchVecinos = async () => {
      try {
        const headers = new Headers();
        headers.append('accept', 'application/json');
        headers.append('access_token', process.env.NEXT_PUBLIC_BACKEND_API_KEY || ''); // Asegúrate de manejar el caso donde process.env.NEXT_PUBLIC_BACKEND_API_KEY sea undefined
        headers.append('Content-Type', 'application/json');
        headers.append('ngrok-skip-browser-warning', 'true'); // Agregar el encabezado para evitar la advertencia
  
        const response = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + '/vecinos', {
          method: 'GET',
          headers: headers,
        });
  
        if (!response.ok) {
          throw new Error('Error al obtener los vecinos');
        }
  
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
          const data = await response.json();
  
          // Verificar si la data recibida tiene el formato esperado
          if (!Array.isArray(data)) {
            throw new Error('La respuesta del servidor no es una lista');
          }
  
          // Verificar el formato de cada elemento en la lista
          data.forEach((vecino: any) => {
            if (!isValidVecino(vecino)) {
              throw new Error(`El vecino recibido no tiene el formato esperado: ${JSON.stringify(vecino)}`);
            }
          });
  
          setVecinos(data); // Asignamos los vecinos obtenidos del backend al estado local
        } else {
          const text = await response.text();
          console.error('Respuesta no JSON:', text);
          throw new Error('El servidor no devolvió JSON');
        }
      } catch (error) {
        console.error('Error al obtener los vecinos:', error);
        // Puedes manejar el error aquí, por ejemplo, mostrando un mensaje al usuario
      }
    };
  
    fetchVecinos();
  }, []);
  
  
  // Función para validar si un objeto tiene el formato de Vecino esperado
  const isValidVecino = (vecino: any): vecino is Vecino => {
    return (
      typeof vecino.dni === 'number' &&
      typeof vecino.nombre === 'string' &&
      typeof vecino.apellido === 'string' &&
      typeof vecino.direccion === 'string' &&
      typeof vecino.genero === 'string' &&
      typeof vecino.clas_vecino === 'string' &&
      typeof vecino.id_asociacion === 'string' &&
      typeof vecino.num_celular === 'string' &&
      typeof vecino.correo === 'string' &&
      typeof vecino.contraseña === 'string'
    );
  };

  return (
    <>
      <Header text={'Lista de Vecinos'} />
      <div className="flex justify-center flex-col gap-12">
        {vecinos.map((vecino, index) => (
          <Staff
            key={index}
            names={vecino.nombre}
            lastNames={vecino.apellido}
            phone={vecino.num_celular}
            position={vecino.clas_vecino} // Usando clas_vecino como posición, ajusta según necesites
          />
        ))}
      </div>
      <ModificarButton />
    </>
  );
}
