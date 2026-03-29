import React from 'react';
import { FileText, CheckCircle, Scale } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const TermsPage = () => {
  return (
    <main className="bg-slate-50 text-slate-900 selection:bg-accent selection:text-white">
      <Navbar />
      <div className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 min-h-screen">
        <div className="max-w-4xl mx-auto bg-white p-8 sm:p-12 rounded-3xl border border-slate-100 shadow-sm">
          <div className="mb-12 border-b border-slate-100 pb-8">
            <h1 className="text-4xl font-black font-syne text-slate-900 mb-4 tracking-tight">Terms & Conditions</h1>
            <p className="text-sm text-slate-400 font-dm uppercase tracking-widest font-bold">Effective Date: {new Date().toLocaleDateString()}</p>
          </div>

          <div className="space-y-8 text-slate-600 font-dm text-sm sm:text-base">
            <p className="leading-relaxed text-slate-700">
              Welcome to WisdomCore Solutions. By accessing our website and utilizing our Web Development and IT Consulting services, you agree to comply with and be bound by the following terms and conditions.
            </p>

            <article className="bg-slate-50 p-6 rounded-2xl border border-slate-100/60">
              <h3 className="text-lg font-bold font-syne text-slate-900 mb-3 flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-accent" /> 1. Acceptance of Terms
              </h3>
              <p className="text-slate-600">
                By engaging with WisdomCore Solutions, you legally accept these terms. If you do not agree with any part of these terms, please do not use our website or services.
              </p>
            </article>

            <article className="bg-slate-50 p-6 rounded-2xl border border-slate-100/60">
              <h3 className="text-lg font-bold font-syne text-slate-900 mb-3 flex items-center gap-2">
                <FileText className="h-5 w-5 text-accent" /> 2. Services Offered
              </h3>
              <p className="text-slate-600">
                We provide Custom Web Solutions, Software Solutions, and IT Consultations globally from our base in Haryana, India. Project scope, timelines, and deliverables will be formally detailed in a separate service agreement.
              </p>
            </article>

            <article className="bg-slate-50 p-6 rounded-2xl border border-slate-100/60">
              <h3 className="text-lg font-bold font-syne text-slate-900 mb-3 flex items-center gap-2">
                <Scale className="h-5 w-5 text-accent" /> 3. User Responsibilities
              </h3>
              <p className="text-slate-600">
                Users agree not to use our website for unlawful purposes, misrepresent affiliation with any entity, or attempt to breach our platform's security.
              </p>
            </article>
            
            <article className="bg-slate-50 p-6 rounded-2xl border border-slate-100/60">
              <h3 className="text-lg font-bold font-syne text-slate-900 mb-3">4. Intellectual Property</h3>
              <p className="text-slate-600">
                All content on wisdomcoresolutions.store, including but not limited to text, graphics, logos, and code, is the property of WisdomCore Solutions. Unauthorized reproduction or use is strictly prohibited.
              </p>
            </article>

            <article className="bg-slate-50 p-6 rounded-2xl border border-slate-100/60">
              <h3 className="text-lg font-bold font-syne text-slate-900 mb-3">5. Modification of Terms</h3>
              <p className="text-slate-600">
                We reserve the right to revise these terms at any time. Continued use of the website following any changes constitutes your acceptance of the new terms.
              </p>
            </article>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
};

export default TermsPage;
