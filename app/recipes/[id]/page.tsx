import { notFound } from 'next/navigation';
import { getRecipeById } from '@/lib/supabase';
import type { Metadata } from 'next';
import Image from 'next/image';

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

const difficultyColor: Record<string, string> = {
  Easy: 'bg-green-500/20 text-green-400 border-green-500/30',
  Medium: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  Hard: 'bg-red-500/20 text-red-400 border-red-500/30',
};

const priceSymbol: Record<string, string> = {
  Budget: '$',
  Moderate: '$$',
  Premium: '$$$',
};

export default async function RecipePage({ params }: Props) {
  const { id } = await params;
  const recipe = await getRecipeById(id);
  if (!recipe) notFound();

  const totalTime = (recipe.prep_time ?? 0) + (recipe.cook_time ?? 0);
  const hasNutrition = recipe.calories && recipe.calories > 0;

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-[#0f0f0f]/80 backdrop-blur border-b border-white/10 px-4 py-3 flex items-center gap-3">
        <a href="/" className="flex items-center gap-2 text-white/70 hover:text-white transition-colors">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span className="text-sm">Remy</span>
        </a>
      </header>

      {/* Hero image */}
      {recipe.image && (
        <div className="relative w-full h-64 sm:h-80">
          <Image
            src={recipe.image}
            alt={recipe.name}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f0f] via-[#0f0f0f]/20 to-transparent" />
        </div>
      )}

      <div className="max-w-2xl mx-auto px-4 pb-16">
        {/* Title + badges */}
        <div className="mt-4 mb-6">
          <h1 className="text-2xl font-bold text-white mb-3">{recipe.name}</h1>
          <div className="flex flex-wrap gap-2 mb-3">
            {recipe.difficulty && (
              <span className={`text-xs px-2.5 py-1 rounded-full border font-medium ${difficultyColor[recipe.difficulty] ?? 'bg-white/10 text-white/70 border-white/20'}`}>
                {recipe.difficulty}
              </span>
            )}
            {recipe.cuisine && recipe.cuisine !== 'None' && (
              <span className="text-xs px-2.5 py-1 rounded-full border bg-white/10 text-white/70 border-white/20">
                {recipe.cuisine}
              </span>
            )}
            {recipe.occasion && recipe.occasion !== 'None' && (
              <span className="text-xs px-2.5 py-1 rounded-full border bg-white/10 text-white/70 border-white/20">
                {recipe.occasion}
              </span>
            )}
            {recipe.goal && recipe.goal !== 'None' && (
              <span className="text-xs px-2.5 py-1 rounded-full border bg-blue-500/20 text-blue-400 border-blue-500/30">
                {recipe.goal}
              </span>
            )}
            {recipe.price && (
              <span className="text-xs px-2.5 py-1 rounded-full border bg-white/10 text-white/70 border-white/20">
                {priceSymbol[recipe.price] ?? recipe.price}
              </span>
            )}
          </div>

          {/* Time + servings */}
          <div className="flex gap-4 text-sm text-white/60">
            {recipe.prep_time > 0 && <span>Prep: {recipe.prep_time}m</span>}
            {recipe.cook_time > 0 && <span>Cook: {recipe.cook_time}m</span>}
            {totalTime > 0 && <span className="font-medium text-white/80">Total: {totalTime}m</span>}
            {recipe.servings > 0 && <span>Serves {recipe.servings}</span>}
          </div>
        </div>

        {/* Description */}
        {recipe.description && (
          <p className="text-white/70 text-sm leading-relaxed mb-8">{recipe.description}</p>
        )}

        {/* Ingredients */}
        {recipe.ingredients?.length > 0 && (
          <section className="mb-8">
            <h2 className="text-lg font-semibold mb-3 text-white">Ingredients</h2>
            <ul className="space-y-2">
              {recipe.ingredients.map((ingredient, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-white/80">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-white/40 shrink-0" />
                  {ingredient}
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Instructions */}
        {recipe.instructions?.length > 0 && (
          <section className="mb-8">
            <h2 className="text-lg font-semibold mb-3 text-white">Instructions</h2>
            <ol className="space-y-4">
              {recipe.instructions.map((step, i) => (
                <li key={i} className="flex gap-3 text-sm text-white/80">
                  <span className="shrink-0 w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-xs font-bold text-white/60">
                    {i + 1}
                  </span>
                  <span className="leading-relaxed pt-0.5">{step}</span>
                </li>
              ))}
            </ol>
          </section>
        )}

        {/* Nutrition */}
        {hasNutrition && (
          <section className="mb-8">
            <h2 className="text-lg font-semibold mb-3 text-white">Nutrition</h2>
            <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
              {[
                { label: 'Calories', value: recipe.calories, unit: 'kcal' },
                { label: 'Protein', value: recipe.protein, unit: 'g' },
                { label: 'Carbs', value: recipe.carbs, unit: 'g' },
                { label: 'Fat', value: recipe.fat, unit: 'g' },
                { label: 'Fiber', value: recipe.fiber, unit: 'g' },
                { label: 'Sugar', value: recipe.sugar, unit: 'g' },
                { label: 'Sodium', value: recipe.sodium, unit: 'mg' },
              ].filter(n => n.value && n.value > 0).map(n => (
                <div key={n.label} className="bg-white/5 rounded-xl p-3 text-center border border-white/10">
                  <div className="text-lg font-bold text-white">{n.value}</div>
                  <div className="text-xs text-white/50">{n.unit}</div>
                  <div className="text-xs text-white/60 mt-0.5">{n.label}</div>
                </div>
              ))}
            </div>
            <p className="text-xs text-white/30 mt-2">Per serving · Source: USDA FoodData Central</p>
          </section>
        )}

        {/* CTA */}
        <div className="mt-10 rounded-2xl bg-white/5 border border-white/10 p-6 text-center">
          <p className="text-white/60 text-sm mb-1">Want to save this and discover more?</p>
          <p className="text-white font-semibold text-lg mb-4">Get the Remy app — it&apos;s free.</p>
          <a
            href="https://apps.apple.com/app/id6746800910"
            className="inline-flex items-center gap-2 bg-white text-black font-semibold text-sm px-6 py-3 rounded-full hover:bg-white/90 transition-colors"
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
