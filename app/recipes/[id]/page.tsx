import { notFound } from 'next/navigation';
import { getRecipeById } from '@/lib/supabase';
import type { Metadata } from 'next';

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const recipe = await getRecipeById(id);
  if (!recipe) return { title: 'Recipe not found — Remy' };
  return {
    title: `${recipe.name} — Remy`,
    description: recipe.description,
    openGraph: {
      title: recipe.name,
      description: recipe.description,
      images: recipe.image ? [recipe.image] : [],
    },
  };
}

const difficultyStyle: Record<string, { bg: string; color: string; border: string }> = {
  Easy:   { bg: 'hsl(140 50% 94%)', color: 'hsl(140 50% 35%)', border: 'hsl(140 50% 80%)' },
  Medium: { bg: 'hsl(35 90% 93%)',  color: 'hsl(35 90% 40%)',  border: 'hsl(35 90% 78%)' },
  Hard:   { bg: 'hsl(0 65% 94%)',   color: 'hsl(0 65% 45%)',   border: 'hsl(0 65% 80%)' },
};

const priceSymbol: Record<string, string> = {
  Budget: '$', Moderate: '$$', Premium: '$$$',
};

export default async function RecipePage({ params }: Props) {
  const { id } = await params;
  const recipe = await getRecipeById(id);
  if (!recipe) notFound();

  const totalTime = (recipe.prep_time ?? 0) + (recipe.cook_time ?? 0);
  const hasNutrition = recipe.calories && recipe.calories > 0;
  const diff = difficultyStyle[recipe.difficulty] ?? { bg: 'hsl(25 20% 92%)', color: 'hsl(25 30% 40%)', border: 'hsl(25 20% 80%)' };

  const badgeStyle = { background: 'hsl(25 20% 92%)', color: 'hsl(25 30% 40%)', border: '1px solid hsl(25 20% 82%)', borderRadius: '999px', padding: '0.2rem 0.65rem', fontSize: '0.72rem', fontWeight: 600, display: 'inline-flex', alignItems: 'center' };

  return (
    <div style={{ minHeight: '100vh', background: 'hsl(28 40% 97%)', color: 'hsl(25 30% 15%)', fontFamily: 'var(--font-inter), -apple-system, sans-serif' }}>

      {/* Header */}
      <header style={{ position: 'sticky', top: 0, zIndex: 10, background: 'hsl(28 40% 97% / 0.92)', backdropFilter: 'blur(12px)', borderBottom: '1px solid hsl(25 20% 88%)', padding: '0.75rem 1rem' }}>
        <a href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: 'hsl(25 15% 50%)', textDecoration: 'none', fontSize: '0.875rem', fontWeight: 500 }}>
          <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span style={{ fontFamily: 'var(--font-nunito), sans-serif', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'hsl(18 85% 52%)', fontSize: '1rem' }}>REMY</span>
        </a>
      </header>

      {/* Hero Image */}
      {recipe.image && (
        <div style={{ position: 'relative', width: '100%', height: '280px', overflow: 'hidden' }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={recipe.image} alt={recipe.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, hsl(28 40% 97%) 0%, transparent 60%)' }} />
        </div>
      )}

      <div style={{ maxWidth: '42rem', margin: '0 auto', padding: '1rem 1rem 5rem' }}>

        {/* Title + badges */}
        <div style={{ marginBottom: '1.5rem' }}>
          <h1 style={{ fontFamily: 'var(--font-fraunces), Georgia, serif', fontWeight: 900, fontSize: 'clamp(1.6rem, 5vw, 2.2rem)', lineHeight: 1.15, letterSpacing: '-0.01em', color: 'hsl(25 30% 12%)', marginBottom: '0.75rem' }}>
            {recipe.name}
          </h1>

          {/* Badges */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '0.75rem' }}>
            {recipe.difficulty && (
              <span style={{ background: diff.bg, color: diff.color, border: `1px solid ${diff.border}`, borderRadius: '999px', padding: '0.2rem 0.65rem', fontSize: '0.72rem', fontWeight: 600 }}>
                {recipe.difficulty}
              </span>
            )}
            {recipe.cuisine && recipe.cuisine !== 'None' && <span style={badgeStyle}>{recipe.cuisine}</span>}
            {recipe.occasion && recipe.occasion !== 'None' && <span style={badgeStyle}>{recipe.occasion}</span>}
            {recipe.goal && recipe.goal !== 'None' && (
              <span style={{ background: 'hsl(18 85% 95%)', color: 'hsl(18 85% 48%)', border: '1px solid hsl(18 85% 85%)', borderRadius: '999px', padding: '0.2rem 0.65rem', fontSize: '0.72rem', fontWeight: 600 }}>
                {recipe.goal}
              </span>
            )}
            {recipe.price && <span style={badgeStyle}>{priceSymbol[recipe.price] ?? recipe.price}</span>}
          </div>

          {/* Time + servings */}
          <div style={{ display: 'flex', gap: '1rem', fontSize: '0.85rem', color: 'hsl(25 15% 50%)' }}>
            {recipe.prep_time > 0 && <span>Prep: {recipe.prep_time}m</span>}
            {recipe.cook_time > 0 && <span>Cook: {recipe.cook_time}m</span>}
            {totalTime > 0 && <span style={{ fontWeight: 600, color: 'hsl(25 30% 30%)' }}>Total: {totalTime}m</span>}
            {recipe.servings > 0 && <span>Serves {recipe.servings}</span>}
          </div>
        </div>

        {/* Description */}
        {recipe.description && (
          <p style={{ color: 'hsl(25 15% 45%)', fontSize: '0.9rem', lineHeight: 1.7, marginBottom: '2rem' }}>
            {recipe.description}
          </p>
        )}

        {/* Ingredients */}
        {recipe.ingredients?.length > 0 && (
          <section style={{ marginBottom: '2rem' }}>
            <h2 style={{ fontFamily: 'var(--font-fraunces), Georgia, serif', fontWeight: 800, fontSize: '1.25rem', marginBottom: '0.75rem', color: 'hsl(25 30% 12%)' }}>
              Ingredients
            </h2>
            <div style={{ background: 'white', borderRadius: '1rem', border: '1px solid hsl(25 20% 88%)', padding: '1rem 1.25rem', boxShadow: '0 2px 8px -2px hsl(25 30% 15% / 0.06)' }}>
              <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                {recipe.ingredients.map((ingredient: string, i: number) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem', fontSize: '0.875rem', color: 'hsl(25 25% 30%)' }}>
                    <span style={{ marginTop: '0.45rem', width: '6px', height: '6px', borderRadius: '50%', background: 'hsl(18 85% 58%)', flexShrink: 0 }} />
                    {ingredient}
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}

        {/* Instructions */}
        {recipe.instructions?.length > 0 && (
          <section style={{ marginBottom: '2rem' }}>
            <h2 style={{ fontFamily: 'var(--font-fraunces), Georgia, serif', fontWeight: 800, fontSize: '1.25rem', marginBottom: '0.75rem', color: 'hsl(25 30% 12%)' }}>
              Instructions
            </h2>
            <ol style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {recipe.instructions.map((step: string, i: number) => (
                <li key={i} style={{ display: 'flex', gap: '0.75rem', background: 'white', borderRadius: '0.875rem', border: '1px solid hsl(25 20% 88%)', padding: '0.875rem 1rem', boxShadow: '0 1px 4px hsl(25 30% 15% / 0.04)' }}>
                  <span style={{ flexShrink: 0, width: '1.5rem', height: '1.5rem', borderRadius: '50%', background: 'hsl(18 85% 58%)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem', fontWeight: 700 }}>
                    {i + 1}
                  </span>
                  <span style={{ fontSize: '0.875rem', lineHeight: 1.65, color: 'hsl(25 25% 30%)', paddingTop: '0.1rem' }}>{step}</span>
                </li>
              ))}
            </ol>
          </section>
        )}

        {/* Nutrition */}
        {hasNutrition && (
          <section style={{ marginBottom: '2rem' }}>
            <h2 style={{ fontFamily: 'var(--font-fraunces), Georgia, serif', fontWeight: 800, fontSize: '1.25rem', marginBottom: '0.75rem', color: 'hsl(25 30% 12%)' }}>
              Nutrition
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem' }}>
              {[
                { label: 'Calories', value: recipe.calories, unit: 'kcal' },
                { label: 'Protein',  value: recipe.protein,  unit: 'g' },
                { label: 'Carbs',    value: recipe.carbs,    unit: 'g' },
                { label: 'Fat',      value: recipe.fat,      unit: 'g' },
                { label: 'Fiber',    value: recipe.fiber,    unit: 'g' },
                { label: 'Sugar',    value: recipe.sugar,    unit: 'g' },
                { label: 'Sodium',   value: recipe.sodium,   unit: 'mg' },
              ].filter(n => n.value && n.value > 0).map(n => (
                <div key={n.label} style={{ background: 'white', border: '1px solid hsl(25 20% 88%)', borderRadius: '0.875rem', padding: '0.75rem', textAlign: 'center', boxShadow: '0 1px 4px hsl(25 30% 15% / 0.04)' }}>
                  <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'hsl(18 85% 52%)' }}>{n.value}</div>
                  <div style={{ fontSize: '0.65rem', color: 'hsl(25 15% 60%)' }}>{n.unit}</div>
                  <div style={{ fontSize: '0.7rem', fontWeight: 600, color: 'hsl(25 25% 40%)', marginTop: '0.1rem' }}>{n.label}</div>
                </div>
              ))}
            </div>
            <p style={{ fontSize: '0.7rem', color: 'hsl(25 15% 60%)', marginTop: '0.5rem' }}>Per serving · Source: USDA FoodData Central</p>
          </section>
        )}

        {/* CTA */}
        <div style={{ borderRadius: '1.5rem', background: 'linear-gradient(135deg, hsl(18 85% 58%), hsl(18 75% 68%))', padding: '1.75rem', textAlign: 'center', boxShadow: '0 12px 32px -8px hsl(18 85% 58% / 0.35)' }}>
          <p style={{ color: 'hsl(18 85% 92%)', fontSize: '0.875rem', marginBottom: '0.25rem' }}>Want to save this and discover more?</p>
          <p style={{ fontFamily: 'var(--font-fraunces), Georgia, serif', fontWeight: 900, fontSize: '1.4rem', color: 'white', marginBottom: '1.25rem' }}>
            Get Remy — it&apos;s free.
          </p>
          <a
            href="https://apps.apple.com/app/id6746800910"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'white', color: 'hsl(18 85% 52%)', fontWeight: 700, fontSize: '0.9rem', padding: '0.75rem 1.5rem', borderRadius: '999px', boxShadow: '0 4px 16px hsl(18 85% 20% / 0.2)', textDecoration: 'none' }}
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.7 9.05 7.4c1.32.07 2.23.73 3 .77 1.14-.19 2.23-.9 3.44-.81 1.47.12 2.57.71 3.29 1.81-3.02 1.82-2.3 5.77.44 6.87-.57 1.58-1.33 3.15-2.17 4.24zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
            </svg>
            Download on the App Store
          </a>
        </div>
      </div>
    </div>
  );
}
