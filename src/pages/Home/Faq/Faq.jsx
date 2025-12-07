import React, { useState } from 'react';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';

const faqs = [
//   { q: "What is ScholarStream?", a: "ScholarStream connects students with scholarship opportunities. Institutions can post scholarships, and students can search and apply in one place." },
  { q: "Who can use ScholarStream?", a: "Students looking for scholarships and institutions or organizations offering scholarships can use ScholarStream." },
  { q: "How do I search for scholarships?", a: "You can search scholarships by eligibility, location, field of study, deadline, or keyword using our search filters." },
  { q: "Is it free to use ScholarStream?", a: "Yes! Students can use ScholarStream for free. Institutions may have optional plans for enhanced features." },
  { q: "How do I apply for a scholarship?", a: "Click 'Apply' on a scholarship listing, fill out the application form, and track your application status." },
  { q: "Can I save scholarships to apply later?", a: "Yes, you can save scholarships to your dashboard and apply whenever you're ready." },
  { q: "How does ScholarStream help institutions?", a: "Institutions can post scholarships, manage applications, review submissions, and select recipients efficiently." },
//   { q: "What if I forget my password?", a: "Use the 'Forgot Password' link on login. A reset link will be sent to your registered email." },
  { q: "Are my personal details safe?", a: "Absolutely. ScholarStream uses secure authentication and follows best practices to protect your data." },
  { q: "How often are new scholarships added?", a: "New scholarships are added regularly. Check the platform frequently or subscribe to notifications." },
];

const Faq = () => {
     const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };
    return (
        <div className="max-w-full mx-auto px-4 md:px-40 py-16 border">
            <div className='text-center mb-8'>
                <h2 className="text-primary text-4xl md:text-5xl font-semibold">Frequently Asked Questions</h2>
                <p className='my-3 text-lg md:text-xl text-gray-600'>Got questions about scholarships or using ScholarStream? Explore our FAQs to find clear answers and make your scholarship journey easier.</p>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
                {faqs.map((faq, index) => (
                <div key={index} className="border border-primary rounded-lg shadow-sm overflow-hidden self-start">
                    <button
                    onClick={() => toggle(index)}
                    className={`w-full text-left font-medium text-lg flex justify-between items-center p-4 hover:bg-primary hover:text-white transition-colors ${
                        openIndex === index ? 'bg-primary text-white' : 'bg-white text-gray-800'
                    }`}
                    >
                    {faq.q}
                    <span className="text-xl">{openIndex === index ? "−" : "+"}</span>
                    </button>
                    <div
                    className={`transition-max-height duration-500 ease-in-out overflow-hidden bg-[#7280df]  ${
                        openIndex === index ? "max-h-40 p-4 " : "max-h-0"
                    }`}
                    >
                    <p className="text-white">{faq.a}</p>
                    </div>
                </div>
                ))}
            </div>
        </div>
    );
};

export default Faq;