import { AllChordNamesSchema, AllScaleNamesSchema, SingleChordNameSchema, SingleScaleNameSchema } from "@/src/schemas/names.schema"
import { AllNotesSchema, SingleNoteSchema } from "@/src/schemas/notes.schema"
import { ChordName, ScaleName } from "@/src/types/names.type"
import { Note } from "@/src/types/notes"
import axios from "axios"

/**
 * Récupération de toutes les notes
 * @api GET http://localhost:8000/notes
 * @visibility public
 * @returns 
 */
export const getAllScaleNames = async (): Promise<ScaleName[] | null> => {
  try {
    const response = await axios.get('http://localhost:8000/scale-names')

    return AllScaleNamesSchema.parse(response.data)
  } catch (error: any) {
    console.error("ERREUR [getAllScaleNames]", error.message)
    return null
  }
}

/**
 * Récupération d'une note par son id
 * @api GET http://localhost:8000/notes/:id
 * @visibility public
 * @returns 
 */
export const getScaleNamesById = async (scaleNameId: number): Promise<ScaleName | null> => {
  try {
    const response = await axios.get(`http://localhost:8000/scale-names/${scaleNameId}`)
    
    return SingleScaleNameSchema.parse(response.data)
  } catch (error: any) {
    console.error("ERREUR [getScaleNamesById]", error.message)
    return null
  }
}
  
/**
 * Récupération de toutes les notes
 * @api GET http://localhost:8000/notes
 * @visibility public
 * @returns 
 */
export const getAllChordNames = async (): Promise<ChordName[] | null> => {
  try {
    const response = await axios.get('http://localhost:8000/chord-names')

    return AllChordNamesSchema.parse(response.data)
  } catch (error: any) {
    console.error("ERREUR [getAllChordNames]", error.message)
    return null
  }
}

/**
 * Récupération d'une note par son id
 * @api GET http://localhost:8000/notes/:id
 * @visibility public
 * @returns 
 */
export const getChordNamesById = async (chordNameId: number): Promise<ChordName | null> => {
  try {
    const response = await axios.get(`http://localhost:8000/chord-names/${chordNameId}`)
    
    return SingleChordNameSchema.parse(response.data)
  } catch (error: any) {
    console.error("ERREUR [getChordNamesById]", error.message)
    return null
  }
}
  
