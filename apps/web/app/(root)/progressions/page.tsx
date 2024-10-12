import Heading from "@/components/common/heading"
import DragNDrop from "@/app/(root)/progressions/components/drag-and-drop"
import { getAllChords } from "@/src/server/data/chords.query"
import { Metadata } from "next";

//***  METADATA ***//
export const metadata: Metadata = {
  title: "Progressions d'accords",
  description: ``,
};


const ProgressionsPage = async () => {
  //*** DATAS ***//
  const allChords = await getAllChords()

  return (
    <div className="mt-5">
      <div className="w-full items-center flex justify-between mt-5">
        {/* Heading */}
        <Heading title="Progressions d'accords" description="Créez vos propres progressions d'accords" />
      </div>

      <DragNDrop allChords={allChords} />
    </div>
  )
}

export default ProgressionsPage