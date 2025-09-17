"use client";

import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Logo from "@/public/brainLogoCompressed.png";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const navigation = [
  { name: "Training courses", href: "/#our-training-courses" },
  { name: "Mental health consultancy service", href: "/#consultancy" },
  { name: "pasu.io platform", href: "/#what-is-pasu-dot-io" },
];

export default function Nav() {
  const [showFloatingMenu, setShowFloatingMenu] = useState(false);
  const [isFloatingMenuOpen, setIsFloatingMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show floating menu when scrolled down more than 100px
      const shouldShow = window.scrollY > 100;
      setShowFloatingMenu(shouldShow);

      // Close the floating menu if we scroll back to top
      if (!shouldShow) {
        setIsFloatingMenuOpen(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header className="flex bg-amber-50 h-20 border-b border-emerald-700/10">
        <nav
          aria-label="Global"
          className="mx-auto flex w-full 2xl:max-w-8/10 items-center justify-between p-6 lg:px-8"
        >
          <Link href="/" className="cursor-pointer">
            <div className="flex items-center gap-x-5 lg:flex-1 cursor-pointer">
              <Image
                src={Logo}
                alt="Pasu Health Logo"
                className="h-10 w-auto"
              />
              <span className="text-lg lg:text-2xl 2xl:text-3xl text-gray-800">
                PASU Health
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden xl:flex lg:gap-x-12 items-center">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="font-semibold text-gray-900 hover:outline-2 outline-emerald-600 outline-offset-4 rounded-md px-1"
              >
                {item.name}
              </Link>
            ))}
            <Link
              href={"/request-a-callback"}
              className="font-semibold text-white hover:outline-4 outline-sky-300/50 outline-offset-4 rounded-lg bg-emerald-600 px-3 py-2 cursor-pointer"
            >
              Request a callback
            </Link>
          </div>

          {/* Mobile Navigation Popover */}
          <Popover className="xl:hidden">
            {({ open, close }) => (
              <>
                <div className="fixed top-5 right-5 rounded-full p-2 bg-amber-50 z-30">
                  <PopoverButton className="-m-2.5 flex items-center justify-center rounded-md p-2.5 text-gray-700 outline-none">
                    <span className="sr-only">
                      {open ? "Close main menu" : "Open main menu"}
                    </span>
                    {open ? (
                      <XMarkIcon aria-hidden="true" className="size-6" />
                    ) : (
                      <Bars3Icon aria-hidden="true" className="size-6" />
                    )}
                  </PopoverButton>
                </div>

                <PopoverPanel className="fixed inset-y-0 right-2 top-2 z-20 w-fit overflow-y-auto bg-amber-50 px-6 py-6 sm:ring-1 sm:ring-gray-900/10 h-fit border border-gray-300 rounded-2xl">
                  <div className="flex items-center justify-between">
                    <Link href="/" className="-m-1.5 p-1.5">
                      <span className="sr-only">PASU Health</span>
                      <Image
                        src={Logo}
                        alt="Pasu Health Logo"
                        className="h-7 w-auto"
                      />
                    </Link>
                  </div>
                  <div className="mt-6 flow-root">
                    <div className="-my-6 divide-y divide-gray-500/10">
                      <div className="space-y-2 py-6 mt-4">
                        {navigation.map((item) => (
                          <Link
                            key={item.name}
                            href={item.href}
                            className="-mx-3 block rounded-lg px-3 py-2 text-lg sm:text-2xl font-semibold text-gray-900 hover:bg-gray-50"
                            onClick={() => close()}
                          >
                            {item.name}
                          </Link>
                        ))}
                        <Link
                          href={"/schedule-a-consultation"}
                          className="-mx-3 block rounded-lg px-3 py-2 sm:text-2xl text-base/7 font-semibold text-white bg-emerald-600 hover:bg-emerald-700 mt-4 text-center"
                          onClick={() => close()}
                        >
                          Book a free consultation
                        </Link>
                      </div>
                    </div>
                  </div>
                </PopoverPanel>
              </>
            )}
          </Popover>
        </nav>
      </header>

      {/* Floating Menu - Only visible on larger screens when scrolled */}
      <div
        className={`hidden xl:block fixed right-6 top-6 z-30 transition-all duration-300 ${
          showFloatingMenu
            ? "translate-x-0 opacity-100"
            : "translate-x-full opacity-0 pointer-events-none"
        }`}
      >
        {/* Collapsed state - Menu button */}
        {!isFloatingMenuOpen && (
          <button
            onClick={() => setIsFloatingMenuOpen(true)}
            className="bg-emerald-600 text-white p-3 rounded-full shadow-lg hover:bg-emerald-700 transition-colors cursor-pointer"
            aria-label="Open floating menu"
          >
            <Bars3Icon className="size-6" />
          </button>
        )}

        {/* Expanded state - Full menu */}
        {isFloatingMenuOpen && (
          <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-6 min-w-[280px]">
            <div className="flex items-center justify-between mb-4">
              <Link href="/" onClick={() => setIsFloatingMenuOpen(false)}>
                <Image
                  src={Logo}
                  alt="Pasu Health Logo"
                  className="h-8 w-auto cursor-pointer"
                />
              </Link>
              <button
                onClick={() => setIsFloatingMenuOpen(false)}
                className="p-1 rounded-lg hover:bg-gray-100 transition-colors"
                aria-label="Close floating menu"
              >
                <XMarkIcon className="size-5 text-gray-600" />
              </button>
            </div>

            <div className="space-y-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsFloatingMenuOpen(false)}
                  className="block px-3 py-2 text-sm font-semibold text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  {item.name}
                </Link>
              ))}
              <Link
                href={"/schedule-a-consultation"}
                onClick={() => setIsFloatingMenuOpen(false)}
                className="block px-3 py-2 text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg transition-colors text-center mt-3"
              >
                Book a free consultation
              </Link>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

