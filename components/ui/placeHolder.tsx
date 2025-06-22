import { SetStateAction, useState } from "react";
import { FaChevronDown } from "react-icons/fa";

const countries = [
  { code: "+91", flag: "🇮🇳" },
  { code: "+1", flag: "🇺🇸" },
  { code: "+44", flag: "🇬🇧" },
  { code: "+61", flag: "🇦🇺" },
];

export default function PhoneInputBar() {
  const [selectedCountry, setSelectedCountry] = useState(countries[0]);
  const [phone, setPhone] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleCountrySelect = (country: SetStateAction<{ code: string; flag: string; }>) => {
    setSelectedCountry(country);
    setDropdownOpen(false);
  };

  return (
    <div className="relative flex items-center border rounded px-2 py-1 bg-white text-gray-950 w-full min-w-[300px]">
      {/* Flag + Code Dropdown */}
      <div
        className="flex items-center cursor-pointer pr-2 border-r"
        onClick={() => setDropdownOpen(!dropdownOpen)}
      >
        <span className="mr-1 text-xl">{selectedCountry.flag}</span>
        <span className="text-sm mr-1">{selectedCountry.code}</span>
        <FaChevronDown className="text-gray-500 text-xs" />
      </div>

      {/* Phone Number Input */}
      <input
        type="tel"
        className="flex-1 outline-none pl-2 placeholder:text-[#B3B3B3]"
        placeholder="Enter the Party’s Contact Number"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />

      {/* Dropdown Menu */}
      {dropdownOpen && (
        <div className="absolute top-10 left-2 bg-white border rounded shadow z-10 w-32">
          {countries.map((country) => (
            <div
              key={country.code}
              className="flex items-center px-2 py-1 cursor-pointer hover:bg-gray-100"
              onClick={() => handleCountrySelect(country)}
            >
              <span className="mr-2 text-xl">{country.flag}</span>
              <span className="text-sm">{country.code}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
