export interface Course {
  id: string
  name: string
  image: string
  bg: string        // цвет фона блока
  duration: string  // '25 дней'
  perDay: string    // '20-50 мин/день'
  complexity: number // 1-5, для отрисовки шкалы сложности
}

export const courses: Course[] = [
  { id: 'yoga', name: 'Йога', image: '/img/yoga.png', bg: '#FFC700', duration: '25 дней', perDay: '20-50 мин/день', complexity: 2 },
  { id: 'stretch', name: 'Стретчинг', image: '/img/stretch.png', bg: '#2491D2', duration: '25 дней', perDay: '20-50 мин/день', complexity: 2 },
  { id: 'fitness', name: 'Фитнес', image: '/img/fitness.png', bg: '#F7A012', duration: '25 дней', perDay: '20-50 мин/день', complexity: 3 },
  { id: 'step', name: 'Степ-аэробика', image: '/img/step.png', bg: '#FF7E65', duration: '25 дней', perDay: '20-50 мин/день', complexity: 3 },
  { id: 'bodyflex', name: 'Бодифлекс', image: '/img/bodyflex.png', bg: '#7D458C', duration: '25 дней', perDay: '20-50 мин/день', complexity: 2 },
]