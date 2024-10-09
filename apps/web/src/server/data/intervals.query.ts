import { AllChordIntervalsSchema, AllScaleIntervalsSchema, SingleChordIntervalSchema, SingleScaleIntervalSchema } from "@/src/schemas/intervals.schema"
import { ChordInterval, ScaleInterval } from "@/src/types/intervals.type"
import axios from "axios"

//*** INTERVALLES D'ACCORDS ***//

/**
 * Récupération de tous les intervalles d'accords
 * @api GET http://localhost:8000/chord-intervals
 * @visibility public
 * @returns 
 */
export const getAllChordIntervals = async (): Promise<ChordInterval[] | null> => {
  try {
    const response = await axios.get('http://localhost:8000/chord-intervals')

    return AllChordIntervalsSchema.parse(response.data)
  } catch (error: any) {
    console.error("ERREUR [getAllChordIntervals]", error.message)
    return null
  }
}

/**
 * Récupération d'un intervalle d'accord par son id
 * @api GET http://localhost:8000/chord-intervals/:id
 * @visibility public
 * @returns 
 */
export const getChordIntervalById = async (chordIntervalId: number): Promise<ChordInterval | null> => {
  try {
    const response = await axios.get(`http://localhost:8000/chord-intervals/${chordIntervalId}`)

    return SingleChordIntervalSchema.parse(response.data)
  } catch (error: any) {
    console.error("ERREUR [getChordIntervalById]", error.message)
    return null
  }
}

//*** INTERVALLES DE GAMMES ***//

/**
 * Récupération de toutes les familles d'accords
 * @api GET http://localhost:8000/chord-families
 * @visibility public
 * @returns 
 */
export const getAllScaleIntervals = async (): Promise<ScaleInterval[] | null> => {
  try {
    const response = await axios.get('http://localhost:8000/scale-intervals')

    return AllScaleIntervalsSchema.parse(response.data)
  } catch (error: any) {
    console.error("ERREUR [getAllScaleIntervals]", error.message)
    return null
  }
}

/**
 * Récupération d'un intervalle de gamme par son id
 * @api GET http://localhost:8000/scale-intervals/:id
 * @visibility public
 * @returns 
 */
export const getScaleIntervalById = async (scaleIntervalId: number): Promise<ScaleInterval | null> => {
  try {
    const response = await axios.get(`http://localhost:8000/scale-intervals/${scaleIntervalId}`)

    return SingleScaleIntervalSchema.parse(response.data)
  } catch (error: any) {
    console.error("ERREUR [getScaleIntervalById]", error.message)
    return null
  }
}

