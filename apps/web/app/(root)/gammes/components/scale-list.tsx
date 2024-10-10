'use client'

import ScaleBox from "@/components/scales/scale-box"
import { Scale } from "@/src/types/scales.type"
import { useSearchParams } from "next/navigation";



interface ScaleListProps {
  allScales: Scale[]
}

const ScaleList: React.FC<ScaleListProps> = ({ allScales }) => {

  //***** URL PARAMS *****//
  const searchParams = useSearchParams();
  const searchMode = searchParams.get("mode");
  const searchFamily = searchParams.get("family");
  const searchTonality = searchParams.get("tonality");


  //*** FILTER DATAS ***//
  const filteredData = allScales.filter(item => {
    // Vérification de chaque paramètre et filtration si besoin
    const matchesFamily = searchFamily ? item.family === searchFamily : true;
    const matchesMode = searchMode ? item.mode === searchMode : true;
    const matchesTonality = searchTonality ? item.tonality === searchTonality : true;

    return matchesFamily && matchesMode && matchesTonality;
  });


  return (
    <section className='mt-5 md:mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2'>
      {filteredData.map(scale => (
        <ScaleBox name={scale.name} family={scale.family} tonality={scale.tonality} key={scale.id} notes={scale.notes} />
      ))}
    </section>
  )
}

export default ScaleList