const path = require("path");
const express = require("express");
const Database = require("better-sqlite3");

const app = express();
const dbPath = path.join(__dirname, "recipes.db");
const db = new Database(dbPath);

db.exec(`
  CREATE TABLE IF NOT EXISTS recipes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    mood TEXT NOT NULL,
    ingredients TEXT NOT NULL,
    instructions TEXT NOT NULL
  );
`);

const RECIPE_SEED = [
  {
    title: "Blood Orange, Fennel & Black Olive Salad",
    mood: "happy",
    ingredients:
      "2 blood oranges, supremed\n1 small fennel bulb, shaved paper-thin\nHandful arugula\nKalamata olives, pitted, halved\nExtra-virgin olive oil, flaky salt, black pepper",
    instructions:
      "Fan citrus and fennel on plates. Scatter arugula and olives. Finish with oil, salt, and a crack of pepper—eat immediately while the fennel still crackles.",
  },
  {
    title: "Mango–Lime Labneh with Pistachio Dust",
    mood: "happy",
    ingredients:
      "1 ripe mango, diced\n1 cup thick Greek yogurt or labneh\nZest and juice of 1 lime\nToasted pistachios, chopped fine\nHoney, pinch of salt",
    instructions:
      "Swirl lime zest into yogurt. Spoon mango on top, drizzle honey, squeeze lime, scatter pistachio “dust.” Serve cold as a bright breakfast or dessert.",
  },
  {
    title: "Confetti Street-Corn Tostadas",
    mood: "happy",
    ingredients:
      "Crispy tostada shells\nCharred corn kernels\nMayo + lime + chili powder whisked\nCotija or feta\nCilantro, thin-sliced radish",
    instructions:
      "Toss warm corn with the lime-mayo. Pile onto shells, crumble cheese, add radish and cilantro. Eat over the sink—zero regrets.",
  },
  {
    title: "Lychee & Cucumber Chiller Bowl",
    mood: "happy",
    ingredients:
      "Canned or fresh lychees, drained\nEnglish cucumber, ribboned\nMint leaves, torn\nChampagne vinegar or rice vinegar, tiny pinch sugar",
    instructions:
      "Combine lychee and cucumber. Splash vinegar, pinch of sugar, toss with mint. Chill 10 minutes—tastes like a vacation postcard.",
  },
  {
    title: "Pink Pickled-Onion Avocado Toast",
    mood: "happy",
    ingredients:
      "Red onion quick-pickled in lime + salt + hot water 15 min\nRipe avocado\nSourdough, toasted\nEverything seasoning or sesame",
    instructions:
      "Mash avocado on toast. Drain onions, pile high for crunch and tang. Sprinkle seasoning. The pink onions are the whole personality.",
  },
  {
    title: "Prosecco-Poached Pear Crostini",
    mood: "happy",
    ingredients:
      "Firm pears, peeled\nProsecco or white wine + splash water\nSugar, vanilla bean or extract\nRicotta, baguette slices, toasted",
    instructions:
      "Simmer pears in prosecco with sugar until tender but holding shape. Cool in syrup. Top crostini with ricotta and thin pear slices; drizzle syrup.",
  },
  {
    title: "Brown-Butter Sage Gnocchi Skillet",
    mood: "comfort",
    ingredients:
      "Store-bought gnocchi\n4 tbsp butter\n8–10 fresh sage leaves\nParmesan, black pepper\nOptional: handful frozen peas",
    instructions:
      "Pan-fry gnocchi in a little oil until crisp. Push aside; melt butter until nutty, fry sage 30 seconds. Toss all together, snow parmesan on top.",
  },
  {
    title: "Taiwanese-Style Lu Rou on Rice",
    mood: "comfort",
    ingredients:
      "1 lb ground pork or minced pork belly\nShallots or onion, fine dice\nSoy sauce, dark soy, shaoxing or dry sherry\nStar anise, cinnamon stick, rock sugar or brown sugar\nSteamed rice, pickled mustard greens optional",
    instructions:
      "Crisp pork in a pot, add aromatics and spices. Cover with water, simmer low 45–60 min until glossy and jammy. Spoon over rice; cry happy tears.",
  },
  {
    title: "French-Onion Grilled Cheese (Diner Deluxe)",
    mood: "comfort",
    ingredients:
      "Onions, slow-caramelized\nGruyère + sharp cheddar\nButter, sturdy bread\nSplash of Worcestershire in the onions",
    instructions:
      "Sandwich melty cheeses and a thick layer of onions between buttered bread. Griddle on low until deeply golden. Dunk in any leftover onion broth if you have it.",
  },
  {
    title: "Miso-Butter Udon in 15 Minutes",
    mood: "comfort",
    ingredients:
      "Fresh or frozen udon\nWhite miso, butter, soy\nMirin or pinch sugar\nSoft egg, nori strips, green onion",
    instructions:
      "Whisk miso with a little hot noodle water. Toss hot drained udon with miso, butter, soy, mirin. Top with egg, nori, scallions—slurping encouraged.",
  },
  {
    title: "Sheet-Pan Sausage, Grapes & Rosemary",
    mood: "comfort",
    ingredients:
      "Italian sausage links\nSeedless red grapes on the vine\nPotatoes, chunked small\nRosemary, olive oil, salt",
    instructions:
      "Roast everything at 425°F on one pan until sausages run clear and grapes blister into jammy pockets. Unexpectedly fancy, zero effort.",
  },
  {
    title: "Cheddar-Chive Yorkshire Pudding Popover",
    mood: "comfort",
    ingredients:
      "Eggs, whole milk, flour (classic 1:1:1 popover ratio by volume)\nSharp cheddar, chives\nBeef drippings or butter in a hot muffin tin",
    instructions:
      "Heat fat in tins until smoking. Pour batter studded with cheese and chives. Bake undisturbed until towering and hollow. Fight your family for the crispy edges.",
  },
  {
    title: "Chili-Crisp Breakfast Ramen",
    mood: "energetic",
    ingredients:
      "Instant ramen (discard spice pack or use half)\nChili crisp, soy, sesame oil\nSoft-boiled egg\nFrozen spinach or bok choy\nGreen onion",
    instructions:
      "Cook noodles in minimal water for concentrated broth. Stir in chili crisp, soy, sesame. Add veg at the end, halved egg on top—before-coffee rocket fuel.",
  },
  {
    title: "Jerk-Spiced Chickpea & Pineapple Skillet",
    mood: "energetic",
    ingredients:
      "Canned chickpeas, drained and patted dry\nJerk seasoning or paste\nCanned pineapple chunks, bell pepper\nCoconut oil, lime",
    instructions:
      "Sear chickpeas in oil until crunchy edges. Add jerk paste, pineapple, peppers; stir-fry hard. Finish with lime—Caribbean disco in a pan.",
  },
  {
    title: "Green Goddess Power Bowl",
    mood: "energetic",
    ingredients:
      "Quinoa or brown rice, cooked\nRoasted chickpeas (cumin + paprika)\nKale massaged with lemon\nAvocado, pickled onions, tahini-lemon dressing",
    instructions:
      "Pile grains, greens, chickpeas, and avocado. Drizzle dressing like you mean it. Tastes like you went to a LA salad bar without the line.",
  },
  {
    title: "Lemongrass Tofu Lettuce Cups",
    mood: "energetic",
    ingredients:
      "Firm tofu, crumbled and pan-browned\nLemongrass paste, garlic, ginger\nSoy, fish sauce or vegan alternative, brown sugar\nButter lettuce leaves, herbs, peanuts",
    instructions:
      "Stir-fry tofu with aromatics and sauces until sticky. Spoon into lettuce cups; top with herbs and crushed peanuts. Hand food = instant energy.",
  },
  {
    title: "Matbucha-ish Shakshuka",
    mood: "energetic",
    ingredients:
      "Jar of roasted red peppers, chopped\nCanned crushed tomatoes\nGarlic, cumin, smoked paprika, harissa or chili paste\nEggs, feta, cilantro",
    instructions:
      "Simmer peppers and tomatoes with spices until thick like jam. Crack in eggs, lid until set. Crumble feta—North Africa meets brunch.",
  },
  {
    title: "Cold Silken Tofu with Ginger–Scallion Oil",
    mood: "calm",
    ingredients:
      "1 block silken tofu, chilled\nNeutral oil, heated until shimmering\nPlenty of julienned ginger and sliced scallion whites\nSoy sauce, pinch sugar",
    instructions:
      "Pour hot oil over ginger and scallions in a heatproof bowl—it should sizzle dramatically. Add soy and sugar. Spoon over cold tofu; eat in silence.",
  },
  {
    title: "Clear Dashi Vegetable Sipper",
    mood: "calm",
    ingredients:
      "Dashi granules or kombu + bonito packet\nWater\nCarrot coins, shiitake caps, snow peas\nSoy, mirin, tiny pinch salt",
    instructions:
      "Gently simmer vegetables in dashi until just tender—never boil violently. Season lightly. Drink from a mug like it’s spa water for your soul.",
  },
  {
    title: "Chamomile Rice Pudding",
    mood: "calm",
    ingredients:
      "Short-grain rice\nStrong brewed chamomile tea + milk\nHoney, vanilla\nToasted sliced almonds",
    instructions:
      "Cook rice slowly in tea-milk mixture, stirring often, until creamy. Sweeten off heat. Top with almonds. Floral, soft, no drama.",
  },
  {
    title: "Lemon-Dill Steamed Fish en Papillote",
    mood: "calm",
    ingredients:
      "White fish fillets\nParchment or foil packets\nThin lemon slices, dill sprigs\nSplash white wine, pat of butter, salt",
    instructions:
      "Seal fish with lemon, dill, wine, and butter in packets. Bake 12–15 min at 400°F. Open at the table—aromatic steam does the therapy part.",
  },
  {
    title: "Ginger Congee with Soft Egg",
    mood: "calm",
    ingredients:
      "Jasmine rice, lots of water or broth\nFresh ginger matchsticks\nSalt\nSoft-boiled eggs, sesame oil, scallion",
    instructions:
      "Simmer rice until it collapses into a silky porridge, 45–60 min. Stir in ginger. Top with egg, scallion, a few drops of sesame oil.",
  },
  {
    title: "Peruvian-Style Causa Layers",
    mood: "adventurous",
    ingredients:
      "Yellow potatoes, boiled and mashed\nLime juice, aji amarillo paste or mild chili paste\nShredded chicken or canned tuna, mayo, avocado\nHard-boiled egg slices, olives",
    instructions:
      "Season mashed potato with lime and chili. Layer: potato, protein salad, avocado, potato. Chill, slice like cake. Potato cake is underrated.",
  },
  {
    title: "Sichuan Yu Xiang Eggplant (Home Version)",
    mood: "adventurous",
    ingredients:
      "Chinese eggplant, batons\nDoubanjiang (chili bean paste)\nBlack vinegar, soy, sugar\nGarlic, ginger, ground pork optional\nCornstarch slurry",
    instructions:
      "Fry or roast eggplant until tender. Stir-fry aromatics and pork, add doubanjiang, sauces, splash water. Toss eggplant, thicken slightly—numbing heat optional.",
  },
  {
    title: "Filipino Adobo Chicken Thighs",
    mood: "adventurous",
    ingredients:
      "Bone-in chicken thighs\nSoy sauce, cane vinegar, bay leaves\nWhole peppercorns, garlic smashed\nBrown sugar, optional coconut milk finish",
    instructions:
      "Simmer everything covered until chicken is fork-tender. Uncover to reduce into a glaze. Tangy-salty-sweet—serve with rice and zero utensils etiquette.",
  },
  {
    title: "Ethiopian-Inspired Berbere Cauliflower",
    mood: "adventurous",
    ingredients:
      "Cauliflower florets\nBerbere spice blend\nTomato paste, onion, garlic\nOlive oil, lemon, plain yogurt or injera if you can find it",
    instructions:
      "Roast cauliflower with oil and berbere until charred. Simmer a quick sauce of onion, garlic, tomato paste, more berbere; fold in cauliflower. Brighten with lemon; cool yogurt on the side.",
  },
  {
    title: "Georgian Mushroom Khinkali-ish Dumplings (Shortcut)",
    mood: "adventurous",
    ingredients:
      "Round dumpling wrappers\nMushrooms, onion, minced walnuts\nCumin, coriander, chili flakes\nButter for finishing, black pepper",
    instructions:
      "Sauté filling until dry and fragrant. Pleat wrappers around a spoonful of filling (don’t close the top if you want soup-dumpling drama, or seal fully). Steam 10 min; brush with butter.",
  },
  {
    title: "Oaxacan Mole-Inspired Black Bean Stew",
    mood: "adventurous",
    ingredients:
      "Canned black beans\nChipotle in adobo, Mexican chocolate square or cocoa\nSesame seeds, toasted almonds blended smooth with broth\nOnion, garlic, cinnamon pinch",
    instructions:
      "Blend nuts, seeds, chipotle, cocoa with broth into a paste. Simmer with beans until silky. Deep, dark, mysterious—serve with warm tortillas.",
  },
];

