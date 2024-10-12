import { NoteNames } from "../constants/notes"
/**
 * onverti les notes en tableau puis les compare afin la constante de notes
 * @param notesToCompare Notes d'une gamme ou accord
 * @returns Tableau contenant le nom, soundUrl et label
 */
export const compareNotes = (notesToCompare: string) => {
  // Récupération de toutes les notes depuis les constantes
  const allNotes = NoteNames;
  const notesArray = notesToCompare.split(',').map(note => note.trim());

  return allNotes.filter(note => notesArray.includes(note.name))
}