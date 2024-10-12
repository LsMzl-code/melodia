import Heading from '@/components/common/heading'
import IconButton from '@/components/common/icon-button'
import NoteFilter from '@/components/notes/note-filter'
import ScaleFilter from '@/components/scales/scale-filter'
import { Metadata } from 'next'
import React from 'react'
import { getAllScales } from '@/src/server/data/scales.query'
import { getAllScaleFamilies } from '@/src/server/data/families.query'
import ScaleList from './components/scale-list'

//***  METADATA ***//
export const metadata: Metadata = {
  title: "Les gammes",
  description: ``,
};

const ScalesPage = async () => {
  //*** DATAS ***//
  const allScales = await getAllScales()
  const allScaleFamilies = await getAllScaleFamilies()
  if (!allScales || !allScaleFamilies) return <div>Erreur lors de la récupération des gammes</div>

  //TODO: Voir pour mettre une pagination
  return (
    <main className="mt-5 container">

      {/* <TopNavMobile /> */}

      <div className="w-full items-center flex justify-between mt-5">
        {/* Heading */}
        <Heading title="Les gammes" description="Parcourir et rechercher des gammes" />

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
        <ScaleFilter scaleFamilies={allScaleFamilies} />
      </div>

      {/* Results */}

      <ScaleList allScales={allScales} />

    </main>
  )
}

export default ScalesPage