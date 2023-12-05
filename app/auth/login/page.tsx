"use client";

import Image from "next/image";
import LoginForm from "@/components/organisms/form/LoginForm";

const Login = () => {
  return (
    <div className="flex h-screen flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <Image
          className="mx-auto"
          src="https://app.one-fm.com/img/footer_logo.svg"
          width="50"
          height="50"
          alt="One Facilities Management"
        />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <LoginForm />
        <p className="mt-5 text-center text-sm text-gray-500">
          Not a member?{" "}
          <a
            href="#"
            className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
          >
            Create New Account
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
