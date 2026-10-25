(() => {
  const $ = (id) => document.getElementById(id);

  const card = $("card");
  const form = $("feedbackForm");
  const success = $("success");
  const moodsWrap = $("moods");
  const moodBtns = [...moodsWrap.querySelectorAll(".mood")];
  const comment = $("comment");
  const submitBtn = $("submitBtn");
  const againBtn = $("againBtn");
  const errorEl = $("error");
  const openBtn = $("openBtn");
  const closeBtn = $("closeBtn");
  const successEmoji = $("successEmoji");
  const successMsg = $("successMsg");

  const messages = {
    angry:   "We're sorry things went badly. We'll work on making it right.",
    sad:     "Sorry to hear that. Your comment will help us do better.",
    neutral: "Thanks for being honest. We'll keep improving.",
    happy:   "Glad you're enjoying Zitto!",
    love:    "That means a lot to us. Thank you for the love!"
  };

  let selected = null;

  function selectMood(btn) {
    selected = btn.dataset.mood;
    moodBtns.forEach((b) => {
      const on = b === btn;
      b.setAttribute("aria-checked", on);
      b.tabIndex = on ? 0 : -1;
    });
    // Button color follows the selected feeling
    submitBtn.dataset.mood = selected;
    errorEl.textContent = "";
  }

  moodBtns.forEach((btn, i) => {
    btn.tabIndex = i === 0 ? 0 : -1;
    btn.addEventListener("click", () => selectMood(btn));
    // Arrow key navigation for the radio group
    btn.addEventListener("keydown", (e) => {
      let next = null;
      if (e.key === "ArrowRight" || e.key === "ArrowDown") next = moodBtns[(i + 1) % moodBtns.length];
      if (e.key === "ArrowLeft"  || e.key === "ArrowUp")   next = moodBtns[(i - 1 + moodBtns.length) % moodBtns.length];
      if (next) { e.preventDefault(); next.focus(); selectMood(next); }
    });
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    if (!selected) {
      errorEl.textContent = "Please pick how you feel first.";
      moodsWrap.classList.remove("shake");
      void moodsWrap.offsetWidth; // restart animation
      moodsWrap.classList.add("shake");
      return;
    }

    const payload = {
      mood: selected,
      comment: comment.value.trim(),
      submittedAt: new Date().toISOString()
    };

    // Fake a network request. Replace this with your own fetch() call.
    submitBtn.classList.add("loading");
    submitBtn.textContent = "Sending...";

    setTimeout(() => {
      console.log("Feedback submitted:", payload);

      successEmoji.textContent = moodBtns.find((b) => b.dataset.mood === selected).textContent;
      successMsg.textContent = messages[selected];
      againBtn.dataset.mood = selected;

      form.hidden = true;
      success.hidden = false;
      submitBtn.classList.remove("loading");
      submitBtn.textContent = "Submit";
    }, 800);
  });

  function resetForm() {
    selected = null;
    moodBtns.forEach((b, i) => {
      b.setAttribute("aria-checked", "false");
      b.tabIndex = i === 0 ? 0 : -1;
    });
    comment.value = "";
    errorEl.textContent = "";
    submitBtn.dataset.mood = "happy";
    success.hidden = true;
    form.hidden = false;
  }

  againBtn.addEventListener("click", resetForm);

  function closeCard() {
    card.classList.add("is-closing");
    card.addEventListener("animationend", () => {
      card.hidden = true;
      card.classList.remove("is-closing");
      openBtn.hidden = false;
    }, { once: true });
  }

  function openCard() {
    resetForm();
    openBtn.hidden = true;
    card.hidden = false;
  }

  closeBtn.addEventListener("click", closeCard);
  openBtn.addEventListener("click", openCard);
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !card.hidden) closeCard();
  });
})();
