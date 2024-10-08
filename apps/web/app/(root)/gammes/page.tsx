import Heading from '@/components/common/heading'
import IconButton from '@/components/common/icon-button'
import ScaleBox from '@/components/scales/scale-box'
import TopNavMobile from '@/components/navigation/top-nav-mobile'
import NoteFilter from '@/components/notes/note-filter'
import ScaleFilter from '@/components/scales/scale-filter'
import { Metadata } from 'next'
import React from 'react'

//***  METADATA ***//
export const metadata: Metadata = {
  title: "Les gammes",
  description: ``,
};

const ScalesPage = () => {
  //TODO: Voir pour mettre une pagination
  return (
    <main className="mt-5 container">

      <TopNavMobile />

      <div className="w-full items-center flex justify-between mt-5">
        {/* Heading */}
        <Heading title="Les gammes" description="Parcourir et rechercher des gammes" />

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
        <ScaleFilter />
      </div>

      {/* Results */}
      <div className='mt-5 md:mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2'>
        <ScaleBox name="Majeur" family='Classique' note='C' />
        <ScaleBox name="Majeur Harmonique" family='Harmonique' note='F#' />
        <ScaleBox name="Mixolydien" family='Classique' note='A' />
        <ScaleBox name="Mineur Mélodique" family='Mélodique' note='B' />
        <ScaleBox name="Majeur Pentatonique" family='Pentatonique' note='G' />
        <ScaleBox name="Andalouse" family='Exotique' note='E♭' />
      </div>

    </main>
  )
}

export default ScalesPage