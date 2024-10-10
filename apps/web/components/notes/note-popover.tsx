'use client'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from "../ui/button";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import clsx from "clsx";
import { cn } from "@/lib/utils";



interface NotePopoverProps {
  noteTrigger: string;
  notes: string[];
  align?: "start" | "end" | "center";
  title?: string
}

const NotePopover: React.FC<NotePopoverProps> = ({ noteTrigger, notes, align = "start", title}) => {

  //***** URL PARAMS *****//
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const searchTonality = searchParams.get("tonality");

  // Choix de la tonalité
  const handleTonality = (tonality: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("tonality", tonality);
    replace(`${pathname}?${params.toString()}`);
  };

  // Suppression de la tonalité
  const handleRemoveTonality = () => {
    const params = new URLSearchParams(searchParams);
    params.delete("tonality");
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className={clsx('bg-[#313131] rounded-lg h-10 w-10', {
          'hover:bg-red-500': noteTrigger.includes('C'),
          'hover:bg-green-500': noteTrigger.includes('D'),
          'hover:bg-blue-500': noteTrigger.includes('E'),
          'hover:bg-yellow-500': noteTrigger.includes('F'),
          'hover:bg-purple-500': noteTrigger.includes('G'),
          'hover:bg-pink-500': noteTrigger.includes('A'),
          'hover:bg-orange-500': noteTrigger.includes('B'),
          'bg-blue-primary': searchTonality?.includes(noteTrigger)
        })} title={title}>{noteTrigger}</Button>
      </PopoverTrigger>
      <PopoverContent className="bg-background rounded-lg w-fit space-x-2 p-2 border-foreground/10" align={align}>{notes.map(note => (
        <Button
          key={note}
          className={cn(searchTonality == note ? "bg-blue-primary": "bg-[#313131]",'rounded-lg  h-10 w-10')}
          title={note}
          onClick={searchTonality === note
            ? () => handleRemoveTonality()
            : () => handleTonality(note)}
        >
          {note}
        </Button>
      ))}
      </PopoverContent>
    </Popover>
  )
}

export default NotePopover