/* ------------------------------------------------------------------------------------ */

// "use client";

// import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";

// import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
// import Logo from "@/public/brainLogoCompressed.png";
// import Image from "next/image";
// import Link from "next/link";

// const navigation = [
//   { name: "Training courses", href: "/#our-training-courses" },
//   { name: "Mental health consultancy service", href: "/#consultancy" },
//   { name: "pasu.io platform", href: "/#what-is-pasu-dot-io" },
// ];

// export default function Nav() {
//   const isFixed = false;

//   return (
//     <header
//       className={`${isFixed ? "fixed top-0 left-0 right-0 z-20" : "flex"} bg-amber-50 h-20 border-b border-emerald-700/10`}
//     >
//       <nav
//         aria-label="Global"
//         className="mx-auto flex w-full 2xl:max-w-8/10 items-center justify-between p-6 lg:px-8"
//       >
//         <Link href="/" className="cursor-pointer">
//           <div className="flex items-center gap-x-5 lg:flex-1 cursor-pointer">
//             <Image src={Logo} alt="Pasu Health Logo" className="h-10 w-auto" />
//             <span className="text-lg lg:text-2xl 2xl:text-3xl text-gray-800">
//               PASU Health
//             </span>
//           </div>
//         </Link>

//         {/* Desktop Navigation */}
//         <div className="hidden xl:flex lg:gap-x-12 items-center">
//           {navigation.map((item) => (
//             <Link
//               key={item.name}
//               href={item.href}
//               className="font-semibold text-gray-900 hover:outline-2 outline-emerald-600 outline-offset-4 rounded-md px-1"
//             >
//               {item.name}
//             </Link>
//           ))}
//           <Link
//             href={"/request-a-callback"}
//             className="font-semibold text-white hover:outline-4 outline-sky-300/50 outline-offset-4 rounded-lg bg-emerald-600 px-3 py-2 cursor-pointer"
//           >
//             Request a callback
//           </Link>
//         </div>

//         {/* Mobile Navigation Popover */}
//         <Popover className="xl:hidden">
//           {({ open, close }) => (
//             <>
//               <div className="fixed top-5 right-5 rounded-full p-2 bg-amber-50 z-30">
//                 <PopoverButton className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700">
//                   <span className="sr-only">
//                     {open ? "Close main menu" : "Open main menu"}
//                   </span>
//                   {open ? (
//                     <XMarkIcon aria-hidden="true" className="size-6" />
//                   ) : (
//                     <Bars3Icon aria-hidden="true" className="size-6" />
//                   )}
//                 </PopoverButton>
//               </div>

//               <PopoverPanel className="fixed inset-y-0 right-2 top-2 z-20 w-fit overflow-y-auto bg-amber-50 px-6 py-6 sm:ring-1 sm:ring-gray-900/10 h-fit border border-gray-300 rounded-2xl">
//                 <div className="flex items-center justify-between">
//                   <Link href="/" className="-m-1.5 p-1.5">
//                     <span className="sr-only">PASU Health</span>
//                     <Image
//                       src={Logo}
//                       alt="Pasu Health Logo"
//                       className="h-7 w-auto"
//                     />
//                   </Link>
//                 </div>
//                 <div className="mt-6 flow-root">
//                   <div className="-my-6 divide-y divide-gray-500/10">
//                     <div className="space-y-2 py-6 mt-4">
//                       {navigation.map((item) => (
//                         <Link
//                           key={item.name}
//                           href={item.href}
//                           className="-mx-3 block rounded-lg px-3 py-2 text-lg sm:text-2xl font-semibold text-gray-900 hover:bg-gray-50"
//                           onClick={() => close()}
//                         >
//                           {item.name}
//                         </Link>
//                       ))}
//                       <Link
//                         href={"/request-a-callback"}
//                         className="-mx-3 block rounded-lg px-3 py-2 sm:text-2xl text-base/7 font-semibold text-white bg-emerald-600 hover:bg-emerald-700 mt-4"
//                         onClick={() => close()}
//                       >
//                         Request a callback
//                       </Link>
//                     </div>
//                   </div>
//                 </div>
//               </PopoverPanel>
//             </>
//           )}
//         </Popover>
//       </nav>
//     </header>
//   );
// }

