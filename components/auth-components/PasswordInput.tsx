import { Eye, EyeOff } from 'lucide-react';
import React, { useState } from 'react'
import { Input } from '../ui/input';

type PasswordInputProps = {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    borderColor?: string; // Optional prop for custom border color
};

const PasswordInput = ({ value, onChange, borderColor }: PasswordInputProps) => {
    const [showPassword, setShowPassword] = useState(false);
    const toggleVisibility = () => setShowPassword(prev => !prev);

    return (
        <div className="relative">
            <label className="text-sm font-normal block mb-1"><span className="text-red-500 ml-1">*</span> Enter a Password:</label>
            <Input
                type={showPassword ? "text" : "password"}
                placeholder="Create a password"
                className={`w-full border p-2 pr-10 ${borderColor}`}
                value={value}
                onChange={onChange}
                required
            />
            <div
                className="absolute top-9 right-3 cursor-pointer text-gray-500 hover:text-gray-700"
                onClick={toggleVisibility}
            >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </div>
        </div>
    );
};

export default PasswordInput;