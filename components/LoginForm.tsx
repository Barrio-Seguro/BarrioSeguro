"use client"
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { useState } from "react";
import { useRouter } from 'next/navigation';

export default function LoginForm() {
    const [dni, setDni] = useState("");
    const [contraseña, setContraseña] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();

    const handleLogin = async () => {
        try {
            const dniNumber = parseInt(dni, 10);  // Parsea el DNI a número entero antes de enviarlo
            //guardar el dni en el localstorage como user_dni
            localStorage.setItem('user_dni', dniNumber.toString());
            const headers = new Headers();
            headers.append('accept', 'application/json');
            headers.append('access_token', process.env.NEXT_PUBLIC_BACKEND_API_KEY || ''); // Asegúrate de manejar el caso donde process.env.NEXT_PUBLIC_BACKEND_API_KEY sea undefined
            headers.append('Content-Type', 'application/json'); 

            const response = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + '/vecinos/login', {
                method: 'POST',
                headers: headers,
                body: JSON.stringify({ dni: dniNumber, contraseña: contraseña })
            });

            if (!response.ok) {
                throw new Error('Credenciales inválidas');
            }

            // Si la respuesta es exitosa, puedes manejar la respuesta como sea necesario
            // Por ejemplo, redirigir al usuario a la página de inicio después del login
            router.push('/Actions'); // Cambia la ruta según tu aplicación

        } catch (error) {
            console.error('Error al iniciar sesión:', error);
            setError('Credenciales inválidas'); // Manejo básico del error de credenciales inválidas
        }
    };

    return (
        <>
            <div className="flex w-full flex-wrap gap-6">
                <Input type="text" label="DNI" value={dni} onValueChange={(value) => setDni(value)} />
                <Input type="password" label="Contraseña" value={contraseña} onValueChange={(value) => setContraseña(value)} />
            </div>
            {error && <p className="text-red-500">{error}</p>}
            <Button className="mt-6 px-24 py-6 bg-[#38A911] " onPress={handleLogin}>
                <p className="text-lg">
                    Iniciar Sesion
                </p>
            </Button>
        </>
    );
}
