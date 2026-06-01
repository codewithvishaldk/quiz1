# Quiz Master - Development Guide

## 🏗️ Architecture Overview

```
┌─────────────────────────────────────────────┐
│         React 19 + Vite Frontend            │
├─────────────────────────────────────────────┤
│ Pages | Components | Context | Services     │
├─────────────────────────────────────────────┤
│      React Router + Framer Motion           │
├─────────────────────────────────────────────┤
│         Firebase Backend Services           │
├─────────────────────────────────────────────┤
│ Auth | Firestore | Storage                  │
└─────────────────────────────────────────────┘
```

## 📁 Folder Structure Deep Dive

### `/src/components` - Reusable Components
- **Navigation.jsx** - Top navigation bar with theme toggle
- **Footer.jsx** - Application footer with links
- **QuizCard.jsx** - Quiz card component for listing
- **FeedbackOverlay.jsx** - Answer feedback with confetti
- **LoadingScreen.jsx** - Full-screen loader
- **ProtectedRoute.jsx** - Route protection for admins
- **Skeletons.jsx** - Skeleton loaders

### `/src/pages` - Page Routes
- **Home.jsx** - Landing page with statistics
- **QuizList.jsx** - Browse and search quizzes
- **QuizPlay.jsx** - Interactive quiz player
- **ResultPage.jsx** - Quiz results and analysis
- **AdminLogin.jsx** - Admin authentication

### `/src/admin` - Admin Panel
- **pages/** - Admin pages (Dashboard, Quizzes, etc.)
- **components/** - AdminLayout wrapper

### `/src/context` - State Management
- **store.js** - Zustand stores
  - `useAuthStore` - User/Admin authentication
  - `useQuizStore` - Quiz session state
  - `useUIStore` - UI preferences

### `/src/services` - API & Database
- **firebase.js** - Firebase initialization
- **db.js** - Firestore operations

### `/src/hooks` - Custom Hooks
- **useTheme.js** - Theme switching logic

### `/src/utils` - Utilities
- **grading.js** - Grading calculations and formatting

## 🔄 Data Flow

### Quiz Playback Flow
```
QuizList Page
    ↓
  [Select Quiz]
    ↓
QuizPlay Page
    ↓
useQuizStore → Fetch questions from Firestore
    ↓
Display question with options
    ↓
[Select Answer]
    ↓
FeedbackOverlay → Show result
    ↓
  [Next Question]
    ↓
ResultPage → Calculate score → Store attempt
```

### State Management Flow
```
useAuthStore
├── user: User profile
├── isAdmin: Admin status
└── loading: Auth loading state

useQuizStore
├── currentQuiz: Active quiz
├── questions: Quiz questions
├── answers: User answers
└── score: Quiz score

useUIStore
├── isDark: Theme preference
└── feedbackMessage: UI notifications
```

## 🎨 Component Communication

### Props Drilling Avoided with Zustand
```javascript
// ❌ Before (props drilling)
<Parent value={value} onChange={handleChange}>
  <Child value={value} onChange={handleChange}>
    <GrandChild value={value} onChange={handleChange} />
  </Child>
</Parent>

// ✅ After (Zustand)
// In GrandChild: const value = useQuizStore(s => s.value)
```

## 🔐 Authentication Flow

```
Login Page
    ↓
[Enter Email/Password]
    ↓
Firebase signInWithEmailAndPassword()
    ↓
Check if user in admins collection
    ↓
setUser() + setIsAdmin()
    ↓
Redirect to /admin/dashboard
```

## 🎯 Key Patterns

### 1. **Protected Routes**
```jsx
<Route
  path="/admin/dashboard"
  element={
    <ProtectedRoute>
      <AdminDashboard />
    </ProtectedRoute>
  }
/>
```

### 2. **Optimistic Updates**
Updates Zustand store immediately, then syncs with Firestore.

### 3. **Error Boundaries**
React error boundaries catch component errors.

### 4. **Lazy Loading**
Routes code-split with React Router lazy loading.

## 🧪 Testing Strategy

### Unit Tests
Test utility functions:
- `getGrade()` function
- `calculateScore()` function
- `formatTime()` function

### Integration Tests
Test service functions:
- Firestore CRUD operations
- Firebase authentication

### E2E Tests
Test full flows:
- Quiz playback
- Admin quiz creation
- Result sharing

## 🚀 Performance Optimization

### 1. Code Splitting
- Route-based chunks with React Router
- Dynamic imports for heavy components

### 2. Image Optimization
- Use WebP format
- Lazy load with React
- Optimize with next-image equivalent

### 3. Bundle Analysis
```bash
npm install -g vite-plugin-visualizer
```

### 4. Memoization
```jsx
const QuizCard = memo(({ quiz }) => {
  // Component code
})

const MemoizedComponent = useMemo(() => 
  computeExpensiveValue(), 
  [dependency]
)
```

## 🐛 Debugging

### React DevTools
- Install extension
- Inspect components
- View props and state
- Profiler for performance

### Vite DevTools
- Fast HMR
- Network inspector
- Console utilities

### Firebase DevTools
- Firestore browser
- Authentication debugger
- Real-time listeners

## 📚 Adding New Features

### 1. Add Quiz API
\`\`\`javascript
// src/services/db.js
export const quizService = {
  async createQuiz(data) { /* ... */ }
}
\`\`\`

### 2. Use in Component
\`\`\`jsx
// src/pages/QuizCreate.jsx
import { quizService } from '../services/db'

const [quizzes, setQuizzes] = useState([])
useEffect(() => {
  quizService.getQuizzes().then(setQuizzes)
}, [])
\`\`\`

### 3. Update Store if Needed
\`\`\`javascript
// src/context/store.js
const useQuizStore = create((set) => ({
  quizzes: [],
  setQuizzes: (quizzes) => set({ quizzes })
}))
\`\`\`

### 4. Add Route
\`\`\`jsx
// src/App.jsx
<Route path="/admin/new-quiz" element={<AdminNewQuiz />} />
\`\`\`

## 🎨 Styling Standards

### Tailwind Classes
Use predefined classes:
\`\`\`jsx
<div className="px-4 py-2 rounded-lg bg-primary-600 hover:bg-primary-700 text-white transition-colors">
```

