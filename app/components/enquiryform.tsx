// 'use client';
// import React, { useState } from 'react';
// import { X, Send, User, Mail, Phone, MessageSquare, HelpCircle, CheckCircle2 } from 'lucide-react';

// interface EnquiryFormProps {
//   isOpen?: boolean;
//   onClose?: () => void;
// }

// export default function EnquiryForm({ isOpen = true, onClose }: EnquiryFormProps) {
//   const [formData, setFormData] = useState({
//     fullName: '',
//     email: '',
//     phone: '',
//     inquiryType: 'general',
//     subject: '',
//     message: '',
//   });

//   const [isSubmitted, setIsSubmitted] = useState(false);
//   const [loading, setLoading] = useState(false);

//   // If isOpen is false, don't render anything
//   if (!isOpen) return null;

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);

//     // Simulate API call
//     setTimeout(() => {
//       setLoading(false);
//       setIsSubmitted(true);
//     }, 1000);
//   };

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-950/70 backdrop-blur-md transition-all duration-300">
//       {/* Modal Container */}
//       <div className="w-full max-w-2xl bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl relative overflow-hidden text-neutral-100 p-6 md:p-8 max-h-[90vh] overflow-y-auto">
//         {/* Close Button */}
//         <button
//           onClick={onClose}
//           type="button"
//           aria-label="Close form"
//           className="absolute top-5 right-5 p-2 text-neutral-400 hover:text-white bg-neutral-800/50 hover:bg-neutral-800 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-600 z-10"
//         >
//           <X className="h-5 w-5" />
//         </button>

//         {/* Form Header */}
//         <div className="mb-6 border-b border-neutral-800 pb-4 pr-10">
//           <h2 className="text-2xl font-bold tracking-tight text-white uppercase flex items-center gap-2">
//             Enquiry Form
//           </h2>
//           <p className="text-sm text-neutral-400 mt-1">
//             Have a question or inquiry? Fill out the form below and we’ll get back to you shortly.
//           </p>
//         </div>

//         {isSubmitted ? (
//           /* Success Message */
//           <div className="py-12 flex flex-col items-center justify-center text-center space-y-4">
//             <div className="p-4 bg-emerald-500/10 text-emerald-500 rounded-full">
//               <CheckCircle2 className="w-12 h-12" />
//             </div>
//             <h3 className="text-xl font-semibold text-white">Thank You!</h3>
//             <p className="text-neutral-400 max-w-md">
//               Your inquiry has been submitted successfully. Our team will review your message and reach out to you soon.
//             </p>
//             <button
//               onClick={() => {
//                 setIsSubmitted(false);
//                 setFormData({
//                   fullName: '',
//                   email: '',
//                   phone: '',
//                   inquiryType: 'general',
//                   subject: '',
//                   message: '',
//                 });
//               }}
//               className="mt-4 px-6 py-2.5 bg-neutral-800 hover:bg-neutral-700 text-white rounded-lg text-sm font-medium transition-colors"
//             >
//               Send Another Enquiry
//             </button>
//           </div>
//         ) : (
//           /* Form Content */
//           <form onSubmit={handleSubmit} className="space-y-4">
//             {/* Grid Layout for Personal Details */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               {/* Full Name */}
//               <div>
//                 <label htmlFor="fullName" className="block text-xs font-medium text-neutral-300 uppercase tracking-wider mb-1">
//                   Full Name <span className="text-red-500">*</span>
//                 </label>
//                 <div className="relative">
//                   <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-neutral-500">
//                     <User className="h-4 w-4" />
//                   </div>
//                   <input
//                     type="text"
//                     id="fullName"
//                     name="fullName"
//                     required
//                     value={formData.fullName}
//                     onChange={handleChange}
//                     placeholder="John Doe"
//                     className="w-full pl-10 pr-4 py-2.5 bg-neutral-800/80 border border-neutral-700 rounded-lg text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 transition-colors"
//                   />
//                 </div>
//               </div>

