# 🔧 Troubleshooting Guide

## Common Issues and Solutions

---

## 🚨 Installation & Setup Issues

### npm install fails

**Symptoms:** `npm install` throws errors or hangs

**Solutions:**
1. Clear npm cache:
   ```bash
   npm cache clean --force
   ```

2. Delete node_modules and package-lock.json:
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

3. Use npm ci for clean install:
   ```bash
   npm ci
   ```

4. Check Node version (need 16+):
   ```bash
   node --version
   ```

---

### Environment variables not loading

**Symptoms:** Application crashes with "Firebase configuration missing"

**Solutions:**
1. Verify `.env.local` exists in project root (not in src/)
2. Check all keys are present:
   ```
   VITE_FIREBASE_API_KEY
   VITE_FIREBASE_AUTH_DOMAIN
   VITE_FIREBASE_PROJECT_ID
   VITE_FIREBASE_STORAGE_BUCKET
   VITE_FIREBASE_MESSAGING_SENDER_ID
   VITE_FIREBASE_APP_ID
   ```

3. Verify keys don't have extra spaces:
   ```
   ✅ VITE_FIREBASE_API_KEY=abc123
   ❌ VITE_FIREBASE_API_KEY = abc123
   ```

4. Restart development server after adding `.env.local`:
   ```bash
   npm run dev
   ```

5. Check `.gitignore` includes `.env.local`:
   ```
   .env.local
   .env
   ```

---

## 🔥 Firebase Connection Issues

### "Firebase is not defined" or Firebase initialization fails

**Symptoms:** Console error about Firebase configuration

**Solutions:**
1. Verify Firebase project exists:
   - Go to console.firebase.google.com
   - Confirm project created

2. Check credentials in `.env.local` are correct:
   - Copy from Firebase Console > Project Settings > Your Apps > Web SDK config
   - Compare character by character

3. Verify Firestore is enabled:
   - Firebase Console > Firestore Database > Should show database
   - If not, create one in Production mode

4. Check Firebase Authentication enabled:
   - Firebase Console > Authentication > Enable Email/Password provider

---

### "Permission denied" errors in console

**Symptoms:** Firestore operations fail with permission errors

**Solutions:**
1. Update Firestore security rules:
   - Firebase Console > Firestore > Rules
   - Copy rules from `firebase/firestore.rules`
   - Publish rules

2. Create required collections:
   ```
   - admins
   - quizzes
   - questions
   - categories
   - attempts
   - settings
   ```

3. Create admin user:
   - Add document to `admins` collection
   - Document ID = User UID from Authentication
   - Example:
     ```json
     {
       "email": "admin@example.com",
       "role": "admin",
       "createdAt": "2024-01-01"
     }
     ```

4. Make sure you're logged in with Firebase user:
   - Go to Admin Login page
   - Sign in with your test user credentials

---

### CORS errors when fetching from Firebase

**Symptoms:** Console shows CORS errors for Firebase requests

**Solutions:**
1. Verify Firebase credentials are correct
2. Check Firestore security rules allow your domain
3. Ensure request comes from Firestore SDK (not fetch/axios)
4. Check for typos in Firebase project ID

---

## 🎮 Quiz Functionality Issues

### Quiz not loading / Blank page

**Symptoms:** Quiz page shows loading spinner forever or blank

**Solutions:**
1. Open browser console (F12) and check for errors
2. Verify Firestore has quiz data:
   - Firebase Console > Firestore > quizzes collection
   - Should have at least one quiz document
3. Check quiz ID in URL matches a quiz in Firestore
4. Verify questions are associated with quiz:
   - Firebase Console > questions collection
   - Filter by `quizId` matching your quiz ID
5. Check browser network tab for failed requests:
   - F12 > Network tab > Check for red requests

---

### Questions not displaying

**Symptoms:** Quiz page loads but no questions shown

**Solutions:**
1. Verify questions exist in Firestore:
   - Firebase Console > questions collection
   - Should have documents with `quizId` matching current quiz

2. Check question structure:
   ```json
   {
     "quizId": "quiz-id",
     "questionText": "...",
     "options": [...],
     "correctAnswer": 0,
     "explanation": "...",
     "difficulty": "easy"
   }
   ```

3. Check if questions are properly formatted:
   - `options` should be array of 4 strings
   - `correctAnswer` should be 0-3 index

4. Verify `quizId` is correctly set on questions

---

### Answers not being recorded

**Symptoms:** Quiz completes but no result shows