### Dark Mode
All components support dark mode:
\`\`\`jsx
<div className="bg-white dark:bg-slate-800 text-gray-900 dark:text-white">
```

### Custom CSS
Minimal custom CSS in `/src/styles/globals.css`:
\`\`\`css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

## 📦 Dependency Management

### Add New Package
\`\`\`bash
npm install package-name
\`\`\`

### Remove Unused Package
\`\`\`bash
npm uninstall package-name
\`\`\`

### Update Packages
\`\`\`bash
npm update
npm outdated  // Check for updates
\`\`\`

## 🔧 Build & Deploy

### Development
\`\`\`bash
npm run dev    # Start dev server
```

### Building
\`\`\`bash
npm run build  # Production build
npm run preview  # Preview build locally
\`\`\`

### Linting & Formatting
\`\`\`bash
npm run lint    # Check for errors
npm run format  # Auto-format code
\`\`\`

## 📊 Monitoring

### Performance Metrics
- First Contentful Paint (FCP)
- Largest Contentful Paint (LCP)
- Cumulative Layout Shift (CLS)
- Time to Interactive (TTI)

### Error Tracking
- Firebase console logs
- Browser console errors
- Sentry integration (optional)

## 🔐 Security Considerations

1. **API Keys**: Keep in `.env.local`, never commit
2. **CORS**: Configured in Firebase
3. **Authentication**: Email verification recommended
4. **Validation**: Always validate inputs
5. **Rate Limiting**: Implement on sensitive operations

## 🎓 Learning Resources

- [React Docs](https://react.dev)
- [Vite Docs](https://vitejs.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [Firebase Docs](https://firebase.google.com/docs)
- [Framer Motion](https://www.framer.com/motion/)
- [Zustand Docs](https://zustand-demo.vercel.app/)

---

Happy developing! 🚀
""