//               {/* Email */}
//               <div>
//                 <label htmlFor="email" className="block text-xs font-medium text-neutral-300 uppercase tracking-wider mb-1">
//                   Email Address <span className="text-red-500">*</span>
//                 </label>
//                 <div className="relative">
//                   <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-neutral-500">
//                     <Mail className="h-4 w-4" />
//                   </div>
//                   <input
//                     type="email"
//                     id="email"
//                     name="email"
//                     required
//                     value={formData.email}
//                     onChange={handleChange}
//                     placeholder="john@example.com"
//                     className="w-full pl-10 pr-4 py-2.5 bg-neutral-800/80 border border-neutral-700 rounded-lg text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 transition-colors"
//                   />
//                 </div>
//               </div>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               {/* Phone */}
//               <div>
//                 <label htmlFor="phone" className="block text-xs font-medium text-neutral-300 uppercase tracking-wider mb-1">
//                   Phone Number
//                 </label>
//                 <div className="relative">
//                   <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-neutral-500">
//                     <Phone className="h-4 w-4" />
//                   </div>
//                   <input
//                     type="tel"
//                     id="phone"
//                     name="phone"
//                     value={formData.phone}
//                     onChange={handleChange}
//                     placeholder="+1 (555) 000-0000"
//                     className="w-full pl-10 pr-4 py-2.5 bg-neutral-800/80 border border-neutral-700 rounded-lg text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 transition-colors"
//                   />
//                 </div>
//               </div>

//               {/* Inquiry Type */}
//               <div>
//                 <label htmlFor="inquiryType" className="block text-xs font-medium text-neutral-300 uppercase tracking-wider mb-1">
//                   Inquiry Type
//                 </label>
//                 <div className="relative">
//                   <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-neutral-500">
//                     <HelpCircle className="h-4 w-4" />
//                   </div>
//                   <select
//                     id="inquiryType"
//                     name="inquiryType"
//                     value={formData.inquiryType}
//                     onChange={handleChange}
//                     className="w-full pl-10 pr-4 py-2.5 bg-neutral-800/80 border border-neutral-700 rounded-lg text-sm text-white focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 transition-colors"
//                   >
//                     <option value="general">General Inquiry</option>
//                     <option value="sales">Sales & Pricing</option>
//                     <option value="support">Technical Support</option>
//                     <option value="partnership">Partnership</option>
//                   </select>
//                 </div>
//               </div>
//             </div>

//             {/* Subject */}
//             <div>
//               <label htmlFor="subject" className="block text-xs font-medium text-neutral-300 uppercase tracking-wider mb-1">
//                 Subject <span className="text-red-500">*</span>
//               </label>
//               <input
//                 type="text"
//                 id="subject"
//                 name="subject"
//                 required
//                 value={formData.subject}
//                 onChange={handleChange}
//                 placeholder="How can we help?"
//                 className="w-full px-4 py-2.5 bg-neutral-800/80 border border-neutral-700 rounded-lg text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 transition-colors"
//               />
//             </div>

//             {/* Message */}
//             <div>
//               <label htmlFor="message" className="block text-xs font-medium text-neutral-300 uppercase tracking-wider mb-1">
//                 Message <span className="text-red-500">*</span>
//               </label>
//               <div className="relative">
//                 <textarea
//                   id="message"
//                   name="message"
//                   required
//                   rows={4}
//                   value={formData.message}
//                   onChange={handleChange}
//                   placeholder="Please describe your inquiry in detail..."
//                   className="w-full p-3 bg-neutral-800/80 border border-neutral-700 rounded-lg text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 transition-colors resize-none"
//                 />
//               </div>
//             </div>

//             {/* Submit Button */}
//             <div className="pt-2">
//               <button
//                 type="submit"
//                 disabled={loading}
//                 className="w-full flex items-center justify-center gap-2 py-3 px-6 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg text-sm shadow-md hover:shadow-red-600/20 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
//               >
//                 {loading ? (
//                   <span>Submitting...</span>
//                 ) : (
//                   <>
//                     <span>Send Message</span>
//                     <Send className="w-4 h-4" />
//                   </>
//                 )}
//               </button>
//             </div>
//           </form>
//         )}
//       </div>
//     </div>
//   );
// }

'use client';
import React, { useState } from 'react';
import { X, Send, User, Mail, Phone, HelpCircle, CheckCircle2 } from 'lucide-react';

interface EnquiryFormProps {
  isOpen?: boolean;
  onClose?: () => void;
  productName?: string;
  selectedConfig?: string;
}

