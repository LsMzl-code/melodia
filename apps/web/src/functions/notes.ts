/**
 * Permet de trier le tableau de notes bémols primaires par ordre alphabétique.
 * -
 * 
 * @param arrayToSort ([A, A#, B, B#...])
 */
export const sortBemolNotes = (arrayToSort: { name: string }[]) => {
  return arrayToSort.sort((a, b) => {
    if (a.name[0] === b.name[0]) {
      // Si les premières lettres sont les mêmes, on gère les altérations
      return (a.name[0] || '').localeCompare(b.name[0] || '');
    } else {
      // Sinon, on compare les premières lettres
      return a.name[0]!.localeCompare(b.name[0]!);
    }
  })
}
/**
 * Permet de trier le tableau de notes dieses primaires par ordre alphabétique.
 * -
 * 
 * @param arrayToSort ([Ab, A, Bb, B...])
 */
export const sortDieseNotes = (arrayToSort: { name: string }[]) => {
  return arrayToSort.sort((a, b) => {
    if (a.name[0] === b.name[0]) {
      // Si les premières lettres sont les mêmes, on gère les altérations
      return (a.name[1] || '').localeCompare(b.name[1] || '');
    } else {
      // Sinon, on compare les premières lettres
      return a.name[0]!.localeCompare(b.name[0]!);
    }
  })
}