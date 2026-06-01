import { create } from 'zustand'

export const useAuthStore = create((set) => ({
  user: null,
  admin: null,
  loading: false,
  error: null,

  setUser: (user) => set({ user }),
  setAdmin: (admin) => set({ admin }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
  logout: () => set({ user: null, admin: null }),
}))

export const useQuizStore = create((set, get) => ({
  currentQuiz: null,
  currentQuestion: 0,
  answers: {},
  score: 0,
  startTime: null,
  endTime: null,

  setCurrentQuiz: (quiz) => set({ currentQuiz: quiz }),
  setCurrentQuestion: (index) => set({ currentQuestion: index }),
  addAnswer: (questionId, answer) =>
    set((state) => ({
      answers: { ...state.answers, [questionId]: answer },
    })),
  setScore: (score) => set({ score }),
  setStartTime: (time) => set({ startTime: time }),
  setEndTime: (time) => set({ endTime: time }),
  resetQuiz: () =>
    set({
      currentQuiz: null,
      currentQuestion: 0,
      answers: {},
      score: 0,
      startTime: null,
      endTime: null,
    }),
}))

export const useAdminStore = create((set) => ({
  quizzes: [],
  categories: [],
  selectedQuiz: null,
  loading: false,

  setQuizzes: (quizzes) => set({ quizzes }),
  setCategories: (categories) => set({ categories }),
  setSelectedQuiz: (quiz) => set({ selectedQuiz: quiz }),
  setLoading: (loading) => set({ loading }),
  addQuiz: (quiz) => set((state) => ({ quizzes: [...state.quizzes, quiz] })),
  updateQuiz: (id, quiz) =>
    set((state) => ({
      quizzes: state.quizzes.map((q) => (q.id === id ? { ...q, ...quiz } : q)),
    })),
  removeQuiz: (id) =>
    set((state) => ({
      quizzes: state.quizzes.filter((q) => q.id !== id),
    })),
}))
