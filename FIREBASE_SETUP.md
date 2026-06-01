# Quiz Master - Firebase Setup Guide

## 📋 Prerequisites

- Firebase account (free tier is fine)
- Google account
- Quiz Master application cloned

## 🚀 Step-by-Step Firebase Setup

### 1. Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Click "Add Project"
3. Enter project name: "Quiz Master"
4. Accept analytics (optional)
5. Select region (choose closest to your users)
6. Wait for project creation

### 2. Create Web App

1. In project overview, click web icon
2. Register app as "Quiz Master Web"
3. Copy configuration
4. Click "Continue to console"

### 3. Configure Authentication

1. Go to Authentication
2. Click "Get Started"
3. Enable Email/Password:
   - Click Email/Password provider
   - Toggle "Enable"
   - Save

4. (Optional) Enable Google Sign-in:
   - Click Google provider
   - Toggle "Enable"
   - Add project support email
   - Add OAuth consent screen
   - Save

### 4. Create Firestore Database

1. Go to Firestore Database
2. Click "Create database"
3. Select region (same as step 1)
4. Start in **Production mode**
5. Click "Enable"

### 5. Configure Firestore Rules

1. Go to Firestore Database
2. Click "Rules" tab
3. Replace with rules from `firebase/firestore.rules`
4. Click "Publish"

### 6. Create Database Collections

Use Firebase Console to create:

#### a. Admins Collection
1. Click "Start collection"
2. Name: "admins"
3. Add first document:
   - Document ID: (admin uid)
   - Fields:
     - email: (string) "admin@quiz.com"
     - isAdmin: (boolean) true
     - createdAt: (timestamp) now

#### b. Quizzes Collection
1. Create collection: "quizzes"
2. Leave empty (will populate via admin)

#### c. Questions Collection
1. Create collection: "questions"
2. Leave empty

#### d. Categories Collection
1. Create collection: "categories"
2. Add sample categories:
   - Name: "General Knowledge"
   - Name: "Science"
   - Name: "History"

#### e. Attempts Collection
1. Create collection: "attempts"
2. Leave empty

#### f. Settings Collection
1. Create collection: "settings"
2. Add document "general":
   - siteName: "Quiz Master"
   - theme: {}
   - description: "Interactive Quiz Application"

### 7. Configure Storage (Optional)

1. Go to Storage
2. Click "Get Started"
3. Start in production mode
4. Keep default rules
5. Click "Done"

### 8. Get Firebase Configuration

1. Go to Project Settings (gear icon)
2. Scroll to "Your apps" section
3. Copy Web SDK configuration

### 9. Environment Variables

Create `.env.local` with copied values:

\`\`\`env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id

VITE_APP_URL=http://localhost:3000
VITE_APP_NAME=Quiz Master
VITE_ADMIN_EMAIL=admin@quiz.com
\`\`\`

### 10. Create Demo Admin Account

1. In Authentication section, click "Users" tab
2. Click "Create user"
3. Email: admin@quiz.com
4. Password: admin123
5. Click "Create"

6. Note the User UID
7. Go to Firestore > admins collection
8. Add document with that UID:
   \`\`\`
   email: admin@quiz.com
   isAdmin: true
   createdAt: now
   \`\`\`

## 📊 Sample Data (Optional)

### Add Sample Quiz

Go to Firestore > quizzes > Add document:

\`\`\`javascript
{
  "title": "General Knowledge Quiz",
  "description": "Test your general knowledge with these questions",
  "category": "General Knowledge",
  "difficulty": "medium",
  "questionCount": 10,
  "timeLimit": 30,
  "attempts": 0,
  "createdAt": Timestamp.now(),
  "updatedAt": Timestamp.now()
}
\`\`\`

### Add Sample Questions

Go to Firestore > questions > Add documents:

\`\`\`javascript
{
  "quizId": "[quiz_id]",
  "question": "What is the capital of France?",
  "options": ["London", "Paris", "Berlin", "Madrid"],
  "correctAnswer": "Paris",
  "explanation": "Paris is the capital city of France.",
  "category": "Geography",
  "difficulty": "easy",
  "createdAt": Timestamp.now()
}
\`\`\`

## 🔐 Security Best Practices

1. **Enable HTTPS**: Required by Firebase
2. **Restrict API Keys**: 
   - Go to Project Settings > API Keys
   - Click each key and set restrictions
   - HTTP referrer: Your domain
   - API restrictions: Limit to needed services

3. **Enable Firestore Rules**: Already configured in rules file
4. **Regular Backups**: Enable automated backups in Firestore
5. **Monitor Usage**: Set up billing alerts

## 🧪 Testing

1. Start development server:
\`\`\`bash
npm run dev
\`\`\`

2. Test user features:
   - Visit Home page
   - Browse quizzes
   - Play quiz
   - Check results

3. Test admin features:
   - Go to /admin/login
   - Use admin@quiz.com / admin123
   - Create/edit/delete quiz
   - Manage questions

## 📈 Scaling Firebase

### Free Tier Includes:
- 25,000 reads/day
- 20,000 writes/day
- 20,000 deletes/day
- 1 GB storage
- 100 simultaneous connections

### Upgrade to Pay-As-You-Go:
- Beyond free tier: \$0.06 per 100K reads
- Every 100K writes: \$0.18
- Every 100K deletes: \$0.02
- Storage: \$0.18/GB after first GB

## 🆘 Troubleshooting

### Connection Issues
1. Verify API key in .env.local
2. Check Firebase project is active
3. Ensure Firestore database exists
4. Check network connectivity

### Authentication Issues
1. Verify admin document exists in "admins" collection
2. Check email/password are correct
3. Ensure Email/Password provider is enabled

### Firestore Rules Issues
1. Review rules in `firebase/firestore.rules`
2. Check user/admin status
3. Test rules in Firestore Console

### Storage Issues
1. Enable Storage in project
2. Configure CORS if needed
3. Check Storage rules

## 📚 Resources

- [Firebase Documentation](https://firebase.google.com/docs)
- [Firestore Guide](https://firebase.google.com/docs/firestore)
- [Authentication Guide](https://firebase.google.com/docs/auth)
- [Security Rules](https://firebase.google.com/docs/rules)

---

**Firebase Setup Complete!** Your Quiz Master is now connected to Firebase! 🎉
""