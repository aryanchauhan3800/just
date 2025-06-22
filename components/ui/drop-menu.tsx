import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import Image from "next/image";

const banks = [
  {
    name: "HDFC Bank",
    logo: "/banks/hdfc.png", // store this in your public/banks folder
  },
  {
    name: "SBI Bank",
    logo: "/banks/sbi.png",
  },
  {
    name: "Axis Bank",
    logo: "/banks/axis.png",
  },
];

const BankDropdown = ({ onManualSelect }: { onManualSelect: () => void }) => {
  return (
    <Select>
      <SelectTrigger className="w-full bg-white border rounded px-4 py-2">
        <SelectValue placeholder="Select Bank" />
      </SelectTrigger>
      <SelectContent className="max-h-60 overflow-y-auto">
        {banks.map((bank, index) => (
          <SelectItem
            key={index}
            value={bank.name}
            className="flex items-center gap-2 cursor-pointer"
          >
            <Image
              src={bank.logo}
              alt={bank.name}
              width={20}
              height={20}
              className="rounded-full"
            />
            {bank.name}
          </SelectItem>
        ))}

        <div
          onClick={onManualSelect}
          className="text-blue-600 text-sm cursor-pointer px-3 py-2 hover:underline"
        >
          Enter Manually
        </div>
      </SelectContent>
    </Select>
  );
};