export default function EnquiryForm({ isOpen = true, onClose, productName, selectedConfig }: EnquiryFormProps) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    inquiryType: 'general',
    subject: '',
    message: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  // If isOpen is false, don't render anything
  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setIsSubmitted(true);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-950/80 backdrop-blur-md transition-all duration-300">
      {/* Modal Container */}
      <div className="w-full max-w-lg bg-neutral-900 border border-neutral-800 rounded-3xl shadow-2xl relative overflow-hidden text-neutral-100 p-6 sm:p-8 max-h-[90vh] overflow-y-auto space-y-6">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          type="button"
          aria-label="Close form"
          className="absolute top-6 right-6 p-2 text-neutral-400 hover:text-white bg-neutral-800/50 hover:bg-neutral-800 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-600 z-10"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Form Header */}
        <div className="space-y-1 pr-10 border-b border-neutral-800 pb-4">
          <span className="text-xs uppercase tracking-widest text-red-500 font-semibold">
            Hardware Quotation Enquiry
          </span>
          <h2 className="text-2xl font-bold tracking-tight text-white">
            {productName || "Enquiry Form"}
          </h2>
          {selectedConfig && (
            <p className="text-xs text-neutral-400">
              Selected Config: <span className="text-white">{selectedConfig}</span>
            </p>
          )}
        </div>

        {isSubmitted ? (
          /* Success Message */
          <div className="py-12 flex flex-col items-center justify-center text-center space-y-4">
            <div className="p-4 bg-emerald-500/10 text-emerald-500 rounded-full border border-emerald-500/20">
              <CheckCircle2 className="w-12 h-12" />
            </div>
            <h3 className="text-xl font-semibold text-white">Enquiry Received!</h3>
            <p className="text-neutral-400 text-xs max-w-xs mx-auto">
              Thank you. Our team will review your message and reach out to you soon with a detailed quotation.
            </p>
            <button
              onClick={() => {
                setIsSubmitted(false);
                setFormData({
                  fullName: '',
                  email: '',
                  phone: '',
                  inquiryType: 'general',
                  subject: '',
                  message: '',
                });
              }}
              className="mt-4 px-6 py-2.5 bg-neutral-800 hover:bg-neutral-700 text-white rounded-xl text-xs font-medium transition-colors"
            >
              Send Another Enquiry
            </button>
          </div>
        ) : (
          /* Form Content */
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Full Name */}
              <div>
                <label htmlFor="fullName" className="block text-xs font-medium text-neutral-300 uppercase tracking-wider mb-1">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-neutral-500">
                    <User className="h-4 w-4" />
                  </div>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    required
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="John Doe"
                    className="w-full pl-10 pr-4 py-2.5 bg-neutral-800/80 border border-neutral-700 rounded-xl text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 transition-colors"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-xs font-medium text-neutral-300 uppercase tracking-wider mb-1">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-neutral-500">
                    <Mail className="h-4 w-4" />
                  </div>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    className="w-full pl-10 pr-4 py-2.5 bg-neutral-800/80 border border-neutral-700 rounded-xl text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 transition-colors"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Phone */}
              <div>
                <label htmlFor="phone" className="block text-xs font-medium text-neutral-300 uppercase tracking-wider mb-1">
                  Phone Number
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-neutral-500">
                    <Phone className="h-4 w-4" />
                  </div>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+1 (555) 000-0000"
                    className="w-full pl-10 pr-4 py-2.5 bg-neutral-800/80 border border-neutral-700 rounded-xl text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 transition-colors"
                  />
                </div>
              </div>

              {/* Inquiry Type */}
              <div>
                <label htmlFor="inquiryType" className="block text-xs font-medium text-neutral-300 uppercase tracking-wider mb-1">
                  Inquiry Type
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-neutral-500">
                    <HelpCircle className="h-4 w-4" />
                  </div>
                  <select
                    id="inquiryType"
                    name="inquiryType"
                    value={formData.inquiryType}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-2.5 bg-neutral-800/80 border border-neutral-700 rounded-xl text-sm text-white focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 transition-colors"
                  >
                    <option value="general">General Inquiry</option>
                    <option value="sales">Sales & Pricing</option>
                    <option value="support">Technical Support</option>
                    <option value="partnership">Partnership</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Subject */}
            <div>
              <label htmlFor="subject" className="block text-xs font-medium text-neutral-300 uppercase tracking-wider mb-1">
                Subject <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                required
                value={formData.subject}
                onChange={handleChange}
                placeholder="How can we help?"
                className="w-full px-4 py-2.5 bg-neutral-800/80 border border-neutral-700 rounded-xl text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 transition-colors"
              />
            </div>

            {/* Message */}
            <div>
              <label htmlFor="message" className="block text-xs font-medium text-neutral-300 uppercase tracking-wider mb-1">
                Message <span className="text-red-500">*</span>
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={4}
                value={formData.message}
                onChange={handleChange}
                placeholder="Please describe your inquiry in detail..."
                className="w-full p-3 bg-neutral-800/80 border border-neutral-700 rounded-xl text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 transition-colors resize-none"
              />
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 py-3 px-6 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-xl text-sm shadow-md hover:shadow-red-600/20 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <span>Submitting...</span>
                ) : (
                  <>
                    <span>Send Message</span>
                    <Send className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}