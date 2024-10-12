import { compareNotes } from "@/src/functions/scales"
import { getScaleById } from "@/src/server/data/scales.query"
import { StarIcon } from "lucide-react"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"


interface ScalePageProps {
  params: {
    id: number;
  }
}

const ScalePage: React.FC<ScalePageProps> = async ({ params }) => {
  //*** DATA ***//
  const currentScale = await getScaleById(params.id)

  //*** FORMATTED DATA  ***//
  const formattedNotes = compareNotes(currentScale?.notes!)

  return (
    <div className="mt-7">
      {/* //! Breadcrumb ? */}
      <p className="text-sm text-foreground/60">Gammes &gt; {currentScale?.tonality} &gt; {currentScale?.name}</p>

      {/* Nom de gamme, mode, tonalité et ajout aux favoris */}
      <div className="flex justify-between items-center mt-8">
        {/* Left */}
        <div className="w-full items-start flex justify-start gap-2">
          {/* Tonalité */}
          <p className="text-7xl">{currentScale?.tonality}</p>

          <div className="flex flex-col items-start mt-2">
            {/* Nom */}
            <h2 className="font-semibold text-2xl lg:text-4xl capitalize">{currentScale?.name}</h2>
            {/* Mode */}
            <p>{currentScale?.mode}</p>
          </div>
        </div>

        {/* Right */}
        <span className="bg-[#2A2B34] h-10 w-10 rounded-md relative cursor-pointer" title="Ajouter aux favoris">
          <StarIcon className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]" />
        </span>
      </div>

      {/* Intervalles, famille, degrés... */}
      <div className="inline-flex space-x-5 mt-6">
        <span>
          <p className="font-medium text-foreground/70 text-xs">FAMILLE</p>
          <p className="text-sm font-medium">{currentScale?.family}</p>
        </span>

        <span>
          <p className="font-medium text-foreground/70 text-xs">DEGRES</p>
          <p className="text-sm font-medium">{currentScale?.degree}</p>
        </span>

        <span>
          <p className="font-medium text-foreground/70 text-xs">INTERVALLES</p>
          <p className="text-sm font-medium">{currentScale?.interval}</p>
        </span>

      </div>

      {/* //! Peux-être mettre les notes ? */}
      <div className="w-full border border-foreground/10 rounded-lg h-[200px] mt-10 bg-[#2A2B34] p-3">
        <p>Description de la gamme</p>
        <p>The Dorian Scale, or mode, is the second of the seven modes. The Dorian modes are comparable to the Major scales – D Dorian, for example, includes the same notes as C Major. The difference is that D Dorian starts from another degree in the scale, the D note (see picture below). It also has a different interval (1 2 b3 4 5 6 b7), which results in a Minor sound. What distinguish Dorian from the Minor scale is only the major 6th interval. It could be said that the Dorian sound is not a dark and "sad" sounding as that of the Aeolian mode.</p>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="notes" className="w-full mt-10">
        <TabsList>
          <TabsTrigger value="notes" className="relative">Notes
            <div className="absolute h-[3px] w-10 bg-blue-primary -bottom-3.5 rounded-t-md" />
          </TabsTrigger>
          <TabsTrigger value="diagrams">Diagrammes</TabsTrigger>
          <TabsTrigger value="chords">Accords</TabsTrigger>
          <TabsTrigger value="construction">Construction</TabsTrigger>
          <TabsTrigger value="songs">Musiques célèbres</TabsTrigger>
        </TabsList>
        <Separator className="mt-3 mb-5 bg-foreground/20" />
        <TabsContent value="notes" className="border rounded-lg h-[400px] p-3">Notes</TabsContent>
        <TabsContent value="diagrams" className="border rounded-lg h-[400px] p-3">Diagrammes</TabsContent>
        <TabsContent value="chords" className="border rounded-lg h-[400px] p-3">Accords</TabsContent>
        <TabsContent value="construction" className="border rounded-lg h-[400px] p-3">Construction</TabsContent>
      </Tabs>










      {/* //TODO: Element qui coulisse avec diagrammes affichés */}





    </div>
  )
}

export default ScalePage