import React from 'react';
import { AlertCircle, Info } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const DisclaimerPage = () => {
  return (
    <main className="bg-slate-50 text-slate-900 selection:bg-accent selection:text-white">
      <Navbar />
      <div className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 min-h-screen">
        <div className="max-w-4xl mx-auto bg-white p-8 sm:p-12 rounded-3xl border border-slate-100 shadow-sm">
          <div className="flex items-center gap-4 mb-10 pb-8 border-b border-slate-100">
            <div className="p-3 bg-red-50 rounded-xl border border-red-100">
              <AlertCircle className="h-8 w-8 text-red-500" />
            </div>
            <h1 className="text-4xl font-black font-syne text-slate-900 tracking-tight">Legal Disclaimer</h1>
          </div>

          <div className="prose max-w-none text-slate-600 space-y-8 font-dm text-sm sm:text-base">
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
              <p className="text-slate-900 font-bold">
                The information provided by WisdomCore Solutions ("we," "us," or "our") on wisdomcoresolutions.store (the "Site") is for general informational purposes only.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold font-syne text-slate-900 flex items-center gap-2 mb-4">
                <Info className="h-5 w-5 text-accent" /> Professional Service Disclaimer
              </h2>
              <p className="leading-relaxed">
                While we strive to provide excellent Web Development, IT Consulting, and Software Solutions, the information on our website is not intended to substitute for formal technical or business advice. All information on the Site is provided in good faith, however, we make no representation or warranty of any kind, express or implied, regarding the accuracy, adequacy, validity, reliability, availability, or completeness of any information or services provided.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold font-syne text-slate-900 mb-4">External Links Disclaimer</h2>
              <p className="leading-relaxed">
                The Site may contain (or you may be sent through the Site to) links to other websites or content belonging to or originating from third parties. Such external links are not investigated, monitored, or checked for accuracy, adequacy, validity, reliability, availability, or completeness by us. We do not warrant, endorse, guarantee, or assume responsibility for the accuracy or reliability of any information offered by third-party websites linked through the site.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold font-syne text-slate-900 mb-4">Limitation of Liability</h2>
              <p className="leading-relaxed">
                Under no circumstance shall WisdomCore Solutions be liable to you for any loss or damage of any kind incurred as a result of the use of the site or reliance on any information provided on the site. Your use of the site and your reliance on any information on the site is solely at your own risk.
              </p>
            </div>

            <div className="mt-12 pt-8 border-t border-slate-100">
              <p className="text-sm font-bold text-slate-400 tracking-wide uppercase">
                For any questions regarding this disclaimer, please contact us at <a href="mailto:wisdomcoresolutions@gmail.com" className="text-accent hover:underline">wisdomcoresolutions@gmail.com</a>.
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
};

export default DisclaimerPage;
