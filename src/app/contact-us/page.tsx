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
        <section className="w-full bg-[#f7f9f8] py-16 sm:py-20 min-h-[85vh] flex flex-col justify-center animate-fade-in">
            <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 w-full">

                <div className="mb-12 sm:mb-16 text-center">
                    <h1 className="text-4xl sm:text-5xl font-bubblegum text-[#012c14]">
                        Contact Us
                    </h1>
                    <p className="text-gray-600 mt-4 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
                        Have questions, feedback, or inquiries about the Public Finance
                        Database? Reach out to us and our team will respond promptly.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 items-stretch">

                    {/* Left Form Card (3/5 width) */}
                    <div className="lg:col-span-3 bg-white rounded-[32px] shadow-xl p-8 sm:p-10 border border-gray-100/50 flex flex-col justify-between min-w-0">
                        <div>
                            <h2 className="text-2xl font-bold text-[#012c14] mb-2">
                                Send us a Message
                            </h2>
                            <p className="text-gray-500 text-sm mb-8">
                                Please fill in the details below. All fields are required.
                            </p>

                            {submitted ? (
                                <div className="mb-8 rounded-2xl border border-[#5DCAA5] bg-[#5DCAA5]/10 px-5 py-4 animate-fade-in">
                                    <p className="text-[#012c14] font-semibold">
                                        Message sent successfully!
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

                            {!submitted && (
                                <form className="space-y-6" onSubmit={handleSubmit} noValidate>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                        <div>
                                            <label htmlFor="firstName" className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2 pl-1">
                                                First Name
                                            </label>
                                            <input
                                                id="firstName"
                                                name="first_name"
                                                type="text"
                                                placeholder="e.g. John"
                                                value={form.firstName}
                                                onChange={(e) => updateField("firstName", e.target.value)}
                                                required
                                                disabled={submitting}
                                                autoComplete="given-name"
                                                className="w-full rounded-2xl border border-gray-200 px-4 py-3.5 outline-none focus:ring-2 focus:ring-[#016630]/20 focus:border-[#016630] transition-all bg-gray-50/50 focus:bg-white text-gray-800 disabled:opacity-60"
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="lastName" className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2 pl-1">
                                                Last Name
                                            </label>
                                            <input
                                                id="lastName"
                                                name="last_name"
                                                type="text"
                                                placeholder="e.g. Doe"
                                                value={form.lastName}
                                                onChange={(e) => updateField("lastName", e.target.value)}
                                                required
                                                disabled={submitting}
                                                autoComplete="family-name"
                                                className="w-full rounded-2xl border border-gray-200 px-4 py-3.5 outline-none focus:ring-2 focus:ring-[#016630]/20 focus:border-[#016630] transition-all bg-gray-50/50 focus:bg-white text-gray-800 disabled:opacity-60"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label htmlFor="email" className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2 pl-1">
                                            Email Address
                                        </label>
                                        <input
                                            id="email"
                                            name="email"
                                            type="email"
                                            placeholder="e.g. john@example.com"
                                            value={form.email}
                                            onChange={(e) => updateField("email", e.target.value)}
                                            required
                                            disabled={submitting}
                                            autoComplete="email"
                                            className="w-full rounded-2xl border border-gray-200 px-4 py-3.5 outline-none focus:ring-2 focus:ring-[#016630]/20 focus:border-[#016630] transition-all bg-gray-50/50 focus:bg-white text-gray-800 disabled:opacity-60"
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="message" className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2 pl-1">
                                            Message
                                        </label>
                                        <textarea
                                            id="message"
                                            name="message"
                                            rows={6}
                                            placeholder="Write your query or message here..."
                                            value={form.message}
                                            onChange={(e) => updateField("message", e.target.value)}
                                            required
                                            disabled={submitting}
                                            className="w-full rounded-2xl border border-gray-200 px-4 py-3.5 outline-none resize-none focus:ring-2 focus:ring-[#016630]/20 focus:border-[#016630] transition-all bg-gray-50/50 focus:bg-white text-gray-800 disabled:opacity-60 leading-relaxed"
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={submitting}
                                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#012c14] text-white px-8 py-3.5 rounded-full hover:bg-[#014d24] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 shadow-md hover:shadow-lg disabled:opacity-60 disabled:cursor-not-allowed font-semibold text-sm"
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
                            )}
                        </div>
                    </div>

                    {/* Right Info Card (2/5 width) */}
                    <div className="lg:col-span-2 bg-gradient-to-br from-[#012c14] to-[#014c24] text-white rounded-[32px] p-8 sm:p-10 shadow-2xl relative overflow-hidden flex flex-col justify-between min-h-[500px]">
                        {/* Glassmorphism ambient glows */}
                        <div className="bg-white/5 w-64 h-64 rounded-full -top-16 -right-16 absolute pointer-events-none filter blur-xl"></div>
                        <div className="bg-white/5 w-36 h-36 rounded-full -bottom-10 -left-10 absolute pointer-events-none filter blur-lg"></div>

                        <div className="relative z-10">
                            <h2 className="text-2xl font-bold mb-2">Contact Info</h2>
                            <p className="text-green-200/70 text-sm mb-10">
                                Reach out directly through these communication channels.
                            </p>

                            <div className="space-y-8">
                                <div className="flex items-start gap-4">
                                    <div className="bg-white/10 text-green-300 p-3.5 rounded-2xl shrink-0 flex items-center justify-center">
                                        <MapPin size={22} />
                                    </div>
                                    <div className="min-w-0">
                                        <h3 className="text-xs font-semibold uppercase tracking-wider text-green-300/80 mb-1">
                                            Address
                                        </h3>
                                        <p className="text-white/95 leading-relaxed font-medium text-sm">
                                            49/51, Lake Chad Crescent <br />
                                            Maitama, Abuja <br />
                                            Federal Capital Territory, Nigeria
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="bg-white/10 text-green-300 p-3.5 rounded-2xl shrink-0 flex items-center justify-center">
                                        <Mail size={22} />
                                    </div>
                                    <div className="min-w-0">
                                        <h3 className="text-xs font-semibold uppercase tracking-wider text-green-300/80 mb-1">
                                            Email
                                        </h3>
                                        <a
                                            href="mailto:publicfinance@ngf.org.ng"
                                            className="text-white/95 hover:text-green-300 transition-colors font-medium text-sm block break-all"
                                        >
                                            publicfinance@ngf.org.ng
                                        </a>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="bg-white/10 text-green-300 p-3.5 rounded-2xl shrink-0 flex items-center justify-center">
                                        <Phone size={22} />
                                    </div>
                                    <div className="min-w-0">
                                        <h3 className="text-xs font-semibold uppercase tracking-wider text-green-300/80 mb-1">
                                            Telephone
                                        </h3>
                                        <p className="text-white/95 leading-relaxed font-medium text-sm">
                                            +234 (0) 92920025 <br />
                                            +234 (0) 92920026
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="bg-white/10 text-green-300 p-3.5 rounded-2xl shrink-0 flex items-center justify-center">
                                        <Globe size={22} />
                                    </div>
                                    <div className="min-w-0">
                                        <h3 className="text-xs font-semibold uppercase tracking-wider text-green-300/80 mb-1">
                                            Website
                                        </h3>
                                        <a
                                            href="https://www.ngf.org.ng"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-white/95 hover:text-green-300 transition-colors font-medium text-sm"
                                        >
                                            www.ngf.org.ng
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="relative z-10 mt-12 bg-white/5 border border-white/10 rounded-2xl p-5 backdrop-blur-sm">
                            <p className="text-xs font-semibold uppercase tracking-wider text-green-300/80 mb-1">
                                Office Hours
                            </p>
                            <p className="text-sm font-medium text-white/90">
                                Monday – Friday: 8:00 AM – 5:00 PM
                            </p>
                            <p className="text-xs text-white/50 mt-1">
                                Closed during weekends & public holidays.
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
