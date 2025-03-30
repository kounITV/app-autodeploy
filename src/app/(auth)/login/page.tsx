"use client";
import Image from "next/image";
import { LoginForm } from "./constainer/form";

export default function SignIn() {
  return (
    <>
      <div className="min-h-screen relative flex items-center justify-center">
        <Image
          src="/ministryOfJustice.jpg"
          alt="Building background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-white/20" />
        <div className="relative w-full max-w-md mx-4">
          <div className=" ">
            <div className="flex justify-center mb-6">
              <Image src="/PGS.png" alt="Logo" width={80} height={80} className="w-40  h-44" />
            </div>
            <LoginForm />
          </div>
        </div>
      </div>
    </>

  );
}

