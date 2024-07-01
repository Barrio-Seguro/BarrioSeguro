"use client"
import { useState } from 'react';
import { Input } from '@nextui-org/input';
import { FaPencilAlt } from 'react-icons/fa';
import { FaHome } from "react-icons/fa";
import { TiLocation } from "react-icons/ti";
import Image from 'next/image';
import CodeGenerator from '@/components/CodeGenerator';

export default function GenerateCodePage() {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [district, setDistrict] = useState('');
  const [province, setProvince] = useState('');
  const [creatorName, setCreatorName] = useState('');
  const [editingImage, setEditingImage] = useState(false);

  const handleImageClick = () => {
    setEditingImage(true);
    // Aquí podrías añadir lógica para abrir un modal o un input para subir una nueva imagen
  };

  return (
    <div className="w-96 px-6 flex justify-center flex-col gap-8 w-vs justify-items-center items-center">
      <div className="relative">
        <Image
          src="/asociacion.svg" // Cambia esta ruta a la imagen por defecto o la ruta actual de la imagen de perfil
          alt="Imagen de perfil"
          width={100}
          height={100}
          className="w-52 h-50 rounded-full object-cover"
        />
        <button
          className="w-10 h-10 absolute bottom-2 right-4 bg-blue-700 p-1 rounded-full flex flex-center align-center items-center justify-center text-white hover:bg-blue-800 transition cursor-pointer"
          onClick={handleImageClick}
        >
          <FaPencilAlt size={20}/>
        </button>
      </div>
      <Input
        type="text"
        label="Nombre de la Asociación"
        value={name}
        onValueChange={setName}
        className='w-full'
        startContent={
          <FaHome className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
        }
      />
      <Input
        type="text"
        label="Dirección"
        value={address}
        onValueChange={setAddress}
        startContent={
          <TiLocation className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
        }
        className='w-full'
      />
      <Input
        type="text"
        label="Distrito"
        value={district}
        onValueChange={setDistrict}
        className='w-full'
      />
      <Input
        type="text"
        label="Provincia"
        value={province}
        onValueChange={setProvince}
        className='w-full'
      />
      <Input
        type="text"
        label="Nombre del Creador"
        value={creatorName}
        onValueChange={setCreatorName}
        className='w-full'
      />
      {name && district && province && creatorName ? (
        <CodeGenerator
          associationName={name}
          district={district}
          province={province}
          creatorName={creatorName}
        />
      ) : null}
    </div>
  );
}
