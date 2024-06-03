"use client"
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import LoginForm from '@/components/LoginForm';
import RegisterForm from '@/components/RegisterForm';
import Image from 'next/image';
import Link from 'next/link';

export default function AuthPage() {
  const [selectedOption, setSelectedOption] = useState<'login' | 'register'>('login');
  const router = useRouter();

  useEffect(() => {
    const storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
      router.push('/Actions');
    }
  }, [router]);

  const handleOptionChange = (option: 'login' | 'register') => {
    setSelectedOption(option);
  };

  return (
    <div className="flex flex-col justify-center">
      <div className="flex justify-center with-full mb-8">
        <Image src={"/logo1.png"} width={300} height={300} alt={'xd'} />
      </div>

      <div className="bg-gray-100 p-8 rounded-lg shadow-md flex flex-col justify-center">
        <div className="flex mb-8 justify-center rounded-lg ">
          <div
            className={`cursor-pointer py-2 px-8  ${
              selectedOption === 'login' ? 'bg-blue-500 text-white' : 'bg-gray-300'
            }`}
            onClick={() => handleOptionChange('login')}
          >
            Iniciar Sesión
          </div>
          <div
            className={`cursor-pointer py-2 px-8  ${
              selectedOption === 'register' ? 'bg-blue-500 text-white' : 'bg-gray-300'
            }`}
            onClick={() => handleOptionChange('register')}
          >
            Registrarse
          </div>
        </div>
        <div className="flex flex-col h-full">
          {selectedOption === 'login' ? <LoginForm /> : <RegisterForm />}
        </div>
      </div>
    </div>
  );
}
