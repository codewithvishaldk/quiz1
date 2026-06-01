""

# Quiz Master Application

A production-ready interactive quiz application built with React 19, Vite, Firebase, Tailwind CSS, and Framer Motion. Features real-time feedback, confetti animations, dark mode support, and a comprehensive admin dashboard.

## 🌟 Features

### User Features
- ✅ Load quizzes from Firestore
- ✅ Multiple quiz categories
- ✅ Responsive design (Desktop, Tablet, Mobile)
- ✅ Interactive quiz playback with smooth animations
- ✅ Instant feedback (Correct/Incorrect)
- ✅ Confetti animations on correct answers
- ✅ Detailed result analysis with grading
- ✅ Dark/Light mode support
- ✅ Share results on social media
- ✅ Search and filter quizzes

### Admin Features
- ✅ Admin authentication (Firebase)
- ✅ Quiz management (Create, Edit, Delete, Duplicate)
- ✅ Question management
- ✅ Category management
- ✅ Attempt tracking and analytics
- ✅ Settings management
- ✅ Dashboard with statistics

### UI/UX
- ✅ Modern, premium design
- ✅ Smooth page transitions
- ✅ Loading skeletons
- ✅ Hover effects and interactions
- ✅ Responsive navigation
- ✅ Dark mode with system preference detection

## 📋 Requirements

- Node.js 18+
- npm or yarn
- Firebase account (free tier works)
- Vercel account (for deployment)

## 🚀 Getting Started

### 1. Installation

Clone the repository and install dependencies:

\`\`\`bash
cd quiz
npm install
\`\`\`

### 2. Firebase Setup

1. Create a new project at [Firebase Console](https://console.firebase.google.com)
2. Enable Firestore Database (Start in production mode)
3. Enable Authentication (Email/Password)
4. Enable Storage
5. Copy your Firebase config

### 3. Environment Variables

Create a \`.env.local\` file in the root directory:

\`\`\`env
# Firebase Configuration
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id

# Application Settings
VITE_APP_URL=http://localhost:3000
VITE_APP_NAME=Quiz Master
VITE_ADMIN_EMAIL=admin@quizmaster.com
\`\`\`

### 4. Run Development Server

\`\`\`bash
npm run dev
\`\`\`

The application will be available at \`http://localhost:3000\`

## 📁 Project Structure

\`\`\`
quiz/
├── src/
│   ├── admin/
│   │   ├── components/
│   │   │   └── AdminLayout.jsx
│   │   └── pages/
│   │       ├── AdminDashboard.jsx
│   │       ├── AdminQuizzes.jsx
│   │       ├── AdminQuestions.jsx
│   │       ├── AdminCategories.jsx
│   │       ├── AdminAttempts.jsx
│   │       └── AdminSettings.jsx
│   ├── components/
│   │   ├── Navigation.jsx
│   │   ├── Footer.jsx
│   │   ├── FeedbackOverlay.jsx
│   │   ├── ProtectedRoute.jsx
│   │   ├── LoadingScreen.jsx
│   │   ├── QuizCard.jsx
│   │   └── Skeletons.jsx
│   ├── context/
│   │   ├── store.js (Zustand stores)
│   │   └── AuthContext.jsx
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── QuizList.jsx
│   │   ├── QuizPlay.jsx
│   │   ├── ResultPage.jsx
│   │   └── AdminLogin.jsx
│   ├── services/
│   │   ├── firebase.js (Firebase config)
│   │   └── db.js (Firestore operations)
│   ├── hooks/
│   │   └── useTheme.js
│   ├── utils/
│   │   └── grading.js
│   ├── styles/
│   │   └── globals.css
│   ├── App.jsx
│   └── main.jsx
├── firebase/
│   ├── firestore.rules
│   └── firestore.indexes.json
├── public/
├── .env.example
├── .env.local
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── tsconfig.json
├── firebase.json
├── vercel.json
└── README.md
\`\`\`

## 🗄️ Database Schema

### Collections Structure

#### admins
\`\`\`javascript
{
  uid: string,
  email: string,
  isAdmin: boolean,
  createdAt: timestamp
}
\`\`\`

#### quizzes
\`\`\`javascript
{
  id: string,
  title: string,
  description: string,
  category: string,
  difficulty: string (easy|medium|hard),
  timeLimit: number,
  questionCount: number,
  attempts: number,
  image: string,
  createdAt: timestamp,
  updatedAt: timestamp
}
\`\`\`

#### questions
\`\`\`javascript
{
  id: string,
  quizId: string,
  question: string,
  options: string[],
  correctAnswer: string,
  explanation: string,
  category: string,
  difficulty: string,
  createdAt: timestamp
}
\`\`\`

#### attempts
\`\`\`javascript
{
  id: string,
  quizId: string,
  userId: string,
  score: number,
  correctAnswers: number,
  totalQuestions: number,
  timeSpent: number,
  answers: object,
  createdAt: timestamp
}
\`\`\`

#### categories
\`\`\`javascript
{
  id: string,
  name: string,
  description: string,
  icon: string,
  createdAt: timestamp
}
\`\`\`

#### settings
\`\`\`javascript
{
  siteName: string,
  logo: string,
  theme: object,
  description: string,
  updatedAt: timestamp
}
\`\`\`

## 🎯 Key Features Implementation

### Quiz Playback
- Sequential question display with smooth animations
- Automatic advance after 2 seconds (configurable)
- Progress bar showing quiz completion
- Timer for each quiz session
- Answer tracking in Zustand store

### Feedback System
- Instant visual feedback (green for correct, red for incorrect)
- Confetti animation on correct answers
- Detailed explanations
- Option highlighting showing correct answer

### Grading System
- A+ (90-100%)
- A (80-89%)
- B (70-79%)
- C (60-69%)
- Fail (Below 60%)

### State Management (Zustand)
- \`useAuthStore\`: User authentication and admin status
- \`useQuizStore\`: Quiz session data and answers
- \`useUIStore\`: Theme and UI preferences

## 🔐 Security Features

### Firestore Rules
- Public read access for quizzes and questions
- Admin-only write access
- User can only read their own attempts
- Authentication required for submissions

### Authentication
- Email/Password authentication via Firebase
- Admin verification via custom claims
- Protected admin routes

## 🚀 Building & Deployment

### Build for Production

\`\`\`bash
npm run build
\`\`\`

Output will be in the \`dist/\` folder.

### Deploy to Vercel

#### Option 1: CLI
\`\`\`bash
npm install -g vercel
vercel
\`\`\`

#### Option 2: GitHub Integration
1. Push code to GitHub
2. Connect repo to Vercel
3. Add environment variables in Vercel Settings
4. Vercel auto-deploys on push

#### Option 3: Manual Deployment
\`\`\`bash
npm run build
vercel --prod
\`\`\`

### Firebase Deployment

\`\`\`bash
# Install Firebase CLI
npm install -g firebase-tools

# Login to Firebase
firebase login

# Deploy
firebase deploy
\`\`\`

## 📦 Tech Stack

### Frontend
- React 19
- Vite
- Tailwind CSS
- Framer Motion (animations)
- React Router (navigation)
- Zustand (state management)
- React Hook Form (form handling)
- React Confetti (confetti effect)
- Lucide React (icons)
- Recharts (charts)

### Backend
- Firebase Authentication
- Firestore Database
- Firebase Storage

### Deployment
- Vercel

### Development
- TypeScript
- ESLint
- Prettier

## 🔧 Configuration

### Tailwind CSS
Custom colors, animations, and utilities are configured in \`tailwind.config.js\`.

### Vite
Build settings and server configuration in \`vite.config.js\`.

### Firebase
Database rules in \`firebase/firestore.rules\`.

## 📱 Responsive Design

- **Mobile**: 320px - 640px
- **Tablet**: 641px - 1024px
- **Desktop**: 1025px+

All components are fully responsive using Tailwind CSS breakpoints.

## 🌓 Dark Mode

Dark mode is automatically enabled based on system preferences and can be toggled via the navigation bar. Theme preference is persisted in localStorage.

## 📊 Performance

- Code splitting with Vite
- Image optimization
- CSS minification
- JavaScript minification
- Lazy loading of routes
- Optimized animations with Framer Motion

## 🐛 Debugging

### Development Tools
- React Developer Tools
- Vite DevTools
- Firebase DevTools

### Console Errors
Check browser console for detailed error messages and stack traces.

### Firebase Issues
Check Firebase Console for authentication, database, and storage issues.

## 📄 License

MIT License - Feel free to use this project for personal or commercial purposes.

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (\`git checkout -b feature/AmazingFeature\`)
3. Commit changes (\`git commit -m 'Add AmazingFeature'\`)
4. Push to branch (\`git push origin feature/AmazingFeature\`)
5. Open a Pull Request

## 📞 Support

For issues and questions:
- Check existing GitHub issues
- Create a new issue with detailed description
- Contact admin@quizmaster.com

## 🎉 Bonus Features (Optional)

- Timer per question
- Leaderboard
- User registration/login
- Google authentication
- Certificate generation (PDF)
- PWA support
- Offline mode
- Email notifications
- Admin analytics dashboard
- Question bank import/export
- Quiz scheduling

## 🔜 Upcoming Features

- Mobile app (React Native)
- Real-time multiplayer quizzes
- AI-powered question generation
- Advanced analytics
- Video integration
- Audio questions
- Custom branding options
- Email campaign integration

---

**Happy Quizzing!** 🚀

Made with ❤️ using React, Firebase, and Tailwind CSS
""