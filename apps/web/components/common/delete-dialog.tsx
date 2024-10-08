import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog"
import { Trash2Icon } from "lucide-react"
import { Button } from "../ui/button"

interface DeleteDialogProps {
  element: string
  action: () => void
}

const DeleteDialog: React.FC<DeleteDialogProps> = ({ element, action }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" title={` Supprimer ${element}`} className="flex items-center px-2 h-8 font-normal">
          <Trash2Icon className="mr-2 h-4 w-4" />
          Supprimer
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Etes-vous sûr de vouloir supprimer {element} ?</DialogTitle>
          <DialogDescription>
            Cette action est irréversible. Les données seront définitivement supprimées et ne pourront pas être récupérées.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button className="bg-red-primary text-white hover:bg-red-primary/80">Annuler</Button>
          </DialogClose>
          <Button onClick={action} className="bg-blue-primary text-white hover:bg-blue-primary/80">Confirmer</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default DeleteDialog