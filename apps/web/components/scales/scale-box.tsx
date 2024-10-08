'use client'
import React, { useState } from 'react'
import { ChevronDown, ChevronUp, Eye, PlayIcon } from 'lucide-react'
import IconButton from '../common/icon-button'
import { playNote, playNotes } from '@/src/functions/player';
import { Button } from '../ui/button';
import NoteButton from '../notes/note-button';
import { cn } from '@/lib/utils';


interface ScaleBoxProps {
  name: string;
  family: string;
  note: string;
  // notes: {name: string; soundUrl: string;}[]
}

const ScaleBox: React.FC<ScaleBoxProps> = ({ name, family, note }) => {
  //*** STATES ***//
  const [isOpen, setIsOpen] = useState(false);

  //***** LECTURE AUDIO DES NOTES *****//
  // Lecture des gammes ( toutes les notes)
  const handlePlayTonalityNotes = (sounds: Array<string> | undefined) => {
    playNotes(sounds);
  };

  // Lecture audio d'une note
  const handlePlayNote = (soundUrl: string) => {
    playNote(note);
  };

  return (
    <div className='flex flex-col gap-1'>
      <div className='w-full rounded-md bg-[#2A2B34] py-1.5 pr-1.5 flex items-center justify-start'>

        <div className='h-10 w-12 flex items-center justify-center ml-1.5'>
          <p className={cn('text-2xl font-semibold uppercase', isOpen && 'mb-[45px]')}>{note}</p>
        </div>
        {/* </div> */}
        <div className='rounded-md bg-background p-1.5 flex flex-col gap-2 w-full'>
          {/* top */}
          <div className='flex items-center justify-between gap-2'>
            {/* Left */}
            <div className='flex items-center gap-2'>
              {/* //TODO: Lecture des notes */}
              {/* Play button */}
              <Button
                // onClick={() => handlePlayTonalityNotes()} 
                className='bg-[#191919] h-9 w-9 p-0'
              >
                <PlayIcon className='h-5 w-5' />
              </Button>
              {/* Name */}
              <div className='flex flex-col items-start'>
                <p className='font-medium text-xs'>{name}</p>
                <p className='text-xs'>{family}</p>
              </div>
            </div>

            {/* Right */}
            <div className='flex items-center gap-1'>
              {/* //TODO: Element qui coulisse avec notes affichées */}
              {/* Expand Button */}
              <IconButton icon={isOpen ? (<ChevronUp className="h-5 w-5" />) : (<ChevronDown className="h-5 w-5" />)} onClick={() => setIsOpen(!isOpen)} title='Afficher les notes' />
              {/* Scale page */}
              <IconButton icon={<Eye className="h-5 w-5" />} href={`/gammes/${note}`} title='Voir les gammes' className='hover:bg-cyan-500' />
            </div>
          </div>
          {/* Bottom */}
          {/* Notes */}
          {isOpen && (
            //! Map sur les notes de la gamme
            <div className="w-full flex items-center justify-start gap-1">
              <NoteButton note='C' onClick={() => handlePlayNote('C')} />
              <NoteButton note='D' onClick={() => handlePlayNote('D')} />
              <NoteButton note='E' onClick={() => handlePlayNote('E')} />
              <NoteButton note='F' onClick={() => handlePlayNote('F')} />
              <NoteButton note='G' onClick={() => handlePlayNote('G')} />
              <NoteButton note='A' onClick={() => handlePlayNote('A')} />
              <NoteButton note='B' onClick={() => handlePlayNote('B')} />
            </div>
          )}

        </div>
      </div>
    </div>
  )
}

export default ScaleBox