'use client'
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Edit, MoreHorizontal } from "lucide-react"

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import { useState, useTransition } from "react"
import { NotesColumns } from "./Columns"
import DeleteDialog from "@/components/common/delete-dialog"
import { Separator } from "@/components/ui/separator"
import EditNoteDialog from "../forms/edit-note-dialog"
import { toast } from "@/hooks/use-toast"
import useSessionToken from "@/hooks/use-session-token"
import axios from "axios"

// import errorMessages from "@/src/errors/ErrorMessages.json";

// import { toast } from "@/src/hooks/use-toast"
// import axios from "axios"


interface CellActionProps {
  data: NotesColumns
}

/**
 * Actions dans les data tables.
 * Edit, delete...
 * @returns 
 */
export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  //*** STATES ***//
  const [isLoading, setIsLoading] = useState<boolean>(false);

  //*** HOOKS ***//
  const router = useRouter();


  //*** ACTIONS ***//
  const handleDeleteNote = async (noteId: number) => {
    try {
      // Récupération du token de l'utilisateur
      const userToken = await useSessionToken()
      if (!userToken) return null

      // Appel de l'API NestJS
      await axios.delete(`http://localhost:8000/notes/delete/${noteId}`, {
        method: 'DELETE', headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${userToken}`
        },
      }).then((res) => {
        setIsLoading(false)
        toast({
          title: 'Succès',
          description: `${res.data.message}`,
        })
        router.refresh();
      }).catch(err => {
        setIsLoading(false)
        toast({
          title: 'Erreur',
          description: `${err.response.data.message}`,
          variant: 'destructive'
        })
      });
    } catch (err) {
      setIsLoading(false)
      toast({
        title: 'Erreur',
        description: 'Une erreur est survenue lors de la création de la note',
        variant: 'destructive'
      })
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0" title="Menu de modifications">
          <span className="sr-only">Ouvrir</span>
          <MoreHorizontal className="h-4 w-4 mx-auto" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0 w-[150px] bg-background text-gray-50 border-foreground/10">
        <div className="text-sm font-medium p-2">Modifications</div>
        <Separator className="bg-foreground/10" />

        <div className="flex flex-col text-sm p-1">
          <EditNoteDialog note={data} />

          <DeleteDialog
            element="cette note"
            action={() => handleDeleteNote(data.id)}
          />

        </div>
      </PopoverContent>
    </Popover>
  )
}