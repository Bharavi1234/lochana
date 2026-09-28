/**
 * =====================================================================
 * CONFIGURATION FILE
 * =====================================================================
 * Everything in this file is easily editable so you can customize
 * the password, hint, messages, and behavior without touching the logic.
 */

export const CONFIG = {
  // ---------------------------------------------------------
  // PASSWORD GATE CONFIGURATION
  // ---------------------------------------------------------
  // Change this to whatever secret word, anniversary date, or pet name you want!
  // Case-insensitive comparison is enabled by default.
  password: "forever",
  
  // Hint displayed softly under the password input
  passwordHint: "Hint: A 7-letter word for eternity (try: forever) ♥",

  // Gate Card Content
  gate: {
    emoji: "🔒",
    title: "Just For You",
    subtitle: "This little corner of the internet belongs to one person only.",
    inputPlaceholder: "Enter password...",
    unlockButtonText: "Unlock ♥",
    errorMessage: "That's not it. Try again ♥",
    footerText: "Made with all my love, just for you ♥",
  },

  // ---------------------------------------------------------
  // PROPOSAL STAGE CONFIGURATION
  // ---------------------------------------------------------
  proposal: {
    eyebrow: "Lochana Maharjan",
    heading: "Will you marry me?",
    subtitle: "Take your time. (There's only one right answer though.)",
    yesButtonText: "Yes 💍",
    
    // Funny & sweet phrases the runaway "No" button cycles through each escape
    noPhrases: [
      "No",
      "Are you sure?",
      "Really sure??",
      "Think again!",
      "Last chance...",
      "Surely not?",
      "Give it another thought",
      "Pretty please?",
      "You're breaking my heart",
      "I'm gonna cry...",
      "Please? 🥺",
      "Ok now you're just being mean",
      "This button is tired",
      "Just say yes already",
      "Okay I'll wait forever ♥"
    ],

    // Proximity triggers in pixels
    escapeDistanceDesktop: 130, // Cursor within ~130px jumps button away
    escapeDistanceMobile: 100,  // Finger touch within 100px jumps away before tap lands
    escapeThrottleMs: 90,       // Max jump recalculation rate

    // Scaling limits
    noScaleFloor: 0.48,         // Button won't shrink smaller than this
    yesScaleCap: 1.60,          // Yes button won't grow larger than this
    scaleStep: 0.05,            // 5% scale delta per escape attempt
  },

  // ---------------------------------------------------------
  // CELEBRATION STAGE CONFIGURATION
  // ---------------------------------------------------------
  celebration: {
    ringEmoji: "💍",
    heading: "She said YES!",
    message: "Lochana Maharjan, you just made me the happiest person alive. I'm never letting you go now. ♥",
    receiptNote: "Screenshot this and send it to me. I'm keeping the receipts. 📸",
    
    // Confetti explosion settings
    confetti: {
      piecesPerBurst: 180,
      burstIntervalMs: 1300,
      totalDurationMs: 10000,
      // Romantic warm pink/gold/cream palette
      colors: [
        "#ff8fab",
        "#fb6f92",
        "#e05780",
        "#f0c9a0",
        "#fff0f5",
        "#ffe5ec",
        "#fde8d0",
        "#ffb3c6"
      ],
    },
  },

  // ---------------------------------------------------------
  // MUSIC CONFIGURATION
  // ---------------------------------------------------------
  // Place your favorite song as 'song.mp3' inside the /public folder
  music: {
    enabled: true,
    src: "/song.mp3",
    label: "Our Song",
  }
};
