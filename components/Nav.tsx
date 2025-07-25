"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { Dialog, DialogPanel } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Logo from "@/public/brainLogoCompressed.png";
import Image from "next/image";
import Link from "next/link";

const navigation = [
  { name: "Mental health consultancy service", href: "/#consultancy" },
  { name: "Training courses", href: "/#our-training-courses" },
  { name: "pasu.io platform", href: "/#what-is-pasu-dot-io" },
  // { name: "Get in touch", href: "/training-enquiry" },
];

export default function Nav() {
  const pathname = usePathname();
  const isFixed =
    pathname !== "/mental-health-risk-checker" &&
    pathname !== "/training-enquiry";
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header
      className={`${isFixed ? "fixed top-0 left-0 right-0 z-20" : "flex"} bg-amber-50 h-20 border-b border-emerald-700/10`}
    >
      <nav
        aria-label="Global"
        className="mx-auto flex w-full 2xl:max-w-8/10 items-center justify-between p-6 lg:px-8 "
      >
        <Link href="/" className="cursor-pointer">
          <div className="flex items-center gap-x-5 lg:flex-1 cursor-pointer">
            {/* <a href="#" className="-m-1.5 p-1.5"> */}
            <Image src={Logo} alt="Pasu Health Logo" className="h-10 w-auto" />
            <span className="text-lg lg:text-2xl 2xl:text-3xl text-gray-800">
              PASU Health
            </span>

            {/* </a> */}
          </div>
        </Link>
        <div className="flex xl:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon aria-hidden="true" className="size-6" />
          </button>
        </div>
        <div className="hidden xl:flex lg:gap-x-12 items-center">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className=" font-semibold text-gray-900 hover:outline-4 outline-sky-300/50 outline-offset-4 rounded-md px-1"
            >
              {item.name}
            </Link>
          ))}
          <Link
            href={"/request-a-callback"}
            className=" font-semibold text-white hover:outline-4 outline-sky-300/50 outline-offset-4 rounded-lg bg-emerald-600 px-3 py-2 cursor-pointer"
          >
            Request a callback
          </Link>
        </div>
        {/* <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <a href="#" className="text-sm/6 font-semibold text-gray-900">
            Log in <span aria-hidden="true">&rarr;</span>
          </a>
        </div> */}
      </nav>
      {/* MBL */}
      <Dialog
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
        className="xl:hidden"
      >
        <div className="fixed inset-0 z-10" />
        <DialogPanel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">PASU Health</span>
              <Image src={Logo} alt="Pasu Health Logo" className="h-7 w-auto" />
            </a>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon aria-hidden="true" className="size-6" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6 mt-4">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="-mx-3 block rounded-lg px-3 py-2 sm:text-2xl text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
              {/* <div className="py-6">
                <a
                  href="#"
                  className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                >
                  Log in
                </a>
              </div> */}
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  );
}
