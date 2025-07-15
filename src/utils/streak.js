export const getTodayDate = () => {
  const today = new Date()
  return today.toISOString().split("T")[0] // "2025-07-15"
}

export const loadStreak = () => {
  const stored = JSON.parse(localStorage.getItem("streak")) || {
    lastCompletedDate: null,
    count: 0,
  }
  return stored
}

export const updateStreak = () => {
  const today = getTodayDate()
  const streak = loadStreak()

  const last = streak.lastCompletedDate
  const yesterday = new Date()
  yesterday.setDate(yesterday.getDate() - 1)
  const yDate = yesterday.toISOString().split("T")[0]

  if (last === today) return streak.count // already updated today

  if (last === yDate) {
    // continue streak
    streak.count += 1
  } else {
    // reset streak
    streak.count = 1
  }

  streak.lastCompletedDate = today
  localStorage.setItem("streak", JSON.stringify(streak))

  return streak.count
}
