import Image from 'next/image';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col" style={{ background: 'hsl(28 40% 97%)', color: 'hsl(25 30% 15%)' }}>

      {/* Nav */}
      <header style={{ borderBottom: '1px solid hsl(25 20% 88%)', background: 'hsl(28 40% 97% / 0.9)', backdropFilter: 'blur(12px)' }}
        className="sticky top-0 z-10 px-6 py-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Image src="/logo.png" alt="Remy" width={36} height={36} className="rounded-xl" style={{ boxShadow: '0 2px 8px -2px hsl(25 30% 15% / 0.15)' }} />
            <span style={{ fontFamily: 'var(--font-nunito), sans-serif', fontWeight: 900, fontSize: '1.3rem', color: 'hsl(18 85% 52%)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>REMY</span>
          </div>
          <a
            href="https://apps.apple.com/app/id6746800910"
            style={{ background: 'hsl(18 85% 58%)', color: 'white', borderRadius: '999px', fontWeight: 600, fontSize: '0.85rem', padding: '0.5rem 1.2rem', boxShadow: '0 4px 16px -4px hsl(18 85% 58% / 0.4)' }}
          >
            Download
          </a>
        </div>
      </header>

      {/* Hero */}
      <main className="flex-1 flex flex-col items-center px-6 pt-20 pb-12 text-center">
        <div className="max-w-2xl">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold mb-6"
            style={{ background: 'hsl(18 85% 95%)', color: 'hsl(18 85% 48%)', border: '1px solid hsl(18 85% 85%)' }}>
            🍳 Now available on the App Store
          </div>

          <h1 style={{ fontFamily: 'var(--font-fraunces), Georgia, serif', fontWeight: 900, fontSize: 'clamp(3rem, 8vw, 5rem)', lineHeight: 1.05, letterSpacing: '-0.02em', color: 'hsl(25 30% 12%)' }}
            className="mb-5">
            Swipe. Save.<br />
            <span style={{ color: 'hsl(18 85% 58%)' }}>Cook.</span>
          </h1>

          <p className="text-lg leading-relaxed mb-10 max-w-md mx-auto" style={{ color: 'hsl(25 15% 45%)' }}>
            Remy is the recipe app that feels like a dating app — swipe through thousands of recipes until you find the one.
          </p>

          <a
            href="https://apps.apple.com/app/id6746800910"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.6rem', background: 'hsl(25 30% 12%)', color: 'white', fontWeight: 700, fontSize: '1rem', padding: '0.9rem 2rem', borderRadius: '999px', boxShadow: '0 8px 24px -6px hsl(25 30% 12% / 0.35)' }}
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.7 9.05 7.4c1.32.07 2.23.73 3 .77 1.14-.19 2.23-.9 3.44-.81 1.47.12 2.57.71 3.29 1.81-3.02 1.82-2.3 5.77.44 6.87-.57 1.58-1.33 3.15-2.17 4.24zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
            </svg>
            Download on the App Store
          </a>
          <p className="mt-3 text-xs" style={{ color: 'hsl(25 15% 60%)' }}>Free · iOS</p>
        </div>

        {/* Screenshot */}
        <div className="mt-16 relative">
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '8rem', background: 'linear-gradient(to top, hsl(28 40% 97%), transparent)', zIndex: 1, pointerEvents: 'none' }} />
          <Image
            src="/app-screenshot.png"
            alt="Remy app screenshot"
            width={280}
            height={560}
            className="rounded-3xl relative"
            style={{ boxShadow: '0 24px 48px -12px hsl(25 30% 15% / 0.2), 0 0 0 1px hsl(25 20% 88%)' }}
            priority
          />
        </div>
      </main>

      {/* Features */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 style={{ fontFamily: 'var(--font-fraunces), Georgia, serif', fontWeight: 800, fontSize: '2rem', textAlign: 'center', marginBottom: '3rem', color: 'hsl(25 30% 12%)' }}>
            Everything you need to cook better
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {[
              { icon: '✦', title: 'Swipe to discover', desc: 'Browse thousands of recipes with a swipe. No more endless scrolling or decision paralysis.', color: 'hsl(18 85% 58%)' },
              { icon: '♡', title: 'Save the ones you love', desc: 'Build your personal cookbook with recipes you actually want to cook.', color: 'hsl(140 30% 48%)' },
              { icon: '↗', title: 'Share with anyone', desc: 'Send a recipe to a friend in one tap — they can view it without the app.', color: 'hsl(18 85% 58%)' },
            ].map(f => (
              <div key={f.title} style={{ background: 'white', border: '1px solid hsl(25 20% 88%)', borderRadius: '1.25rem', padding: '1.5rem', boxShadow: '0 2px 8px -2px hsl(25 30% 15% / 0.06)' }}>
                <div style={{ fontSize: '1.5rem', marginBottom: '0.75rem', color: f.color }}>{f.icon}</div>
                <h3 style={{ fontWeight: 700, fontSize: '1rem', marginBottom: '0.4rem', color: 'hsl(25 30% 12%)' }}>{f.title}</h3>
                <p style={{ fontSize: '0.875rem', lineHeight: 1.6, color: 'hsl(25 15% 50%)' }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="px-6 pb-20">
        <div className="max-w-2xl mx-auto text-center rounded-3xl p-10" style={{ background: 'linear-gradient(135deg, hsl(18 85% 58%), hsl(18 75% 68%))', boxShadow: '0 12px 32px -8px hsl(18 85% 58% / 0.4)' }}>
          <h2 style={{ fontFamily: 'var(--font-fraunces), Georgia, serif', fontWeight: 900, fontSize: '2rem', color: 'white', marginBottom: '0.75rem' }}>
            Ready to cook something great?
          </h2>
          <p style={{ color: 'hsl(18 85% 92%)', marginBottom: '1.75rem', fontSize: '1rem' }}>
            Join thousands of home cooks discovering new recipes every day.
          </p>
          <a
            href="https://apps.apple.com/app/id6746800910"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'white', color: 'hsl(18 85% 52%)', fontWeight: 700, fontSize: '0.95rem', padding: '0.85rem 1.75rem', borderRadius: '999px', boxShadow: '0 4px 16px hsl(18 85% 20% / 0.2)' }}
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.7 9.05 7.4c1.32.07 2.23.73 3 .77 1.14-.19 2.23-.9 3.44-.81 1.47.12 2.57.71 3.29 1.81-3.02 1.82-2.3 5.77.44 6.87-.57 1.58-1.33 3.15-2.17 4.24zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
            </svg>
            Get Remy Free
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ borderTop: '1px solid hsl(25 20% 88%)', padding: '1.5rem', textAlign: 'center', fontSize: '0.75rem', color: 'hsl(25 15% 55%)' }}>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
          <a href="/terms" style={{ color: 'hsl(25 15% 55%)' }}>Terms</a>
          <a href="/privacy" style={{ color: 'hsl(25 15% 55%)' }}>Privacy</a>
        </div>
        © {new Date().getFullYear()} Remy. All rights reserved.
      </footer>
    </div>
  );
}
