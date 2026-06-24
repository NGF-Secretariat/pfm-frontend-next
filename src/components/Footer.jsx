'use client'

import FacebookIcon from "@mui/icons-material/Facebook";
import XIcon from "@mui/icons-material/X";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import YouTubeIcon from "@mui/icons-material/YouTube";
import Image from "next/image";

const Footer = () => {
    const NAV_LINKS = [
        { label: "Home", href: "/" },
        { label: "Group Explorer", href: "/group-explorer" },
        { label: "State Explorer", href: "/state-explorer" },
        { label: "Blog Post", href: "/blog-post" },
        { label: "Resources", href: "https://ngfrepository.org.ng:8443/handle/123456789/5632" },
        { label: "Contact Us", href: "/contact-us" },
    ];

    const SOCIALS = [
        { label: "X", icon: <XIcon fontSize="inherit" />, href: "https://x.com/NGFSecretariat" },
        { label: "Facebook", icon: <FacebookIcon fontSize="inherit" />, href: "https://www.facebook.com/NGFSecretariat" },
        { label: "LinkedIn", icon: <LinkedInIcon fontSize="inherit" />, href: "https://linkedin.com/company/nigeria-governors-forum" },
        { label: "Instagram", icon: <InstagramIcon fontSize="inherit" />, href: "https://instagram.com/ngfsecretariat/" },
        { label: "YouTube", icon: <YouTubeIcon fontSize="inherit" />, href: "https://www.youtube.com/channel/UC0R526d-XlJ1xS8B_5gQ00w" },
    ];

    return (
        <div className="bg-[#012c14] pt-12 mt-auto w-full">
            <div className="mx-auto px-8 pb-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
                <div>
                    <div className="flex items-center gap-3 mb-4">
                        <Image src="/ngf-logo.png" alt="NGF Logo" width={100} height={100} loading="lazy" />
                        <div>
                            <p className="text-xs font-bold text-white leading-tight">Nigeria Governors' Forum</p>
                            <p className="text-sm text-[#5DCAA5]">Public Finance Database</p>
                        </div>
                    </div>
                    <p className="text-sm text-[#7aad96] leading-relaxed">
                        Open-source fiscal data for Nigeria's 36 state governments. Promoting transparency and accountability.
                    </p>
                </div>

                {/* Navigation */}
                <div>
                    <p className="text-xs font-bold text-[#5DCAA5] uppercase tracking-widest mb-4">Navigation</p>
                    <nav className="flex flex-col gap-2">
                        {NAV_LINKS.map((l) => (
                            <a
                                key={l.label}
                                href={l.href}
                                className="text-[13px] text-[#a5c9bc] font-poppins hover:text-white hover:pl-1 transition-all duration-200"
                            >
                                {l.label}
                            </a>
                        ))}
                    </nav>
                </div>

                {/* Budget Types */}
                <div>
                    <p className="text-xs font-bold text-[#5DCAA5] uppercase tracking-widest mb-4 ">Budget Data</p>
                    <div className="flex flex-col gap-2">
                        {[
                            { label: "Original Budget", href: "/group-explorer?type=original&year=2018&categories=all&states=all" },
                            { label: "Actual Expenditure", href: "/group-explorer?type=actual&year=2018&categories=all&states=all" },
                            { label: "Performance Indicators", href: "/group-explorer?type=pi&year=2019&categories=all&states=all" },
                            { label: "Compare States", href: "/group-explorer" },
                            { label: "Rank States", href: "/rank-data" },
                        ].map((l) => (
                            <a
                                key={l.label}
                                href={l.href}
                                className="text-[13px] text-[#a5c9bc] hover:text-white hover:pl-1 transition-all duration-200"
                            >
                                {l.label}
                            </a>
                        ))}
                    </div>
                </div>

                {/* Social */}
                <div>
                    <p className="text-xs font-bold text-[#5DCAA5] uppercase tracking-widest mb-4">Follow Us</p>
                    <div className="flex gap-2 flex-wrap">
                        {SOCIALS.map((s) => (
                            <a
                                key={s.label}
                                href={s.href}
                                aria-label={s.label}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-9 h-9 text-[18px] rounded-lg bg-[#1D9E75]/15 border border-[#1D9E75]/30 flex items-center justify-center text-[#5DCAA5] hover:bg-[#1D9E75] hover:border-[#1D9E75] hover:text-white transition-all duration-300"
                            >
                                {s.icon}
                            </a>
                        ))}
                    </div>
                    <p className="text-[13px] text-[#7aad96] mt-5 leading-relaxed">
                        Stay informed about Nigeria's public finances and governance updates.
                    </p>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="bg-[#012c14] px-6 py-6">
                <div className="max-w-[1140px] mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
                    <p className="text-[#7aad96] text-sm text-center sm:text-left">
                        © {new Date().getFullYear()} Nigeria Governors' Forum. All rights reserved.
                    </p>
                    <div className="flex items-center gap-6">
                        {["Privacy Policy", "Terms of Use"].map((t) => (
                            <a key={t} href="#" className="text-sm text-[#7aad96] hover:text-white transition-colors">
                                {t}
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Footer;