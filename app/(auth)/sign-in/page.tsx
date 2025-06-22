"use client";

import PasswordInput from "@/components/auth-components/PasswordInput";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import tokenHelper from "@/helpers/token.helper";
import { login } from "@/services/authService";
import parsePhoneNumberFromString from "libphonenumber-js";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { toast } from "sonner";

const Signin = () => {
  const router = useRouter();
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const phoneNumber = parsePhoneNumberFromString(`+${phone}`);

    if (!email) {
      console.error("Invalid Email!");
      return;
    }

    setLoading(true);
    try {
      const res = await login({ email, password });
      console.log("Login success:", res);
      if (res.success) {
        toast.success("Login successful!")
        console.log(res.data)
        tokenHelper.setToken(res.data.accessToken);
        router.push("/dashboard");
      } else {
        throw new Error(res.message || "Login failed");
      }
    } catch (err) {
      console.error("Login failed:", err);
      toast.error("Login failed. Please try again.")
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth_page_container">
      <h1 className="text-3xl font-semibold mb-4">Login</h1>

      <form onSubmit={handleSubmit} className="flex flex-col mb-8 gap-4">
        <div>
          <label className="text-base">Email:</label>
          {/* <PhoneInput
            country={"in"}
            value={phone}
            onChange={setPhone}
            containerStyle={{
              width: "100%",
              border: "1px solid #e5e7eb",
              borderRadius: "6px",
            }}
            inputStyle={{
              width: "100%",
              backgroundColor: "#f9fafb",
              border: "none",
              height: "40px",
              borderRadius: "6px",
              paddingLeft: "48px",
            }}
            buttonStyle={{
              border: "none",
              backgroundColor: "#f9fafb",
            }}
            countryCodeEditable
          /> */}
                              <Input type="email" className="mt-2" onChange={(e) => setEmail(e.target.value)} />

        </div>

        <PasswordInput
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Link href={"/"} className="ml-auto font-semibold text-blue-500">
          Forgot Password
        </Link>
        <Button className="authbtn">
          {loading ? "Loading..." : "Login"}
        </Button>
      </form>

      <div className="flex justify-center space-x-2 text-sm">
        <span>New to Karosauda?</span>
        <Link href={"/sign-up"} className="text-blue-500 font-semibold">
          Signup
        </Link>
      </div>
    </div>
  );
};

export default Signin;
