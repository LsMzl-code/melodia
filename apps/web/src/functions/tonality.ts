/**
 * Calcul de la tonalité d'une mélodie.
 * -
 * @param selectedNotes Tableau contenant les notes sélectionnées.
 * @returns Objet contenant la tonalité et son relatif.
 */
export const calculateTonalityMelody = (selectedNotes: string[]) => {
  let tonalityResult: { name: string, relatif: string, notes: { note: string, soundUrl: string }[] };
  //! F#
  if (
    selectedNotes.includes("F♯" && "C♯" && "G♯" && "D♯" && "A♯" && "E♯")
  ) {
    tonalityResult = ({
      name: "F♯",
      relatif: "D♯m",
      notes: [
        {
          note: "F♯",
          soundUrl: "/sounds/singleNotes/low/Fd.mp3",
        },
        {
          note: "G♯",
          soundUrl: "/sounds/singleNotes/low/Gd.mp3",
        },
        {
          note: "A♯",
          soundUrl: "/sounds/singleNotes/low/Ad.mp3",
        },
        {
          note: "B",
          soundUrl: "/sounds/singleNotes/low/B.mp3",
        },
        {
          note: "C♯",
          soundUrl: "/sounds/singleNotes/high/Cd.mp3",
        },
        {
          note: "D♯",
          soundUrl: "/sounds/singleNotes/high/Dd.mp3",
        },
        {
          note: "E♯",
          soundUrl: "/sounds/singleNotes/high/Ed.mp3",
        },
      ],
    });
  }
  //! B
  else if (selectedNotes.includes("F♯" && "C♯" && "G♯" && "D♯" && "A♯")) {
    tonalityResult = ({
      name: "B",
      relatif: "G♯m",
      notes: [
        {
          note: "B",
          soundUrl: "/sounds/singleNotes/low/B.mp3",
        },
        {
          note: "C♯",
          soundUrl: "/sounds/singleNotes/high/Cd.mp3",
        },
        {
          note: "D♯",
          soundUrl: "/sounds/singleNotes/high/Dd.mp3",
        },
        {
          note: "E",
          soundUrl: "/sounds/singleNotes/high/E.mp3",
        },
        {
          note: "F♯",
          soundUrl: "/sounds/singleNotes/high/Fd.mp3",
        },
        {
          note: "G♯",
          soundUrl: "/sounds/singleNotes/high/Gd.mp3",
        },
        {
          note: "A♯",
          soundUrl: "/sounds/singleNotes/high/Ad.mp3",
        },
      ],
    });
  }
  //! E
  else if (selectedNotes.includes("F♯" && "C♯" && "G♯" && "D♯")) {
    tonalityResult = ({
      name: "E",
      relatif: "C♯m",
      notes: [
        {
          note: "E",
          soundUrl: "/sounds/singleNotes/low/E.mp3",
        },
        {
          note: "F♯",
          soundUrl: "/sounds/singleNotes/low/Fd.mp3",
        },
        {
          note: "G♯",
          soundUrl: "/sounds/singleNotes/low/Gd.mp3",
        },
        {
          note: "A",
          soundUrl: "/sounds/singleNotes/low/A.mp3",
        },
        {
          note: "B",
          soundUrl: "/sounds/singleNotes/low/B.mp3",
        },
        {
          note: "C♯",
          soundUrl: "/sounds/singleNotes/high/Cd.mp3",
        },
        {
          note: "D♯",
          soundUrl: "/sounds/singleNotes/high/Dd.mp3",
        },
      ],
    });
  }
  //! A
  else if (selectedNotes.includes("F♯" && "C♯" && "G♯")) {
    tonalityResult = ({
      name: "A",
      relatif: "F♯m",
      notes: [
        {
          note: "A",
          soundUrl: "/sounds/singleNotes/low/A.mp3",
        },
        {
          note: "B",
          soundUrl: "/sounds/singleNotes/low/B.mp3",
        },
        {
          note: "C♯",
          soundUrl: "/sounds/singleNotes/high/Cd.mp3",
        },
        {
          note: "D",
          soundUrl: "/sounds/singleNotes/high/D.mp3",
        },
        {
          note: "E",
          soundUrl: "/sounds/singleNotes/high/E.mp3",
        },
        {
          note: "F♯",
          soundUrl: "/sounds/singleNotes/high/Fd.mp3",
        },
        {
          note: "G♯",
          soundUrl: "/sounds/singleNotes/high/Gd.mp3",
        },
      ],
    });
  }
  //! D
  else if (selectedNotes.includes("F♯" && "C♯")) {
    tonalityResult = ({
      name: "D",
      relatif: "Bm",
      notes: [
        {
          note: "D",
          soundUrl: "/sounds/singleNotes/low/D.mp3",
        },
        {
          note: "E",
          soundUrl: "/sounds/singleNotes/low/E.mp3",
        },
        {
          note: "F♯",
          soundUrl: "/sounds/singleNotes/low/Fd.mp3",
        },
        {
          note: "G",
          soundUrl: "/sounds/singleNotes/low/G.mp3",
        },
        {
          note: "A",
          soundUrl: "/sounds/singleNotes/low/A.mp3",
        },
        {
          note: "B",
          soundUrl: "/sounds/singleNotes/low/B.mp3",
        },
        {
          note: "C♯",
          soundUrl: "/sounds/singleNotes/high/Cd.mp3",
        },
      ],
    });
  }
  //! G
  else if (selectedNotes.includes("F♯")) {
    tonalityResult = ({
      name: "G",
      relatif: "Em",
      notes: [
        {
          note: "G",
          soundUrl: "/sounds/singleNotes/low/G.mp3",
        },
        {
          note: "A",
          soundUrl: "/sounds/singleNotes/low/A.mp3",
        },
        {
          note: "B",
          soundUrl: "/sounds/singleNotes/low/B.mp3",
        },
        {
          note: "C",
          soundUrl: "/sounds/singleNotes/high/C.mp3",
        },
        {
          note: "D",
          soundUrl: "/sounds/singleNotes/high/D.mp3",
        },
        {
          note: "E",
          soundUrl: "/sounds/singleNotes/high/E.mp3",
        },
        {
          note: "F♯",
          soundUrl: "/sounds/singleNotes/high/Fd.mp3",
        },
      ],
    });
  }
  //! Gb
  else if (
    selectedNotes.includes("B♭" && "E♭" && "A♭" && "D♭" && "G♭" && "C♭")
  ) {
    tonalityResult = ({
      name: "G♭",
      relatif: "E♭m",
      notes: [
        {
          note: "G♭",
          soundUrl: "/sounds/singleNotes/low/Gb.mp3",
        },
        {
          note: "A♭",
          soundUrl: "/sounds/singleNotes/low/Ab.mp3",
        },
        {
          note: "B♭",
          soundUrl: "/sounds/singleNotes/low/Bb.mp3",
        },
        {
          note: "C♭",
          soundUrl: "/sounds/singleNotes/high/Cb.mp3",
        },
        {
          note: "D♭",
          soundUrl: "/sounds/singleNotes/high/Db.mp3",
        },
        {
          note: "E♭",
          soundUrl: "/sounds/singleNotes/high/Eb.mp3",
        },
        {
          note: "F",
          soundUrl: "/sounds/singleNotes/high/Fd.mp3",
        },
      ],
    });
  }
  //! Db
  else if (selectedNotes.includes("B♭" && "E♭" && "A♭" && "D♭" && "G♭")) {
    tonalityResult = ({
      name: "D♭",
      relatif: "B♭m",
      notes: [
        {
          note: "D♭",
          soundUrl: "/sounds/singleNotes/low/Db.mp3",
        },
        {
          note: "E♭",
          soundUrl: "/sounds/singleNotes/low/Eb.mp3",
        },
        {
          note: "F",
          soundUrl: "/sounds/singleNotes/low/F.mp3",
        },
        {
          note: "G♭",
          soundUrl: "/sounds/singleNotes/low/Gb.mp3",
        },
        {
          note: "A♭",
          soundUrl: "/sounds/singleNotes/low/Ab.mp3",
        },
        {
          note: "B♭",
          soundUrl: "/sounds/singleNotes/low/Bb.mp3",
        },
        {
          note: "C",
          soundUrl: "/sounds/singleNotes/high/C.mp3",
        },
      ],
    });
  }
  //! Ab
  else if (selectedNotes.includes("B♭" && "E♭" && "A♭" && "D♭")) {
    tonalityResult = ({
      name: "A♭",
      relatif: "Fm",
      notes: [
        {
          note: "A♭",
          soundUrl: "/sounds/singleNotes/low/Ab.mp3",
        },
        {
          note: "B♭",
          soundUrl: "/sounds/singleNotes/low/Bb.mp3",
        },
        {
          note: "C",
          soundUrl: "/sounds/singleNotes/high/C.mp3",
        },
        {
          note: "D♭",
          soundUrl: "/sounds/singleNotes/high/Db.mp3",
        },
        {
          note: "E♭",
          soundUrl: "/sounds/singleNotes/high/Eb.mp3",
        },
        {
          note: "F",
          soundUrl: "/sounds/singleNotes/high/F.mp3",
        },
        {
          note: "G",
          soundUrl: "/sounds/singleNotes/high/G.mp3",
        },
      ],
    });
  }
  //! Eb
  else if (selectedNotes.includes("B♭" && "E♭" && "A♭")) {
    tonalityResult = ({
      name: "E♭",
      relatif: "Cm",
      notes: [
        {
          note: "E♭",
          soundUrl: "/sounds/singleNotes/low/Eb.mp3",
        },
        {
          note: "F",
          soundUrl: "/sounds/singleNotes/low/F.mp3",
        },
        {
          note: "G",
          soundUrl: "/sounds/singleNotes/low/G.mp3",
        },
        {
          note: "A♭",
          soundUrl: "/sounds/singleNotes/low/Ab.mp3",
        },
        {
          note: "B",
          soundUrl: "/sounds/singleNotes/low/B.mp3",
        },
        {
          note: "C♭",
          soundUrl: "/sounds/singleNotes/high/Cb.mp3",
        },
        {
          note: "D",
          soundUrl: "/sounds/singleNotes/high/D.mp3",
        },
      ],
    });
  }
  //! Bb
  else if (selectedNotes.includes("B♭" && "E♭")) {
    tonalityResult = ({
      name: "B♭",
      relatif: "Gm",
      notes: [
        {
          note: "B♭",
          soundUrl: "/sounds/singleNotes/low/Bb.mp3",
        },
        {
          note: "C",
          soundUrl: "/sounds/singleNotes/high/C.mp3",
        },
        {
          note: "D",
          soundUrl: "/sounds/singleNotes/high/D.mp3",
        },
        {
          note: "E♭",
          soundUrl: "/sounds/singleNotes/high/Eb.mp3",
        },
        {
          note: "F",
          soundUrl: "/sounds/singleNotes/high/F.mp3",
        },
        {
          note: "G",
          soundUrl: "/sounds/singleNotes/high/G.mp3",
        },
        {
          note: "A",
          soundUrl: "/sounds/singleNotes/high/A.mp3",
        },
      ],
    });
  }
  //! F
  else if (selectedNotes.includes("B♭")) {
    tonalityResult = ({
      name: "F",
      relatif: "Dm",
      notes: [
        {
          note: "F",
          soundUrl: "/sounds/singleNotes/low/F.mp3",
        },
        {
          note: "G",
          soundUrl: "/sounds/singleNotes/low/G.mp3",
        },
        {
          note: "A",
          soundUrl: "/sounds/singleNotes/low/A.mp3",
        },
        {
          note: "B♭",
          soundUrl: "/sounds/singleNotes/low/Bb.mp3",
        },
        {
          note: "C",
          soundUrl: "/sounds/singleNotes/high/C.mp3",
        },
        {
          note: "D",
          soundUrl: "/sounds/singleNotes/high/D.mp3",
        },
        {
          note: "E",
          soundUrl: "/sounds/singleNotes/high/E.mp3",
        },
      ],
    });
  }
  //! C
  else {
    tonalityResult = ({
      name: "C",
      relatif: "Am",
      notes: [
        {
          note: "C",
          soundUrl: "/sounds/singleNotes/low/C.mp3",
        },
        {
          note: "D",
          soundUrl: "/sounds/singleNotes/low/D.mp3",
        },
        {
          note: "E",
          soundUrl: "/sounds/singleNotes/low/E.mp3",
        },
        {
          note: "F",
          soundUrl: "/sounds/singleNotes/low/F.mp3",
        },
        {
          note: "G",
          soundUrl: "/sounds/singleNotes/low/G.mp3",
        },
        {
          note: "A",
          soundUrl: "/sounds/singleNotes/low/A.mp3",
        },
        {
          note: "B",
          soundUrl: "/sounds/singleNotes/low/B.mp3",
        },
      ],
    });
  }
  return tonalityResult;
}

