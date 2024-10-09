import { AllTonalitiesSchema, SingleTonalitySchema } from "@/src/schemas/tonalities.schema"
import { Tonalities } from "@/src/types/tonalities"
import axios from "axios"

/**
 * Récupération de toutes les notes
 * @api GET http://localhost:8000/notes
 * @visibility public
 * @returns 
 */
export const getAllTonalities = async (): Promise<Tonalities[] | null> => {
  try {
    const response = await axios.get('http://localhost:8000/tonalities')

    return AllTonalitiesSchema.parse(response.data)
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
export const getTonalityById = async (tonalityId: number): Promise<Tonalities | null> => {
  try {
    const response = await axios.get(`http://localhost:8000/tonalities/${tonalityId}`)
    
    return SingleTonalitySchema.parse(response.data)
  } catch (error: any) {
    console.error("ERREUR [getNoteById]", error.message)
    return null
  }
}
  
