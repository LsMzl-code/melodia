import { AllChordsSchema, SingleChordSchema } from "@/src/schemas/chords.schema"
import { Chord } from "@/src/types/chords.type"
import axios from "axios"

/**
 * Récupération de toutes les accords
 * @api GET http://localhost:8000/chords
 * @visibility public
 * @returns 
 */
export const getAllChords= async (): Promise<Chord[] | null> => {
  try {
    const response = await axios.get('http://localhost:8000/chords')

    return AllChordsSchema.parse(response.data)
  } catch (error: any) {
    console.error("ERREUR [getAllChords]", error.message)
    return null
  }
}

/**
 * Récupération d'une note par son id
 * @api GET http://localhost:8000/notes/:id
 * @visibility public
 * @returns 
 */
export const getChordById = async (chordId: number): Promise<Chord | null> => {
  try {
    const response = await axios.get(`http://localhost:8000/chords/${chordId}`)
    
    return SingleChordSchema.parse(response.data)
  } catch (error: any) {
    console.error("ERREUR [getChordById]", error.message)
    return null
  }
}
  