function seedRecipes() {
  const insert = db.prepare(
    "INSERT INTO recipes (title, mood, ingredients, instructions) VALUES (@title, @mood, @ingredients, @instructions)"
  );
  const exists = db.prepare("SELECT 1 AS ok FROM recipes WHERE title = ? LIMIT 1");
  const run = db.transaction((rows) => {
    for (const r of rows) {
      if (!exists.get(r.title)) insert.run(r);
    }
  });
  run(RECIPE_SEED);
}

seedRecipes();

app.use(express.static(path.join(__dirname, "public")));

app.get("/api/moods", (req, res) => {
  const moods = db
    .prepare(
      "SELECT DISTINCT mood FROM recipes ORDER BY CASE mood WHEN 'happy' THEN 1 WHEN 'comfort' THEN 2 WHEN 'energetic' THEN 3 WHEN 'calm' THEN 4 WHEN 'adventurous' THEN 5 ELSE 6 END, mood"
    )
    .all();
  res.json(moods.map((m) => m.mood));
});

app.get("/api/recipe", (req, res) => {
  const mood = (req.query.mood || "").trim().toLowerCase();
  if (!mood) {
    return res.status(400).json({ error: "Query parameter mood is required." });
  }

  const excludeRaw = (req.query.exclude || "")
    .split(",")
    .map((s) => parseInt(s.trim(), 10))
    .filter((n) => Number.isFinite(n));

  let stmt;
  let rows;

  if (excludeRaw.length === 0) {
    stmt = db.prepare("SELECT * FROM recipes WHERE mood = ?");
    rows = stmt.all(mood);
  } else {
    const placeholders = excludeRaw.map(() => "?").join(", ");
    stmt = db.prepare(
      `SELECT * FROM recipes WHERE mood = ? AND id NOT IN (${placeholders})`
    );
    rows = stmt.all(mood, ...excludeRaw);
  }

  if (rows.length === 0) {
    return res.json({
      recipe: null,
      exhausted: true,
      message: "No more recipes for this mood with the current skips.",
    });
  }

  const recipe = rows[Math.floor(Math.random() * rows.length)];
  res.json({ recipe, exhausted: false });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Mood recipes app: http://localhost:${PORT}`);
});
