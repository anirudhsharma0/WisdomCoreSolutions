import React from 'react';
import { MonitorSmartphone, Code2, Database, Target, Lightbulb, Users } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const AboutPage = () => {
  return (
    <main className="bg-slate-50 text-slate-900 selection:bg-accent selection:text-white">
      <Navbar />
      <div className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 min-h-screen">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-black font-syne tracking-tight sm:text-5xl text-slate-900">
              About <span className="text-accent">WisdomCore Solutions</span>
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-slate-500 font-dm">
              Driving Digital Excellence through Innovation and Custom Web Solutions.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
            <div>
              <h2 className="text-3xl font-bold font-syne text-slate-900 mb-6 tracking-tight">Pioneering Web Development in India</h2>
              <p className="text-sm sm:text-base text-slate-600 mb-4 leading-relaxed font-dm">
                At WisdomCore Solutions, we specialize in delivering top-tier <strong>Software Solutions</strong> and expert <strong>IT Consulting</strong>. As a leading name in <strong>Web Development India</strong>, our mission is to transform your visionary ideas into robust digital realities that drive growth and engagement.
              </p>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-dm">
                We focus on crafting scalable, high-performance applications tailored to your business needs, ensuring a seamless blend of aesthetics and functionality.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm transition-shadow hover:shadow-md hover:border-accent/20 group">
                <MonitorSmartphone className="h-8 w-8 text-accent mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-lg font-bold font-syne text-slate-900 mb-2">React.js / Next.js</h3>
                <p className="text-sm text-slate-500 font-dm">Dynamic, responsive, and blazing-fast user interfaces.</p>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm transition-shadow hover:shadow-md hover:border-accent/20 group">
                <Code2 className="h-8 w-8 text-accent mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-lg font-bold font-syne text-slate-900 mb-2">Node.js</h3>
                <p className="text-sm text-slate-500 font-dm">Robust and scalable server-side architectures.</p>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm transition-shadow hover:shadow-md hover:border-accent/20 group sm:col-span-2">
                <Database className="h-8 w-8 text-accent mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-lg font-bold font-syne text-slate-900 mb-2">MongoDB</h3>
                <p className="text-sm text-slate-500 font-dm">High-performance NoSQL databases managing your data securely and efficiently.</p>
              </div>
            </div>
          </div>

          <div className="text-center">
            <h2 className="text-3xl font-bold font-syne text-slate-900 mb-10 tracking-tight">Our Core Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-all hover:-translate-y-1">
                <Target className="h-10 w-10 text-accent mx-auto mb-4" />
                <h3 className="text-lg font-bold font-syne text-slate-900 mb-3">Digital Excellence</h3>
                <p className="text-sm text-slate-500 font-dm">We hold ourselves to the highest standards, delivering secure, state-of-the-art Custom Web Solutions.</p>
              </div>
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-all hover:-translate-y-1">
                <Lightbulb className="h-10 w-10 text-accent mx-auto mb-4" />
                <h3 className="text-lg font-bold font-syne text-slate-900 mb-3">Innovation</h3>
                <p className="text-sm text-slate-500 font-dm">Embracing modern technologies and methodologies to solve complex business challenges.</p>
              </div>
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-all hover:-translate-y-1">
                <Users className="h-10 w-10 text-accent mx-auto mb-4" />
                <h3 className="text-lg font-bold font-syne text-slate-900 mb-3">Client-Centric</h3>
                <p className="text-sm text-slate-500 font-dm">Your success is our success. We partner closely with you to guarantee outcomes that exceed expectations.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
};

export default AboutPage;
