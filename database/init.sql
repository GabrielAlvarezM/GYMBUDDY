-- =========================
--  TABLA: users
-- =========================
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  email VARCHAR(120) UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  fitness_level VARCHAR(20) NOT NULL CHECK (fitness_level IN ('beginner','intermediate','advanced')),
  created_at TIMESTAMP DEFAULT NOW()
);

-- =========================
--  TABLA: workouts
-- =========================
CREATE TABLE IF NOT EXISTS workouts (
  id SERIAL PRIMARY KEY,
  title VARCHAR(120) NOT NULL,
  description TEXT NOT NULL,
  details TEXT,
  fitness_level VARCHAR(20) NOT NULL CHECK (fitness_level IN ('beginner','intermediate','advanced')),
  image_url TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- =========================
--  TABLA: diets
-- =========================
CREATE TABLE IF NOT EXISTS diets (
  id SERIAL PRIMARY KEY,
  title VARCHAR(120) NOT NULL,
  description TEXT NOT NULL,
  details TEXT,
  fitness_level VARCHAR(20) NOT NULL CHECK (fitness_level IN ('beginner','intermediate','advanced')),
  image_url TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- =========================
--  TABLA: supplements
-- =========================
CREATE TABLE IF NOT EXISTS supplements (
  id SERIAL PRIMARY KEY,
  title VARCHAR(120) NOT NULL,
  description TEXT NOT NULL,
  details TEXT,
  fitness_level VARCHAR(20) NOT NULL CHECK (fitness_level IN ('beginner','intermediate','advanced')),
  image_url TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Permisos
GRANT ALL PRIVILEGES ON DATABASE gymbuddy_db TO gymbuddy_user;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO gymbuddy_user;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO gymbuddy_user;

-- USUARIOS
INSERT INTO users (username, email, password_hash, fitness_level)
VALUES
('demo_beginner', 'beginner@gymbuddy.com', '$2b$12$demo_hash_beginner', 'beginner'),
('demo_intermediate', 'intermediate@gymbuddy.com', '$2b$12$demo_hash_intermediate', 'intermediate'),
('demo_advanced', 'advanced@gymbuddy.com', '$2b$12$demo_hash_advanced', 'advanced')
ON CONFLICT DO NOTHING;

-- ==================== WORKOUTS ====================

-- BEGINNER WORKOUTS
INSERT INTO workouts (title, description, details, fitness_level, image_url) VALUES
('Full Body Basics', 'Complete beginner workout for all muscle groups', 'Bodyweight squats: 3x12
Push-ups (knee): 3x8
Plank: 3x30 seconds
Lunges: 3x10 each leg
Mountain climbers: 3x15', 'beginner', '/images/workouts.jpg'),

('Cardio Starter', 'Low-impact cardio to build endurance', 'Walking: 20 minutes
Jumping jacks: 3x15
High knees: 3x20
Butt kicks: 3x20
Cool down stretch: 5 minutes', 'beginner', '/images/workouts.jpg'),

('Core Foundation', 'Build a strong core for beginners', 'Crunches: 3x15
Bicycle crunches: 3x12
Leg raises: 3x10
Dead bug: 3x10
Bird dog: 3x8 each side', 'beginner', '/images/workouts.jpg'),

('Upper Body Intro', 'Introduction to upper body training', 'Wall push-ups: 3x12
Dumbbell rows: 3x10
Shoulder press (light): 3x10
Bicep curls: 3x12
Tricep dips: 3x8', 'beginner', '/images/workouts.jpg'),

('Lower Body Start', 'Leg workout for beginners', 'Bodyweight squats: 3x15
Lunges: 3x10 each
Glute bridges: 3x15
Calf raises: 3x20
Wall sit: 3x30 seconds', 'beginner', '/images/workouts.jpg'),

('Flexibility Flow', 'Improve mobility and flexibility', 'Dynamic stretches: 10 minutes
Yoga poses: 15 minutes
Static stretches: 10 minutes
Foam rolling: 5 minutes
Deep breathing: 5 minutes', 'beginner', '/images/workouts.jpg');

-- INTERMEDIATE WORKOUTS
INSERT INTO workouts (title, description, details, fitness_level, image_url) VALUES
('Upper/Lower Split', 'Classic 4-day split routine', 'Day 1 Upper: Bench press 4x8, Rows 4x10
Day 2 Lower: Squats 4x8, Leg press 3x12
Day 3 Rest
Day 4 Upper: OHP 4x8, Pull-ups 4x8
Day 5 Lower: Deadlifts 4x6, Lunges 3x10', 'intermediate', '/images/workouts.jpg'),

('HIIT Cardio Blast', 'High intensity interval training', 'Burpees: 45s on, 15s off
Jump squats: 45s on, 15s off
Mountain climbers: 45s on, 15s off
Box jumps: 45s on, 15s off
Repeat 4 rounds', 'intermediate', '/images/workouts.jpg'),

('Strength Builder', 'Build serious strength with compounds', 'Squats: 5x5
Bench press: 5x5
Bent over rows: 5x5
Overhead press: 4x6
Pull-ups: 4x8', 'intermediate', '/images/workouts.jpg'),

('Metabolic Circuit', 'Fat burning metabolic workout', 'Kettlebell swings: 40 seconds
Battle ropes: 40 seconds
Box jumps: 40 seconds
Medicine ball slams: 40 seconds
Rest: 2 minutes, repeat 5 rounds', 'intermediate', '/images/workouts.jpg'),

('Hypertrophy Focus', 'Muscle building workout', 'Incline bench: 4x10
Dumbbell rows: 4x10
Leg press: 4x12
Romanian deadlifts: 4x10
Lateral raises: 4x12', 'intermediate', '/images/workouts.jpg'),

('Athletic Performance', 'Improve sports performance', 'Power cleans: 5x3
Box jumps: 4x8
Sled pushes: 4x20m
Sprints: 8x50m
Plyometric push-ups: 4x10', 'intermediate', '/images/workouts.jpg');

-- ADVANCED WORKOUTS
INSERT INTO workouts (title, description, details, fitness_level, image_url) VALUES
('Push Pull Legs', 'Classic PPL split for mass', 'Push: Bench 5x5, Incline 4x8, Dips 4x10
Pull: Deadlift 5x5, Pull-ups 4x8, Rows 4x10
Legs: Squats 5x5, Leg press 4x12, Lunges 4x10', 'advanced', '/images/workouts.jpg'),

('Powerlifting Program', 'Maximize strength in big 3', 'Squat: 5x3 at 85%
Bench: 5x3 at 85%
Deadlift: 5x3 at 85%
Accessories: 4 exercises 4x8
Weekly progression', 'advanced', '/images/workouts.jpg'),

('Olympic Lifting', 'Technical Olympic lifts', 'Snatch: 6x2
Clean & Jerk: 6x2
Front squats: 4x5
Push press: 4x6
Hang cleans: 4x4', 'advanced', '/images/workouts.jpg'),

('Bodybuilding Split', 'Professional bodybuilding routine', 'Chest day: 8 exercises, 4 sets each
Back day: 8 exercises, 4 sets each
Legs day: 8 exercises, 4 sets each
Shoulders: 6 exercises, 4 sets each
Arms: 6 exercises, 4 sets each', 'advanced', '/images/workouts.jpg'),

('Crossfit WOD', 'High intensity crossfit workout', 'AMRAP 20 minutes:
5 Pull-ups
10 Push-ups
15 Air squats
Then: 100 Double-unders for time
Then: Max deadlifts at 225lbs', 'advanced', '/images/workouts.jpg'),

('Calisthenics Master', 'Advanced bodyweight skills', 'Muscle-ups: 5x5
Handstand push-ups: 5x8
Pistol squats: 4x8 each
L-sit: 5x30 seconds
Planche progressions: 6 sets', 'advanced', '/images/workouts.jpg');

-- ==================== DIETS ====================

-- BEGINNER DIETS
INSERT INTO diets (title, description, details, fitness_level, image_url) VALUES
('Balanced Nutrition', 'Simple healthy eating plan', 'Breakfast: Oatmeal with fruits
Snack: Greek yogurt
Lunch: Chicken breast with rice and veggies
Snack: Protein shake
Dinner: Fish with quinoa and salad
Calories: 2000-2200', 'beginner', '/images/diets.jpg'),

('Clean Eating Start', 'Introduction to clean eating', 'Focus on whole foods
Eliminate processed foods
Drink 8 glasses of water daily
3 meals + 2 snacks
Meal prep on Sundays', 'beginner', '/images/diets.jpg'),

('Macro Basics', 'Learn about macronutrients', 'Protein: 30% (150g)
Carbs: 40% (200g)
Fats: 30% (67g)
Total: 2000 calories
Track in MyFitnessPal', 'beginner', '/images/diets.jpg'),

('Meal Prep 101', 'Easy meal prep for beginners', 'Sunday prep: Cook 5 chicken breasts
Prepare 5 cups of rice
Chop vegetables for week
Make 5 breakfast egg muffins
Store in containers', 'beginner', '/images/diets.jpg'),

('Vegetarian Starter', 'Plant-based protein sources', 'Breakfast: Tofu scramble
Lunch: Lentil curry with rice
Dinner: Black bean burgers
Snacks: Nuts, hummus, protein shake
Protein: 120g daily', 'beginner', '/images/diets.jpg'),

('Hydration Focus', 'Proper hydration and nutrition', 'Water: 3 liters daily
Electrolytes after workout
Green tea in morning
Avoid sugary drinks
Track water intake', 'beginner', '/images/diets.jpg');

-- INTERMEDIATE DIETS
INSERT INTO diets (title, description, details, fitness_level, image_url) VALUES
('Lean Bulk', 'Gain muscle while staying lean', 'Calories: 2800
Protein: 200g
Carbs: 350g
Fats: 80g
Surplus: +300 calories
Weekly weight gain: 0.5 lbs', 'intermediate', '/images/diets.jpg'),

('Carb Cycling', 'Strategic carbohydrate manipulation', 'High days (training): 300g carbs
Low days (rest): 150g carbs
Protein constant: 180g
Fats adjust inversely
Track performance', 'intermediate', '/images/diets.jpg'),

('Intermittent Fasting', '16:8 fasting protocol', 'Fast: 8pm to 12pm
Eating window: 12pm to 8pm
2-3 meals in window
Pre-workout fasted
Maintain calorie target', 'intermediate', '/images/diets.jpg'),

('Mediterranean Diet', 'Healthy fats and lean proteins', 'Olive oil as main fat
Fish 3x per week
Vegetables with every meal
Whole grains
Moderate wine consumption', 'intermediate', '/images/diets.jpg'),

('Flexible Dieting', 'IIFYM approach to nutrition', 'Track macros: 180P/300C/70F
80% whole foods
20% flexible foods
Hit daily fiber goal
Adjust based on progress', 'intermediate', '/images/diets.jpg'),

('Performance Nutrition', 'Fuel for athletic performance', 'Pre-workout: 40g carbs
Intra-workout: BCAAs
Post-workout: 30g protein + 60g carbs
Daily: 3000 calories
Hydration: 4 liters', 'intermediate', '/images/diets.jpg');

-- ADVANCED DIETS
INSERT INTO diets (title, description, details, fitness_level, image_url) VALUES
('Aggressive Cut', 'Rapid fat loss protocol', 'Calories: 1800
Protein: 220g
Carbs: 100g
Fats: 60g
Deficit: -800 calories
Duration: 8-12 weeks', 'advanced', '/images/diets.jpg'),

('Keto Bodybuilding', 'Ketogenic diet for muscle', 'Carbs: <30g
Protein: 200g
Fats: 180g
Calories: 2600
MCT oil supplementation
Electrolyte management', 'advanced', '/images/diets.jpg'),

('Reverse Dieting', 'Strategic metabolic recovery', 'Week 1: +100 calories
Week 2: +100 calories
Continue until maintenance
Prioritize carbs
Monitor body composition', 'advanced', '/images/diets.jpg'),

('Competition Prep', 'Bodybuilding show preparation', 'Weeks 12-8: Moderate deficit
Weeks 8-4: Aggressive cut
Weeks 4-1: Peak week protocol
Sodium manipulation
Water loading', 'advanced', '/images/diets.jpg'),

('Carnivore Protocol', 'Animal-based nutrition', 'Only animal products
Red meat: 2 lbs daily
Eggs: 6-8 daily
Organ meats: 2x weekly
Salt to taste
No plants', 'advanced', '/images/diets.jpg'),

('Refeed Strategy', 'Strategic overeeding', 'Normal days: -500 calories
Refeed (1x/week): +500 calories
High carb on refeed
Maintain protein
Leptin management', 'advanced', '/images/diets.jpg');

-- ==================== SUPPLEMENTS ====================

-- BEGINNER SUPPLEMENTS
INSERT INTO supplements (title, description, details, fitness_level, image_url) VALUES
('Whey Protein', 'Essential protein supplement', 'Dosage: 25-30g per serving
Timing: Post-workout
Benefits: Muscle recovery
Mix with water or milk
Choose quality brand', 'beginner', '/images/supplements.jpg'),

('Multivitamin', 'Daily vitamin and mineral support', 'Take with breakfast
Fills nutritional gaps
Choose quality brand
Not meal replacement
Daily consistency important', 'beginner', '/images/supplements.jpg'),

('Fish Oil', 'Omega-3 fatty acids', 'Dosage: 2-3g daily
Benefits: Heart health, joints
Take with meals
Quality matters
Check EPA/DHA content', 'beginner', '/images/supplements.jpg'),

('Vitamin D3', 'Essential vitamin supplement', 'Dosage: 2000-5000 IU
Take with fats
Morning timing best
Support immune system
Test levels annually', 'beginner', '/images/supplements.jpg'),

('Magnesium', 'Essential mineral supplement', 'Dosage: 400mg daily
Take before bed
Improve sleep quality
Support muscle function
Choose citrate or glycinate', 'beginner', '/images/supplements.jpg'),

('Protein Bars', 'Convenient protein source', 'Look for: 20g+ protein
Low sugar options
On-the-go nutrition
Read ingredients
Not meal replacement', 'beginner', '/images/supplements.jpg');

-- INTERMEDIATE SUPPLEMENTS
INSERT INTO supplements (title, description, details, fitness_level, image_url) VALUES
('Creatine Monohydrate', 'Proven strength enhancer', 'Loading: 20g for 5 days
Maintenance: 5g daily
Mix with water/juice
Timing flexible
Hydrate well', 'intermediate', '/images/supplements.jpg'),

('Pre-Workout', 'Energy and focus booster', 'Dosage: 1 scoop
Timing: 30 min before training
Caffeine: 150-300mg
Cycling recommended
Stay hydrated', 'intermediate', '/images/supplements.jpg'),

('BCAAs', 'Branched-chain amino acids', 'Dosage: 5-10g
During fasted training
Intra-workout option
Leucine: 2.5g minimum
Mixing with water', 'intermediate', '/images/supplements.jpg'),

('Beta-Alanine', 'Endurance and performance', 'Dosage: 3-6g daily
Timing flexible
Tingling normal
Load for 4 weeks
Maintain 2-3g daily', 'intermediate', '/images/supplements.jpg'),

('Citrulline Malate', 'Pump and endurance', 'Dosage: 6-8g
Pre-workout timing
Improve blood flow
Reduce fatigue
Enhance pump', 'intermediate', '/images/supplements.jpg'),

('ZMA', 'Zinc, magnesium, B6 complex', 'Take before bed
Improve sleep quality
Support testosterone
Empty stomach
Separate from calcium', 'intermediate', '/images/supplements.jpg');

-- ADVANCED SUPPLEMENTS
INSERT INTO supplements (title, description, details, fitness_level, image_url) VALUES
('EAAs', 'Essential amino acids', 'Dosage: 10-15g
Intra-workout ideal
All 9 essentials
Superior to BCAAs
Fasted training', 'advanced', '/images/supplements.jpg'),

('Turkesterone', 'Natural anabolic', 'Dosage: 500mg daily
Cycle: 8-12 weeks
Take with fats
Monitor response
Expensive but effective', 'advanced', '/images/supplements.jpg'),

('HMB', 'Leucine metabolite', 'Dosage: 3g daily
Anti-catabolic
During cut
Split 3 doses
Empty stomach', 'advanced', '/images/supplements.jpg'),

('Nitric Oxide Boosters', 'Advanced pump formulas', 'L-Citrulline: 6-8g
Agmatine: 1-2g
Nitrosigine: 1.5g
Pre-workout stack
Massive pumps', 'advanced', '/images/supplements.jpg'),

('Nootropics Stack', 'Cognitive enhancement', 'Alpha-GPC: 300mg
L-Theanine: 200mg
Caffeine: 100mg
Rhodiola: 200mg
Mental focus', 'advanced', '/images/supplements.jpg'),

('Peptides', 'Advanced recovery', 'BPC-157 for joints
TB-500 for recovery
Professional guidance needed
Research thoroughly
Legal considerations', 'advanced', '/images/supplements.jpg');