/* ------------------------------------------------------------------------ */

// "use client";

// import { useState } from "react";
// import { usePathname } from "next/navigation";
// import { Dialog, DialogPanel } from "@headlessui/react";
// import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";

// import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
// import Logo from "@/public/brainLogoCompressed.png";
// import Image from "next/image";
// import Link from "next/link";

// const navigation = [
//   { name: "Training courses", href: "/#our-training-courses" },
//   { name: "Mental health consultancy service", href: "/#consultancy" },
//   { name: "pasu.io platform", href: "/#what-is-pasu-dot-io" },
//   // { name: "Get in touch", href: "/training-enquiry" },
// ];

// export default function Nav() {
//   // const pathname = usePathname();
//   const isFixed = false;
//   // pathname !== "/mental-health-risk-checker" && pathname !== "/contact-us";
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

//   return (
//     <header
//       className={`${isFixed ? "fixed top-0 left-0 right-0 z-20" : "flex"} bg-amber-50 h-20 border-b border-emerald-700/10`}
//     >
//       <nav
//         aria-label="Global"
//         className="mx-auto flex w-full 2xl:max-w-8/10 items-center justify-between p-6 lg:px-8 "
//       >
//         <Link href="/" className="cursor-pointer">
//           <div className="flex items-center gap-x-5 lg:flex-1 cursor-pointer">
//             {/* <a href="#" className="-m-1.5 p-1.5"> */}
//             <Image src={Logo} alt="Pasu Health Logo" className="h-10 w-auto" />
//             <span className="text-lg lg:text-2xl 2xl:text-3xl text-gray-800">
//               PASU Health
//             </span>

//             {/* </a> */}
//           </div>
//         </Link>
//         <div className="flex xl:hidden fixed top-5 right-5 rounded-full p-2 bg-amber-50 z-30">
//           <button
//             type="button"
//             onClick={() => setMobileMenuOpen(true)}
//             className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
//           >
//             <span className="sr-only">Open main menu</span>
//             <Bars3Icon aria-hidden="true" className="size-6 " />
//           </button>
//         </div>
//         <div className="hidden xl:flex lg:gap-x-12 items-center">
//           {navigation.map((item) => (
//             <Link
//               key={item.name}
//               href={item.href}
//               className=" font-semibold text-gray-900 hover:outline-2 outline-emerald-600 outline-offset-4 rounded-md px-1"
//             >
//               {item.name}
//             </Link>
//           ))}
//           <Link
//             href={"/request-a-callback"}
//             className=" font-semibold text-white hover:outline-4 outline-sky-300/50 outline-offset-4 rounded-lg bg-emerald-600 px-3 py-2 cursor-pointer"
//           >
//             Request a callback
//           </Link>
//         </div>
//         {/* <div className="hidden lg:flex lg:flex-1 lg:justify-end">
//           <a href="#" className="text-sm/6 font-semibold text-gray-900">
//             Log in <span aria-hidden="true">&rarr;</span>
//           </a>
//         </div> */}
//       </nav>
//       {/* MBL */}
//       <Dialog
//         open={mobileMenuOpen}
//         onClose={setMobileMenuOpen}
//         className="xl:hidden"
//       >
//         <div className="fixed inset-0 z-10" />
//         <DialogPanel className="fixed inset-y-0 right-0 z-10 w-fit overflow-y-auto bg-amber-50 px-6 py-6 sm:ring-1 sm:ring-gray-900/10 h-fit">
//           <div className="flex items-center justify-between">
//             {/* <a href="#" className="-m-1.5 p-1.5">
//               <span className="sr-only">PASU Health</span>
//               <Image src={Logo} alt="Pasu Health Logo" className="h-7 w-auto" />
//             </a> */}
//             <button
//               type="button"
//               onClick={() => setMobileMenuOpen(false)}
//               className="-m-2.5 rounded-md p-2.5 text-gray-700"
//             >
//               <span className="sr-only">Close menu</span>
//               <XMarkIcon aria-hidden="true" className="size-6" />
//             </button>
//           </div>
//           <div className="mt-6 flow-root">
//             <div className="-my-6 divide-y divide-gray-500/10">
//               <div className="space-y-2 py-6 mt-4">
//                 {navigation.map((item) => (
//                   <Link
//                     key={item.name}
//                     href={item.href}
//                     className="-mx-3 block rounded-lg px-3 py-2 sm:text-2xl text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
//                     onClick={() => setMobileMenuOpen(false)}
//                   >
//                     {item.name}
//                   </Link>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </DialogPanel>
//       </Dialog>
//     </header>
//   );
// }
