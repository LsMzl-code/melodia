
import IconButton from "@/components/common/icon-button"
import SquareBox from "@/components/common/square-box"

import TopNavMobile from "@/components/navigation/top-nav-mobile"
import { ChevronDown, PlayIcon } from "lucide-react"

interface ScalePageProps {
  params: {
    id: string
  }
}

const ScalePage = ({ params }: ScalePageProps) => {
  const { id } = params;
  return (
    <main className="px-2 mt-5">
      <p>{id}</p>
      <TopNavMobile />

      <div className="w-full items-center flex justify-start gap-2 mt-5">
        <span className="bg-yellow-400 rounded-full h-12 w-12 relative">
          <p className="absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] text-4xl">C</p>
        </span>
        <div className="flex flex-col items-start">
          <h2 className="font-semibold text-2xl leading-none">Mineur harmonique</h2>
          <p>Intervalles de la gamme</p>
        </div>
      </div>

      {/* Notes */}
      <div className='w-full rounded-md bg-[#313131] p-1.5 flex items-center justify-between mt-5'>
        <div className="flex items-center gap-2">
          <span className='h-9 w-9 bg-[#191919] rounded-md flex items-center justify-center cursor-pointer'><PlayIcon className='h-5 w-5' /></span>
          <p className="uppercase">Notes</p>
        </div>
        {/* //TODO: Element qui coulisse avec notes affichées */}
        {/* Expand Button */}
        <IconButton icon={<ChevronDown className="h-5 w-5" />} />
      </div>

      {/* //TODO: Element qui coulisse avec notes affichées */}
      <div className="grid grid-cols-3 gap-2 mt-2">
        <SquareBox note="A" />
        <SquareBox note="B" />
        <SquareBox note="C" />
        <SquareBox note="D" />
        <SquareBox note="E" />
        <SquareBox note="F" />
        <SquareBox note="G" />
      </div>

      {/* Diagrammes */}
      <div className='w-full rounded-md bg-[#313131] p-1.5 flex items-center justify-between mt-5'>
        <div className="flex items-center gap-2">
          <span className='h-9 w-9 bg-[#191919] rounded-md flex items-center justify-center cursor-pointer'><PlayIcon className='h-5 w-5' /></span>
          <p className="uppercase">Diagrammes</p>
        </div>
        {/* //TODO: Element qui coulisse avec notes affichées */}
        {/* Expand Button */}
        <IconButton icon={<ChevronDown className="h-5 w-5" />} />
      </div>


      {/* //TODO: Element qui coulisse avec diagrammes affichés */}





    </main>
  )
}

export default ScalePage