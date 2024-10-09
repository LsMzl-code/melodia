import { AllNotesSchema, SingleNoteSchema } from "@/src/schemas/notes.schema"
import { Note } from "@/src/types/notes"
import axios from "axios"

/**
 * Récupération de toutes les notes
 * @api GET http://localhost:8000/notes
 * @visibility public
 * @returns 
 */
export const getAllNotes = async (): Promise<Note[] | null> => {
  try {
    const response = await axios.get('http://localhost:8000/notes')

    return AllNotesSchema.parse(response.data)
  } catch (error: any) {
    console.error("ERREUR [getAllNotes]", error.message)
    return null
  }
}

/**
 * Récupération d'une note par son id
 * @api GET http://localhost:8000/notes/:id
 * @visibility public
 * @returns 
 */
export const getNoteById = async (noteId: number): Promise<Note | null> => {
  try {
    const response = await axios.get(`http://localhost:8000/notes/${noteId}`)
    
    return SingleNoteSchema.parse(response.data)
  } catch (error: any) {
    console.error("ERREUR [getNoteById]", error.message)
    return null
  }
}
  