**Solutions:**
1. Check browser console for errors
2. Verify `attempts` collection exists in Firestore
3. Confirm user is authenticated:
   - Check user appears in Firebase Authentication
4. Check if attempt was recorded:
   - Firebase Console > attempts collection
   - Should have document with timestamp matching quiz attempt

5. Verify result page URL:
   - Should be `/result/[attemptId]`
   - Attempt ID should match a document in Firestore

---

## 🎨 UI/Display Issues

### Responsive design broken on mobile

**Symptoms:** Layout broken on phone / tablet

**Solutions:**
1. Clear browser cache:
   - Chrome: DevTools > Application > Clear storage
2. Test with Chrome DevTools device emulation:
   - F12 > Toggle device toolbar (Ctrl+Shift+M)
3. Check all Tailwind breakpoints are used:
   - `sm:`, `md:`, `lg:` prefixes
4. Verify viewport meta tag in `index.html`:
   ```html
   <meta name="viewport" content="width=device-width, initial-scale=1.0">
   ```

---

### Dark mode not working

**Symptoms:** Dark mode toggle doesn't change theme

**Solutions:**
1. Check if `dark` class is on root div:
   - In App.jsx: `<div className={isDark ? 'dark' : ''}>`

2. Verify Tailwind dark mode config:
   - In `tailwind.config.js`: `darkMode: 'class'`

3. Check localStorage:
   - Open DevTools > Application > LocalStorage
   - Look for `quiz-theme` key
   - Should have value `dark` or `light`

4. Try clearing localStorage and toggle again:
   ```javascript
   localStorage.clear()
   ```

5. Hard refresh page (Ctrl+Shift+R):
   - Clears browser cache

---

### Animations not smooth / Janky

**Symptoms:** Confetti or transitions stutter

**Solutions:**
1. Check browser hardware acceleration:
   - Chrome Settings > Advanced > System
   - Enable "Use hardware acceleration"

2. Close unnecessary browser tabs
3. Check for JavaScript errors in console
4. Verify Framer Motion is properly installed:
   ```bash
   npm list framer-motion
   ```

5. Test on different browser

---

### Fonts not loading

**Symptoms:** Text appears in default font, not custom font

**Solutions:**
1. Check fonts are imported in `globals.css`
2. Verify font files are in `public/fonts/` (if local)
3. Check if using Google Fonts - verify link in `index.html`
4. Clear browser cache
5. Check network tab in DevTools - fonts should load

---

## 📊 Admin Panel Issues

### Admin login not working

**Symptoms:** Can't log in to admin panel / "Unauthorized" error

**Solutions:**
1. Verify admin user exists:
   - Firebase Console > Authentication > Find your test user
   - Email should be verified (green checkmark)

2. Verify admin document in Firestore:
   - Firebase Console > Firestore > admins collection
   - Document ID must match user UID exactly
   - No spaces or typos

3. Check email/password are correct:
   - Try resetting password in Firebase
   - Create new test user

4. Check browser console for specific error message
5. Verify Firebase Authentication rules allow email/password

---

### Admin pages not loading after login

**Symptoms:** Admin login succeeds but redirect doesn't work

**Solutions:**
1. Check user is verified as admin:
   - Browser console: check `useAuthStore.isAdmin` value
   - Should be `true`

2. Verify ProtectedRoute component:
   - In `src/components/ProtectedRoute.jsx`
   - Should check both auth state and admin status

3. Check for console errors (F12)
4. Verify routes in `App.jsx` are correct:
   - `/admin/dashboard`, `/admin/quizzes`, etc.

---

### Admin operations (create/edit/delete) not working

**Symptoms:** Buttons don't work or data doesn't save

**Solutions:**
1. Verify you're logged in as admin
2. Check Firestore security rules allow writes:
   - Rules should have: `allow write: if request.auth.uid in get(/databases/$(database)/documents/admins).data.admins`

3. Check browser console for Firebase errors
4. Verify Firestore has the collection (quizzes, categories, etc.)
5. Try creating item with minimal data first
6. Check network tab - confirm requests are being sent
7. Refresh page and check if data was saved despite error

---

## 🐛 Performance Issues

### Application is slow / Laggy

**Symptoms:** Page load takes > 5 seconds, interactions delayed

**Solutions:**
1. Check browser network speed:
   - DevTools > Network > Set throttling to "Fast 3G"
   - Application should still be usable

