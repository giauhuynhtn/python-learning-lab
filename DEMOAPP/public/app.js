(function () {
  const moodSelect = document.getElementById("mood-select");
  const moodChips = document.getElementById("mood-chips");
  const btnGet = document.getElementById("btn-get");
  const btnAnother = document.getElementById("btn-another");
  const recipeCard = document.getElementById("recipe-card");
  const recipeTitle = document.getElementById("recipe-title");
  const recipeMood = document.getElementById("recipe-mood");
  const recipeIngredients = document.getElementById("recipe-ingredients");
  const recipeInstructions = document.getElementById("recipe-instructions");
  const recipeMessage = document.getElementById("recipe-message");
  const errorBanner = document.getElementById("error-banner");

  /** @type {number[]} */
  let skippedIds = [];
  /** @type {number | null} */
  let currentRecipeId = null;

  function showError(msg) {
    errorBanner.textContent = msg;
    errorBanner.classList.remove("hidden");
  }

  function clearError() {
    errorBanner.classList.add("hidden");
    errorBanner.textContent = "";
  }

  function setLoading(isLoading) {
    btnGet.disabled = isLoading || !moodSelect.value;
    btnAnother.disabled = isLoading;
    btnGet.textContent = isLoading ? "Loading…" : "Show me a recipe";
  }

  function renderRecipe(recipe) {
    currentRecipeId = recipe.id;
    recipeTitle.textContent = recipe.title;
    recipeMood.textContent = "Mood: " + recipe.mood;
    recipeIngredients.innerHTML = "";
    const lines = recipe.ingredients
      .split("\n")
      .map((s) => s.trim())
      .filter(Boolean);
    for (const line of lines) {
      const li = document.createElement("li");
      li.textContent = line;
      recipeIngredients.appendChild(li);
    }
    recipeInstructions.textContent = recipe.instructions;
    recipeCard.classList.remove("hidden");
    recipeMessage.classList.add("hidden");
    recipeMessage.textContent = "";
  }

  function showExhausted() {
    recipeMessage.textContent =
      "You’ve seen every recipe for this mood. Change mood or refresh the page to start over.";
    recipeMessage.classList.remove("hidden");
  }

  async function fetchRecipe(appendSkipId) {
    const mood = moodSelect.value;
    if (!mood) return;

    clearError();
    setLoading(true);
    if (appendSkipId != null) skippedIds.push(appendSkipId);

    const params = new URLSearchParams({ mood });
    if (skippedIds.length) params.set("exclude", skippedIds.join(","));

    try {
      const res = await fetch("/api/recipe?" + params.toString());
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || "Could not load recipe.");
      }
      const data = await res.json();
      if (data.exhausted || !data.recipe) {
        showExhausted();
        return;
      }
      renderRecipe(data.recipe);
    } catch (e) {
      showError(e.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  function syncChipsActive() {
    const val = moodSelect.value;
    moodChips.querySelectorAll("button").forEach((btn) => {
      const on = btn.dataset.mood === val;
      btn.classList.toggle("ring-2", on);
      btn.classList.toggle("ring-teal-500", on);
      btn.classList.toggle("bg-teal-50", on);
    });
  }

  function labelMood(m) {
    return m.charAt(0).toUpperCase() + m.slice(1);
  }

  async function loadMoods() {
    try {
      const res = await fetch("/api/moods");
      if (!res.ok) throw new Error("Could not load moods.");
      const moods = await res.json();
      moodSelect.innerHTML = '<option value="">Choose one…</option>';
      moodChips.innerHTML = "";
      for (const m of moods) {
        const opt = document.createElement("option");
        opt.value = m;
        opt.textContent = labelMood(m);
        moodSelect.appendChild(opt);

        const chip = document.createElement("button");
        chip.type = "button";
        chip.dataset.mood = m;
        chip.className =
          "rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-700 hover:border-teal-300 hover:bg-teal-50/50";
        chip.textContent = labelMood(m);
        chip.addEventListener("click", () => {
          moodSelect.value = m;
          moodSelect.dispatchEvent(new Event("change"));
        });
        moodChips.appendChild(chip);
      }
    } catch (e) {
      showError(e.message || "Failed to load moods.");
    }
  }

  moodSelect.addEventListener("change", () => {
    clearError();
    btnGet.disabled = !moodSelect.value;
    syncChipsActive();
    skippedIds = [];
    currentRecipeId = null;
    recipeCard.classList.add("hidden");
  });

  btnGet.addEventListener("click", () => {
    skippedIds = [];
    currentRecipeId = null;
    fetchRecipe(null);
  });

  btnAnother.addEventListener("click", () => {
    if (currentRecipeId != null) fetchRecipe(currentRecipeId);
    else fetchRecipe(null);
  });

  loadMoods();
})();
