# Contributing to Quiz Master

Thank you for your interest in contributing to Quiz Master! This document provides guidelines and instructions for contributing.

## 🤝 How to Contribute

### Reporting Bugs

1. Check existing issues to avoid duplicates
2. Create new issue with title: `[BUG] Brief description`
3. Include:
   - Steps to reproduce
   - Expected behavior
   - Actual behavior
   - Screenshots/videos if applicable
   - Environment (OS, browser, Node version)

### Suggesting Features

1. Use title: `[FEATURE] Brief description`
2. Explain the feature and its benefits
3. Provide use cases
4. Suggest implementation approach if applicable

### Pull Requests

1. Fork the repository
2. Create feature branch: `git checkout -b feature/AmazingFeature`
3. Make changes following code standards
4. Commit: `git commit -m 'Add AmazingFeature'`
5. Push: `git push origin feature/AmazingFeature`
6. Open Pull Request with:
   - Clear title and description
   - Link to related issues
   - Checklist of changes
   - Screenshots if UI changes

## 📋 Code Standards

### JavaScript/JSX
- Use ES6+ syntax
- Follow existing code style
- Use meaningful variable names
- Add comments for complex logic
- Maximum line length: 100 characters

### React Components
- Use functional components with hooks
- Prop types not required (using TypeScript optional)
- Extract reusable logic into custom hooks
- Use React.memo for performance optimization
- Keep components focused and single-responsibility

### Styling
- Use Tailwind CSS classes
- Avoid inline styles
- Support dark mode with `dark:` prefix
- Use custom colors from theme

### Database
- Use Firebase services (Auth, Firestore, Storage)
- Follow collection naming conventions
- Implement proper error handling
- Use transactions for complex operations

## 🧪 Testing

- Test locally before submitting PR
- Test responsive design (mobile, tablet, desktop)
- Test dark mode
- Test admin and user flows
- Test error states

## 📝 Commit Messages

\`\`\`
[TYPE] Short description

Longer explanation if needed

Fixes #123
\`\`\`

Types: feat, fix, docs, style, refactor, test, chore

## 📚 Project Structure

```
src/
├── admin/         - Admin panel components and pages
├── components/    - Reusable UI components
├── context/       - Zustand stores
├── hooks/         - Custom React hooks
├── pages/         - Page components
├── services/      - Firebase and API services
├── styles/        - Global styles
├── utils/         - Utility functions
├── App.jsx        - Main app component
└── main.jsx       - React entry point
```

## 🚀 Setup Development Environment

1. Fork and clone repository
2. Install dependencies: `npm install`
3. Create `.env.local` from `.env.example`
4. Set up Firebase project
5. Run: `npm run dev`

## 🔍 Code Review Process

- Maintainers will review PRs
- May request changes
- Please respond to feedback
- Once approved, PR will be merged

## ✅ Checklist Before Submitting PR

- [ ] Code follows project style
- [ ] No console errors or warnings
- [ ] Tested on multiple browsers/devices
- [ ] Dark mode support added
- [ ] Responsive design verified
- [ ] Documentation updated if needed
- [ ] Commit messages are clear
- [ ] No sensitive data in commits
- [ ] PR description is complete

## 📖 Resources

- [React Documentation](https://react.dev)
- [Firebase Documentation](https://firebase.google.com/docs)
- [Tailwind CSS](https://tailwindcss.com)
- [Framer Motion](https://www.framer.com/motion/)

## 🎯 Development Priorities

1. Bug fixes
2. Performance improvements
3. New features
4. Documentation improvements
5. Code refactoring

## 📞 Questions?

- Create discussion issue
- Check existing documentation
- Comment on related issues

---

Thank you for making Quiz Master better! 🚀
