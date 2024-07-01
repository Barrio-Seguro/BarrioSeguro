import { ReactNode } from 'react';
import { Button } from "@nextui-org/button";
import { IconType } from 'react-icons';

interface OptionProps {
  icon?: IconType;
  text: string;
}

export const Option: React.FC<OptionProps> = ({ icon: Icon, text }) => {
  return (
    <div className="flex flex-col justify-start">
      <div className="flex justify-center bg-[#115DA9] rounded-lg p-4 h-17 w-17 cursor-pointer transition shadow-lg">
        {/* Sección izquierda con el icono */}
        <div className="flex items-center">
          {Icon && <Icon className="w-12 h-12" color='#FAFAFA' />}
        </div>
      </div>
      <div className="w-17 flex justify-center">
        <p className="font-semibold mt-2 w-16 text-sm text-center text-[#115DA9]">{text}</p>
      </div>
    </div>
  );
};
