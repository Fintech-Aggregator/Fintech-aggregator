"use client";
import Image from "next/image";
import { FaInstagram, FaFacebookF, FaLinkedinIn } from "react-icons/fa";

interface FooterProps {
  type?: string;
}

export default function Footer({ type }: FooterProps) {
  if (type === "auth") {
    return null;
  }

  return (
    <footer className="bg-white border-t mt-10 py-8 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between gap-4 md:gap-8 text-gray-700 text-sm">
        <div className="flex flex-col items-center md:items-start gap-4">
          <div className="flex ml-2 mr-2 mb-4 gap-8 md:gap-10 text-xl text-black">
            <Image
              className="max-w-16 max-h-16"
              src="/images/skill-icons_instagram.svg"
              alt="logo"
              width={40}
              height={40}
              priority
            />
            <Image
              className="max-w-16 max-h-16"
              src="/images/uiw_facebook.svg"
              alt="logo"
              width={40}
              height={40}
              priority
            />
            <Image
              className="max-w-16 max-h-16"
              src="/images/devicon_linkedin.svg"
              alt="logo"
              width={40}
              height={40}
              priority
            />
          </div>
          <p className="text-center md:text-left text-[18px]">
            Help us improve our work
          </p>
          <button className="w-[207px] h-[63px] border border-black rounded-[20px] text-[18px] leading-none flex items-center justify-center hover:bg-gray-100 transition">
            Write a review
          </button>
        </div>

        <div className="flex flex-col gap-4 md:gap-6 m-4 md:m-6 justify-center items-center text-center">
          <h4 className="font-semibold mb-2 text-black text-[20px]">Company</h4>
          <ul className="flex flex-col gap-4 md:gap-6 space-y-1 text-gray-500 text-[18px]">
            <li>About company</li>
            <li>Contacts</li>
          </ul>
        </div>

        <div className="flex flex-col gap-4 md:gap-6 m-4 md:m-6 justify-center items-center text-center">
          <h4 className="font-semibold mb-2 text-black text-[20px]">
            Services
          </h4>
          <ul className="flex flex-col gap-4 md:gap-6 space-y-1 text-gray-500 text-[18px]">
            <li>Service agreements</li>
            <li>Partners</li>
          </ul>
        </div>

        <div className="flex flex-col gap-4 md:gap-6 m-4 md:m-6 justify-center items-center text-center">
          <h4 className="font-semibold mb-2 text-black text-[20px]">Help</h4>
          <ul className="flex flex-col gap-4 md:gap-6 space-y-1 text-gray-500 text-[18px]">
            <li>Terms of use of the site</li>
            <li>Press Center</li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
