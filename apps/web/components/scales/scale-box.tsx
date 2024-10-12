'use client'
import React, { useState } from 'react'
import { ChevronDown, ChevronUp, Eye, PlayIcon } from 'lucide-react'
import IconButton from '../common/icon-button'
import { playNote, playNotes } from '@/src/functions/player';
import { Button } from '../ui/button';
import NoteButton from '../notes/note-button';
import { cn } from '@/lib/utils';
import { NoteNames } from '@/src/constants/notes';
import { compareNotes } from '@/src/functions/scales';


interface ScaleBoxProps {
  id: number;
  name: string;
  family: string;
  tonality: string;
  notes: string;
}

const ScaleBox: React.FC<ScaleBoxProps> = ({ name, family, tonality, notes, id }) => {

  //*** STATES ***//
  const [isOpen, setIsOpen] = useState(false);

  //***** LECTURE AUDIO DES NOTES *****//
  const handlePlayTonalityNotes = (sounds: Array<string> | undefined) => {
    playNotes(sounds, 400);
  };

  // Lecture audio d'une note
  const handlePlayNote = (soundUrl: string) => {
    playNote(soundUrl);
  };

  //*** RECUPERATION DES NOTES ***//
  const formattedNotes = compareNotes(notes)


  return (
    <div className='flex flex-col gap-1'>
      <div className='w-full rounded-md bg-[#2A2B34] py-1.5 pr-1.5 flex items-center justify-start'>

        <div className='h-10 w-12 flex items-center justify-center ml-1.5'>
          <p className={cn('text-2xl font-semibold uppercase', isOpen && 'mb-[45px]')}>{tonality}</p>
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
                onClick={() => handlePlayTonalityNotes(formattedNotes.map(note => note.soundUrl))}
                className='bg-[#191919] h-9 w-9 p-0 hover:bg-indigo-600'
                title='Ecouter les notes de la gamme'
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
            <div className='flex items-center gap-1.5'>
              {/* //TODO: Element qui coulisse avec notes affichées */}
              {/* Expand Button */}
              <IconButton className='group h-9 w-9' icon={isOpen ? (<ChevronUp className="h-5 w-5 group-hover:animate-bounce" />) : (<ChevronDown className="h-5 w-5 group-hover:animate-bounce" />)} onClick={() => setIsOpen(!isOpen)} title='Afficher les notes' />

              {/* Scale page */}
              <IconButton icon={<Eye className="h-5 w-5" />} href={`/gammes/${String(id)}`} title='Page de détails de la gamme' className='hover:bg-blue-primary h-9 w-9' />
            </div>
          </div>
          {/* Bottom */}
          {/* Notes */}
          {isOpen && (
            //! Map sur les notes de la gamme
            <div className="w-full flex items-center justify-start gap-1">
              {formattedNotes.map(note => (
                <NoteButton note={note.name} onClick={() => handlePlayNote(note.soundUrl)} key={note.name} title='Ecouter la note' />
              ))}
            </div>
          )}

        </div>
      </div>
    </div>
  )
}

export default ScaleBox