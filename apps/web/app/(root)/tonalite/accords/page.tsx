import IconButton from '@/components/common/icon-button'
import MobileNav from '@/components/navigation/mobile-nav'
import { ChevronLeft } from 'lucide-react'
import React from 'react'

const FindTonalityByChords = () => {
  return (
    <main className="px-2 mt-5">
      <div className="flex items-center justify-between">
        <IconButton icon={<ChevronLeft className="h-5 w-5" />} />
        <MobileNav />
      </div>
      <div className="w-full items-center flex justify-between mt-5">
        {/* Heading */}
        <div>
          <h2 className="font-bold text-2xl">Tonality finder</h2>
          <p className='text-sm'>Trouver la tonalité d'une suite d'accords</p>
        </div>
        <div className="flex items-center gap-2">
          <IconButton />
          <IconButton />
        </div>

      </div>

      {/* Results */}
      <div className='grid grid-cols-2 gap-5 mt-5'>
        <div className='rounded-xl bg-[#313131] hover:bg-[#383C43] flex items-center justify-center p-2'>
          <p>Tonalité</p>
        </div>
        <div className='rounded-xl bg-[#313131] hover:bg-[#383C43] flex items-center justify-center p-2'>
          <p>Relatif</p>
        </div>
      </div>

    </main>
  )
}

export default FindTonalityByChords