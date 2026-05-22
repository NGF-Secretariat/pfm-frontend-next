"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Search, X } from "lucide-react";

export default function Topbar() {
  const pathname = usePathname();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const showItems = true;

  const navItems = [
    { name: "Home", path: "/", show: true },
    {
      name: "Group Explorer",
      path: "/group-explorer",
      show: true,
      children: [
        { name: "Compare Data", path: "/group-explorer", show: true },
        { name: "Rank Data", path: "/rank-data", show: true },
      ],
    },
    { name: "State Explorer", path: "/state-explorer", show: true },
    { name: "Blog Post", path: "/blog-post", show: true },
    { name: "Resources", path: "https://ngfrepository.org.ng:8443/handle/123456789/5632", show: true },
    { name: "Contact Us", path: "/contact-us", show: true },
    // { name: "Upload Data", path: "/upload", show: showItems },
    // { name: "Analytics", path: "/analytics", show: showItems },
    // { name: "Settings", path: "/settings", show: showItems },
  ];

  return (
    <header className="bg-[#012c14] w-full relative z-50">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-4">

        {/* DESKTOP */}
        <div className="hidden lg:flex items-center justify-between gap-8">

          {/* LEFT */}
          <div className="flex items-center gap-4">
            <Image
              src="/ngf-logo.png"
              alt="Logo"
              width={120}
              height={120}
              priority
              className="w-28 h-28 object-contain"
            />

            <h1 className="text-white text-3xl font-bold font-bubblegum">
              Public Finance Database
            </h1>
          </div>

          {/* RIGHT */}
          <div className="flex flex-col gap-4">

            {/* Search */}
            <div className="flex justify-end">
              <input
                type="text"
                placeholder="Search by state..."
                className="
                  w-72 bg-white/10 border border-white/20
                  text-white placeholder:text-white/60
                  rounded-xl px-4 py-2.5 outline-none
                  focus:ring-2 focus:ring-white/30
                "
              />
            </div>

            {/* NAV */}
            <nav className="flex items-center gap-2">
              {navItems
                .filter((item) => item.show)
                .map((item) => {
                  const isActive = pathname === item.path;

                  return (
                    <div
                      key={item.path}
                      className="group/nav relative"
                    >
                      <Link
                        href={item.path}
                        className="
                          relative px-3 py-2 flex items-center
                          text-base text-white/90 hover:text-white
                        "
                      >
                        {/* Hover BG */}
                        <span
                          className="
                            absolute inset-0 bg-white/10 rounded-xl
                            scale-x-0 origin-center
                            transition-transform duration-300
                            group-hover/nav:scale-x-100
                          "
                        />

                        {/* Text */}
                        <span className="relative z-10 flex items-center gap-1.5">
                          {item.name}
                          {item.children && (
                            <svg className="w-4 h-4 transition-transform duration-300 group-hover/nav:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                            </svg>
                          )}
                        </span>

                        {/* Active Line */}
                        <span
                          className={`
                            absolute left-0 bottom-0
                            h-[2px] w-full bg-white
                            ${isActive ? "opacity-100 animate-pulse" : "opacity-0"}
                          `}
                        />
                      </Link>

                      {/* Dropdown */}
                      {item.children && (
                        <div
                          className="
                          absolute left-1/2 -translate-x-1/2 top-full pt-4
                          opacity-0 -translate-y-4 pointer-events-none
                          group-hover/nav:opacity-100
                          group-hover/nav:translate-y-0
                          group-hover/nav:pointer-events-auto
                          transition-all duration-300
                        "
                        >
                          <div
                            className="
                            bg-white text-[#012c14]
                            rounded-xl shadow-2xl border
                            py-3 w-56 flex flex-col
                          "
                          >
                            {item.children.map((child) => (
                              <Link
                                key={child.path}
                                href={child.path}
                                className="
                                block w-full text-left
                                px-6 py-3 text-base font-medium
                                hover:bg-green-50 hover:pl-8
                                transition-all duration-300
                              "
                              >
                                {child.name}
                              </Link>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
            </nav>
          </div>
        </div>

        {/* MOBILE */}
        <div className="flex lg:hidden items-center justify-between">

          {/* LEFT SIDE */}
          <div className="flex items-center gap-3">

            {/* Logo */}
            <Image
              src="/ngf-logo.png"
              alt="Logo"
              width={60}
              height={60}
              priority
              className="w-14 h-14 object-contain"
            />

            {/* Title */}
            <h1 className="text-white text-lg font-bold font-bubblegum leading-tight">
              Public Finance Database
            </h1>
          </div>

          {/* RIGHT SIDE */}
          <div className="flex items-center gap-3">

            {/* Search Icon */}
            <button
              onClick={() => setSearchOpen(true)}
              className="
                p-2 rounded-lg
                text-white hover:bg-white/10
                transition
              "
            >
              <Search size={22} />
            </button>

            {/* Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="
                p-2 rounded-lg
                text-white hover:bg-white/10
                transition
              "
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </div>

      {/* SEARCH MODAL */}
      {searchOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] flex items-start justify-center pt-24 px-4">
          <div className="bg-white rounded-2xl p-5 w-full max-w-md relative">

            <button
              onClick={() => setSearchOpen(false)}
              className="absolute top-4 right-4 text-gray-500"
            >
              <X size={22} />
            </button>

            <h2 className="text-xl font-semibold mb-4">
              Search State
            </h2>

            <input
              type="text"
              placeholder="Search by state..."
              className="
                w-full border border-gray-300
                rounded-xl px-4 py-3
                outline-none focus:ring-2
                focus:ring-[#012c14]
              "
            />
          </div>
        </div>
      )}

      {/* MOBILE MENU */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-black/50 z-[100]">
          <div
            className="
              fixed top-0 right-0 h-full w-[280px]
              bg-white shadow-2xl p-6
              overflow-y-auto
            "
          >
            {/* Top */}
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-xl font-bold text-[#012c14]">
                Menu
              </h2>

              <button
                onClick={() => setMobileMenuOpen(false)}
              >
                <X size={24} />
              </button>
            </div>

            {/* Links */}
            <nav className="flex flex-col gap-2">
              {navItems
                .filter((item) => item.show)
                .map((item) => (
                  <div key={item.path}>
                    <Link
                      href={item.path}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`
                        flex items-center justify-between px-4 py-3 rounded-xl
                        transition-all font-medium
                        ${pathname === item.path
                          ? "bg-[#012c14] text-white"
                          : "hover:bg-gray-100 text-gray-700"
                        }
                      `}
                    >
                      {item.name}
                      {item.children && (
                        <svg className="w-4 h-4 opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                        </svg>
                      )}
                    </Link>

                    {/* Mobile children */}
                    {item.children && (
                      <div className="ml-4 mt-1 flex flex-col">
                        {item.children.map((child) => (
                          <Link
                            key={child.path}
                            href={child.path}
                            onClick={() => setMobileMenuOpen(false)}
                            className="
                              px-4 py-2 text-sm
                              text-gray-600
                              hover:text-[#012c14]
                            "
                          >
                            {child.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}