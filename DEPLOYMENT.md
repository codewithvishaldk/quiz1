# Quiz Master - Deployment Guide

## 🚀 Vercel Deployment Guide

### Prerequisites
- GitHub account (for version control)
- Vercel account (free)
- Firebase project with configuration
- Environment variables ready

### Step 1: Prepare Your Code

1. Initialize Git in your project:
\`\`\`bash
cd quiz
git init
git add .
git commit -m "Initial commit: Quiz Master application"
\`\`\`

2. Create repository on GitHub:
   - Go to github.com and create new repository
   - Don't initialize with README
   - Follow instructions to push existing code

\`\`\`bash
git remote add origin https://github.com/yourusername/quiz-master.git
git branch -M main
git push -u origin main
\`\`\`

### Step 2: Build Verification

Test local build:
\`\`\`bash
npm run build
npm run preview
\`\`\`

Ensure no errors in console.

### Step 3: Vercel Deployment

#### Option A: Dashboard (Recommended)

1. Go to [vercel.com](https://vercel.com)
2. Sign in with GitHub
3. Click "New Project"
4. Import GitHub repository
5. Configure project:
   - **Framework Preset**: Vite
   - **Build Command**: \`npm run build\`
   - **Output Directory**: \`dist\`
   - **Install Command**: \`npm install\`

6. Add Environment Variables:
   - Click "Environment Variables"
   - Add all variables from \`.env.example\`:
     - VITE_FIREBASE_API_KEY
     - VITE_FIREBASE_AUTH_DOMAIN
     - VITE_FIREBASE_PROJECT_ID
     - VITE_FIREBASE_STORAGE_BUCKET
     - VITE_FIREBASE_MESSAGING_SENDER_ID
     - VITE_FIREBASE_APP_ID
     - VITE_FIREBASE_MEASUREMENT_ID
     - VITE_APP_URL
     - VITE_APP_NAME
     - VITE_ADMIN_EMAIL

7. Click "Deploy"

#### Option B: CLI

1. Install Vercel CLI:
\`\`\`bash
npm install -g vercel
\`\`\`

2. Deploy:
\`\`\`bash
vercel
\`\`\`

3. Follow prompts:
   - Confirm project name
   - Select Vite as framework
   - Accept build settings
   - Add environment variables

4. Upgrade to production:
\`\`\`bash
vercel --prod
\`\`\`

### Step 4: Firebase Security Rules

Deploy Firestore security rules:

\`\`\`bash
# Install Firebase CLI
npm install -g firebase-tools

# Login
firebase login

# Select project
firebase use --add

# Deploy rules
firebase deploy --only firestore:rules
\`\`\`

### Step 5: Configure Domain

1. In Vercel dashboard, go to Project Settings
2. Domains section
3. Add custom domain or use default vercel domain
4. Update Firebase allowed domains

### Step 6: Post-Deployment

1. Test all features:
   - Quiz playback
   - Feedback system
   - Admin login
   - Quiz creation (admin)

2. Monitor performance:
   - Check Vercel Analytics
   - Monitor Firebase usage
   - Check error logs

3. Set up CI/CD:
   - Push to main branch triggers auto-deploy
   - Preview deployments on pull requests

## 📊 Monitoring & Analytics

### Vercel Monitoring
- Real-time analytics
- Performance metrics
- Error tracking
- Usage statistics

### Firebase Monitoring
- Firestore read/write usage
- Authentication events
- Storage usage
- Real-time database performance

## 🔧 Environment Configuration

### Development (\`.env.local\`)
- Localhost URLs
- Test Firebase project

### Production (\`.env\` in Vercel)
- Production URLs
- Production Firebase project
- API keys with appropriate restrictions

## 🚨 Troubleshooting

### Build Fails
1. Check Node version (18+)
2. Clear cache: \`npm cache clean --force\`
3. Reinstall: \`rm -rf node_modules && npm install\`
4. Check build logs in Vercel

### Environment Variables Not Loading
1. Verify variables in Vercel Settings
2. Restart deployment
3. Check variable names (exact match required)

### Firebase Connection Issues
1. Verify API keys
2. Check Firebase rules
3. Ensure CORS is configured
4. Test in Firebase Console

### Performance Issues
1. Monitor bundle size
2. Enable caching
3. Optimize images
4. Use CDN for assets

## 📈 Scaling

### Increase Firebase Quota
- Firestore: pay-as-you-go
- Storage: pay-as-you-go
- Authentication: unlimited free tier

### Vercel Scaling
- Serverless functions auto-scale
- Bandwidth unlimited on Pro plan
- Auto-deployed on every push

## 🔐 Security Checklist

- [ ] Firebase rules configured
- [ ] Environment variables set
- [ ] Admin authentication working
- [ ] HTTPS enforced
- [ ] CORS properly configured
- [ ] API rate limiting (optional)
- [ ] Data encryption enabled
- [ ] Backups scheduled
- [ ] Monitoring alerts set
- [ ] Error tracking enabled

## 📞 Support

For deployment issues:
1. Check Vercel docs: https://vercel.com/docs
2. Check Firebase docs: https://firebase.google.com/docs
3. Review error logs
4. Contact support teams

## 🎯 Performance Optimization Tips

1. Enable compression in Vercel
2. Use CDN for static assets
3. Optimize images (WebP format)
4. Minimize database queries
5. Implement caching strategies
6. Use lazy loading for routes
7. Monitor Core Web Vitals
8. Set up automated backups

## 🔄 Continuous Deployment

### Auto-Deploy on Push
- Configure main branch
- Set up preview deployments
- Add status checks
- Configure notifications

### Manual Rollback
\`\`\`bash
vercel rollback
\`\`\`

---

**Deployment Complete!** Your Quiz Master app is now live on Vercel! 🎉
""