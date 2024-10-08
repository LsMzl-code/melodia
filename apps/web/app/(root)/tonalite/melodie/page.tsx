import ChordBox from '@/components/chords/chord-box';
import Heading from '@/components/common/heading'
import IconButton from '@/components/common/icon-button'
import TopNavMobile from '@/components/navigation/top-nav-mobile'
import TonalityByMelody from '@/components/tonality/tonality-by-melody'
import { Metadata } from 'next';

//***  METADATA ***//
export const metadata: Metadata = {
  title: "Tonalité d'une mélodie",
  description: ``,
};

const FindTonalityByMelody = () => {
  return (
    <main className="container mt-5">

      <TopNavMobile />

      <div className="w-full items-center flex justify-between mt-5">
        {/* Heading */}
        <Heading title="Tonality finder" description="Trouver la tonalité d'une mélodie" />

        <div className="flex items-center gap-2">
          <IconButton />
          <IconButton />
        </div>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
        <TonalityByMelody />

        {/* //TODO: Mettre sur la droite des chansons de cette tonalité */}
        <div className='mt-5'>
          <p>Musique connues en F#</p>
          <ChordBox name="min7b5" family='Classique' tonality='C' />
        </div>
      </div>


    </main>
  )
}

export default FindTonalityByMelody