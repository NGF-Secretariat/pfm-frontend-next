"use client";

import { useState, type FormEvent } from "react";
import Image from "next/image";
import {
    Mail,
    Phone,
    Globe,
    MapPin,
    SendHorizonal,
    Loader2,
} from "lucide-react";
import { toast } from "react-toastify";
import contactService from "../../service/contactService";
import httpService from "../../service/httpService";

const initialForm = {
    firstName: "",
    lastName: "",
    email: "",
    message: "",
};

export default function ContactPage() {
    const [form, setForm] = useState(initialForm);
    const [submitting, setSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const updateField = (field: keyof typeof initialForm, value: string) => {
        setForm((prev) => ({ ...prev, [field]: value }));
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const first_name = form.firstName.trim();
        const last_name = form.lastName.trim();
        const email = form.email.trim();
        const message = form.message.trim();

        if (!first_name || !last_name || !email || !message) {
            toast.error("Please fill in all required fields.");
            return;
        }

        setSubmitting(true);

        try {
            const { data } = await contactService.submit({
                first_name,
                last_name,
                email,
                message,
            });

            if (data?.success) {
                const successMessage =
                    data?.message || "Thank you. Your message has been sent successfully.";
                httpService.showSuccess(successMessage);
                setForm(initialForm);
                setSubmitted(true);
            } else {
                toast.error(data?.message || "Unable to send your message. Please try again.");
            }
        } catch (error) {
            httpService.showFeedback(error);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <section className="w-full bg-[#f7f9f8] py-12 sm:py-14">
            <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">

                <div className="mb-12 text-center">
                    <h1 className="text-4xl sm:text-5xl font-bubblegum text-[#012c14]">
                        Contact Us
                    </h1>
                    <p className="text-gray-600 mt-4 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
                        Have questions, feedback, or inquiries about the Public Finance
                        Database? Reach out to us and our team will respond promptly.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">

                    <div className="bg-white rounded-3xl shadow-xl p-6 sm:p-8 min-w-0">
                        <h2 className="text-2xl font-semibold text-[#012c14] mb-6">
                            Get in Touch
                        </h2>

                        {submitted ? (
                            <div className="mb-8 rounded-xl border border-[#5DCAA5] bg-[#5DCAA5]/10 px-5 py-4">
                                <p className="text-[#012c14] font-semibold">
                                    Message sent successfully
                                </p>
                                <p className="text-gray-600 mt-1 text-sm leading-relaxed">
                                    We have received your inquiry and will get back to you soon.
                                </p>
                                <button
                                    type="button"
                                    onClick={() => setSubmitted(false)}
                                    className="mt-4 text-sm font-semibold text-[#1D9E75] hover:text-[#012c14] transition-colors"
                                >
                                    Send another message
                                </button>
                            </div>
                        ) : null}

                        <form className="space-y-5" onSubmit={handleSubmit} noValidate>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="firstName" className="sr-only">
                                        First Name
                                    </label>
                                    <input
                                        id="firstName"
                                        name="first_name"
                                        type="text"
                                        placeholder="First Name"
                                        value={form.firstName}
                                        onChange={(e) => updateField("firstName", e.target.value)}
                                        required
                                        disabled={submitting}
                                        autoComplete="given-name"
                                        className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:ring-2 focus:ring-[#012c14]/30 transition-all disabled:opacity-60"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="lastName" className="sr-only">
                                        Last Name
                                    </label>
                                    <input
                                        id="lastName"
                                        name="last_name"
                                        type="text"
                                        placeholder="Last Name"
                                        value={form.lastName}
                                        onChange={(e) => updateField("lastName", e.target.value)}
                                        required
                                        disabled={submitting}
                                        autoComplete="family-name"
                                        className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:ring-2 focus:ring-[#012c14]/30 transition-all disabled:opacity-60"
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="email" className="sr-only">
                                    Email Address
                                </label>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder="Email Address"
                                    value={form.email}
                                    onChange={(e) => updateField("email", e.target.value)}
                                    required
                                    disabled={submitting}
                                    autoComplete="email"
                                    className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:ring-2 focus:ring-[#012c14]/30 transition-all disabled:opacity-60"
                                />
                            </div>

                            <div>
                                <label htmlFor="message" className="sr-only">
                                    Message
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    rows={7}
                                    placeholder="Enter your message..."
                                    value={form.message}
                                    onChange={(e) => updateField("message", e.target.value)}
                                    required
                                    disabled={submitting}
                                    className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none resize-none focus:ring-2 focus:ring-[#012c14]/30 transition-all disabled:opacity-60"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={submitting}
                                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#012c14] text-white px-8 py-3 rounded-xl hover:bg-[#014d24] transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-60 disabled:cursor-not-allowed"
                            >
                                {submitting ? (
                                    <>
                                        <Loader2 size={18} className="animate-spin" />
                                        Sending...
                                    </>
                                ) : (
                                    <>
                                        Send Message
                                        <SendHorizonal size={18} />
                                    </>
                                )}
                            </button>
                        </form>

                        <div className="mt-10 space-y-6">
                            <ContactInfoRow
                                icon={<MapPin className="text-[#012c14]" size={22} />}
                                title="Address"
                            >
                                <p className="text-gray-600 leading-7">
                                    49/51, Lake Chad Crescent <br />
                                    Maitama, Abuja <br />
                                    Federal Capital Territory <br />
                                    Nigeria
                                </p>
                            </ContactInfoRow>

                            <ContactInfoRow
                                icon={<Mail className="text-[#012c14]" size={22} />}
                                title="Email"
                            >
                                <a
                                    href="mailto:publicfinance@ngf.org.ng"
                                    className="text-gray-600 hover:text-[#012c14]"
                                >
                                    publicfinance@ngf.org.ng
                                </a>
                            </ContactInfoRow>

                            <ContactInfoRow
                                icon={<Phone className="text-[#012c14]" size={22} />}
                                title="Telephone"
                            >
                                <p className="text-gray-600 leading-7">
                                    +234 (0) 92920025 <br />
                                    +234 (0) 92920026
                                </p>
                            </ContactInfoRow>

                            <ContactInfoRow
                                icon={<Globe className="text-[#012c14]" size={22} />}
                                title="Website"
                            >
                                <a
                                    href="https://www.ngf.org.ng"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-gray-600 hover:text-[#012c14]"
                                >
                                    www.ngf.org.ng
                                </a>
                            </ContactInfoRow>
                        </div>
                    </div>

                    <div className="relative min-w-0">
                        <div className="overflow-hidden rounded-3xl shadow-2xl bg-white flex items-center justify-center p-8 sm:p-12">
                            <Image
                                src="/ngf-logo.png"
                                alt="Nigeria Governors' Forum"
                                width={480}
                                height={480}
                                className="w-full max-w-md h-auto object-contain"
                                priority
                            />
                        </div>

                        <div className="hidden md:flex absolute bottom-6 left-6 bg-white/90 backdrop-blur-md rounded-2xl shadow-xl px-6 py-5 items-center gap-4">
                            <div className="bg-[#012c14] p-3 rounded-xl">
                                <Phone className="text-white" size={22} />
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Need Immediate Help?</p>
                                <p className="font-semibold text-[#012c14]">+234 (0) 92920025</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

function ContactInfoRow({
    icon,
    title,
    children,
}: {
    icon: React.ReactNode;
    title: string;
    children: React.ReactNode;
}) {
    return (
        <div className="flex items-start gap-4">
            <div className="bg-[#012c14]/10 p-3 rounded-xl shrink-0">{icon}</div>
            <div className="min-w-0">
                <h3 className="font-semibold text-[#012c14] mb-1">{title}</h3>
                {children}
            </div>
        </div>
    );
}
