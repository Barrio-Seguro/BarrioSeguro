"use client";
import { Asociation } from '@/components/Asociation';
import { useEffect } from 'react';

export default function AsociationPage({ params }: any) {
  const { id } = params;

  useEffect(() => {
    // Verificar que id no esté vacío o undefined antes de guardarlo
    if (id) {
      localStorage.setItem('associationId', id);
    }
  }, [id]);

  return (
    <div className=" ">
      <Asociation id={id} />
    </div>
  );
}
