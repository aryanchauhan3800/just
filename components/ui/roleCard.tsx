import { Check } from "lucide-react";
import Image from "next/image"; // or just use <img> if you're not in Next.js

const RoleCard = ({ label, imgSrc, selected, onClick }: {
  label: string;
  imgSrc: string;
  selected?: boolean;
  onClick?: () => void;
}) => {
  return (
    <button
      onClick={onClick}
      className={`w-[1357px] h-30 max-w-sm px-8 py-6 rounded border text-center bg-white transition-all
        ${selected ? "border-brand shadow-md" : "border-gray-300 hover:border-gray-400"}`}
    >
      <div className="relative flex flex-col items-center gap-4">
        {selected && (
          <div className="absolute -top-4 -right-5 rounded-full bg-brand p-0.5 text-white">
            <Check className="size-4" />
          </div>
        )}

        <img src={imgSrc} alt={label} className="w-[50px] h-[60px]" />
       
      </div>
       <span className="text-sm text-[#333] pb-10 font-lato">{label}</span>
    </button>
  );
};
 export default RoleCard;