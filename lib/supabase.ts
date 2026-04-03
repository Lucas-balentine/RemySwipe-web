import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export interface Recipe {
  id: string;
  name: string;
  image: string;
  description: string;
  prep_time: number;
  cook_time: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  price: 'Budget' | 'Moderate' | 'Premium';
  occasion: string;
  cuisine: string;
  goal: string;
  rating: number;
  ingredients: string[];
  instructions: string[];
  calories: number;
  servings: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
  sugar: number;
  sodium: number;
}

export async function getRecipeById(id: string): Promise<Recipe | null> {
  const { data, error } = await supabase
    .from('recipes')
    .select('*')
    .eq('id', id)
    .single();

  if (error || !data) return null;
  return data as Recipe;
}
