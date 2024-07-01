"use client";
import React from 'react';
import { AiFillPhone } from 'react-icons/ai';
import Image from 'next/image';

interface StaffProps {
    imageUrl?: string;
    names: string;
    lastNames: string;
    phone: string;
    schedule?: string;
    position: string;
}

const Staff: React.FC<StaffProps> = ({
    imageUrl,
    names,
    lastNames,
    phone,
    schedule,
    position
}) => {
    return (
        <div className="text-black flex bg-white rounded-xl shadow-md py-6 px-4 mb-4 w-80 border-2 border-[#115DA9]">
            <div className="flex-none w-24 h-24 object-cover">
                <Image
                    src={imageUrl || '/default-profile.jpg'}
                    alt="Profile"
                    width={100}
                    height={100}
                    className='rounded-full'
                />
            </div>
            <div className="flex-grow ml-4">
                <div className="mb-6">
                    <p>
                        <span className="font-bold">Nombre:</span> {names}
                    </p>
                    <p>
                        <span className="font-bold">Apellidos:</span> {lastNames}
                    </p>
                    <p>
                        <span className="font-bold">Cargo:</span> {position}
                    </p>
                    <p>
                        <span className="font-bold">Teléfono:</span> {phone}
                    </p>
                    {schedule && (
                        <p>
                            <span className="font-bold">Horario:</span> {schedule}
                        </p>
                    )}
                </div>
                <button className="flex items-center bg-[#115DA9] text-white py-2 px-4 rounded-md">
                    <AiFillPhone className="mr-2" />
                    Llamar
                </button>
            </div>
        </div>
    );
};

export default Staff;

