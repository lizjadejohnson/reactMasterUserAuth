export async function getNotes(setState) {
    try {
      const response = await fetch('http://localhost:3000/notes');
      const data = await response.json()
      setState(data.notes)
    } catch (error) {
      console.error(error)
    }
  }