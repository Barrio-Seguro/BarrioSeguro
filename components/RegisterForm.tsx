"use client"
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { useMemo, useState } from "react";
import { useRouter } from 'next/navigation';

export default function RegisterForm() {
    const [formData, setFormData] = useState({
        email: "",
        nombres: "",
        apellidos: "",
        dni: "",
        direccion: "",
        password: "",
        confirmPassword: "",
        num_celular: "",
        genero: ""
    });

    const router = useRouter();

    const validateEmail = (value: string) => value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i);
    const validateDNI = (value: string) => value.length === 8 && !isNaN(parseInt(value));
    const validatePasswordMatch = (password: string, confirmPassword: string) => password === confirmPassword;

    const isEmailInvalid = useMemo(() => {
        if (formData.email === "") return false;
        return validateEmail(formData.email) ? false : true;
    }, [formData.email]);

    const isDNIInvalid = useMemo(() => {
        if (formData.dni === "") return false;
        return validateDNI(formData.dni) ? false : true;
    }, [formData.dni]);

    const isPasswordMatchInvalid = useMemo(() => {
        if (formData.password === "" || formData.confirmPassword === "") return false;
        return validatePasswordMatch(formData.password, formData.confirmPassword) ? false : true;
    }, [formData.password, formData.confirmPassword]);

    const handleCreateAccount = async () => {
        try {
            const headers = new Headers();
            headers.append('accept', 'application/json');
            headers.append('access_token', process.env.NEXT_PUBLIC_BACKEND_API_KEY || ''); // Asegúrate de manejar el caso donde process.env.NEXT_PUBLIC_BACKEND_API_KEY sea undefined
            headers.append('Content-Type', 'application/json');
            
            const response = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + '/vecinos', {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                throw new Error('Error al registrar');
            }

            // Redirigir a otra página después del registro exitoso
            router.push('/registro-completado'); // Cambia la ruta según tu aplicación

        } catch (error) {
            console.error('Error al registrar:', error);
            // Aquí puedes manejar el error, como mostrar un mensaje al usuario
        }
    };

    return (
        <>
            <div className="flex w-full flex-wrap gap-6">
                <Input type="text" label="Nombres" value={formData.nombres} onValueChange={(value) => setFormData({ ...formData, nombres: value })} />
                <Input type="text" label="Apellidos" value={formData.apellidos} onValueChange={(value) => setFormData({ ...formData, apellidos: value })} />
                <Input type="text" label="DNI" value={formData.dni} isInvalid={isDNIInvalid} errorMessage={isDNIInvalid && "Ingrese un DNI válido"} onValueChange={(value) => setFormData({ ...formData, dni: value })} />
                <Input type="text" label="Dirección" value={formData.direccion} onValueChange={(value) => setFormData({ ...formData, direccion: value })} />
                <Input type="email" label="Email" value={formData.email} isInvalid={isEmailInvalid} errorMessage={isEmailInvalid && "Ingrese un correo válido"} onValueChange={(value) => setFormData({ ...formData, email: value })} />
                <Input type="password" label="Contraseña" value={formData.password} onValueChange={(value) => setFormData({ ...formData, password: value })} />
                <Input type="password" label="Confirmar Contraseña" value={formData.confirmPassword} isInvalid={isPasswordMatchInvalid} errorMessage={isPasswordMatchInvalid && "Las contraseñas no coinciden"} onValueChange={(value) => setFormData({ ...formData, confirmPassword: value })} />
                <Input type="text" label="Número de Celular" value={formData.num_celular} onValueChange={(value) => setFormData({ ...formData, num_celular: value })} />
                <Input type="text" label="Género" value={formData.genero} onValueChange={(value) => setFormData({ ...formData, genero: value })} />
            </div>
            <Button className="mt-12 mb-2 px-24 py-6 bg-[#38A911]" onPress={handleCreateAccount}>
                <p className="text-lg">
                    Crear Cuenta
                </p>
            </Button>
        </>
    );
}
