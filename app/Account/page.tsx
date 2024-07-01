"use client"
import Image from "next/image";
import Link from "next/link";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { useState, useEffect } from "react";

export default function UserPage() {
    const [userData, setUserData] = useState<any>({
        dni: "",
        names: "",
        lastNames: "",
        address: "",
        email: ""
    });

    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const user_dni = localStorage.getItem('user_dni');
        if (user_dni) {
            fetchUserData(user_dni);
        } else {
            setIsLoading(false);
        }
    }, []);

    const fetchUserData = async (user_dni: string) => {
        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/vecinos/${user_dni}`,
                {
                    headers: {
                        accept: "application/json",
                        access_token: process.env.NEXT_PUBLIC_BACKEND_API_KEY || "",
                    }
                }
            );
            if (!response.ok) {
                throw new Error("Failed to fetch user data.");
            }
            const userData = await response.json();
            setUserData({
                dni: userData.dni,
                names: userData.nombre,
                lastNames: userData.apellido,
                address: userData.direccion,
                email: userData.correo
            });
        } catch (error) {
            setError("Error al obtener los datos del usuario.");
        } finally {
            setIsLoading(false);
        }
    };

    const isDNIInvalid = userData.dni.length !== 8;
    const isEmailInvalid = !userData.email.includes("@");

    const handleSave = () => {
        // Aquí podrías implementar la lógica para actualizar los datos del usuario en la API si es necesario
        alert("Datos actualizados correctamente.");
    };

    if (isLoading) {
        return <p>Cargando...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div className=" ">
            <div className="flex justify-between flex-col">


                <div className="flex justify-center align-center items-center mt-20">
                    <Image
                        src="/perfil2.png"
                        alt="Asociation"
                        width={150}
                        height={160}
                    />

                    <div className="flex flex-col ml-6">
                        <p className="text-2xl font-bold text-[#115DA9]"> Perfil del usuario</p>
                        <p className="text-start font-semibold ml-2 text-black">
                            {userData.names} {userData.lastNames}
                        </p>
                    </div>
                </div>
            </div>
            <div className="flex w-full flex-wrap gap-6 mt-16">
                <Input
                    type="text"
                    label="Nombres"
                    value={userData.names}
                    onValueChange={(value) =>
                        setUserData((prevState: any) => ({
                            ...prevState,
                            names: value
                        }))
                    }
                />
                <Input
                    type="text"
                    label="Apellidos"
                    value={userData.lastNames}
                    onValueChange={(value) =>
                        setUserData((prevState: any) => ({
                            ...prevState,
                            lastNames: value
                        }))
                    }
                />
                <Input
                    type="text"
                    label="DNI"
                    value={userData.dni}
                    onValueChange={(value) =>
                        setUserData((prevState: any) => ({
                            ...prevState,
                            dni: value
                        }))
                    }
                />
                <Input
                    type="text"
                    label="Dirección"
                    value={userData.address}
                    onValueChange={(value) =>
                        setUserData((prevState: any) => ({
                            ...prevState,
                            address: value
                        }))
                    }
                />
                <Input
                    type="email"
                    label="Email"
                    value={userData.email}
                    isInvalid={isEmailInvalid}
                    errorMessage={isEmailInvalid && "Por favor ingrese un email válido"}
                    onValueChange={(value) =>
                        setUserData((prevState: any) => ({
                            ...prevState,
                            email: value
                        }))
                    }
                />
            </div>
            <Button color="success" className="mt-12 mb-2 px-24 py-6" onPress={handleSave}>
                <p className="text-lg">Guardar</p>
            </Button>
        </div>
    );
}
