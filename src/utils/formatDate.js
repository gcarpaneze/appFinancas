export function formatDate() {
    
    const day = new Date().getDay()
    const mounth = new Date().getMonth()
    const year = new Date().getFullYear()
    const date = `${year}-${mounth}-${day}`

    return date
}