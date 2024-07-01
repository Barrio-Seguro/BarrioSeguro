"use client";
import React from 'react';
import {Header} from '@/components/Header';
import ElegirTipoVecino from '@/components/ElegirTipoVecino';
import { FaUserFriends, FaUserTie, FaDollarSign, FaShieldAlt } from 'react-icons/fa';

const AddVecino = () => {
  const handleButtonClick = (type: string) => {
    console.log(`Button clicked: ${type}`);
    // Aquí puedes manejar la navegación o cualquier otra acción al hacer clic en el botón
  };

  return (
    <>
      <Header text={'Elija el tipo de Vecino'} />
      <div className="flex flex-wrap justify-center gap-4 mt-4">
        <ElegirTipoVecino
          type="resident"
          label="Residente"
          icon={<FaUserFriends />}
          onClick={handleButtonClick}
        />
        <ElegirTipoVecino
          type="secretary"
          label="Secretario"
          icon={<FaUserTie />}
          onClick={handleButtonClick}
        />
        <ElegirTipoVecino
          type="treasurer"
          label="Tesorero"
          icon={<FaDollarSign />}
          onClick={handleButtonClick}
        />
        <ElegirTipoVecino
          type="security"
          label="Vigilante"
          icon={<FaShieldAlt />}
          onClick={handleButtonClick}
        />
      </div>
    </>
  );
};

export default AddVecino;

