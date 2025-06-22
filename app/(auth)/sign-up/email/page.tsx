"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { signupWithEmail } from "@/services/authService";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";

const Signup = () => {
    const router = useRouter();
    const [mail, setMail] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setLoading(true);
        try {
            const res = await signupWithEmail(mail);
            console.log("Signup success:", res);
            if (res.success) {
                localStorage.setItem("email", mail);
                toast.success("Signup successful!")
                router.push("/sign-up/otp?method=email");
            } else {
                throw new Error(res.message || "Signup failed");
            }
        } catch (err: unknown) {
            const error = err as Error;
            console.error("Signup failed:", error.message);
            toast.error(error.message || "Signup failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="auth_page_container">
            <h1 className="text-3xl font-semibold mb-4">
                <Image src={"/logo.svg"} alt="logo" width={20} height={20} />
                Sign up
            </h1>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div>
                    <label className="text-base">Email Id:</label>
                    <Input type="email" className="mt-2" onChange={(e) => setMail(e.target.value)} />
                </div>

                <Button className="authbtn">
                    {loading ? <p>Loading....</p> : <p>Sign up</p>}
                </Button>
            </form>

            <div className="flex items-center my-4">
                <hr className="flex-grow border-t border-gray-300" />
                <span className="mx-2 text-gray-500 text-sm">or</span>
                <hr className="flex-grow border-t border-gray-300" />
            </div>

            <div className="flex flex-col gap-4 mb-8">
                <Button className="auth_btn_secondary">
                    <Image src={"/google_icon.svg"} alt="google" width={18} height={18} />
                    Login with Google
                </Button>

                <Button className="auth_btn_secondary">
                    <Image src={"/brihat_icon.svg"} alt="google" width={18} height={18} />
                    Login with Brihat
                </Button>
            </div>

            <div className="flex justify-center space-x-2 text-sm">
                <span>Already an User?</span>
                <Link href={"/sign-in"} className="text-blue-500 font-semibold">
                    Login
                </Link>
            </div>
        </div>
    );
};

export default Signup;
