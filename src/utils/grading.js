export const getGrade = (percentage) => {
  if (percentage >= 90) return 'A+'
  if (percentage >= 80) return 'A'
  if (percentage >= 70) return 'B'
  if (percentage >= 60) return 'C'
  return 'Fail'
}

export const getGradeColor = (grade) => {
  const colors = {
    'A+': 'text-green-600 bg-green-50',
    'A': 'text-blue-600 bg-blue-50',
    'B': 'text-yellow-600 bg-yellow-50',
    'C': 'text-orange-600 bg-orange-50',
    'Fail': 'text-red-600 bg-red-50',
  }
  return colors[grade] || 'text-gray-600 bg-gray-50'
}

export const formatTime = (seconds) => {
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const secs = seconds % 60

  if (hours > 0) {
    return `${hours}h ${minutes}m ${secs}s`
  }
  if (minutes > 0) {
    return `${minutes}m ${secs}s`
  }
  return `${secs}s`
}

export const calculateScore = (correct, total) => {
  return Math.round((correct / total) * 100)
}
