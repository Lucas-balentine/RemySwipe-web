import Image from 'next/image';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white flex flex-col">
      {/* Nav */}
      <header className="px-6 py-4 flex items-center justify-between max-w-5xl mx-auto w-full">
        <div className="flex items-center gap-2">
          <Image src="/logo.png" alt="Remy" width={36} height={36} className="rounded-xl" />
          <span className="font-bold text-lg tracking-tight">Remy</span>
        </div>
        <a
          href="https://apps.apple.com/app/id6746800910"
          className="text-sm font-medium text-white/70 hover:text-white transition-colors"
        >
          Download
        </a>
      </header>

      {/* Hero */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 text-center py-16">
        <div className="max-w-xl">
          <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight mb-4 leading-none">
            Swipe. Save.<br />Cook.
          </h1>
          <p className="text-white/60 text-lg mb-10 leading-relaxed">
            Remy is the recipe app that feels like a dating app — swipe through thousands of recipes until you find the one.
          </p>

          <a
            href="https://apps.apple.com/app/id6746800910"
            className="inline-flex items-center gap-3 bg-white text-black font-semibold px-8 py-4 rounded-full text-base hover:bg-white/90 transition-colors shadow-2xl"
          >
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.7 9.05 7.4c1.32.07 2.23.73 3 .77 1.14-.19 2.23-.9 3.44-.81 1.47.12 2.57.71 3.29 1.81-3.02 1.82-2.3 5.77.44 6.87-.57 1.58-1.33 3.15-2.17 4.24zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
            </svg>
            Download on the App Store
          </a>
          <p className="mt-3 text-white/30 text-xs">Free · iOS</p>
        </div>

        {/* Screenshot */}
        <div className="mt-16 relative">
          <Image
            src="/app-screenshot.png"
            alt="Remy app screenshot"
            width={300}
            height={600}
            className="rounded-3xl shadow-2xl border border-white/10"
            priority
          />
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0f0f0f] to-transparent pointer-events-none" />
        </div>
      </main>

      {/* Features */}
      <section className="py-20 px-6 max-w-4xl mx-auto w-full">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[
            { icon: '✦', title: 'Swipe to discover', desc: 'Browse thousands of recipes with a swipe. No more endless scrolling.' },
            { icon: '♡', title: 'Save the ones you love', desc: 'Build your personal cookbook with recipes you actually want to cook.' },
            { icon: '↗', title: 'Share with anyone', desc: 'Send a recipe to a friend in one tap — they can view it without the app.' },
          ].map(f => (
            <div key={f.title} className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <div className="text-2xl mb-3">{f.icon}</div>
              <h3 className="font-semibold text-white mb-1">{f.title}</h3>
              <p className="text-white/50 text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 px-6 py-6 text-center text-white/30 text-xs">
        <div className="flex justify-center gap-4 mb-2">
          <a href="/terms" className="hover:text-white/60 transition-colors">Terms</a>
          <a href="/privacy" className="hover:text-white/60 transition-colors">Privacy</a>
        </div>
        © {new Date().getFullYear()} Remy. All rights reserved.
      </footer>
    </div>
  );
}
