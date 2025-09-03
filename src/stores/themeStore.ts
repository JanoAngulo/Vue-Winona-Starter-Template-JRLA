import { ref } from 'vue'

type Theme = 'emerald' | 'dim'

const theme = ref<Theme>('emerald')

const toggleTheme = () => {
  theme.value = theme.value === 'emerald' ? 'dim' : 'emerald'
  document.documentElement.setAttribute('data-theme', theme.value)
  localStorage.setItem('theme', theme.value)
}

const initializeTheme = () => {
  const saved = localStorage.getItem('theme')
  const value: Theme = saved === 'dim' || saved === 'dim' ? 'dim' : 'emerald'
  theme.value = value
  document.documentElement.setAttribute('data-theme', value)
}

export { theme, toggleTheme, initializeTheme }
