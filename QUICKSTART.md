# Quick Start Guide - Quiz Master

## ⚡ 5-Minute Setup

### 1. Install Dependencies
\`\`\`bash
npm install
\`\`\`

### 2. Setup Firebase
- Create Firebase project at console.firebase.google.com
- Copy configuration values
- Create `.env.local` file (see below)

### 3. Environment File

Create `.env.local`:
\`\`\`env
VITE_FIREBASE_API_KEY=AIzaSyD...
VITE_FIREBASE_AUTH_DOMAIN=quizmaster-123.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=quizmaster-123
VITE_FIREBASE_STORAGE_BUCKET=quizmaster-123.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abc123
VITE_FIREBASE_MEASUREMENT_ID=G-ABC123

VITE_APP_URL=http://localhost:3000
VITE_APP_NAME=Quiz Master
VITE_ADMIN_EMAIL=admin@quiz.com
\`\`\`

### 4. Start Dev Server
\`\`\`bash
npm run dev
\`\`\`

### 5. Access Application
- User: http://localhost:3000
- Admin: http://localhost:3000/admin/login
  - Email: admin@quiz.com
  - Password: admin123

## 📋 Configuration Checklist

- [ ] Node 18+ installed
- [ ] Dependencies installed
- [ ] Firebase project created
- [ ] Firestore database created
- [ ] Authentication enabled
- [ ] `.env.local` configured
- [ ] Dev server running
- [ ] Can access home page
- [ ] Can login as admin
- [ ] Can see dashboard

## 🚀 Deploy to Vercel

### 1. Push to GitHub
\`\`\`bash
git add .
git commit -m "Quiz Master application"
git push origin main
\`\`\`

### 2. Connect to Vercel
- Go to vercel.com
- Click "New Project"
- Select GitHub repository
- Add environment variables
- Click "Deploy"

## 🎯 Next Steps

1. **Add Sample Data**:
   - Create quiz in admin panel
   - Add questions
   - Test quiz playback

2. **Customize**:
   - Update colors in tailwind.config.js
   - Modify app name in settings
   - Add your logo

3. **Deploy**:
   - Follow DEPLOYMENT.md guide
   - Set up custom domain
   - Configure analytics

## 💡 Tips

- Check browser console for errors
- Use Firebase Console for debugging
- Test on mobile devices
- Enable dark mode to test styling
- Create sample quizzes before deploying

## 📖 Full Guides

- [FIREBASE_SETUP.md](./FIREBASE_SETUP.md) - Detailed Firebase configuration
- [DEPLOYMENT.md](./DEPLOYMENT.md) - Vercel deployment guide
- [README.md](./README.md) - Complete documentation

---

**Ready to build amazing quizzes!** 🚀
""