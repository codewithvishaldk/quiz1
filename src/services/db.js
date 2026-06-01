import {
  collection,
  getDocs,
  getDoc,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  startAfter,
  writeBatch,
} from 'firebase/firestore'
import { db } from './firebase'

// Quiz Services
export const quizService = {
  // Get all quizzes
  async getQuizzes(filters = {}) {
    try {
      let q = collection(db, 'quizzes')
      const querySnapshot = await getDocs(q)
      let quizzes = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }))

      // Apply filters
      if (filters.category) {
        quizzes = quizzes.filter(quiz => quiz.category === filters.category)
      }
      if (filters.difficulty) {
        quizzes = quizzes.filter(quiz => quiz.difficulty === filters.difficulty)
      }

      return quizzes.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    } catch (error) {
      console.error('Error fetching quizzes:', error)
      throw error
    }
  },

  // Get single quiz
  async getQuiz(quizId) {
    try {
      const docRef = doc(db, 'quizzes', quizId)
      const docSnap = await getDoc(docRef)
      if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() }
      }
      return null
    } catch (error) {
      console.error('Error fetching quiz:', error)
      throw error
    }
  },

  // Create quiz
  async createQuiz(quizData) {
    try {
      const docRef = await addDoc(collection(db, 'quizzes'), {
        ...quizData,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      return { id: docRef.id, ...quizData }
    } catch (error) {
      console.error('Error creating quiz:', error)
      throw error
    }
  },

  // Update quiz
  async updateQuiz(quizId, quizData) {
    try {
      const docRef = doc(db, 'quizzes', quizId)
      await updateDoc(docRef, {
        ...quizData,
        updatedAt: new Date(),
      })
      return { id: quizId, ...quizData }
    } catch (error) {
      console.error('Error updating quiz:', error)
      throw error
    }
  },

  // Delete quiz
  async deleteQuiz(quizId) {
    try {
      await deleteDoc(doc(db, 'quizzes', quizId))
    } catch (error) {
      console.error('Error deleting quiz:', error)
      throw error
    }
  },

  // Duplicate quiz
  async duplicateQuiz(quizId) {
    try {
      const quiz = await this.getQuiz(quizId)
      const newQuiz = {
        ...quiz,
        title: `${quiz.title} (Copy)`,
        id: undefined,
      }
      return await this.createQuiz(newQuiz)
    } catch (error) {
      console.error('Error duplicating quiz:', error)
      throw error
    }
  },
}

// Question Services
export const questionService = {
  // Get questions for quiz
  async getQuestions(quizId) {
    try {
      const q = query(
        collection(db, 'questions'),
        where('quizId', '==', quizId)
      )
      const querySnapshot = await getDocs(q)
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }))
    } catch (error) {
      console.error('Error fetching questions:', error)
      throw error
    }
  },

  // Get single question
  async getQuestion(questionId) {
    try {
      const docRef = doc(db, 'questions', questionId)
      const docSnap = await getDoc(docRef)
      if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() }
      }
      return null
    } catch (error) {
      console.error('Error fetching question:', error)
      throw error
    }
  },

  // Add question
  async addQuestion(questionData) {
    try {
      const docRef = await addDoc(collection(db, 'questions'), {
        ...questionData,
        createdAt: new Date(),
      })
      return { id: docRef.id, ...questionData }
    } catch (error) {
      console.error('Error adding question:', error)
      throw error
    }
  },

  // Update question
  async updateQuestion(questionId, questionData) {
    try {
      const docRef = doc(db, 'questions', questionId)
      await updateDoc(docRef, {
        ...questionData,
        updatedAt: new Date(),
      })
      return { id: questionId, ...questionData }
    } catch (error) {
      console.error('Error updating question:', error)
      throw error
    }
  },

  // Delete question
  async deleteQuestion(questionId) {
    try {
      await deleteDoc(doc(db, 'questions', questionId))
    } catch (error) {
      console.error('Error deleting question:', error)
      throw error
    }
  },

  // Bulk import questions
  async bulkImportQuestions(questions) {
    try {
      const batch = writeBatch(db)
      questions.forEach(question => {
        const docRef = doc(collection(db, 'questions'))
        batch.set(docRef, {
          ...question,
          createdAt: new Date(),
        })
      })
      await batch.commit()
      return questions.length
    } catch (error) {
      console.error('Error bulk importing questions:', error)
      throw error
    }
  },
}

