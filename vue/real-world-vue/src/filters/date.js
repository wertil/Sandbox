export default value => {
  const date = new Date(value)
  return date.toLocaleString(['de-DE'], {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  })
}
