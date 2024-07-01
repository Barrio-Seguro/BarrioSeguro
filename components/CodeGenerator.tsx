import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@nextui-org/button';

interface CodeGeneratorProps {
  associationName: string;
  district: string;
  province: string;
  creatorName: string;
}

const CodeGenerator: React.FC<CodeGeneratorProps> = ({
  associationName,
  district,
  province,
  creatorName,
}) => {
  const [generatedCode, setGeneratedCode] = useState('');
  const [buttonText, setButtonText] = useState('Generar Código');
  const router = useRouter();
  

  const generateCode = async () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
    let code = '';
    let numCount = 0; // Contador de números generados
    for (let i = 0; i < 6; i++) {
      // Genera un índice aleatorio
      const randomIndex = Math.floor(Math.random() * characters.length);
      // Obtiene el carácter correspondiente al índice
      const char = characters.charAt(randomIndex);
      // Si el carácter es un número, aumenta el contador
      if ('0123456789'.includes(char)) {
        numCount++;
      }
      // Agrega el carácter al código generado
      code += char;
    }
    // Si el contador de números generados es menor que 3, llama a la función de nuevo para generar un nuevo código
    if (numCount < 3) {
      generateCode();
    } else {
      // Si se generan al menos 3 números, establece el código generado y actualiza el texto del botón
      setGeneratedCode(code);
      setButtonText('Ir a la asociación');

      // Envía los datos al backend
      try {
        const headers = new Headers();
        headers.append('accept', 'application/json');
        headers.append('access_token', process.env.NEXT_PUBLIC_BACKEND_API_KEY || ''); // Asegúrate de manejar el caso donde process.env.NEXT_PUBLIC_BACKEND_API_KEY sea undefined
        headers.append('Content-Type', 'application/json');
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/asociaciones/`, {
          method: 'POST',
          headers: headers,
          body: JSON.stringify({
            id_asociacion: code,
            nombre: associationName,
            distrito: district,
            provincia: province,
            est_plus: '', // No proporcionado en el formulario actual
            membresia: 0, // No proporcionado en el formulario actual
            nombre_creador: creatorName
          })
        });

        if (!response.ok) {
          throw new Error('Error al enviar los datos');

        }
      } catch (error) {
        console.error('Error al enviar los datos:', error);
        // Manejar el error, por ejemplo, mostrar un mensaje de error al usuario
        setButtonText('Error al crear la asociación'); // Restaura el texto del botón en caso de error
      }
    }
  };

  const handleButtonClick = () => {
    if (!generatedCode) {
      generateCode();
    } else {
      router.push(`/Asociation/${generatedCode}`);
    }
  };

  const buttonColor = generatedCode ? 'secondary' : 'success'; // Cambia el color del botón si se ha generado el código

  return (
    <div>
      <Button
        color={buttonColor}
        onClick={handleButtonClick}
        className='w-80 h-12 mt-12'
      >
        {buttonText}
      </Button>
      {generatedCode && (
        <>
          <p className='mt-4'>Comparte este código con tus vecinos para que se unan:</p>
          <div className="mx-6 my-6 mt-4 rounded-lg bg-slate-900 h-36 w-96 flex justify-center items-center justify-items-center mt-4">
            <p className="text-white text-6xl">{generatedCode}</p>
          </div>
        </>
      )}
    </div>
  );
};

export default CodeGenerator;
