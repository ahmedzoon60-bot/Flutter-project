import { CuratedProgram } from '../types';

export const CURATED_PROGRAMS: CuratedProgram[] = [
  {
    id: 'keto-kickstart',
    title: 'Keto Kickstart',
    description: 'High-fat, low-carbohydrate program designed to induce and maintain ketosis for rapid fat loss.',
    longDescription: 'The Keto Kickstart is specifically designed to transition your metabolism away from burning carbohydrates to burning fats as its primary fuel source. By restricting carbs to under 50g per day and ramping up healthy fats, your liver begins converting fatty acids into ketones, providing an incredibly stable energy source, reduced cravings, and enhanced cognitive focus.',
    category: 'loss',
    durationWeeks: 4,
    dailyCalories: 1650,
    macros: { protein: 25, carbs: 5, fat: 70 },
    difficulty: 'Intermediate',
    rating: 4.8,
    reviewsCount: 312,
    author: 'Dr. Sarah Jenkins, RD',
    tags: ['Ketogenic', 'Low-Carb', 'Fat Burning', 'Sugar-Free'],
    emoji: '🥑',
    imageColor: 'from-emerald-600 to-teal-800',
    days: [
      {
        dayNumber: 1,
        breakfast: {
          id: 'k-b-1',
          name: 'Avocado & Bacon Scramble',
          calories: 420,
          protein: 24,
          carbs: 4,
          fat: 34,
          time: '08:00 AM',
          ingredients: ['3 Large Free-range Eggs', '2 slices Organic Smoked Bacon', '1/2 Medium Ripe Avocado', '1 tbsp Grass-fed Butter', 'Pinch of Sea Salt & Black Pepper'],
          instructions: ['Cook bacon in a pan until crispy, then set aside.', 'Whisk eggs in a bowl with a pinch of salt.', 'Melt butter in the bacon pan and cook eggs gently until soft and fluffy.', 'Serve eggs topped with chopped bacon and sliced fresh avocado.']
        },
        lunch: {
          id: 'k-l-1',
          name: 'Grilled Salmon Caesar Bowl',
          calories: 510,
          protein: 38,
          carbs: 5,
          fat: 38,
          time: '01:00 PM',
          ingredients: ['150g Atlantic Salmon Fillet', '3 cups Fresh Romaine Lettuce', '2 tbsp Premium Caesar Dressing (sugar-free)', '15g Grated Parmesan Cheese', '1 tbsp Cold-pressed Olive Oil'],
          instructions: ['Season salmon with salt, pepper, and garlic powder.', 'Pan-fry in olive oil for 4 minutes each side until golden and cooked through.', 'Chop romaine lettuce and toss with Caesar dressing and parmesan cheese.', 'Flake the salmon on top and enjoy warm.']
        },
        dinner: {
          id: 'k-d-1',
          name: 'Ribeye Steak with Garlic Herb Butter',
          calories: 580,
          protein: 42,
          carbs: 2,
          fat: 46,
          time: '07:00 PM',
          ingredients: ['180g Grass-fed Ribeye Steak', '1 tbsp Garlic & Herb Compound Butter', '1 cup Fresh Asparagus Spears', '1 tbsp Extra Virgin Olive Oil'],
          instructions: ['Preheat skillet to high heat.', 'Rub steak with olive oil, salt, and pepper.', 'Sear steak for 3-4 minutes per side for medium-rare.', 'Toss asparagus in the remaining oil and grill for 4 minutes.', 'Top hot steak with garlic herb butter and serve with asparagus.']
        },
        snack: {
          id: 'k-s-1',
          name: 'Macadamia & Sea Salt Fuel Pack',
          calories: 140,
          protein: 2,
          carbs: 3,
          fat: 14,
          time: '04:30 PM',
          ingredients: ['20g Raw Macadamia Nuts', 'Pinch of Maldon Sea Salt Flakes'],
          instructions: ['Toss raw macadamia nuts with sea salt flakes.', 'Slow-chew to maximize satiation and healthy fat absorption.']
        },
        tip: 'Ensure you drink at least 3.0 liters of mineralized water today. As your body sheds glycogen, it excretes essential electrolytes. Adding a pinch of sea salt to your water helps combat the "keto flu".'
      },
      {
        dayNumber: 2,
        breakfast: {
          id: 'k-b-2',
          name: 'Keto Bulletproof Coffee & Egg Muffins',
          calories: 390,
          protein: 22,
          carbs: 3,
          fat: 32,
          time: '08:00 AM',
          ingredients: ['2 Baked Egg Muffins with Spinach & Cheddar', '1 cup Brewed Black Coffee', '1 tbsp MCT Oil', '1 tbsp Grass-fed Butter'],
          instructions: ['Warm up the pre-prepped egg muffins.', 'Blend coffee, MCT oil, and butter in a high-speed blender until frothy.', 'Serve together immediately for a powerful cognitive boost.']
        },
        lunch: {
          id: 'k-l-2',
          name: 'Creamy Avocado Chicken Salad Wrap',
          calories: 520,
          protein: 36,
          carbs: 6,
          fat: 40,
          time: '01:00 PM',
          ingredients: ['120g Shredded Chicken Breast', '1/2 Ripe Avocado (mashed)', '1 tbsp High-fat Mayonnaise', '2 large Butter Lettuce leaves (as wraps)', '1/4 cup Diced Celery'],
          instructions: ['Mix shredded chicken with mashed avocado, mayonnaise, diced celery, salt, and pepper.', 'Spoon chicken mixture into large butter lettuce leaves.', 'Roll up gently and slice in half.']
        },
        dinner: {
          id: 'k-d-2',
          name: 'Cheesy Garlic Butter Shrimp with Zoodles',
          calories: 590,
          protein: 34,
          carbs: 7,
          fat: 48,
          time: '07:00 PM',
          ingredients: ['150g Wild Shrimp (peeled & deveined)', '200g Fresh Zucchini Noodles (zoodles)', '2 tbsp Grass-fed Butter', '2 cloves Minced Garlic', '30g Grated Mozzarella Cheese'],
          instructions: ['Melt butter in a skillet over medium heat, add minced garlic and saute for 1 minute.', 'Add shrimp and cook until pink (3-4 minutes).', 'Add zoodles to skillet and toss with shrimp and garlic butter for 2 minutes.', 'Sprinkle mozzarella cheese on top, cover with a lid for 1 minute until melted.']
        },
        snack: {
          id: 'k-s-2',
          name: 'Spicy Keto Guacamole & Cucumber Slices',
          calories: 150,
          protein: 2,
          carbs: 4,
          fat: 14,
          time: '04:30 PM',
          ingredients: ['1/2 Avocado (mashed)', '1/2 Lime (juiced)', '1/4 Jalapeno (finely minced)', '100g Fresh Cucumber Slices'],
          instructions: ['Mash avocado with lime juice, minced jalapeno, and salt.', 'Serve with crisp cucumber slices for a refreshing crunch.']
        },
        tip: 'When you feel sweet cravings, choose high-fat options like avocado or macadamia nuts rather than artificial sweeteners, which can spike insulin and disrupt ketosis.'
      },
      {
        dayNumber: 3,
        breakfast: {
          id: 'k-b-3',
          name: 'Smoked Salmon & Cream Cheese Omelette',
          calories: 430,
          protein: 28,
          carbs: 4,
          fat: 34,
          time: '08:00 AM',
          ingredients: ['3 Large Free-range Eggs', '50g Premium Smoked Salmon', '30g Organic Cream Cheese', '1 tsp Fresh Dill', '1 tbsp Butter'],
          instructions: ['Whisk eggs and pour into a hot buttered skillet.', 'Let the omelette set slightly, then spread cream cheese over one half.', 'Top with smoked salmon slices and fresh chopped dill.', 'Fold the omelette in half and serve hot.']
        },
        lunch: {
          id: 'k-l-3',
          name: 'Crispy Pork Belly Salad Bowl',
          calories: 540,
          protein: 26,
          carbs: 5,
          fat: 46,
          time: '01:00 PM',
          ingredients: ['120g Roasted Crispy Pork Belly', '3 cups Mixed Field Greens', '1 tbsp Olive Oil', '1 tbsp Apple Cider Vinegar', '10 Cherry Tomatoes'],
          instructions: ['Warm pork belly in an air-fryer or pan until crispy.', 'Toss field greens and cherry tomatoes with olive oil and apple cider vinegar.', 'Top salad with the warm, crispy pork belly cubes.']
        },
        dinner: {
          id: 'k-d-3',
          name: 'Bacon-wrapped Goat Cheese Stuffed Chicken',
          calories: 550,
          protein: 44,
          carbs: 3,
          fat: 40,
          time: '07:00 PM',
          ingredients: ['150g Chicken Breast', '40g Creamy Goat Cheese', '2 slices Smoked Bacon', '1 cup Sauteed Spinach', '1 tbsp Butter'],
          instructions: ['Slice chicken breast horizontally to create a pocket.', 'Stuff chicken with goat cheese and press closed.', 'Wrap the chicken breast tightly with bacon slices.', 'Bake at 200°C (390°F) for 25 minutes.', 'Serve on a bed of spinach sauteed in butter.']
        },
        snack: {
          id: 'k-s-3',
          name: 'Sea Salt & Vinegar Pecan Pack',
          calories: 130,
          protein: 2,
          carbs: 3,
          fat: 13,
          time: '04:30 PM',
          ingredients: ['20g Raw Pecans', '1 tsp Apple Cider Vinegar', '1/4 tsp Sea Salt'],
          instructions: ['Toss pecans with cider vinegar and sea salt, then bake at 150°C for 5 minutes to crisp up.']
        },
        tip: 'Organic Apple Cider Vinegar is excellent for keto—it improves insulin sensitivity and helps digest fats much more efficiently.'
      }
    ]
  },
  {
    id: 'lean-muscle',
    title: 'Lean Muscle Builder',
    description: 'High-protein, moderate-carbohydrate regimen designed to maximize muscle hypertrophy while maintaining a low body fat percentage.',
    longDescription: 'The Lean Muscle Builder program is optimized for active individuals who want to fuel intense resistance training, enhance muscle recovery, and support consistent protein synthesis. With a massive protein target (at least 2.0g per kg of body weight) and strategically timed complex carbohydrates, this program provides the necessary calories and amino acids without causing unnecessary fat storage.',
    category: 'gain',
    durationWeeks: 6,
    dailyCalories: 2600,
    macros: { protein: 35, carbs: 40, fat: 25 },
    difficulty: 'Intermediate',
    rating: 4.9,
    reviewsCount: 456,
    author: 'Coach Marcus Vance, CSCS',
    tags: ['Muscle Hypertrophy', 'High-Protein', 'Strength', 'Complex Carbs'],
    emoji: '💪',
    imageColor: 'from-blue-600 to-indigo-800',
    days: [
      {
        dayNumber: 1,
        breakfast: {
          id: 'm-b-1',
          name: 'Power Protein Oats with Berries',
          calories: 610,
          protein: 48,
          carbs: 68,
          fat: 15,
          time: '07:30 AM',
          ingredients: ['80g Rolled Oats', '1.5 scoops Whey Protein Isolate (Vanilla)', '150ml Unsweetened Almond Milk', '100g Fresh Blueberries', '15g Raw Almonds (chopped)'],
          instructions: ['Cook rolled oats with almond milk and a splash of water over medium heat until creamy.', 'Remove from heat and let cool for 2 minutes (to prevent protein clumping).', 'Stir in whey protein isolate thoroughly until perfectly smooth.', 'Top with blueberries, chopped almonds, and a dash of cinnamon.']
        },
        lunch: {
          id: 'm-l-1',
          name: 'Teriyaki Chicken, Broccoli & Rice',
          calories: 720,
          protein: 55,
          carbs: 85,
          fat: 14,
          time: '01:00 PM',
          ingredients: ['180g Lean Chicken Breast', '1 cup Jasmine Rice (uncooked measure)', '1.5 cups Fresh Broccoli Florets', '2 tbsp Low-sodium Teriyaki Sauce', '1 tsp Sesame Seeds'],
          instructions: ['Steam jasmine rice according to package directions.', 'Dice chicken breast and pan-fry until fully cooked, then stir in teriyaki sauce.', 'Steam or lightly saute broccoli florets.', 'Assemble the bowl: rice base, chicken, broccoli, and sprinkle with sesame seeds.']
        },
        dinner: {
          id: 'm-d-1',
          name: 'Lean Beef & Sweet Potato Power Plate',
          calories: 820,
          protein: 58,
          carbs: 90,
          fat: 22,
          time: '07:30 PM',
          ingredients: ['180g Extra Lean Ground Beef (95/5)', '250g Sweet Potato (baked)', '1 cup Sauteed Green Beans', '1 tbsp Coconut Oil'],
          instructions: ['Prick sweet potato with a fork and microwave for 6-8 minutes or bake at 200°C for 45 minutes.', 'Brown the ground beef in a skillet, draining any excess fat.', 'Saute green beans in coconut oil for 5 minutes.', 'Serve ground beef over sweet potato alongside green beans.']
        },
        snack: {
          id: 'm-s-1',
          name: 'Greek Yogurt & Honey Berry Cup',
          calories: 450,
          protein: 30,
          carbs: 45,
          fat: 14,
          time: '04:30 PM',
          ingredients: ['250g Non-fat Plain Greek Yogurt', '1 tbsp Organic Honey', '100g Sliced Strawberries', '15g Chia Seeds'],
          instructions: ['Scoop Greek yogurt into a bowl.', 'Top with fresh strawberries, chia seeds, and drizzle with organic honey.']
        },
        tip: 'Consume your Power Protein Oats within 60-90 minutes of waking up. This switches your body from a overnight fasting catabolic state to an anabolic state.'
      },
      {
        dayNumber: 2,
        breakfast: {
          id: 'm-b-2',
          name: 'Bulking Egg White & Turkey Bacon Bagel',
          calories: 590,
          protein: 42,
          carbs: 65,
          fat: 16,
          time: '07:30 AM',
          ingredients: ['1 Whole Wheat Bagel', '1 Whole Egg + 4 Egg Whites', '2 slices Crispy Turkey Bacon', '1 slice Low-fat Cheddar Cheese', 'Handful of Spinach'],
          instructions: ['Toast the whole wheat bagel.', 'Scramble the eggs and egg whites together in a non-stick pan.', 'Pan-fry turkey bacon until crispy.', 'Layer spinach, eggs, turkey bacon, and cheese inside the toasted bagel.']
        },
        lunch: {
          id: 'm-l-2',
          name: 'Sweet Chili Flank Steak with Quinoa',
          calories: 740,
          protein: 52,
          carbs: 80,
          fat: 18,
          time: '01:00 PM',
          ingredients: ['160g Lean Flank Steak', '1 cup Quinoa (cooked)', '1 cup Roasted Bell Pepper & Zucchini slices', '1.5 tbsp Sweet Chili Sauce'],
          instructions: ['Grill flank steak to medium-rare (approx. 4-5 mins per side). Let rest and slice thinly.', 'Cook quinoa in low-sodium vegetable broth.', 'Roast bell peppers and zucchini in the oven with salt and pepper.', 'Top quinoa with sliced steak and roasted veggies; drizzle with sweet chili sauce.']
        },
        dinner: {
          id: 'm-d-2',
          name: 'Air-fried Tilapia with Lemon Rice',
          calories: 780,
          protein: 50,
          carbs: 95,
          fat: 20,
          time: '07:30 PM',
          ingredients: ['200g Fresh Tilapia Fillets', '1.2 cups Basmati Rice', '1/2 Lemon (juiced)', '1.5 cups Grilled Asparagus', '1.5 tbsp Olive Oil'],
          instructions: ['Season tilapia with paprika, garlic powder, salt, and pepper.', 'Air-fry fish at 190°C (375°F) for 10-12 minutes.', 'Cook basmati rice and fold in lemon juice and 1/2 tbsp olive oil.', 'Serve tilapia with lemon rice and grilled asparagus tossed in olive oil.']
        },
        snack: {
          id: 'm-s-2',
          name: 'Anabolic Peanut Butter Banana Shake',
          calories: 490,
          protein: 36,
          carbs: 52,
          fat: 16,
          time: '04:30 PM',
          ingredients: ['1 scoop Whey Protein Isolate (Chocolate)', '1 Medium Banana', '1.5 tbsp Natural Peanut Butter', '250ml Unsweetened Soy Milk'],
          instructions: ['Combine protein powder, banana, peanut butter, soy milk, and ice cubes in a blender.', 'Blend on high for 45 seconds until perfectly smooth.']
        },
        tip: 'Quinoa is a unique seed that offers a complete amino acid profile, making it a stellar carb source for serious muscle repair.'
      },
      {
        dayNumber: 3,
        breakfast: {
          id: 'm-b-3',
          name: 'Anabolic French Toast',
          calories: 620,
          protein: 46,
          carbs: 70,
          fat: 14,
          time: '07:30 AM',
          ingredients: ['4 slices Whole Wheat Bread', '150ml Egg Whites', '1 scoop Vanilla Whey Protein', '1 tbsp Maple Syrup (Sugar-free)', '100g Fresh Raspberries'],
          instructions: ['Whisk egg whites and whey protein in a wide shallow dish.', 'Dip bread slices into the mixture, letting them soak up the liquid.', 'Cook on a non-stick griddle over medium heat until golden brown on both sides.', 'Top with raspberries and sugar-free maple syrup.']
        },
        lunch: {
          id: 'm-l-3',
          name: 'Lemon Herb Turkey & Couscous Bowl',
          calories: 730,
          protein: 54,
          carbs: 82,
          fat: 15,
          time: '01:00 PM',
          ingredients: ['180g Lean Ground Turkey (93/7)', '1 cup Pearl Couscous (cooked)', '1 cup Chopped Tomatoes & Cucumbers', '2 tbsp Hummus'],
          instructions: ['Sauté lean ground turkey with lemon herb seasoning, garlic, and salt.', 'Prepare pearl couscous.', 'Assemble bowl with couscous, turkey, tomatoes, cucumbers, and a generous scoop of hummus.']
        },
        dinner: {
          id: 'm-d-3',
          name: 'High Protein Sirloin Stir-fry',
          calories: 800,
          protein: 56,
          carbs: 88,
          fat: 22,
          time: '07:30 PM',
          ingredients: ['170g Lean Sirloin Steak (strips)', '150g Udon Noodles', '2 cups Snap Peas & Baby Corn', '2 tbsp Soy Sauce', '1 tbsp Sesame Oil'],
          instructions: ['Cook udon noodles according to package.', 'Sauté sirloin strips in sesame oil over high heat for 3 minutes.', 'Throw in snap peas and baby corn, cook for 3 minutes.', 'Add noodles and soy sauce, toss everything over high heat for 1 minute before serving.']
        },
        snack: {
          id: 'm-s-3',
          name: 'Cottage Cheese & Pineapple Bowl',
          calories: 450,
          protein: 32,
          carbs: 46,
          fat: 14,
          time: '04:30 PM',
          ingredients: ['250g Low-fat Cottage Cheese', '1 cup Fresh Diced Pineapple', '20g Pumpkin Seeds (pepitas)'],
          instructions: ['Spoon cottage cheese into a bowl.', 'Top with fresh sweet pineapple chunks and raw pumpkin seeds for healthy fats and zinc.']
        },
        tip: 'Casein and whey proteins found in cottage cheese release amino acids slowly, which prevents muscle breakdown during the evening.'
      }
    ]
  },
  {
    id: 'mediterranean-wellness',
    title: 'Mediterranean Wellness',
    description: 'Heart-healthy, nutrient-dense diet focusing on whole grains, active healthy fats, lean seafood, and abundant micronutrients.',
    longDescription: 'Inspired by the traditional eating patterns of nations bordering the Mediterranean Sea, this plan is the gold standard for long-term health, cardiovascular strength, and balanced weight maintenance. Rich in monounsaturated fats from premium olive oil, omega-3 fatty acids from wild seafood, and diverse fiber from ancient grains, beans, and fresh greens.',
    category: 'wellness',
    durationWeeks: 4,
    dailyCalories: 1800,
    macros: { protein: 25, carbs: 45, fat: 30 },
    difficulty: 'Beginner',
    rating: 4.9,
    reviewsCount: 188,
    author: 'Elena Rostova, Nutritionist',
    tags: ['Heart-Healthy', 'Anti-Inflammatory', 'Longevity', 'Omega-3'],
    emoji: '🍋',
    imageColor: 'from-amber-500 to-orange-700',
    days: [
      {
        dayNumber: 1,
        breakfast: {
          id: 'w-b-1',
          name: 'Greek Feta & Spinach Avocado Toast',
          calories: 410,
          protein: 16,
          carbs: 42,
          fat: 20,
          time: '08:30 AM',
          ingredients: ['2 slices Sourdough Bread', '1/2 Ripe Avocado', '40g Feta Cheese (crumbled)', '1 cup Baby Spinach (wilted)', '1 tsp Extra Virgin Olive Oil'],
          instructions: ['Toast sourdough slices until nice and crispy.', 'Wilt baby spinach in a pan with olive oil and a pinch of salt.', 'Mash avocado onto toast, top with wilted spinach and crumbled feta cheese.', 'Drizzle with extra olive oil and a dash of red pepper flakes.']
        },
        lunch: {
          id: 'w-l-1',
          name: 'Tuscan Chickpea & Tuna Salad',
          calories: 520,
          protein: 34,
          carbs: 52,
          fat: 18,
          time: '01:30 PM',
          ingredients: ['120g Flaked Albacore Tuna (in water)', '1 cup Canned Chickpeas (rinsed)', '1 cup Cherry Tomatoes (halved)', '1/2 Red Onion (diced)', '2 tbsp Greek Vinaigrette with Olive Oil'],
          instructions: ['Combine rinsed chickpeas, flaked tuna, cherry tomatoes, and diced red onion in a bowl.', 'Toss thoroughly with Greek olive-oil vinaigrette.', 'Serve chilled over a bed of fresh arugula.']
        },
        dinner: {
          id: 'w-d-1',
          name: 'Baked Lemon Herb Cod with Quinoa',
          calories: 580,
          protein: 36,
          carbs: 54,
          fat: 22,
          time: '07:00 PM',
          ingredients: ['180g Cod Fillet', '3/4 cup Cooked Quinoa', '1 cup Roasted Mediterranean Vegetables (eggplant, zucchini, peppers)', '1 tbsp Olive Oil', 'Fresh Dill & Lemon slices'],
          instructions: ['Place cod fillet on a baking sheet, drizzle with olive oil, lemon juice, salt, pepper, and fresh dill.', 'Bake cod at 180°C for 15 minutes.', 'Spoon warm quinoa onto plate, top with cod and serve with roasted vegetables.']
        },
        snack: {
          id: 'w-s-1',
          name: 'Mixed Greek Olives & Almond Pack',
          calories: 290,
          protein: 6,
          carbs: 12,
          fat: 25,
          time: '04:30 PM',
          ingredients: ['50g Kalamata Olives', '20g Dry Roasted Almonds'],
          instructions: ['Pair rich, savory olives with crunchy roasted almonds for a satisfying healthy-fat blend.']
        },
        tip: 'Extra virgin olive oil contains oleocanthal, a natural compound with highly potent anti-inflammatory properties that mimic ibuprofen. Always use cold-pressed EVOO.'
      },
      {
        dayNumber: 2,
        breakfast: {
          id: 'w-b-2',
          name: 'Eleni’s Fig & Honey Yogurt Bowl',
          calories: 390,
          protein: 18,
          carbs: 48,
          fat: 12,
          time: '08:30 AM',
          ingredients: ['200g Greek Yogurt (2%)', '2 Fresh Figs (sliced)', '1 tbsp Organic Honey', '30g Walnuts (crushed)'],
          instructions: ['Spoon Greek yogurt into a bowl.', 'Arrange fresh fig slices beautifully on top.', 'Drizzle with golden honey and sprinkle with crushed walnuts (excellent for plant-based Omega-3s).']
        },
        lunch: {
          id: 'w-l-2',
          name: 'Mediterranean Lentil Soup & Sourdough',
          calories: 540,
          protein: 24,
          carbs: 72,
          fat: 16,
          time: '01:30 PM',
          ingredients: ['1.5 cups Homemade Brown Lentil Soup', '1 slice Toasted Sourdough Bread', '1 tbsp Grated Parmesan', '1 tbsp Extra Virgin Olive Oil'],
          instructions: ['Heat lentil soup until steaming hot.', 'Drizzle the soup with premium olive oil and sprinkle with parmesan cheese.', 'Serve alongside warm sourdough toast for dipping.']
        },
        dinner: {
          id: 'w-d-2',
          name: 'Greek Grilled Chicken Souvlaki Plate',
          calories: 610,
          protein: 42,
          carbs: 50,
          fat: 24,
          time: '07:00 PM',
          ingredients: ['150g Grilled Chicken Breast Skewers', '1 Whole Wheat Pita Bread', '1/2 cup Tzatziki Sauce', 'Cucumber & Tomato Salad', '1 tbsp Olive Oil'],
          instructions: ['Season chicken skewers with oregano, garlic, lemon, and olive oil; grill until juicy.', 'Warm up pita bread on the griddle.', 'Assemble plate: chicken skewers, warm pita, tzatziki sauce, and a fresh salad.']
        },
        snack: {
          id: 'w-s-2',
          name: 'Hummus & Crisp Baby Carrots',
          calories: 260,
          protein: 6,
          carbs: 22,
          fat: 16,
          time: '04:30 PM',
          ingredients: ['4 tbsp Organic Hummus', '150g Fresh Baby Carrots'],
          instructions: ['Spoon hummus into a ramekin and dip crisp carrots for a high-fiber, low-calorie snack.']
        },
        tip: 'Lentils are loaded with soluble fiber which actively binds to cholesterol in your digestive system and pulls it out of the body, supporting heart health.'
      },
      {
        dayNumber: 3,
        breakfast: {
          id: 'w-b-3',
          name: 'Sun-dried Tomato & Goat Cheese Frittata',
          calories: 420,
          protein: 22,
          carbs: 18,
          fat: 28,
          time: '08:30 AM',
          ingredients: ['3 Eggs', '30g Goat Cheese (crumbled)', '4 Sun-dried Tomatoes (chopped)', '1/2 cup Chopped Kale', '1 tsp Olive Oil'],
          instructions: ['Whisk eggs and mix in goat cheese, kale, and sun-dried tomatoes.', 'Pour into a hot cast-iron skillet greased with olive oil.', 'Cook on the stovetop for 3 minutes, then bake or broil for 5 minutes until fully set.', 'Serve warm.']
        },
        lunch: {
          id: 'w-l-3',
          name: 'Quinoa Tabbouleh with Grilled Shrimp',
          calories: 510,
          protein: 32,
          carbs: 56,
          fat: 18,
          time: '01:30 PM',
          ingredients: ['120g Grilled King Shrimp', '1 cup Cooked Quinoa', '1 cup Finely Chopped Fresh Parsley', '1/2 cup Chopped Mint', '2 tbsp Lemon-Olive Oil Dressing'],
          instructions: ['Toss cold cooked quinoa with finely chopped parsley, mint, tomatoes, and cucumber.', 'Dress with lemon-olive oil vinaigrette.', 'Top with hot grilled king shrimp for an incredible hot-cold contrast.']
        },
        dinner: {
          id: 'w-d-3',
          name: 'Baked Salmon with Rosemary Potatoes',
          calories: 620,
          protein: 38,
          carbs: 48,
          fat: 26,
          time: '07:00 PM',
          ingredients: ['160g Wild Salmon Fillet', '150g Fingerling Potatoes', '1 tbsp Chopped Fresh Rosemary', '1.5 tbsp Olive Oil', '1 cup Steamed Green Asparagus'],
          instructions: ['Toss fingerling potatoes in olive oil, salt, pepper, and rosemary. Roast at 200°C for 25 minutes.', 'Season salmon and bake alongside potatoes for the final 12-15 minutes.', 'Serve with a side of steamed asparagus.']
        },
        snack: {
          id: 'w-s-3',
          name: 'Pomegranate & Walnut Sparker',
          calories: 250,
          protein: 5,
          carbs: 22,
          fat: 18,
          time: '04:30 PM',
          ingredients: ['1/2 cup Fresh Pomegranate Seeds', '20g Raw Walnut Halves'],
          instructions: ['Mix pomegranate seeds and walnuts in a cup.', 'The sweet tartness of pomegranate pairs perfectly with the rich earthiness of walnuts.']
        },
        tip: 'Walnuts contain the highest concentration of plant-derived Omega-3 fatty acids of any nut, protecting blood vessels and brain cells.'
      }
    ]
  },
  {
    id: 'vegan-high-protein',
    title: 'Vegan High-Protein',
    description: '100% plant-based meal plan structured to supply complete protein profiles and essential micronutrients.',
    longDescription: 'A common misconception is that plant-based diets lack high-quality protein. This program is masterfully curated to prove otherwise. By combining varied amino acid profiles (grains, legumes, nuts, seeds, and organic soy), we construct "complete proteins" that fully support recovery, cell growth, and vitality, while feeding your microbiome with an abundance of prebiotics and antioxidants.',
    category: 'wellness',
    durationWeeks: 4,
    dailyCalories: 1950,
    macros: { protein: 30, carbs: 45, fat: 25 },
    difficulty: 'Beginner',
    rating: 4.7,
    reviewsCount: 142,
    author: 'Chef Leo Sterling, Plant Coach',
    tags: ['Plant-Based', 'Vegan', 'Microbiome', 'Fiber-Rich'],
    emoji: '🌱',
    imageColor: 'from-green-600 to-emerald-900',
    days: [
      {
        dayNumber: 1,
        breakfast: {
          id: 'v-b-1',
          name: 'Peanut Butter Chocolate Tofu Shake',
          calories: 450,
          protein: 35,
          carbs: 38,
          fat: 18,
          time: '08:00 AM',
          ingredients: ['150g Organic Silken Tofu', '1 scoop Plant Protein Powder (Chocolate)', '1.5 tbsp All-Natural Peanut Butter', '200ml Unsweetened Almond Milk', '1/2 Frozen Banana'],
          instructions: ['Add silken tofu, plant protein powder, peanut butter, frozen banana, and almond milk into a blender.', 'Blend on high for 60 seconds until creamy and rich.', 'Pour into a chilled glass and dust with a pinch of cocoa powder.']
        },
        lunch: {
          id: 'v-l-1',
          name: 'Crispy Tempeh & Edamame Bowl',
          calories: 580,
          protein: 38,
          carbs: 54,
          fat: 20,
          time: '01:00 PM',
          ingredients: ['120g Organic Tempeh (cubed)', '1/2 cup Shelled Edamame Beans', '1 cup Cooked Brown Rice', '1 cup Purple Cabbage (shredded)', '1.5 tbsp Ginger Sesame Dressing'],
          instructions: ['Sauté cubed tempeh in a non-stick pan with a splash of tamari soy sauce until crispy.', 'Place warm brown rice in a bowl.', 'Top with crispy tempeh, edamame, and shredded purple cabbage.', 'Drizzle with ginger sesame dressing and garnish with green onions.']
        },
        dinner: {
          id: 'v-d-1',
          name: 'Massive Mediterranean Chickpea Falafel Bowl',
          calories: 680,
          protein: 32,
          carbs: 82,
          fat: 22,
          time: '07:30 PM',
          ingredients: ['4 Baked Herb Falafels', '1 cup Cooked Quinoa', '1 cup Spiced Chickpeas (roasted)', '3 tbsp Creamy Tahini Paste', '1/2 cup Cucumber & Mint Salad'],
          instructions: ['Warm up baked falafels.', 'Combine quinoa and roasted spiced chickpeas in a wide bowl.', 'Add falafels and cucumber-mint salad.', 'Thin tahini paste with warm water and lemon juice, then drizzle generously over the entire bowl.']
        },
        snack: {
          id: 'v-s-1',
          name: 'Spiced Edamame Pods',
          calories: 240,
          protein: 17,
          carbs: 18,
          fat: 10,
          time: '04:00 PM',
          ingredients: ['150g Edamame Pods', '1 tsp Chili Flakes', '1/2 tsp Sea Salt', '1 tsp Sesame Oil'],
          instructions: ['Steam edamame pods until bright green.', 'Toss immediately with sesame oil, sea salt, and chili flakes. Eat warm.']
        },
        tip: 'Silken tofu is an outstanding, tasteless source of smooth protein and healthy plant fats that blends beautifully into shakes.'
      },
      {
        dayNumber: 2,
        breakfast: {
          id: 'v-b-2',
          name: 'High Protein Savory Chickpea Scramble',
          calories: 420,
          protein: 26,
          carbs: 45,
          fat: 14,
          time: '08:00 AM',
          ingredients: ['1 cup Chickpea Flour (besan)', '1 cup Unsweetened Soy Milk', '1/2 cup Sauteed Mushrooms & Bell Peppers', '1 tbsp Nutritional Yeast', '1 tsp Turmeric'],
          instructions: ['Whisk chickpea flour, soy milk, turmeric, nutritional yeast, salt, and pepper into a smooth batter.', 'Pour into a hot skillet with sautéed mushrooms and peppers.', 'Scramble gently with a spatula as it cooks (approx. 5 minutes) until fluffy and dry.', 'Serve hot.']
        },
        lunch: {
          id: 'v-l-2',
          name: 'Smoky Maple BBQ Tempeh Sandwich',
          calories: 590,
          protein: 36,
          carbs: 62,
          fat: 22,
          time: '01:00 PM',
          ingredients: ['130g Tempeh (sliced)', '2 slices Sprouted Grain Ezekiel Bread', '2 tbsp Organic BBQ Sauce', '1 slice Vegan Smoked Gouda', '1 leaf Butter Lettuce'],
          instructions: ['Marinate tempeh slices in BBQ sauce and pan-sear for 3 minutes per side.', 'Toast sprouted grain bread.', 'Assemble sandwich with warm tempeh, melted vegan cheese, and crisp lettuce.']
        },
        dinner: {
          id: 'v-d-2',
          name: 'Lentil Dahl & Toasted Garlic Naan',
          calories: 690,
          protein: 34,
          carbs: 95,
          fat: 16,
          time: '07:30 PM',
          ingredients: ['1.5 cups Red Lentil Dahl (cooked with ginger, garlic, coconut milk)', '1 piece Vegan Garlic Naan Bread', '1/2 cup Fresh Cilantro leaves', '1 tbsp Lemon juice'],
          instructions: ['Simmer red lentil dahl until thick and aromatic.', 'Toast garlic naan bread over an open flame or pan.', 'Ladle dahl into a bowl, garnish with plenty of fresh cilantro and lemon juice, and serve with hot naan.']
        },
        snack: {
          id: 'v-s-2',
          name: 'High Protein Peanut Butter Energy Balls',
          calories: 250,
          protein: 12,
          carbs: 24,
          fat: 12,
          time: '04:00 PM',
          ingredients: ['2 Homemade Energy Balls (rolled oats, peanut butter, vegan protein powder, chia seeds)'],
          instructions: ['Pre-prep these on Sunday. Slow-chew for sustained, robust afternoon vitality.']
        },
        tip: 'Nutritional Yeast (often called "nooch") has a delicious cheesy flavor and is loaded with Vitamin B12 and complete protein.'
      },
      {
        dayNumber: 3,
        breakfast: {
          id: 'v-b-3',
          name: 'Tropical Berry Chia Protein Pudding',
          calories: 430,
          protein: 28,
          carbs: 48,
          fat: 14,
          time: '08:00 AM',
          ingredients: ['35g Chia Seeds', '200ml Unsweetened Soy Milk', '1 scoop Vanilla Vegan Protein', '1/2 cup Diced Mango', '1/2 cup Fresh Blackberries'],
          instructions: ['Whisk chia seeds, soy milk, and protein powder in a jar. Refrigerate overnight to thicken.', 'In the morning, top with sweet fresh mango cubes and ripe blackberries. Enjoy cool.']
        },
        lunch: {
          id: 'v-l-3',
          name: 'Mexican Chipotle Black Bean Burrito',
          calories: 610,
          protein: 32,
          carbs: 78,
          fat: 18,
          time: '01:00 PM',
          ingredients: ['1 Large Whole Wheat Tortilla Wrap', '1 cup Organic Black Beans (rinsed)', '1/2 cup Spicy Brown Rice', '2 tbsp Guacamole', '3 tbsp Salsa', '30g Vegan Cheddar Shreds'],
          instructions: ['Warm up tortilla and black beans.', 'Layer rice, black beans, vegan cheddar, guacamole, and salsa inside tortilla.', 'Fold the edges and roll tightly, then grill on a dry pan for 1 minute to seal and melt cheese.']
        },
        dinner: {
          id: 'v-d-3',
          name: 'Crispy Sesame Peanut Tofu Stir-fry',
          calories: 670,
          protein: 36,
          carbs: 68,
          fat: 26,
          time: '07:30 PM',
          ingredients: ['180g Extra Firm Tofu', '2 tbsp Peanut Butter', '1 tbsp Soy Sauce (Tamari)', '1 tbsp Maple Syrup', '2 cups Broccoli, Bell Pepper & Snap Pea stir-fry veggies', '1 cup Cooked Jasmine Rice'],
          instructions: ['Press firm tofu to remove water, cube, and pan-fry or air-fry until crispy.', 'Whisk peanut butter, soy sauce, maple syrup, and warm water to make the sauce.', 'Sauté veggies in a hot pan, throw in tofu and pour sauce on top. Cook for 2 minutes to thicken.', 'Serve over steaming jasmine rice.']
        },
        snack: {
          id: 'v-s-3',
          name: 'Roasted Tamari Pumpkin Seeds',
          calories: 240,
          protein: 14,
          carbs: 10,
          fat: 18,
          time: '04:00 PM',
          ingredients: ['30g Raw Pumpkin Seeds', '1 tsp Tamari Soy Sauce'],
          instructions: ['Toss pumpkin seeds with tamari and roast at 160°C for 8 minutes until fragrant and crisp.']
        },
        tip: 'Soy milk contains significantly more protein (8g per cup) compared to almond or oat milk, making it a great dairy-free option for active vegans.'
      }
    ]
  },
  {
    id: 'metabolic-fasting',
    title: 'Metabolic Fasting & Fuel',
    description: 'A 16:8 intermittent fasting program paired with low-glycemic, energy-stable meals for cellular cleanup and metabolic agility.',
    longDescription: 'The Metabolic Fasting & Fuel plan combines the scientifically proven cellular recovery benefits of intermittent fasting with blood-sugar-stabilizing meals during your 8-hour feeding window. Ideal for those seeking fat loss, insulin sensitivity improvements, and sustained mental productivity. The feeding window is suggested from 12:00 PM to 8:00 PM daily.',
    category: 'endurance',
    durationWeeks: 4,
    dailyCalories: 1750,
    macros: { protein: 30, carbs: 35, fat: 35 },
    difficulty: 'Advanced',
    rating: 4.6,
    reviewsCount: 96,
    author: 'Dr. Arthur Sterling, PhD',
    tags: ['Intermittent Fasting', 'Autophagy', 'Insulin Reset', 'Sustained Energy'],
    emoji: '⏱️',
    imageColor: 'from-purple-600 to-indigo-900',
    days: [
      {
        dayNumber: 1,
        breakfast: {
          id: 'f-b-1',
          name: 'Fasting Window (Water, Black Coffee, or Tea)',
          calories: 0,
          protein: 0,
          carbs: 0,
          fat: 0,
          time: '09:00 AM',
          ingredients: ['300ml Filtered Water', '1 cup Organic Black Coffee (optional)'],
          instructions: ['Keep fasting. Your insulin is low, human growth hormone is high, and your body is burning stored fats for fuel.']
        },
        lunch: {
          id: 'f-l-1',
          name: 'Fast-Breaker Salmon & Quinoa Salad',
          calories: 680,
          protein: 42,
          carbs: 45,
          fat: 32,
          time: '12:00 PM',
          ingredients: ['150g Baked Salmon Fillet', '3/4 cup Quinoa (cooked)', '1 cup Sliced Avocado', '2 cups Mixed Baby Greens', '1.5 tbsp Lemon Herb Dressing'],
          instructions: ['Chop mixed baby greens and avocado.', 'Toss quinoa and greens with lemon herb dressing in a bowl.', 'Top with sliced avocado and the flaky baked salmon fillet.', 'Eat slowly to ease your digestive tract back into eating state.']
        },
        dinner: {
          id: 'f-d-1',
          name: 'Slow-Cooked Pulled Beef with Broccoli',
          calories: 780,
          protein: 52,
          carbs: 22,
          fat: 48,
          time: '07:30 PM',
          ingredients: ['180g Grass-fed Pulled Beef', '1.5 cups Steamed Broccoli Florets', '1 tbsp Grass-fed Butter', '100g Mashed Cauliflower'],
          instructions: ['Heat pre-cooked succulent pulled beef.', 'Steam broccoli and toss with grass-fed butter and sea salt.', 'Serve pulled beef on a fluffy bed of mashed cauliflower with broccoli on the side.']
        },
        snack: {
          id: 'f-s-1',
          name: 'Omega Fuel Nut & Seed Mix',
          calories: 290,
          protein: 8,
          carbs: 12,
          fat: 24,
          time: '04:00 PM',
          ingredients: ['15g Raw Walnuts', '15g Raw Pumpkin Seeds', '10g Dark Chocolate (85% Cocoa)'],
          instructions: ['Mix nuts, seeds, and broken pieces of dark chocolate in a bowl.', 'A perfect low-glycemic, antioxidant-rich afternoon fat snack.']
        },
        tip: 'To maximize the metabolic benefits of intermittent fasting, maintain a strict 16-hour fasting window and focus on mineral hydration during fast hours.'
      },
      {
        dayNumber: 2,
        breakfast: {
          id: 'f-b-2',
          name: 'Fasting Window (Herbal Lemon Water)',
          calories: 0,
          protein: 0,
          carbs: 0,
          fat: 0,
          time: '09:00 AM',
          ingredients: ['350ml Warm Water', '1/2 Fresh Lemon (juiced)', 'Pinch of Himalayan Pink Salt'],
          instructions: ['Sip warm lemon water slowly. Pink salt delivers essential trace minerals while keeping your fast unbroken.']
        },
        lunch: {
          id: 'f-l-2',
          name: 'Keto Turkey Bacon Cobb Giant Bowl',
          calories: 690,
          protein: 48,
          carbs: 10,
          fat: 46,
          time: '12:00 PM',
          ingredients: ['150g Roast Turkey Breast', '2 slices Smoked Turkey Bacon (crispy)', '2 Hard-Boiled Eggs', '1/2 Ripe Avocado', '3 cups Romaine Lettuce', '2 tbsp Olive Oil & Red Wine Vinegar'],
          instructions: ['Chop romaine lettuce and place in a massive serving bowl.', 'Dice turkey breast, crispy turkey bacon, boiled eggs, and avocado.', 'Arrange them in colorful rows over lettuce.', 'Drizzle with olive oil and red wine vinegar dressing, then toss.']
        },
        dinner: {
          id: 'f-d-2',
          name: 'Garlic Butter Pork Chop with Asparagus',
          calories: 760,
          protein: 44,
          carbs: 12,
          fat: 52,
          time: '07:30 PM',
          ingredients: ['180g Center-cut Pork Chop', '1.5 cups Asparagus spears', '2 tbsp Butter', '2 cloves Minced Garlic', '150g Mashed Sweet Potato'],
          instructions: ['Sauté asparagus in a skillet with 1/2 tbsp butter and minced garlic.', 'In a hot skillet, cook pork chop in remaining butter and garlic (approx. 5 minutes per side). Baste with garlic butter.', 'Serve pork chop with garlic asparagus and savory mashed sweet potato.']
        },
        snack: {
          id: 'f-s-2',
          name: 'Organic Almond Butter Celery Sticks',
          calories: 300,
          protein: 7,
          carbs: 10,
          fat: 26,
          time: '04:00 PM',
          ingredients: ['2 tbsp All-Natural Creamy Almond Butter', '4 long sticks Celery'],
          instructions: ['Fill celery stick channels with creamy almond butter.', 'Provides healthy monosaturated fats and fiber to keep hunger at bay.']
        },
        tip: 'High-cocoa dark chocolate (85%+) contains prebiotic soluble fibers that feed your gut flora during your feeding window.'
      },
      {
        dayNumber: 3,
        breakfast: {
          id: 'f-b-3',
          name: 'Fasting Window (Unsweetened Matcha Tea)',
          calories: 0,
          protein: 0,
          carbs: 0,
          fat: 0,
          time: '09:00 AM',
          ingredients: ['1 tsp Ceremonial Grade Matcha Powder', '250ml Hot Water'],
          instructions: ['Whisk matcha powder in hot water.', 'Matcha is rich in L-theanine and EGCG, promoting deep focus and thermogenesis without spiking insulin.']
        },
        lunch: {
          id: 'f-l-3',
          name: 'Sesame Ginger Beef & Broccoli Quinoa Bowl',
          calories: 710,
          protein: 46,
          carbs: 48,
          fat: 32,
          time: '12:00 PM',
          ingredients: ['140g Lean Beef Strips', '1.5 cups Broccoli', '1 cup Cooked Quinoa', '1.5 tbsp Sesame Ginger Sauce', '1 tbsp Sesame Oil'],
          instructions: ['Sauté beef and broccoli in sesame oil over high heat.', 'Add sesame ginger sauce, toss to coat.', 'Serve hot over quinoa base.']
        },
        dinner: {
          id: 'f-d-3',
          name: 'Mediterranean Baked Sea Bass Fillet',
          calories: 740,
          protein: 40,
          carbs: 40,
          fat: 38,
          time: '07:30 PM',
          ingredients: ['180g Sea Bass Fillet', '1 cup Cherry Tomatoes (halved)', '10 Kalamata Olives (halved)', '1.5 tbsp Olive Oil', '1 cup Roasted Fingerling Potatoes'],
          instructions: ['Bake sea bass fillet with tomatoes, olives, fingerling potatoes, olive oil, and rosemary for 20 minutes at 190°C.', 'Serve hot. Finishing your meal at 8:00 PM begins your overnight cellular autophagy healing phase!']
        },
        snack: {
          id: 'f-s-3',
          name: 'Organic Walnuts & Sea Salt Spark',
          calories: 300,
          protein: 6,
          carbs: 8,
          fat: 28,
          time: '04:00 PM',
          ingredients: ['40g Raw Walnuts', '1/4 tsp Maldon Sea Salt'],
          instructions: ['Enjoy raw walnuts salted lightly for brain health and sustained satiation.']
        },
        tip: 'Finishing your final bite of dinner by 8:00 PM solidifies the fasting routine, allowing your digestion to completely rest during sleep.'
      }
    ]
  }
];
