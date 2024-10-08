'use client'

import { RotateCcwIcon } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import IconButton from "../common/icon-button";
import NoteButton from "../common/note-button";
import SquareBox from "../common/square-box";
import { calculateTonalityMelody } from "@/src/functions/tonality";
import { playNotes } from "@/src/functions/player";

const TonalityByMelody = () => {
  //***** STATES *****//
  // Dièse ou bémol
  const [armor, setArmor] = useState<string>("♯");
  // Notes sélectionnées pour recherche de gammes
  const [selectedNotes, setSelectedNotes] = useState<string[]>([]);
  // Résultat
  const [tonalityResult, setTonalityResult] = useState<{
    name: string;
    relatif: string;
    notes: { note: string; soundUrl: string }[];
  } | null>({
    name: "",
    relatif: "",
    notes: [{ note: "", soundUrl: "" }],
  });

  // Dièse ou bémol
  const handleArmor = () => {
    if (armor === "♯") {
      setArmor("♭");
    } else if (armor === "♭") {
      setArmor("♯");
    }
  };
  // Sélection des notes pour la recherche de gammes par l'utilisateur
  const handleSelectNotes = (clickedNote: string) => {
    setSelectedNotes([...selectedNotes, clickedNote]);
  };
  // Suppression des notes sélectionées par l'utilisateur
  const handleRemoveSelectedNotes = (clickedNote: string) => {
    const index = selectedNotes.indexOf(clickedNote);
    selectedNotes.splice(index, 1);
  };

  // Fermeture de la fenêtre de résultat et remise à zéro des notes sélectionnées
  const handleCloseResult = () => {
    setTonalityResult({
      name: "",
      relatif: "",
      notes: [{ note: "", soundUrl: "" }],
    });
    setSelectedNotes([]);
  };

  //***** PROCESS *****//
  // Calcul de la tonalité
  const handleTonalityResult = () => {
    setTonalityResult(calculateTonalityMelody(selectedNotes));
  };

  //***** LECTURE AUDIO DES NOTES *****//
  // Lecture des gammes ( toutes les notes)
  const handlePlayTonalityNotes = (sounds: Array<string> | undefined) => {
    playNotes(sounds);
  };

  return (
    <div>
      {/* Results */}
      <div className='grid grid-cols-2 gap-5 mt-5 mb-10'>
        <SquareBox title="Tonalité" note={tonalityResult?.name!} />
        <SquareBox title="Relatif" note={tonalityResult?.relatif!} />
      </div>

      {/* Notes de la gamme */}
      {/* <div className=" border mb-5 p-2 rounded-xl h-[65px] mt-2">
        <p className="font-medium">Notes</p>
        <div className="flex items-center gap-1.5">
          {tonalityResult?.notes?.map((note) => (
            <p key={note.note} className="font-medium">
              {note.note}
            </p>
          ))}
        </div>
      </div> */}

      {/* Notes sélectionnées */}
      <div className="relative rounded-lg w-full h-14 bg-card-foreground/5 flex items-center gap-1 px-1 col-span-6">
        {selectedNotes.map((note) => (
          <NoteButton key={note} note={note} />
        ))}

        {/* Reset button */}
        {selectedNotes.length != 0 && (
          <IconButton title="Réinitialiser" onClick={() => handleCloseResult()} className="absolute right-1" icon={<RotateCcwIcon className="h-4 w-4" />} />
        )}
      </div>

      {/* Notes */}
      <div className="mt-2 grid grid-rows-4 gap-1.5">
        <div className="grid grid-cols-4 gap-1.5">
          {/* //! Cb */}
          {armor === "♭" && (
            <Button
              className={cn(
                selectedNotes.includes("C♭")
                  ? "bg-red-500 border border-red-600"
                  : "hover:bg-red-500 hover:shadow",
                "w-full text-3xl text-gray-100 bg-[#313131] h-16"
              )}
              onClick={() => handleSelectNotes("C♭")}
              disabled={
                selectedNotes.includes("C") ||
                selectedNotes.includes("C♭")
              }
            >
              C♭
            </Button>
          )}
          {/* //! C */}
          <Button
            className={cn(
              selectedNotes.includes("C")
                ? "border border-red-500"
                : "hover:bg-red-400 hover:shadow",
              "w-full text-3xl text-gray-100 bg-[#313131] h-16"
            )}
            onClick={() => handleSelectNotes("C")}
            disabled={
              selectedNotes.includes("C") || selectedNotes.includes("C♯")
            }
          >
            C
          </Button>
          {/* //! C# */}
          {armor === "♯" && (
            <Button
              className={cn(
                selectedNotes.includes("C♯")
                  ? "border border-red-300"
                  : "hover:bg-red-300 hover:shadow",
                " w-full text-3xl text-gray-100 bg-[#313131] h-16"
              )}
              onClick={() => handleSelectNotes("C♯")}
              disabled={
                selectedNotes.includes("C") ||
                selectedNotes.includes("C♯")
              }
            >
              C♯
            </Button>
          )}
          {/* //! Db */}
          {armor === "♭" && (
            <Button
              className={cn(
                selectedNotes.includes("D♭")
                  ? "border border-orange-500"
                  : "hover:bg-orange-500 hover:shadow",
                " w-full text-3xl text-gray-100 bg-[#313131] h-16"
              )}
              onClick={() => handleSelectNotes("D♭")}
              disabled={
                selectedNotes.includes("D♭") ||
                selectedNotes.includes("D")
              }
            >
              D♭
            </Button>
          )}
          {/* //! D */}
          <Button
            className={cn(
              selectedNotes.includes("D")
                ? "border border-orange-500 "
                : "hover:bg-orange-400 hover:shadow",
              "w-full text-3xl text-gray-100 bg-[#313131] h-16"
            )}
            onClick={() => handleSelectNotes("D")}
            disabled={
              selectedNotes.includes("D") ||
              selectedNotes.includes("D♯") ||
              selectedNotes.includes("D♭")
            }
          >
            D
          </Button>

          {/* //! D# */}
          {armor === "♯" && (
            <Button
              className={cn(
                selectedNotes.includes("D♯")
                  ? "border border-orange-300"
                  : "hover:bg-orange-300 hover:shadow",
                " w-full text-3xl text-gray-100 bg-[#313131] h-16"
              )}
              onClick={() => handleSelectNotes("D♯")}
              disabled={
                selectedNotes.includes("D") ||
                selectedNotes.includes("D♯")
              }
            >
              D♯
            </Button>
          )}
        </div>
        <div className="grid grid-cols-4 gap-1.5">
          {/* //! Eb */}
          {armor === "♭" && (
            <Button
              className={cn(
                selectedNotes.includes("E♭")
                  ? "border border-yellow-500"
                  : " hover:bg-yellow-500 hover:shadow",
                " w-full text-3xl text-gray-100 bg-[#313131] h-16"
              )}
              onClick={() => handleSelectNotes("E♭")}
              disabled={
                selectedNotes.includes("E") ||
                selectedNotes.includes("E♭")
              }
            >
              E♭
            </Button>
          )}
          {/* //! E */}
          <Button
            className={cn(
              selectedNotes.includes("E")
                ? "border border-yellow-400"
                : "hover:bg-yellow-400 hover:shadow",
              "w-full text-3xl text-gray-100 bg-[#313131] h-16"
            )}
            onClick={() => handleSelectNotes("E")}
            disabled={
              selectedNotes.includes("E") ||
              selectedNotes.includes("E♯") ||
              selectedNotes.includes("E♭")
            }
          >
            E
          </Button>
          {/* //! E# */}
          {armor === "♯" && (
            <Button
              className={cn(
                selectedNotes.includes("E♯")
                  ? "border border-yellow-300"
                  : "hover:bg-yellow-300 hover:shadow",
                "w-full text-3xl text-gray-100 bg-[#313131] h-16"
              )}
              onClick={() => handleSelectNotes("E♯")}
              disabled={
                selectedNotes.includes("E") ||
                selectedNotes.includes("E♯")
              }
            >
              E♯
            </Button>
          )}
          {/* //! F */}
          <Button
            className={cn(
              selectedNotes.includes("F")
                ? "border border-green-500"
                : "hover:bg-green-500 hover:shadow",
              "w-full text-3xl text-gray-100 bg-[#313131] h-16"
            )}
            onClick={() => handleSelectNotes("F")}
            disabled={
              selectedNotes.includes("F") || selectedNotes.includes("F♯")
            }
          >
            F
          </Button>
          {/* //! F# */}
          {armor === "♯" && (
            <Button
              className={cn(
                selectedNotes.includes("F♯")
                  ? "border border-green-400"
                  : "hover:bg-green-400 hover:shadow",
                "w-full text-3xl text-gray-100 bg-[#313131] h-16"
              )}
              onClick={() => handleSelectNotes("F♯")}
              disabled={
                selectedNotes.includes("F") ||
                selectedNotes.includes("F♯")
              }
            >
              F♯
            </Button>
          )}
          {/* //! Gb */}
          {armor === "♭" && (
            <Button
              className={cn(
                selectedNotes.includes("G♭")
                  ? "border border-blue-500"
                  : "hover:bg-blue-500 hover:shadow",
                "w-full text-3xl text-gray-100 bg-[#313131] h-16"
              )}
              onClick={() => handleSelectNotes("G♭")}
              disabled={
                selectedNotes.includes("G") ||
                selectedNotes.includes("G♭")
              }
            >
              G♭
            </Button>
          )}
        </div>
        <div className="grid grid-cols-4 gap-1.5">
          {/* //! G */}
          <Button
            className={cn(
              selectedNotes.includes("G")
                ? "border border-blue-400"
                : "hover:bg-blue-400 hover:shadow",
              "w-full text-3xl text-gray-100 bg-[#313131] h-16"
            )}
            onClick={() => handleSelectNotes("G")}
            disabled={
              selectedNotes.includes("G") ||
              selectedNotes.includes("G♯") ||
              selectedNotes.includes("G♭")
            }
          >
            G
          </Button>
          {/* //! G# */}
          {armor === "♯" && (
            <Button
              className={cn(
                selectedNotes.includes("G♯")
                  ? "border border-blue-300"
                  : "hover:bg-blue-300 hover:shadow",
                "w-full text-3xl text-gray-100 bg-[#313131] h-16"
              )}
              onClick={() => handleSelectNotes("G♯")}
              disabled={
                selectedNotes.includes("G") ||
                selectedNotes.includes("G♯")
              }
            >
              G♯
            </Button>
          )}
          {/* //! Ab */}
          {armor === "♭" && (
            <Button
              className={cn(
                selectedNotes.includes("A♭")
                  ? "border border-indigo-500"
                  : "hover:bg-indigo-500 hover:shadow",
                "w-full text-3xl text-gray-100 bg-[#313131] h-16"
              )}
              onClick={() => handleSelectNotes("A♭")}
              disabled={
                selectedNotes.includes("A") ||
                selectedNotes.includes("A♭")
              }
            >
              A♭
            </Button>
          )}
          {/* //! A */}
          <Button
            className={cn(
              selectedNotes.includes("A")
                ? "border border-indigo-400"
                : "hover:bg-indigo-400 hover:shadow",
              "w-full text-3xl text-gray-100 bg-[#313131] h-16"
            )}
            onClick={() => handleSelectNotes("A")}
            disabled={
              selectedNotes.includes("A") ||
              selectedNotes.includes("A♯") ||
              selectedNotes.includes("A♭")
            }
          >
            A
          </Button>
          {/* //! A# */}
          {armor === "♯" && (
            <Button
              className={cn(
                selectedNotes.includes("A♯")
                  ? "border border-indigo-300"
                  : "hover:bg-indigo-300 hover:shadow",
                "w-full text-3xl text-gray-100 bg-[#313131] h-16"
              )}
              onClick={() => handleSelectNotes("A♯")}
              disabled={
                selectedNotes.includes("A") ||
                selectedNotes.includes("A♯")
              }
            >
              A♯
            </Button>
          )}
          {/* //! Bb */}
          {armor === "♭" && (
            <Button
              className={cn(
                selectedNotes.includes("B♭")
                  ? "border border-violet-500"
                  : "hover:bg-violet-500 hover:shadow",
                " w-full text-3xl text-gray-100 bg-[#313131] h-16"
              )}
              onClick={() => handleSelectNotes("B♭")}
              disabled={
                selectedNotes.includes("B") ||
                selectedNotes.includes("B♭")
              }
            >
              B♭
            </Button>
          )}
        </div>
        <div className="grid grid-cols-4 gap-1.5">
          {/* //! B */}
          <Button
            className={cn(
              selectedNotes.includes("B")
                ? "border border-violet-400"
                : "hover:bg-violet-400 hover:shadow",
              "w-full text-3xl text-gray-100 bg-[#313131] h-16"
            )}
            onClick={() => handleSelectNotes("B")}
            disabled={
              selectedNotes.includes("B") ||
              selectedNotes.includes("B♯") ||
              selectedNotes.includes("B♭")
            }
          >
            B
          </Button>
          <Button
            className="text-gray-100 text-3xl w-full h-16 bg-[#313131]"
            // variant={armor == "♯" ? "gooeyLeft" : "gooeyRight"}
            onClick={() => handleArmor()}
          >
            {armor === "♯" ? "♭" : "♯"}
          </Button>
          <Button
            onClick={() => handleTonalityResult()}
            className="col-span-2 w-full h-16 text-lg bg-cyan-600 hover:bg-cyan-500 transition-colors"
          >
            Calculer
          </Button>
        </div>
      </div>
    </div>
  )
}

export default TonalityByMelody