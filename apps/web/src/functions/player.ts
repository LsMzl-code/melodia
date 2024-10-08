/**
 * Lecture d'un tableau de notes
 * -
 * @param sounds Tableau contenant les urls des notes à lire
 */
export const playNotes = (sounds: Array<string> | undefined) => {
  // Delai entre chaque notes jouées
  const delay = (milliseconds: number) =>
    new Promise((resolve) => setTimeout(resolve, milliseconds));

  // Lecture des notes
  const playNotes = async () => {
    if (!sounds) return;
    for (let i = 0; i < sounds.length; i++) {
      await delay(400);
      if (sounds[i]) {
        let player = new Audio(sounds[i]);
        player.volume = 0.5;
        player.play();
      }
    }
  };
  playNotes();
}

export const playNote = (sound: string) => {
  let player = new Audio(sound);
  player.volume = 0.5;
  player.play();
}
