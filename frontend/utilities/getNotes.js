import apiUrl from '../src/config';

export async function getNotes(setState) {

    try {
      const response = await fetch(`${apiUrl}/notes`, {
            credentials: 'include' // Include credentials (cookies)
        });
      const data = await response.json();

      if (Array.isArray(data.notes)) {
        setState(data.notes);  // Set state only if data.notes is an array - was having a problem with users having no notes saved yet
      } else {
        setState([]);  // Set an empty array if data.notes is not an array
        console.error("Expected 'notes' to be an array but got:", data.notes);
      }
    } catch (error) {
      console.error("Failed to fetch notes:", error);
      setState([]);  // Set an empty array on error to avoid undefined errors in rendering
    }
  }
