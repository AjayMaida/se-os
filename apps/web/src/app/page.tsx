import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-50 selection:bg-indigo-500/30">
      {/* Navbar */}
      <header className="flex h-16 items-center px-6 border-b border-white/10 backdrop-blur-md sticky top-0 z-50">
        <div className="flex items-center gap-2 font-bold text-xl tracking-tight">
          <span className="text-indigo-400">SE-OS</span>
        </div>
        <nav className="ml-auto flex gap-6 items-center">
          <Link href="/login" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">
            Sign In
          </Link>
          <Link href="/register" className="text-sm font-medium bg-indigo-500 text-white px-5 py-2 rounded-md hover:bg-indigo-600 transition-colors shadow-[0_0_15px_rgba(99,102,241,0.5)]">
            Start Free
          </Link>
        </nav>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-24 md:py-32 lg:py-48 flex justify-center text-center relative overflow-hidden">
          {/* Background effects */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-500/20 blur-[120px] rounded-full pointer-events-none" />
          
          <div className="container px-4 md:px-6 relative z-10">
            <div className="flex flex-col items-center space-y-8">
              <div className="inline-flex items-center rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3 py-1 text-sm font-medium text-indigo-300 backdrop-blur-sm">
                <span className="flex h-2 w-2 rounded-full bg-indigo-500 mr-2 animate-pulse"></span>
                v1.0 is now live
              </div>
              <h1 className="text-5xl font-extrabold tracking-tight sm:text-6xl md:text-7xl lg:text-8xl max-w-4xl">
                Your AI-Powered<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-indigo-200 to-indigo-500">
                  Career Operating System
                </span>
              </h1>
              <p className="mx-auto max-w-[700px] text-slate-400 md:text-xl leading-relaxed">
                Never wonder what to do next. SE-OS transforms your career goals into personalized daily plans.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mt-8 w-full justify-center">
                <Link
                  href="/register"
                  className="inline-flex h-12 items-center justify-center rounded-lg bg-indigo-500 px-8 text-base font-medium text-white shadow-lg shadow-indigo-500/25 transition-all hover:bg-indigo-600 hover:scale-105"
                >
                  Start for Free <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
                <Link
                  href="#demo"
                  className="inline-flex h-12 items-center justify-center rounded-lg border border-slate-700 bg-slate-800/50 px-8 text-base font-medium text-white backdrop-blur-sm transition-all hover:bg-slate-800 hover:border-slate-600"
                >
                  Watch Demo
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="w-full py-24 bg-slate-900/50 border-y border-white/5 flex justify-center relative">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Everything you need to succeed</h2>
              <p className="mt-4 text-slate-400 md:text-lg max-w-2xl mx-auto">An end-to-end platform designed specifically for software engineers.</p>
            </div>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { title: "Personalized Roadmap", desc: "Dynamic learning paths tailored to your exact career goals and current skill level." },
                { title: "Daily AI Planning", desc: "Bite-sized, actionable tasks generated daily so you always know what to study." },
                { title: "Interview Studio", desc: "Practice coding and system design in a real-world environment with AI feedback." },
                { title: "AI Mentor", desc: "Get unstuck instantly with an AI assistant that understands your codebase and roadmap." }
              ].map((feature, i) => (
                <div key={i} className="flex flex-col p-6 bg-slate-800/40 border border-white/10 rounded-2xl hover:bg-slate-800/80 transition-colors">
                  <div className="h-12 w-12 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center mb-4 text-xl font-bold">
                    {i + 1}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="w-full py-24 flex justify-center">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col md:flex-row items-center gap-16">
              <div className="flex-1 space-y-8">
                <div>
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">How It Works</h2>
                  <p className="mt-4 text-slate-400 text-lg">Your journey from setting goals to landing your dream job.</p>
                </div>
                <div className="space-y-6">
                  {[
                    { num: "01", title: "Set Your Goals", desc: "Tell us where you are and where you want to be. We handle the rest." },
                    { num: "02", title: "Get Your Roadmap", desc: "Receive a personalized, week-by-week learning path tailored to your schedule." },
                    { num: "03", title: "Execute Daily", desc: "Log in daily to see your curated tasks and check them off your list." },
                    { num: "04", title: "Nail The Interview", desc: "Use the Interview Studio to simulate real interviews and get actionable feedback." }
                  ].map((step, i) => (
                    <div key={i} className="flex gap-4">
                      <div className="text-indigo-500 font-mono font-bold text-xl">{step.num}</div>
                      <div>
                        <h4 className="text-lg font-bold text-white mb-1">{step.title}</h4>
                        <p className="text-slate-400 text-sm">{step.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex-1 w-full">
                <div className="aspect-[4/3] rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 border border-white/10 shadow-2xl overflow-hidden relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-slate-500 font-medium">Dashboard Preview</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <footer className="w-full py-8 border-t border-white/10 text-center">
        <p className="text-sm text-slate-500">© 2026 SE-OS. All rights reserved.</p>
      </footer>
    </div>
  );
}