export const calculateTonalityMelody2 = (selectedNotes: string[]) => {
  let tonalityResult: { name: string, relatif: string, notes: { note: string, soundUrl: string }[] } | null = null;

  const matchNotes = (notes: string[]) => notes.every(note => selectedNotes.includes(note));

  //! F#
  if (matchNotes(["F♯", "C♯", "G♯", "D♯", "A♯", "E♯"])) {
    tonalityResult = {
      name: "F♯",
      relatif: "D♯m",
      notes: [
        { note: "F♯", soundUrl: "/sounds/singleNotes/low/Fd.mp3" },
        { note: "G♯", soundUrl: "/sounds/singleNotes/low/Gd.mp3" },
        { note: "A♯", soundUrl: "/sounds/singleNotes/low/Ad.mp3" },
        { note: "B", soundUrl: "/sounds/singleNotes/low/B.mp3" },
        { note: "C♯", soundUrl: "/sounds/singleNotes/high/Cd.mp3" },
        { note: "D♯", soundUrl: "/sounds/singleNotes/high/Dd.mp3" },
        { note: "E♯", soundUrl: "/sounds/singleNotes/high/Ed.mp3" },
      ],
    };
  }
  //! B
  else if (matchNotes(["F♯", "C♯", "G♯", "D♯", "A♯"])) {
    tonalityResult = {
      name: "B",
      relatif: "G♯m",
      notes: [
        { note: "B", soundUrl: "/sounds/singleNotes/low/B.mp3" },
        { note: "C♯", soundUrl: "/sounds/singleNotes/high/Cd.mp3" },
        { note: "D♯", soundUrl: "/sounds/singleNotes/high/Dd.mp3" },
        { note: "E", soundUrl: "/sounds/singleNotes/high/E.mp3" },
        { note: "F♯", soundUrl: "/sounds/singleNotes/high/Fd.mp3" },
        { note: "G♯", soundUrl: "/sounds/singleNotes/high/Gd.mp3" },
        { note: "A♯", soundUrl: "/sounds/singleNotes/high/Ad.mp3" },
      ],
    };
  }
  //! E
  else if (matchNotes(["F♯", "C♯", "G♯", "D♯"])) {
    tonalityResult = {
      name: "E",
      relatif: "C♯m",
      notes: [
        { note: "E", soundUrl: "/sounds/singleNotes/low/E.mp3" },
        { note: "F♯", soundUrl: "/sounds/singleNotes/low/Fd.mp3" },
        { note: "G♯", soundUrl: "/sounds/singleNotes/low/Gd.mp3" },
        { note: "A", soundUrl: "/sounds/singleNotes/low/A.mp3" },
        { note: "B", soundUrl: "/sounds/singleNotes/low/B.mp3" },
        { note: "C♯", soundUrl: "/sounds/singleNotes/high/Cd.mp3" },
        { note: "D♯", soundUrl: "/sounds/singleNotes/high/Dd.mp3" },
      ],
    };
  }
  //! A
  else if (matchNotes(["F♯", "C♯", "G♯"])) {
    tonalityResult = {
      name: "A",
      relatif: "F♯m",
      notes: [
        { note: "A", soundUrl: "/sounds/singleNotes/low/A.mp3" },
        { note: "B", soundUrl: "/sounds/singleNotes/low/B.mp3" },
        { note: "C♯", soundUrl: "/sounds/singleNotes/high/Cd.mp3" },
        { note: "D", soundUrl: "/sounds/singleNotes/high/D.mp3" },
        { note: "E", soundUrl: "/sounds/singleNotes/high/E.mp3" },
        { note: "F♯", soundUrl: "/sounds/singleNotes/high/Fd.mp3" },
        { note: "G♯", soundUrl: "/sounds/singleNotes/high/Gd.mp3" },
      ],
    };
  }
  //! D
  else if (matchNotes(["F♯", "C♯"])) {
    tonalityResult = {
      name: "D",
      relatif: "Bm",
      notes: [
        { note: "D", soundUrl: "/sounds/singleNotes/low/D.mp3" },
        { note: "E", soundUrl: "/sounds/singleNotes/low/E.mp3" },
        { note: "F♯", soundUrl: "/sounds/singleNotes/low/Fd.mp3" },
        { note: "G", soundUrl: "/sounds/singleNotes/low/G.mp3" },
        { note: "A", soundUrl: "/sounds/singleNotes/low/A.mp3" },
        { note: "B", soundUrl: "/sounds/singleNotes/low/B.mp3" },
        { note: "C♯", soundUrl: "/sounds/singleNotes/high/Cd.mp3" },
      ],
    };
  }
  //! G
  else if (matchNotes(["F♯"])) {
    tonalityResult = {
      name: "G",
      relatif: "Em",
      notes: [
        { note: "G", soundUrl: "/sounds/singleNotes/low/G.mp3" },
        { note: "A", soundUrl: "/sounds/singleNotes/low/A.mp3" },
        { note: "B", soundUrl: "/sounds/singleNotes/low/B.mp3" },
        { note: "C", soundUrl: "/sounds/singleNotes/high/C.mp3" },
        { note: "D", soundUrl: "/sounds/singleNotes/high/D.mp3" },
        { note: "E", soundUrl: "/sounds/singleNotes/high/E.mp3" },
        { note: "F♯", soundUrl: "/sounds/singleNotes/high/Fd.mp3" },
      ],
    };
  }
  //! Default: C
  else {
    tonalityResult = {
      name: "C",
      relatif: "Am",
      notes: [
        { note: "C", soundUrl: "/sounds/singleNotes/low/C.mp3" },
        { note: "D", soundUrl: "/sounds/singleNotes/low/D.mp3" },
        { note: "E", soundUrl: "/sounds/singleNotes/low/E.mp3" },
        { note: "F", soundUrl: "/sounds/singleNotes/low/F.mp3" },
        { note: "G", soundUrl: "/sounds/singleNotes/low/G.mp3" },
        { note: "A", soundUrl: "/sounds/singleNotes/low/A.mp3" },
        { note: "B", soundUrl: "/sounds/singleNotes/low/B.mp3" },
      ],
    };
  }

  return tonalityResult;
};
