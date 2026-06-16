'use client'

import { useState } from "react"
import budgetService from "../service/budgetService"

const SignUpUpdate = () => {
    const [email, setEmail] = useState('')
    const [subscribed, setSubscribed] = useState(false)
    const [loading, setLoading] = useState(false)

    const handleSubscribe = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            await budgetService.subscribe(email)
            setSubscribed(true)
        } catch (error) {
            console.error("Failed to subscribe:", error)
            alert("An error occurred while subscribing. Please try again.")
        } finally {
            setLoading(false)
        }
    }

    return (
        <section className="px-4 sm:px-6 lg:px-8 pb-12">
            <div className="p-5 max-w-[520px] mx-auto text-center mt-10">
                <div className="w-12 h-12 rounded-full bg-[#1D9E75]/20 flex items-center justify-center mx-auto mb-5 animate-bounce animate-delay-1000">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1D9E75" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0" />
                    </svg>
                </div>
                <h2 className="text-[26px] font-bold text-[#012c13] mb-2.5">Sign up for updates</h2>
                <p className="text-lg text-[#012c13] mb-7 leading-relaxed">
                    Receive updates on the go, whenever the portal is updated with new fiscal data.
                </p>
                {subscribed ? (
                    <div className="bg-[#5DCAA5]/15 border-[1.5px] border-[#5DCAA5] rounded-[10px] px-6 py-[18px]">
                        <p className="text-[#5DCAA5] font-semibold text-[15px]">✓ You&apos;re subscribed! We&apos;ll notify you when new data is published.</p>
                    </div>
                ) : (
                    <form onSubmit={handleSubscribe} className="flex rounded-lg overflow-hidden border-2 border-[#012c14] bg-white">
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email address"
                            required
                            className="flex-1 px-4 py-3 border-none outline-none text-sm text-[#012c14] cursor-pointer font-[inherit]"
                        />
                        <button
                            type="submit"
                            disabled={loading}
                            className="bg-[#012c14] hover:bg-[#0f6e56] disabled:opacity-70 text-white px-[22px] font-bold text-sm whitespace-nowrap transition-colors duration-150"
                        >
                            {loading ? 'Subscribing...' : 'Notify me'}
                        </button>
                    </form>
                )}
            </div>
        </section>
    )
}

export default SignUpUpdate