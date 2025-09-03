import { ref } from 'vue'

type Theme = 'light' | 'dark'

const theme = ref<Theme>('light')

const toggleTheme = () => {
  theme.value = theme.value === 'light' ? 'dark' : 'light'
  document.documentElement.setAttribute('data-theme', theme.value)
  localStorage.setItem('theme', theme.value)
}

const initializeTheme = () => {
  const saved = localStorage.getItem('theme')
  const value: Theme = saved === 'dark' || saved === 'dim' ? 'dark' : 'light'
  theme.value = value
  document.documentElement.setAttribute('data-theme', value)
}

export { theme, toggleTheme, initializeTheme }
