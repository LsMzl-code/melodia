'use client'

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TonalityNames } from "@/src/constants/notes"
import { sortBemolNotes, sortDieseNotes } from "@/src/functions/notes"
import { Chord } from "@/src/types/chords.type";
import { Button } from "../../../../components/ui/button";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Separator } from "../../../../components/ui/separator";
import { playNotes } from "@/src/functions/player";
import { Disc2Icon, PauseIcon, PlayIcon, RotateCcwIcon, SaveIcon, SquareIcon } from "lucide-react";
import { compareNotes } from "@/src/functions/scales";
import { Input } from "../../../../components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import SaveProgressionDialog from "./save-progression-dialog";


interface DragNDropProps {
  allChords: Chord[] | null
}

const DragNDrop: React.FC<DragNDropProps> = ({ allChords }) => {
  //*** STATES ***//
  const [tonality, setTonality] = useState<string>("C");
  const [alteration, setAlteration] = useState<string>("♯");
  // Player 
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  // Drag And Drop
  // TODO: Mettre en valeur par défaut la progression d'accords sauvegardée que l'utilisateur aura selectionné dans l'input select
  const [droppedChords, setDroppedChords] = useState<{ tonality: string; name: string; notes: { name: string; soundUrl: string; }[] }[]>([]);

  //*** DATAS ***//
  const bemolNotesArray = TonalityNames.filter(note => !note.name.includes("♯"));
  const dieseNotesArray = TonalityNames.filter(note => !note.name.includes("♭"));

  //*** SORTED DATA ***//
  const sortedBemolNotesArray = sortBemolNotes(bemolNotesArray);
  const sortedDieseNotesArray = sortDieseNotes(dieseNotesArray);

  //*** FILTERED DATA ***//
  // Filtrage des accords selon tonalité sélectionnée
  const chordsToDisplay = allChords?.filter(chord => chord.tonality === tonality);

  //*** ACTIONS ***//
  // Choix de la tonalité
  const handleTonality = (e: string) => {
    setTonality(e)
  };
  // Choix de l'altération (# ou b)
  const handleAlt = (e: string) => {
    setAlteration(e)
  };

  //***** LECTURE AUDIO DES NOTES *****//
  // Lecture des notes d'un accord
  const handlePlayChordNotes = (sounds: Array<string> | undefined) => {
    playNotes(sounds, 70);
  };
  // Lecture de la progression d'accords réalisée par l'utilisateur
  const handlePlayChordsProgression = () => {
    setIsPlaying(!isPlaying)
  };

  //*** DRAG AND DROP ***//
  // Mettre à jour le widgetType avec les data à transporter (en correspondance avec ce uqi a été défini dans le useState)
  const handleOnDrag = (e: React.DragEvent, widgetType: { tonality: string; name: string; notes: { name: string; soundUrl: string; }[] }) => {
    e.dataTransfer.setData("widgetType", JSON.stringify(widgetType))
  };

  //
  const handleOnDrop = (e: React.DragEvent) => {
    const widgetData = e.dataTransfer.getData("widgetType");
    const widgetType = JSON.parse(widgetData);
    setDroppedChords([...droppedChords, widgetType])
  };

  //
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  };


  //TODO Mettre en place systeme qui met d'une certaine couleur les accords appartenant à une certaines gammes, ce qui permettra à l'utilisateur de 
  //TODO savoir quels sont les accords appartenant à la gamme choisie

  //TODO Lorsque l'utilisateur a fini de choisir ces accords, afficher un message indiquant si cette progression correspond à une des progressions présente sur le site
  //TODO et si elle est utilisée dans des musiques connues


  return (
    <section className="mt-10">
      {/* Editeur */}
      <div className="flex items-center justify-between">
        {/* Tempo */}
        <div className="text-sm inline-flex items-end">
          <p>Tempo:</p>
          <Input type="number" defaultValue={120} className="px-1 h-6 w-14 ml-2" min={50} max={300} step={1} />
        </div>
        <div className="inline-flex gap-2">
          <div className="inline-flex gap-1">
            {/* Reset */}
            <Button size={'icon'} className="bg-[#2A2B34]" title="Réinitialiser"><RotateCcwIcon size={18}/></Button>
            
            {/* Sauvegarde de la progression */}
            <SaveProgressionDialog chords={droppedChords} />
          </div>
          {/* Progressions sauvegardées de l'utilisateur */}
          <Select>
            <SelectTrigger className="w-[160px] h-8 bg-[#2A2B34]">
              <SelectValue placeholder="Mes progressions" />
            </SelectTrigger>
            <SelectContent className="bg-background">
              <SelectItem value="light">Progression 1</SelectItem>
              <SelectItem value="dark">Progression 2</SelectItem>
              <SelectItem value="system">Progression 3</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Affichage des accords dropés */}
      <div className="grid grid-cols-4 border border-foreground/20 rounded-lg mt-2 overflow-hidden h-32 relative bg-[#2A2B34]"
        // Drag And Drop
        onDrop={handleOnDrop}
        onDragOver={handleDragOver}
      >
        {/* Icone */}
        <Disc2Icon className="absolute -right-28 h-64 w-56 text-foreground/60" />
        {droppedChords.map((chord, index) => (
          <div className="flex items-center justify-center border-r" key={index}>
            <p>{chord.tonality}{chord.name}</p>
            <p></p>
          </div>
        )
        )}
      </div>

      {/* Contrôles */}
      <div className="flex items-center mt-3 gap-2">
        {/* Bouton de lecture/pause */}
        <Button size={'icon'} className="bg-[#2A2B34] hover:bg-blue-primary" onClick={() => handlePlayChordsProgression()} title={isPlaying ? "Pause" : "Lecture"}>{isPlaying ? (<PauseIcon size={20} />) : (<PlayIcon size={20} />)}</Button>
        {/* Bouton de stop */}
        <Button size={'icon'} className="bg-[#2A2B34] hover:bg-red-primary" title="Stop" disabled={!isPlaying}><SquareIcon size={16} /></Button>
      </div>

      <Tabs defaultValue="C" className="w-full mt-10">
        <TabsList className="w-full justify-start gap-2">
          {/* Choix de l'altération # ou b */}
          <Button className="p-2 bg-[#2A2B34] rounded w-10 h-10 mr-0 text-center text-2xl" onClick={() => handleAlt(alteration == "♯" ? "♭" : "♯")} title="Changer de ...">
            {alteration == "♯" ? "♯" : "♭"}
          </Button>
          {/* Affichage des notes selon altération choisie */}
          {alteration == "♭" && (
            sortedDieseNotesArray.map(note => (
              <TabsTrigger value={note.name} key={note.name}
                className={cn(tonality == note.name ? "bg-blue-primary" : "bg-[#2A2B34]", "p-2 rounded w-10 h-10 mr-0")}
                onClick={() => handleTonality(note.name)}
              >
                {note.name}
              </TabsTrigger>
            ))
          )}
          {alteration == "♯" && (
            sortedBemolNotesArray.map(note => (
              <TabsTrigger value={note.name} key={note.name}
                className={cn(tonality == note.name ? "bg-blue-primary" : "bg-[#2A2B34]", "p-2 rounded w-10 h-10 mr-0")}
                onClick={() => handleTonality(note.name)}
              >
                {note.name}
              </TabsTrigger>
            ))
          )}
        </TabsList>

        <Separator className="my-5 bg-foreground/20" />

        {/* Contenu */}
        {TonalityNames.map(tonality => (
          // Affichage des accords de la tonalité sélectionnée
          <TabsContent value={tonality.name} key={tonality.id}>
            <div className="flex items-center gap-1">
              {chordsToDisplay?.map(chord => {
                // Récupération du soundUrl des notes de l'accord
                const chordNotes = compareNotes(chord.notes)
                return (
                  <div
                    key={chord.id}
                    className="bg-[#2A2B34] w-fit p-2 rounded-md hover:bg-blue-primary transition-colors duration-200"
                    onClick={() => handlePlayChordNotes(chordNotes.map(note => note.soundUrl))}
                    // Drag N Drop
                    draggable
                    onDragStart={(e) => handleOnDrag(e, { tonality: chord.tonality, name: chord.name, notes: chordNotes.map(note => ({ name: note.name, soundUrl: note.soundUrl })) })}
                  >
                    {chord.tonality} {chord.name}
                  </div>
                )
              }
              )}
            </div>
          </TabsContent>
        ))}
      </Tabs>


    </section>
  )
}

export default DragNDrop