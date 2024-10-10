import clsx from "clsx"
import { Button } from "../ui/button"

interface NoteButtonProps {
  note: string;
  onClick?: () => void;
  title?: string;
  className?: string;
}

/**
 * Bouton carré gris contenant une note.
 * - Hover: bg selon note
 * @param param0 
 * @returns 
 */
const NoteButton: React.FC<NoteButtonProps> = ({ note, onClick, title, className }) => {
  return (
    <Button className={clsx('bg-[#313131] h-8 w-8 p-0 transition-colors', className, {
      'hover:bg-red-500': note.includes('C'),
      'hover:bg-green-500': note.includes('D'),
      'hover:bg-blue-500': note.includes('E'),
      'hover:bg-yellow-500': note.includes('F'),
      'hover:bg-purple-500': note.includes('G'),
      'hover:bg-pink-500': note.includes('A'),
      'hover:bg-orange-500': note.includes('B'),
    })} onClick={onClick} title={title}>{note}</Button>
  )
}

export default NoteButton