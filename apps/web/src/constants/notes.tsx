/**
 * Types des notes
 * -
 * - Aigüe ou grave
 */
export const NoteTypes: { value: string; label: string }[] = [
  { value: "high", label: "Aigüe" },
  { value: "low", label: "Grave" },
];

/**
 * Nom des notes pour la sélection des notes lors de la création de gammes, accords...
 */
export const NoteNames: { name: string; label: string; soundUrl: string; }[] = [
  { name: "C♭♭", label: "Do♭♭", soundUrl:"" },
  { name: "D♭♭", label: "Re♭♭", soundUrl:"" },
  { name: "E♭♭", label: "Mi♭♭", soundUrl:"" },
  { name: "F♭♭", label: "Fa♭♭", soundUrl:"" },
  { name: "G♭♭", label: "Sol♭♭", soundUrl:"" },
  { name: "A♭♭", label: "La♭♭", soundUrl:"" },
  { name: "B♭♭", label: "Si♭♭", soundUrl:"" },

  { name: "C♭", label: "Do♭", soundUrl:"/sounds/high/Cb.mp3" },
  { name: "D♭", label: "Re♭", soundUrl:"/sounds/high/Db.mp3" },
  { name: "E♭", label: "Mi♭", soundUrl:"/sounds/high/Eb.mp3" },
  { name: "F♭", label: "Fa♭", soundUrl:"/sounds/high/Fb.mp3" },
  { name: "G♭", label: "Sol♭", soundUrl:"/sounds/high/Gb.mp3" },
  { name: "A♭", label: "La♭", soundUrl:"/sounds/high/Ab.mp3" },
  { name: "B♭", label: "Si♭", soundUrl:"/sounds/high/Bb.mp3" },

  { name: "C", label: "Do", soundUrl:"/sounds/high/C.mp3" },
  { name: "D", label: "Re", soundUrl:"/sounds/high/D.mp3" },
  { name: "E", label: "Mi", soundUrl:"/sounds/high/E.mp3" },
  { name: "F", label: "Fa", soundUrl:"/sounds/high/F.mp3" },
  { name: "G", label: "Sol", soundUrl:"/sounds/high/G.mp3" },
  { name: "A", label: "La", soundUrl:"/sounds/high/A.mp3" },
  { name: "B", label: "Si", soundUrl:"/sounds/high/B.mp3" },

  { name: "C♯", label: "Do♯", soundUrl:"/sounds/high/Cd.mp3" },
  { name: "D♯", label: "Re♯", soundUrl:"/sounds/high/Dd.mp3" },
  { name: "E♯", label: "Mi♯", soundUrl:"/sounds/high/Ed.mp3" },
  { name: "F♯", label: "Fa♯", soundUrl:"/sounds/high/Fd.mp3" },
  { name: "G♯", label: "Sol♯", soundUrl:"/sounds/high/Gd.mp3" },
  { name: "A♯", label: "La♯", soundUrl:"/sounds/high/Ad.mp3" },
  { name: "B♯", label: "Si♯", soundUrl:"/sounds/high/Bd.mp3" },

  { name: "C♯♯", label: "Do♯♯", soundUrl:"" },
  { name: "D♯♯", label: "Re♯♯", soundUrl:"" },
  { name: "E♯♯", label: "Mi♯♯", soundUrl:"" },
  { name: "F♯♯", label: "Fa♯♯", soundUrl:"" },
  { name: "G♯♯", label: "Sol♯♯", soundUrl:"" },
  { name: "A♯♯", label: "La♯♯", soundUrl:"" },
  { name: "B♯♯", label: "Si♯♯", soundUrl:"" },
];


/**
 * Fichiers audio des notes aigües, placés dans le dossier public/sounds
 * -
 */
