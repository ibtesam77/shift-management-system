"use client";

import Image from "next/image";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Dropdown } from "flowbite-react";
import { toast } from "react-toastify";

const TopNav = () => {
  const router = useRouter();

  const navigateToProfile = () => {
    router.push("/profile");
  };

  const handleLogout = () => {
    axios
      .post("/api/auth/logout")
      .then(() => router.replace("/auth/login"))
      .catch((error) =>
        toast.error(error?.message || "Seomthing went wrong in logging out")
      );
  };

  return (
    <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
      <div className="px-3 py-3 lg:px-5 lg:pl-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-start rtl:justify-end">
            <button
              data-drawer-target="logo-sidebar"
              data-drawer-toggle="logo-sidebar"
              aria-controls="logo-sidebar"
              type="button"
              className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            >
              <span className="sr-only">Open sidebar</span>
              <svg
                className="w-6 h-6"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  clipRule="evenodd"
                  fillRule="evenodd"
                  d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                ></path>
              </svg>
            </button>
            <a href="https://flowbite.com" className="flex ms-2 md:me-24">
              <Image
                className="mx-auto"
                src="https://app.one-fm.com/img/logo.svg"
                width="100"
                height="100"
                alt="One Facilities Management"
              />
            </a>
          </div>
          <div className="flex items-center">
            <div className="flex items-center ms-3">
              <Dropdown
                label=""
                dismissOnClick={false}
                renderTrigger={() => (
                  <Image
                    className="w-8 h-8 rounded-full"
                    src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                    width="30"
                    height="30"
                    alt="Employee photo"
                  />
                )}
              >
                <Dropdown.Item onClick={navigateToProfile}>
                  Profile
                </Dropdown.Item>
                <Dropdown.Item onClick={handleLogout}>Sign out</Dropdown.Item>
              </Dropdown>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default TopNav;
