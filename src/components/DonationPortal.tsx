import React, { useState } from "react";
import { DollarSign, CheckCircle, Heart, QrCode } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
interface DonationPortalProps {
  onSuccess: (donation: any) => void;
  contactInfo?: {
      address: string;
      phoneNumbers: string[];
      emails: string[];
  };
  donationDetails?: {
      upiId: string;
      bankDetails: string;
  };
}
export default function DonationPortal({ onSuccess, contactInfo, donationDetails }: DonationPortalProps) {
  const [amount, setAmount] = useState<number>(5000);
  const [customAmount, setCustomAmount] = useState<string>("");
  const [donorName, setDonorName] = useState("");
  const [donorEmail, setDonorEmail] = useState("");
  const [message, setMessage] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<"UPI" | "Razorpay" | "Bank Transfer">("UPI");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [completedDonation, setCompletedDonation] = useState<any | null>(null);
  const presets = [1000, 2500, 5000, 10000, 25000];
  const currentAmt = customAmount ? Number(customAmount) : amount;
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    if (!donorName || !donorEmail || currentAmt <= 0) {
      setErrorMessage("Please fill in your name, email, and select/enter an amount.");
      return;
    }
    setIsLoading(true);
    try {
      const response = await fetch("/api/donate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          donorName,
          donorEmail,
          amount: currentAmt,
          paymentType: paymentMethod === "Bank Transfer" ? "Offline" : "Online",
          paymentMethod,
          message,
          transactionId: paymentMethod === "Bank Transfer" ? "NEFT-OFFLINE-" + Math.floor(Math.random() * 1000000) : "pay_" + Math.random().toString(36).substr(2, 9).toUpperCase()
        })
      });
      if (!response.ok) {
        throw new Error("Failed to process payment application.");
      }
      const result = await response.json();
      setCompletedDonation(result.donation);
      onSuccess(result.donation);
    }
    catch (err: any) {
      console.error(err);
      setErrorMessage("Error logging donation. Please try again or check connection.");
    }
    finally {
      setIsLoading(false);
    }
  };
  const handlePrint = () => {
    window.print();
  };
  return (<div id="donation-block" className="relative p-1 md:p-4 rounded-3xl bg-white border border-[#D63384]/10 shadow-[0_20px_50px_rgba(214,51,132,0.06)] overflow-hidden">
    <div className="absolute top-0 right-0 w-64 h-64 bg-radial from-[#D63384]/5 via-transparent to-transparent rounded-full -translate-y-12 translate-x-12 pointer-events-none" />
    <div className="absolute bottom-0 left-0 w-64 h-64 bg-radial from-[#7C3AED]/5 via-transparent to-transparent rounded-full translate-y-12 -translate-x-12 pointer-events-none" />

    <AnimatePresence mode="wait">
      {!completedDonation ? (<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
        <div className="mb-6">
          <span className="inline-block px-3 py-1 text-xs font-semibold tracking-wider text-[#D63384] bg-[#D63384]/10 rounded-full mb-3 uppercase">
            Support Our Mission
          </span>
          <h3 className="text-2xl font-bold tracking-tight text-gray-900 font-serif">
            Direct Social Empowerment Fund
          </h3>
          <p className="text-sm text-gray-500 mt-1">
            Your contributions directly fuel our silk looming upgrades, youth computers, and medical camps.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">

          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
              Select Donation Amount (₹ INR)
            </label>
            <div className="grid grid-cols-5 gap-2">
              {presets.map((p) => (<button key={p} type="button" onClick={() => {
                setAmount(p);
                setCustomAmount("");
              }} className={`py-2 text-xs md:text-sm font-semibold rounded-xl border transition-all duration-300 ${amount === p && !customAmount
                ? "border-[#D63384] bg-[#D63384] text-white shadow-md"
                : "border-gray-200 bg-gray-50 text-gray-700 hover:bg-[#D63384]/5"}`}>
                ₹{p.toLocaleString("en-IN")}
              </button>))}
            </div>
          </div>


          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-semibold text-sm">
              ₹ Custom
            </span>
            <input type="number" placeholder="Enter other amount" value={customAmount} onChange={(e) => {
              setCustomAmount(e.target.value);
            }} className="w-full pl-22 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#D63384]/30 focus:border-[#D63384] transition-all bg-gray-50/50" min="100" />
          </div>


          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="donor-full-name" className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
                Donor Full Name
              </label>
              <input id="donor-full-name" type="text" required placeholder="Write full name" value={donorName} onChange={(e) => setDonorName(e.target.value)} className="w-full px-4 py-2 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#D63384]/30 focus:border-[#D63384] transition-all bg-gray-50/50" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
                Email Address
              </label>
              <input type="email" required placeholder="name@domain.com" value={donorEmail} onChange={(e) => setDonorEmail(e.target.value)} className="w-full px-4 py-2 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#D63384]/30 focus:border-[#D63384] transition-all bg-gray-50/50" />
            </div>
          </div>


          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
              Blessing / Message (Optional)
            </label>
            <textarea placeholder="Say something to our women groups..." rows={2} value={message} onChange={(e) => setMessage(e.target.value)} className="w-full px-4 py-2 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#D63384]/30 focus:border-[#D63384] transition-all bg-gray-50/50 resize-none" />
          </div>


          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
              Choose Channel
            </label>
            <div className="grid grid-cols-2 gap-2">
              {(["UPI", "Bank Transfer"] as const).map((method) => (<button key={method} type="button" onClick={() => setPaymentMethod(method)} className={`p-3 rounded-xl border text-xs font-medium text-center transition-all ${paymentMethod === method
                ? "border-[#7C3AED] bg-[#7C3AED]/10 text-[#7C3AED] font-semibold"
                : "border-gray-200 bg-white text-gray-600 hover:bg-gray-50"}`}>
                {method === "UPI" && "⚡ UPI Pay"}
                {method === "Bank Transfer" && "Offline"}
              </button>))}
            </div>
          </div>


          <AnimatePresence mode="wait">
            {paymentMethod === "UPI" && (<motion.div key="upi" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} className="p-4 bg-purple-50/60 rounded-2xl border border-[#7C3AED]/20 flex items-center space-x-4">
              <div className="p-2 bg-white rounded-xl shadow-sm">
                <QrCode className="w-16 h-16 text-[#7C3AED]" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-gray-800 uppercase tracking-wider">
                  Instant UPI Transfer
                </h4>
                <p className="text-xs text-gray-500 mt-1">
                  Scan with GPay, PhonePe, or BHIM. <br />
                  <span className="font-mono text-[#7C3AED] font-semibold">{donationDetails?.upiId || "prochesta.mfi@okaxis"}</span>
                </p>
              </div>
            </motion.div>)}

            {paymentMethod === "Bank Transfer" && (<motion.div key="bank" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} className="p-4 bg-orange-50/60 rounded-2xl border border-orange-200 text-xs text-gray-700 space-y-4">
              <div className="space-y-2">
                <h4 className="font-bold text-orange-900 uppercase tracking-wider">
                  Contact NGO for Offline Payment
                </h4>
                {donationDetails?.bankDetails ? (
                  <div className="text-gray-600 font-mono text-[11px] whitespace-pre-line leading-relaxed pt-1">
                    {donationDetails.bankDetails}
                  </div>
                ) : (
                  <>
                    <p className="text-gray-600">Prochesta Multipurpose Co-Operative Society Asom Ltd.</p>
                    <p className="text-gray-600">Address: {contactInfo?.address?.replace(/\n/g, " ") || "2A, Sonadhar Senapati Path Silpukhuri Guwahati – 781003 Assam, India"}</p>
                    <p className="text-gray-600">Phone: {contactInfo?.phoneNumbers?.join(" / ") || "03612963506 / 03612660020"}</p>
                    <p className="text-gray-600">Email: {contactInfo?.emails?.join(" / ") || "prochesta@hotmail.com"}</p>
                  </>
                )}
              </div>
            </motion.div>)}

            {paymentMethod === "Razorpay" && (<motion.div key="razorpay" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} className="p-4 bg-pink-50/60 rounded-2xl border border-[#D63384]/20">
              <p className="text-xs text-gray-500">
                Our secure payment gateway supports all Indian Debit/Credit cards, NetBanking, and corporate payroll wallets securely utilizing 256-bit encryption.
              </p>
            </motion.div>)}
          </AnimatePresence>

          {errorMessage && (<div className="p-3 bg-red-50 text-red-600 rounded-xl border border-red-100 text-xs text-left font-semibold">
            ⚠️ {errorMessage}
          </div>)}


          <button type="submit" disabled={isLoading} className="w-full py-3 px-4 rounded-xl text-white font-semibold text-sm shadow-md transition-all cursor-pointer bg-gradient-to-r from-[#D63384] to-[#7C3AED] hover:from-[#c21f73] hover:to-[#6a30c9] flex items-center justify-center space-x-2">
            {isLoading ? (<span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />) : (<>
              <Heart className="w-4 h-4 fill-white" />
              <span>Authorize Donation of ₹{currentAmt.toLocaleString("en-IN")}</span>
            </>)}
          </button>
        </form>
      </motion.div>) : (<motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="p-4 text-center space-y-6">
        <div className="mx-auto w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center">
          <CheckCircle className="w-9 h-9 text-emerald-600" />
        </div>

        <div className="space-y-2">
          <h3 className="text-2xl font-bold text-gray-900 font-serif">
            Thank You, {completedDonation.donorName}!
          </h3>
          <p className="text-sm text-gray-500 max-w-sm mx-auto">
            Your donation of{" "}
            <span className="font-bold text-[#D63384]">
              ₹{completedDonation.amount.toLocaleString("en-IN")}
            </span>{" "}
            was logged and cataloged. This contribution will directly promote regional women's financial security.
          </p>
        </div>


        <div className="p-5 bg-gray-50 rounded-2xl border border-gray-200 text-left text-xs font-mono space-y-3 relative overflow-hidden receipt-sheet">
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#D63384] via-[#7C3AED] to-orange-400" />
          <div className="flex justify-between font-bold text-gray-700 text-sm border-b border-dashed border-gray-300 pb-2 mb-1">
            <span>DONATION RECEIPT</span>
            <span className="text-[#D63384]">PROCHESTA</span>
          </div>
          <div className="flex justify-between">
            <span>Receipt No:</span>
            <span className="font-semibold text-gray-900">{completedDonation.id}</span>
          </div>
          <div className="flex justify-between">
            <span>Transaction ID:</span>
            <span className="font-semibold text-gray-900">{completedDonation.transactionId}</span>
          </div>
          <div className="flex justify-between">
            <span>Donor Name:</span>
            <span className="font-semibold text-[#1F2937]">{completedDonation.donorName}</span>
          </div>
          <div className="flex justify-between">
            <span>Amount Paid:</span>
            <span className="font-bold text-emerald-700">₹{completedDonation.amount.toLocaleString("en-IN")} INR</span>
          </div>
          <div className="flex justify-between">
            <span>Channel:</span>
            <span className="font-semibold text-gray-900">{completedDonation.paymentMethod} ({completedDonation.paymentType})</span>
          </div>
          <div className="flex justify-between pt-1 border-t border-dashed border-gray-300">
            <span>Authorized Date:</span>
            <span className="font-semibold text-gray-900">
              {new Date(completedDonation.date).toLocaleDateString("en-IN", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          </div>
          <p className="text-[10px] text-gray-400 text-center leading-tight pt-2">
            Subject to Section 80G deduction limits of the Income Tax Act. <br />
            Guwahati, Assam, India. Thank you for your goodwill!
          </p>
        </div>

        <div className="flex space-x-3 pt-2">
          <button onClick={handlePrint} className="flex-1 py-2.5 px-4 rounded-xl border border-gray-300 text-gray-700 font-medium text-xs hover:bg-gray-50">
            🖨️ Print Receipt
          </button>
          <button onClick={() => setCompletedDonation(null)} className="flex-1 py-2.5 px-4 rounded-xl text-white font-medium text-xs bg-gray-900 hover:bg-gray-800">
            Donate Again
          </button>
        </div>
      </motion.div>)}
    </AnimatePresence>
  </div>);
}
