import { InfoCardType } from "@/types/inventory-types";


const InfoCard = ({
  FooterIcon,
  footerIconText,
  footerText,
  title,
  titleColor,
  TitleIcon,
  value,
  isRounded = false,
}: InfoCardType) => {

  const isNegative: boolean = footerText === "less than last year";

  return (
    <div className={`flex-1 h-[100px] max-w-full px-2 py-3 bg-white flex flex-col gap-y-4 ${isRounded ? "rounded-md" : ""}`} >
      
      <h3 style={{ borderLeftColor: titleColor }} className="text-sm flex gap-x-1 text-[#242424] max-h-[16px] border-l-2 pl-2 items-center" >
        <TitleIcon className="size-4 text-[#8F8F8F]" /> {title}
      </h3>
      
      <div className="flex flex-col px-3">
        <span className={`text-[20px] break-words truncate ${isRounded ? "text-[#242424]" : "text-[#8F8F8F]" }`}>
          {value}
        </span>


        {footerText && footerIconText && FooterIcon && (
          <div className="flex items-center text-xs">
            <span
              className={`${isNegative ? "text-danger" : "text-success"} flex items-center`} >
              <FooterIcon className="size-3" /> {footerIconText}
            </span>
            <span className="text-[#8F8F8F] ml-1">
              {footerText}
            </span>
          </div>
        )}

      </div>

    </div>
  );
};

export default InfoCard;