import ChordBox from '@/components/chords/chord-box';
import ChordFilter from '@/components/chords/chord-filter';
import Heading from '@/components/common/heading';
import IconButton from '@/components/common/icon-button';
import TopNavMobile from '@/components/navigation/top-nav-mobile';
import NoteFilter from '@/components/notes/note-filter';
import { getAllChords } from '@/src/server/data/chords.query';
import { getAllChordFamilies } from '@/src/server/data/families.query';

import { Metadata } from 'next';
import React from 'react'
import ChordList from './components/chord-list';


//***  METADATA ***//
export const metadata: Metadata = {
  title: "Les accords",
  description: ``,
};

const ChordsPage = async () => {
  //*** DATAS ***//
  const allChords = await getAllChords()
  const allChordFamilies = await getAllChordFamilies()
  if (!allChords || !allChordFamilies) return <div>Erreur lors de la récupération des accords</div>
  //TODO: Voir pour mettre une pagination
  return (
    <main className="mt-5 container">

      {/* <TopNavMobile /> */}

      <div className="w-full items-center flex justify-between mt-5">
        {/* Heading */}
        <Heading title="Les accords" description="Parcourir et rechercher des accords" />

        <div className="flex items-center gap-2">
          <IconButton title='A trouver' />
          <IconButton title='A trouver' />
        </div>
      </div>

      {/* Filters */}
      <div className='mt-5 grid grid-cols-1 md:grid-cols-2 max-md:gap-2'>
        {/* Notes */}
        <NoteFilter />

        {/* Scales */}
        <ChordFilter  chordFamilies={allChordFamilies}/>
      </div>

      {/* Results */}
      
      <ChordList allChords={allChords}/>

    </main>
  )
}

export default ChordsPage