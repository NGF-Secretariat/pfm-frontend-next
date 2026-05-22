"use client";

import Image from "next/image";
import {
    Mail,
    Phone,
    Globe,
    MapPin,
    SendHorizonal,
} from "lucide-react";

export default function ContactPage() {
    return (
        <section className="w-full bg-[#f7f9f8] py-12 px-4 sm:px-6 lg:px-10">
            <div className="max-w-7xl mx-auto">

                {/* Header */}
                <div className="mb-12 text-center">
                    <h1 className="text-4xl sm:text-5xl font-bubblegum text-[#012c14]">
                        Contact Us
                    </h1>

                    <p className="text-gray-600 mt-4 max-w-2xl mx-auto text-base sm:text-lg">
                        Have questions, feedback, or inquiries about the Public Finance
                        Database? Reach out to us and our team will respond promptly.
                    </p>
                </div>

                {/* Main Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">

                    {/* LEFT SIDE */}
                    <div className="bg-white rounded-3xl shadow-xl p-6 sm:p-8">

                        <h2 className="text-2xl font-semibold text-[#012c14] mb-6">
                            Get in Touch
                        </h2>

                        {/* Form */}
                        <form className="space-y-5">

                            {/* Names */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <input
                                    type="text"
                                    placeholder="First Name"
                                    className="
                    w-full rounded-xl border border-gray-200
                    px-4 py-3 outline-none
                    focus:ring-2 focus:ring-[#012c14]/30
                    transition-all
                  "
                                />

                                <input
                                    type="text"
                                    placeholder="Last Name"
                                    className="
                    w-full rounded-xl border border-gray-200
                    px-4 py-3 outline-none
                    focus:ring-2 focus:ring-[#012c14]/30
                    transition-all
                  "
                                />
                            </div>

                            {/* Email */}
                            <input
                                type="email"
                                placeholder="Email Address"
                                className="
                  w-full rounded-xl border border-gray-200
                  px-4 py-3 outline-none
                  focus:ring-2 focus:ring-[#012c14]/30
                  transition-all
                "
                            />

                            {/* Message */}
                            <textarea
                                rows={7}
                                placeholder="Enter your message..."
                                className="
                  w-full rounded-xl border border-gray-200
                  px-4 py-3 outline-none resize-none
                  focus:ring-2 focus:ring-[#012c14]/30
                  transition-all
                "
                            />

                            {/* Button */}
                            <button
                                type="submit"
                                className="
                  w-full sm:w-auto
                  inline-flex items-center justify-center gap-2
                  bg-[#012c14] text-white
                  px-8 py-3 rounded-xl
                  hover:bg-[#014d24]
                  transition-all duration-300
                  shadow-lg hover:shadow-xl
                "
                            >
                                Send Message
                                <SendHorizonal size={18} />
                            </button>
                        </form>

                        {/* Contact Info */}
                        <div className="mt-10 space-y-6">

                            <div className="flex items-start gap-4">
                                <div className="bg-[#012c14]/10 p-3 rounded-xl">
                                    <MapPin className="text-[#012c14]" size={22} />
                                </div>

                                <div>
                                    <h3 className="font-semibold text-[#012c14] mb-1">
                                        Address
                                    </h3>

                                    <p className="text-gray-600 leading-7">
                                        49/51, Lake Chad Crescent <br />
                                        Maitama, Abuja <br />
                                        Federal Capital Territory <br />
                                        Nigeria
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="bg-[#012c14]/10 p-3 rounded-xl">
                                    <Mail className="text-[#012c14]" size={22} />
                                </div>

                                <div>
                                    <h3 className="font-semibold text-[#012c14] mb-1">
                                        Email
                                    </h3>

                                    <a
                                        href="mailto:publicfinance@ngf.org.ng"
                                        className="text-gray-600 hover:text-[#012c14]"
                                    >
                                        publicfinance@ngf.org.ng
                                    </a>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="bg-[#012c14]/10 p-3 rounded-xl">
                                    <Phone className="text-[#012c14]" size={22} />
                                </div>

                                <div>
                                    <h3 className="font-semibold text-[#012c14] mb-1">
                                        Telephone
                                    </h3>

                                    <p className="text-gray-600 leading-7">
                                        +234 (0) 92920025 <br />
                                        +234 (0) 92920026
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="bg-[#012c14]/10 p-3 rounded-xl">
                                    <Globe className="text-[#012c14]" size={22} />
                                </div>

                                <div>
                                    <h3 className="font-semibold text-[#012c14] mb-1">
                                        Website
                                    </h3>

                                    <a
                                        href="https://www.ngf.org.ng"
                                        target="_blank"
                                        className="text-gray-600 hover:text-[#012c14]"
                                    >
                                        www.ngf.org.ng
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT SIDE IMAGE */}
                    <div className="relative">

                        <div className="overflow-hidden rounded-3xl shadow-2xl">
                            <Image
                                src="/ngf-logo.png"
                                alt="Contact Us"
                                width={900}
                                height={900}
                                className="
                  w-full h-full object-cover
                  hover:scale-105 transition-transform duration-700
                "
                            />
                        </div>

                        {/* Floating Card */}
                        <div
                            className="
                hidden md:flex
                absolute bottom-6 left-6
                bg-white/90 backdrop-blur-md
                rounded-2xl shadow-xl
                px-6 py-5
                items-center gap-4
              "
                        >
                            <div className="bg-[#012c14] p-3 rounded-xl">
                                <Phone className="text-white" />
                            </div>

                            <div>
                                <p className="text-sm text-gray-500">
                                    Need Immediate Help?
                                </p>

                                <p className="font-semibold text-[#012c14]">
                                    +234 (0) 92920025
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}