import { SingleChordSchema } from "@/src/schemas/chords.schema"
import { AllChordFamiliesSchema, AllScaleFamiliesSchema, SingleChordFamilySchema, SingleScaleFamilySchema } from "@/src/schemas/families.schema"
import { ChordFamily, ScaleFamily } from "@/src/types/families.type"
import axios from "axios"

//*** FAMILLES D'ACCORDS ***//

/**
 * Récupération de toutes les familles d'accords
 * @api GET http://localhost:8000/chord-families
 * @visibility public
 * @returns 
 */
export const getAllChordFamilies= async (): Promise<ChordFamily[] | null> => {
  try {
    const response = await axios.get('http://localhost:8000/chord-families')

    return AllChordFamiliesSchema.parse(response.data)
  } catch (error: any) {
    console.error("ERREUR [getAllChordFamilies]", error.message)
    return null
  }
}

/**
 * Récupération d'une famille d'accords par son id
 * @api GET http://localhost:8000/chord-families/:id
 * @visibility public
 * @returns 
 */
export const getChordFamilyById = async (chordFamilyId: number): Promise<ChordFamily | null> => {
  try {
    const response = await axios.get(`http://localhost:8000/chord-families/${chordFamilyId}`)
    
    return SingleChordFamilySchema.parse(response.data)
  } catch (error: any) {
    console.error("ERREUR [getChordFamilyById]", error.message)
    return null
  }
}

//*** FAMILLES DE GAMMES ***//
  
/**
 * Récupération de toutes les familles d'accords
 * @api GET http://localhost:8000/chord-families
 * @visibility public
 * @returns 
 */
export const getAllScaleFamilies= async (): Promise<ScaleFamily[] | null> => {
  try {
    const response = await axios.get('http://localhost:8000/scale-families')

    return AllScaleFamiliesSchema.parse(response.data)
  } catch (error: any) {
    console.error("ERREUR [getAllScaleFamilies]", error.message)
    return null
  }
}

/**
 * Récupération d'une famille d'accords par son id
 * @api GET http://localhost:8000/chord-families/:id
 * @visibility public
 * @returns 
 */
export const getScaleFamilyById = async (scaleFamilyId: number): Promise<ScaleFamily | null> => {
  try {
    const response = await axios.get(`http://localhost:8000/scale-families/${scaleFamilyId}`)
    
    return SingleScaleFamilySchema.parse(response.data)
  } catch (error: any) {
    console.error("ERREUR [getScaleFamilyById]", error.message)
    return null
  }
}
  