// Attempt Services
export const attemptService = {
  // Record attempt
  async recordAttempt(attemptData) {
    try {
      const docRef = await addDoc(collection(db, 'attempts'), {
        ...attemptData,
        createdAt: new Date(),
      })
      return { id: docRef.id, ...attemptData }
    } catch (error) {
      console.error('Error recording attempt:', error)
      throw error
    }
  },

  // Get user attempts
  async getUserAttempts(userId) {
    try {
      const q = query(
        collection(db, 'attempts'),
        where('userId', '==', userId),
        orderBy('createdAt', 'desc')
      )
      const querySnapshot = await getDocs(q)
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }))
    } catch (error) {
      console.error('Error fetching user attempts:', error)
      throw error
    }
  },

  // Get quiz attempts
  async getQuizAttempts(quizId) {
    try {
      const q = query(
        collection(db, 'attempts'),
        where('quizId', '==', quizId),
        orderBy('createdAt', 'desc')
      )
      const querySnapshot = await getDocs(q)
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }))
    } catch (error) {
      console.error('Error fetching quiz attempts:', error)
      throw error
    }
  },

  // Get all attempts
  async getAllAttempts() {
    try {
      const q = query(
        collection(db, 'attempts'),
        orderBy('createdAt', 'desc')
      )
      const querySnapshot = await getDocs(q)
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }))
    } catch (error) {
      console.error('Error fetching attempts:', error)
      throw error
    }
  },
}

// Category Services
export const categoryService = {
  // Get all categories
  async getCategories() {
    try {
      const querySnapshot = await getDocs(collection(db, 'categories'))
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }))
    } catch (error) {
      console.error('Error fetching categories:', error)
      throw error
    }
  },

  // Add category
  async addCategory(categoryData) {
    try {
      const docRef = await addDoc(collection(db, 'categories'), {
        ...categoryData,
        createdAt: new Date(),
      })
      return { id: docRef.id, ...categoryData }
    } catch (error) {
      console.error('Error adding category:', error)
      throw error
    }
  },

  // Update category
  async updateCategory(categoryId, categoryData) {
    try {
      const docRef = doc(db, 'categories', categoryId)
      await updateDoc(docRef, categoryData)
      return { id: categoryId, ...categoryData }
    } catch (error) {
      console.error('Error updating category:', error)
      throw error
    }
  },

  // Delete category
  async deleteCategory(categoryId) {
    try {
      await deleteDoc(doc(db, 'categories', categoryId))
    } catch (error) {
      console.error('Error deleting category:', error)
      throw error
    }
  },
}

// Settings Services
export const settingsService = {
  // Get settings
  async getSettings() {
    try {
      const docRef = doc(db, 'settings', 'general')
      const docSnap = await getDoc(docRef)
      if (docSnap.exists()) {
        return docSnap.data()
      }
      return {}
    } catch (error) {
      console.error('Error fetching settings:', error)
      throw error
    }
  },

  // Update settings
  async updateSettings(settingsData) {
    try {
      const docRef = doc(db, 'settings', 'general')
      await updateDoc(docRef, settingsData)
      return settingsData
    } catch (error) {
      console.error('Error updating settings:', error)
      throw error
    }
  },
}

// Analytics Services
export const analyticsService = {
  // Get dashboard stats
  async getDashboardStats() {
    try {
      const quizzes = await quizService.getQuizzes()
      const questions = await getDocs(collection(db, 'questions'))
      const attempts = await attemptService.getAllAttempts()

      let totalAttempts = 0
      let totalScore = 0

      attempts.forEach(attempt => {
        totalAttempts++
        totalScore += attempt.score || 0
      })

      const averageScore = totalAttempts > 0 ? totalScore / totalAttempts : 0

      return {
        totalQuizzes: quizzes.length,
        totalQuestions: questions.size,
        totalAttempts,
        averageScore: Math.round(averageScore * 100) / 100,
      }
    } catch (error) {
      console.error('Error fetching dashboard stats:', error)
      throw error
    }
  },
}
