import './styles/common.css'

export const getGlobalStyling = (theme) => {
  if (theme === 'dark') {
    import('./styles/dark.css')
  }

  return () => null
}
