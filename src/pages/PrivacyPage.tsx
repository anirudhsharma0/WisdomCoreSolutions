import React from 'react';
import { Shield, Lock, Eye } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const PrivacyPage = () => {
  return (
    <main className="bg-slate-50 text-slate-900 selection:bg-accent selection:text-white">
      <Navbar />
      <div className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 min-h-screen">
        <div className="max-w-4xl mx-auto bg-white p-8 sm:p-12 rounded-3xl border border-slate-100 shadow-sm">
          <div className="mb-12 border-b border-slate-100 pb-8">
            <h1 className="text-4xl font-black font-syne text-slate-900 mb-4 tracking-tight">Privacy Policy</h1>
          </div>

          <div className="space-y-10 text-slate-600 font-dm">
            <section>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-accent/5 rounded-lg border border-accent/10">
                  <Eye className="h-5 w-5 text-accent" />
                </div>
                <h2 className="text-2xl font-bold font-syne text-slate-900">Information We Collect</h2>
              </div>
              <p className="leading-relaxed mb-4 text-sm sm:text-base">
                When you interact with WisdomCore Solutions—whether inquiring about our Web Development and IT Consulting services or navigating our website—we may collect personal information such as your name, email address, phone number, and project requirements. We collect this data to process your inquiries and provide tailored Software Solutions.
              </p>
            </section>

            <section>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-accent/5 rounded-lg border border-accent/10">
                  <Shield className="h-5 w-5 text-accent" />
                </div>
                <h2 className="text-2xl font-bold font-syne text-slate-900">How We Use Your Data</h2>
              </div>
              <p className="leading-relaxed mb-4 text-sm sm:text-base">
                The information collected is strictly used to:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-sm sm:text-base">
                <li>Respond to your requests and inquiries professionally.</li>
                <li>Improve the quality and scope of our Web and IT services.</li>
                <li>Send periodic updates related to your project or our services (you may opt-out at any time).</li>
              </ul>
            </section>

            <section>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-accent/5 rounded-lg border border-accent/10">
                  <Lock className="h-5 w-5 text-accent" />
                </div>
                <h2 className="text-2xl font-bold font-syne text-slate-900">Cookies & Tracking</h2>
              </div>
              <p className="leading-relaxed mb-4 text-sm sm:text-base">
                WisdomCore Solutions uses cookies and similar tracking technologies to enhance your browsing experience, analyze site traffic, and understand user behavior. You can manage or disable your cookie preferences through your personal browser settings, though some website functionalities may be affected.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold font-syne text-slate-900 mb-4">Data Security</h2>
              <p className="leading-relaxed mb-4 text-sm sm:text-base">
                We prioritize the security of your data. We implement industry-standard security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no data transmission over the Internet can be unconditionally guaranteed as 100% secure.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold font-syne text-slate-900 mb-4">Contact Us Regarding Privacy</h2>
              <p className="leading-relaxed text-sm sm:text-base">
                If you have any questions or concerns about this Privacy Policy, please contact us at <a href="mailto:wisdomcoresolutions@gmail.com" className="text-accent hover:underline font-bold">wisdomcoresolutions@gmail.com</a>.
              </p>
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
};

export default PrivacyPage;
