export const useIsLoggedIn = () => {
  return useState('isLoggedIn', () => false)
}