export const HighNoteSoundsUrl = [

  { name: "do♭", url: "/sounds/high/Cb.mp3" },
  { name: "re♭", url: "/sounds/high/Db.mp3" },
  { name: "mi♭", url: "/sounds/high/Eb.mp3" },
  { name: "fa♭", url: "/sounds/high/Fb.mp3" },
  { name: "sol♭", url: "/sounds/high/Gb.mp3" },
  { name: "la♭", url: "/sounds/high/Ab.mp3" },
  { name: "si♭", url: "/sounds/high/Bb.mp3" },

  { name: "do", url: "/sounds/high/C.mp3" },
  { name: "re", url: "/sounds/high/D.mp3" },
  { name: "mi", url: "/sounds/high/E.mp3" },
  { name: "fa", url: "/sounds/high/F.mp3" },
  { name: "sol", url: "/sounds/high/G.mp3" },
  { name: "la", url: "/sounds/high/A.mp3" },
  { name: "si", url: "/sounds/high/B.mp3" },

  { name: "do♯", url: "/sounds/high/Cd.mp3" },
  { name: "re♯", url: "/sounds/high/Dd.mp3" },
  { name: "mi♯", url: "/sounds/high/Ed.mp3" },
  { name: "fa♯", url: "/sounds/high/Fd.mp3" },
  { name: "sol♯", url: "/sounds/high/Gd.mp3" },
  { name: "la♯", url: "/sounds/high/Ad.mp3" },
  { name: "si♯", url: "/sounds/high/Bd.mp3" },
]


/**
 * Fichiers audio des notes graves, placés dans le dossier public/sounds
 * -
 */
export const LowNoteSoundsUrl: { name: string; url: string }[] = [

  { name: "do♭", url: "/sounds/low/Cb.mp3" },
  { name: "re♭", url: "/sounds/low/Db.mp3" },
  { name: "mi♭", url: "/sounds/low/Eb.mp3" },
  { name: "fa♭", url: "/sounds/low/Fb.mp3" },
  { name: "sol♭", url: "/sounds/low/Gb.mp3" },
  { name: "la♭", url: "/sounds/low/Ab.mp3" },
  { name: "si♭", url: "/sounds/low/Bb.mp3" },

  { name: "do", url: "/sounds/low/C.mp3" },
  { name: "re", url: "/sounds/low/D.mp3" },
  { name: "mi", url: "/sounds/low/E.mp3" },
  { name: "fa", url: "/sounds/low/F.mp3" },
  { name: "sol", url: "/sounds/low/G.mp3" },
  { name: "la", url: "/sounds/low/A.mp3" },
  { name: "si", url: "/sounds/low/B.mp3" },

  { name: "do♯", url: "/sounds/low/Cd.mp3" },
  { name: "re♯", url: "/sounds/low/Dd.mp3" },
  { name: "mi♯", url: "/sounds/low/Ed.mp3" },
  { name: "fa♯", url: "/sounds/low/Fd.mp3" },
  { name: "sol♯", url: "/sounds/low/Gd.mp3" },
  { name: "la♯", url: "/sounds/low/Ad.mp3" },
  { name: "si♯", url: "/sounds/low/Bd.mp3" },
]

/**
 * Les différents noms de tonalités.
 * -
 */
export const ModeNames: { id: string; name: string }[] = [
  { id: "mineur", name: "Mineur" },
  { id: "majeur", name: "Majeur" },
]
/**
 * Les différents noms de tonalités.
 * -
 */
export const TonalityNames: { id: string; name: string }[] = [
  { id: "C", name: "C" },
  { id: "C♯", name: "C♯" },

  { id: "D♭", name: "D♭" },
  { id: "D", name: "D" },
  { id: "D♯", name: "D♯" },

  { id: "E♭", name: "E♭" },
  { id: "E", name: "E" },

  { id: "F", name: "F" },
  { id: "F♯", name: "F♯" },

  { id: "G♭", name: "G♭" },
  { id: "G", name: "G" },
  { id: "G♯", name: "G♯" },

  { id: "A♭", name: "A♭" },
  { id: "A", name: "A" },
  { id: "A♯", name: "A♯" },

  { id: "B♭", name: "B♭" },
  { id: "B", name: "B" },
]