2. Check what's causing slowness:
   - DevTools > Performance tab
   - Record page load > Analyze flame chart

3. Reduce initial data:
   - Limit quiz list to first 10 items
   - Lazy load more when scrolling

4. Optimize images:
   - Use WebP format
   - Compress before upload

5. Verify production build works:
   ```bash
   npm run build
   npm run preview
   ```

---

### Build is very slow

**Symptoms:** `npm run build` takes > 1 minute

**Solutions:**
1. Check if node_modules is corrupted:
   ```bash
   npm ci
   npm run build
   ```

2. Disable source maps in production:
   - Already disabled in `vite.config.js`

3. Clear Vite cache:
   ```bash
   rm -rf node_modules/.vite
   npm run build
   ```

4. Check for large dependencies:
   ```bash
   npm list --depth=0
   ```

---

## 🌐 Deployment Issues

### Deployment fails on Vercel

**Symptoms:** Build or deployment fails

**Solutions:**
1. Check build logs in Vercel dashboard
2. Verify environment variables are set:
   - Vercel Settings > Environment Variables
   - All VITE_FIREBASE_* variables should be present

3. Verify build command is correct:
   - Should be: `npm run build`

4. Check if `.env.local` is in `.gitignore`:
   - `.env.local` should NOT be committed
   - Use Vercel dashboard for production variables

5. Test build locally:
   ```bash
   npm run build
   npm run preview
   ```

6. Check for TypeScript errors:
   ```bash
   npm run type-check
   ```

---

### Application crashes after deployment

**Symptoms:** Works locally but fails on Vercel

**Solutions:**
1. Check Vercel logs:
   - Vercel Dashboard > Select project > Deployments > View logs

2. Check browser console (F12) for errors
3. Verify environment variables match production values:
   - Firebase project ID should be correct
   - All credentials should be valid

4. Check API endpoints if using any
5. Verify Firestore is accessible from Vercel:
   - Check Firebase security rules allow requests from Vercel domain

6. Deploy with verbose output:
   - `vercel --debug`

---

### Static files 404 errors

**Symptoms:** CSS, JS, or image files return 404

**Solutions:**
1. Check `vercel.json` configuration:
   - Output directory should be `dist`
   - Build command should be `npm run build`

2. Verify build output contains files:
   ```bash
   npm run build
   ls -la dist/
   ```

3. Check for typos in file paths
4. Verify assets are in `public/` directory
5. Redeploy after fixing:
   ```bash
   git push
   ```

---

## 🆘 Debug Mode

### Enable verbose logging

**Add to App.jsx:**
```javascript
if (import.meta.env.MODE === 'development') {
  console.log('Firebase initialized:', auth)
  console.log('Firestore db:', db)
}
```

### Check Store State

**In browser console:**
```javascript
// Check auth store
import { useAuthStore } from './context/store.js'
useAuthStore.getState()

// Check quiz store
import { useQuizStore } from './context/store.js'
useQuizStore.getState()

// Check UI store
import { useUIStore } from './context/store.js'
useUIStore.getState()
```

### Monitor Firebase Calls

**In browser console:**
```javascript
import { db } from './services/firebase'
console.log(db)

// All operations will show in Network tab
```

---

## 📞 Getting Help

1. **Check Documentation:**
   - README.md
   - FIREBASE_SETUP.md
   - DEVELOPMENT.md

2. **Search Issues:**
   - GitHub Issues might have solution

3. **Check Console:**
   - Always open F12 console first
   - Error message usually points to solution

4. **Test Locally:**
   - Make sure issue reproduces locally
   - Not just in production

5. **Provide Context:**
   - Error message
   - Steps to reproduce
   - Browser/OS/Node version
   - Screenshots

---

## 📋 Quick Reference

| Issue | Check First |
|-------|---|
| Nothing loads | Firebase config + Console errors |
| Quiz not starting | Firestore data + Security rules |
| Admin can't login | Admin user in both places + Rules |
| Mobile layout broken | Viewport meta tag + Tailwind breakpoints |
| Dark mode not working | localStorage + class on root div |
| Slow performance | Network tab + DevTools Performance |
| Deploy fails | Env vars + Build logs |

---

**Last Updated:** 2024
**Document Version:** 1.0

For additional help, refer to the official documentation:
- [Firebase Docs](https://firebase.google.com/docs)
- [React Docs](https://react.dev)
- [Vite Docs](https://vitejs.dev)
- [Tailwind Docs](https://tailwindcss.com/docs)
