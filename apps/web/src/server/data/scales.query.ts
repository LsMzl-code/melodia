import { AllScalesSchema, SingleScaleSchema } from "@/src/schemas/scales.schema"
import { Scale } from "@/src/types/scales.type"
import axios from "axios"

/**
 * Récupération de tous les degrés
 * @api GET http://localhost:8000/degrees
 * @visibility public
 * @returns 
 */
export const getAllScales = async (): Promise<Scale[] | null> => {
  try {
    const response = await axios.get('http://localhost:8000/scales')

    return AllScalesSchema.parse(response.data)
  } catch (error: any) {
    console.error("ERREUR [getAllScales]", error.message)
    return null
  }
}

/**
 * Récupération d'une note par son id
 * @api GET http://localhost:8000/notes/:id
 * @visibility public
 * @returns 
 */
export const getScaleById = async (scaleId: number): Promise<Scale | null> => {
  try {
    const response = await axios.get(`http://localhost:8000/scales/${scaleId}`)

    return SingleScaleSchema.parse(response.data)
  } catch (error: any) {
    console.error("ERREUR [getScaleById]", error.message)
    return null
  }
}

