import IconButton from "@/components/common/icon-button"


import ScaleBox from "@/components/common/scale-box"
import SquareBox from "@/components/common/square-box"
import { ChevronLeft } from "lucide-react"


const DesignPage = () => {
  return (
    <main className="px-2 mt-5">
      <IconButton icon={<ChevronLeft className="h-5 w-5" />}/>
      <div className="w-full items-center flex justify-between mt-2">
        <h2 className="font-bold text-2xl">Design system</h2>
        <div className="flex items-center gap-2">
          <IconButton />
          <IconButton />
        </div>

      </div>

      {/* Notes */}
      <div className="w-full grid grid-cols-3 gap-2 mt-5">
        <SquareBox note="A" />
        <SquareBox note="B" />
        <SquareBox note="C" />
        <SquareBox note="D" />
        <SquareBox note="E" />
        <SquareBox note="F" />
      </div>

      {/* Scales */}
      <div className="flex flex-col mt-5 gap-2">
          {/* <ScaleBox name="Majeur Harmonique" />
          <ScaleBox name="Majeur Harmonique" /> */}
      </div>


    </main>
  )
}

export default DesignPage