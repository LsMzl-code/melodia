/**
 * Lecture d'un tableau de notes
 * -
 * @param sounds Tableau contenant les urls des notes à lire
 * @param interval Intervalle de temps entre chaque note (vitesse de lecture)
 */
export const playNotes = (sounds: Array<string> | undefined, interval: number) => {
  // Delai entre chaque notes jouées
  const delay = (milliseconds: number) =>
    new Promise((resolve) => setTimeout(resolve, milliseconds));

  // Lecture des notes
  const playNotes = async () => {
    if (!sounds) return;
    for (let i = 0; i < sounds.length; i++) {
      await delay(interval);
      if (sounds[i]) {
        let player = new Audio(sounds[i]);
        player.volume = 0.5;
        player.play();
      }
    }
  };
  playNotes();
}


/**
 * Lecture d'une note
 * -
 * @param sound Son de la note à jouer
 */
export const playNote = (sound: string) => {
  let player = new Audio(sound);
  player.volume = 0.5;
  player.play();
}
