import { AllDegreesSchema, SingleDegreeSchema } from "@/src/schemas/degrees.schema"
import { Degree } from "@/src/types/degrees.type"
import axios from "axios"

/**
 * Récupération de tous les degrés
 * @api GET http://localhost:8000/degrees
 * @visibility public
 * @returns 
 */
export const getAllDegrees = async (): Promise<Degree[] | null> => {
  try {
    const response = await axios.get('http://localhost:8000/degrees')

    return AllDegreesSchema.parse(response.data)
  } catch (error: any) {
    console.error("ERREUR [getAllDegrees]", error.message)
    return null
  }
}

/**
 * Récupération d'une note par son id
 * @api GET http://localhost:8000/notes/:id
 * @visibility public
 * @returns 
 */
export const getDegreeById = async (degreeId: number): Promise<Degree | null> => {
  try {
    const response = await axios.get(`http://localhost:8000/degrees/${degreeId}`)

    return SingleDegreeSchema.parse(response.data)
  } catch (error: any) {
    console.error("ERREUR [getDegreeById]", error.message)
    return null
  }
}

