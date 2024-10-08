import ChordBox from '@/components/chords/chord-box';
import ChordFilter from '@/components/chords/chord-filter';
import Heading from '@/components/common/heading';
import IconButton from '@/components/common/icon-button';
import TopNavMobile from '@/components/navigation/top-nav-mobile';
import NoteFilter from '@/components/notes/note-filter';

import { Metadata } from 'next';
import React from 'react'


//***  METADATA ***//
export const metadata: Metadata = {
  title: "Les accords",
  description: ``,
};

const ChordsPage = () => {
  //TODO: Voir pour mettre une pagination
  return (
    <main className="mt-5 container">

      <TopNavMobile />

      <div className="w-full items-center flex justify-between mt-5">
        {/* Heading */}
        <Heading title="Les accords" description="Parcourir et rechercher des accords" />

        <div className="flex items-center gap-2">
          <IconButton />
          <IconButton />
        </div>
      </div>

      {/* Filters */}
      <div className='mt-5 grid grid-cols-1 md:grid-cols-2 max-md:gap-2'>
        {/* Notes */}
        <NoteFilter />

        {/* Scales */}
        <ChordFilter />
      </div>

      {/* Results */}
      <div className='mt-5 md:mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2'>
        <ChordBox name="min7b5" family='Classique' tonality='C' />
        <ChordBox name="sus4" family='Harmonique' tonality='F#' />
        <ChordBox name="majeur" family='Classique' tonality='A' />
        <ChordBox name="dim7" family='Mélodique' tonality='B' />
        <ChordBox name="Majeur Pentatonique" family='Pentatonique' tonality='G' />
        <ChordBox name="Andalouse" family='Exotique' tonality='E♭' />
      </div>

    </main>
  )
}

export default ChordsPage