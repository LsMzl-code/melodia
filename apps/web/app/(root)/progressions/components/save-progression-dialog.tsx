import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { SaveIcon } from "lucide-react"

interface SaveProgressionDialogProps {
  chords: { tonality: string; name: string; notes: { name: string; soundUrl: string; }[] }[]
}

const SaveProgressionDialog: React.FC<SaveProgressionDialogProps> = ({ chords }) => {
  //TODO: Créer petit formulaire avec définition du nom de la progression

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size={'icon'} disabled={chords.length == 0} className="bg-[#2A2B34] hover:bg-blue-primary" title="Sauvegarder la progression"><SaveIcon size={20} /></Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your account
            and remove your data from our servers.
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

export default SaveProgressionDialog