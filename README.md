# A Question For Lochana ♥ — Private Marriage Proposal Website

A private, romantic single-page website built with **React 18 + Vite + Tailwind CSS + Framer Motion**.

---

## 💍 Features

1. **Stage 1 — Password Gate**
   - Centered glassmorphic card on a deep wine & plum gradient.
   - Drifting glow blobs, twinkling stars, and slow-rising floating hearts.
   - Floating lock emoji, custom password input, and animated unlock button.
   - Error shake animation on wrong attempt with automatic clear & refocus.
   - Subtle customizable hint below the input.

2. **Stage 2 — The Proposal & Runaway "No" Button**
   - Eyebrow text dedicated to **Lochana Maharjan**.
   - Shimmering serif heading *"Will you marry me?"* with smooth animated gradient.
   - Primary **"Yes 💍"** button with a breathing pulse-glow.
   - **Hyper-responsive Runaway "No" Button**:
     - **Desktop**: Jumps immediately when the cursor comes within ~130px.
     - **Mobile**: Jumps before the tap lands when a finger touches within 100px.
     - Throttled escape calculations to stay silky smooth without jitter.
     - Automatically converts to `position: fixed` to roam anywhere on screen.
     - Shrinks slightly on every escape (floored at 0.48).
     - Cycles through humorous & loving messages (e.g. *"Are you sure?"*, *"You're breaking my heart"*, *"Just say yes already"*).
     - Simultaneously scales up the "Yes" button (capped at 1.6x).
     - Keeps a cheeky escape counter (*"3 escape attempts 😌"*).
     - Auto-clamps inside screen boundaries on window resize or orientation change.

3. **Stage 3 — Celebration**
   - Big floating 💍 emoji with a spring pop-in.
   - Shimmering *"She said YES!"* headline.
   - Heartfelt personal message: *"Lochana Maharjan, you just made me the happiest person alive. I'm never letting you go now. ♥"*
   - Receipt badge: *"Screenshot this and send it to me. I'm keeping the receipts. 📸"*
   - Staggered confetti explosion with ~180 particles bursting in warm pink, gold, and cream tones, repeating every 1.3s for 10 seconds.

4. **Atmospheric & Cinematic Details**
   - Google Fonts: **Cormorant Garamond** (romantic serif) and **Quicksand** (modern sans).
   - Custom palette: deep wine `#1a0710`, rose `#ff8fab`, deep rose `#e05780`, gold `#f0c9a0`, cream `#fff0f5`.
   - Subtle cinematic vignette and warm film-grain texture.
   - Corner music toggle for background music (`/public/song.mp3`).
   - Persists acceptance in `localStorage` so if she refreshes, she sees the celebration.
   - Respects `prefers-reduced-motion` for accessibility.
   - To reset and test from Stage 1 at any time, just append `?reset=true` to the URL.

---

## 🔑 How to Change the Password & Content

All customizable strings, passwords, thresholds, and colors live in **a single file**:  
👉 [`src/config.js`](./src/config.js)

```javascript
export const CONFIG = {
  // Set your secret word or date here:
  password: "forever",
  
  // Set your hint here:
  passwordHint: "Hint: A 7-letter word for eternity (try: forever) ♥",

  // Customize names and messages
  proposal: {
    eyebrow: "Lochana Maharjan",
    heading: "Will you marry me?",
    ...
  }
};
```

---

## 🎵 How to Add Background Music (Optional)

1. Put your favorite romantic song into the `public/` folder and name it `song.mp3`.
2. The site already has a corner audio button configured. It starts muted by default so it doesn't get blocked by browser autoplay policies, and she can tap it to play your song on loop.

---

## 🚀 How to Run Locally

```bash
# Install dependencies (if not already done)
npm install

# Start local development server
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 🌐 How to Deploy to Vercel

### Method 1: Deploying via Vercel CLI (Fastest, 2 minutes)

1. In your terminal inside `d:\browser`, install the Vercel CLI globally (or run with npx):
   ```bash
   npx vercel
   ```
2. Follow the interactive prompts:
   - **Set up and deploy?** -> `Y`
   - **Which scope?** -> (Select your account)
   - **Link to existing project?** -> `N`
   - **What's your project's name?** -> `for-lochana` (or any name you like)
   - **In which directory is your code located?** -> `./`
   - **Want to modify settings?** -> `N` (Vercel automatically detects Vite + React)
3. For production release:
   ```bash
   npx vercel --prod
   ```
4. You will receive a live URL (e.g., `https://for-lochana.vercel.app`) to send to her!

### Method 2: Deploying via GitHub + Vercel Dashboard

1. Push this folder to a private GitHub repository:
   ```bash
   git init
   git add .
   git commit -m "Will you marry me, Lochana?"
   git branch -M main
   git remote add origin https://github.com/your-username/your-repo-name.git
   git push -u origin main
   ```
2. Go to [https://vercel.com](https://vercel.com) and log in.
3. Click **Add New...** -> **Project**.
4. Import your GitHub repository.
5. Vercel will automatically detect **Vite** as the framework preset:
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
6. Click **Deploy**. Your custom link will be live in seconds!
