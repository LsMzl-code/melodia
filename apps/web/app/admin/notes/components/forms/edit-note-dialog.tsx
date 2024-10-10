'use client'

import IconButton from "@/components/common/icon-button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import { EditIcon } from "lucide-react"

import CustomFormField from "@/components/common/custom-field"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"

import { FormFieldsType } from "@/src/types"
//*** FORM ***//
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"

import axios from "axios";
import { toast } from "@/hooks/use-toast"


import SubmitButton from "@/components/forms/submit-button"
import InstrumentMultiSelect from "@/components/instrument-multi-select"
import { Separator } from "@/components/ui/separator"
import { NoteSchema } from "./note.schema"
import { Note } from "@/src/types/notes"
import { HighNoteSoundsUrl, LowNoteSoundsUrl, NoteNames, NoteTypes } from "@/src/constants/notes"
import { useRouter } from "next/navigation"
import useSessionToken from "@/hooks/use-session-token"

interface EditNoteDialogProps {
  note: Note
}

const EditNoteDialog: React.FC<EditNoteDialogProps> = ({ note }) => {
  //*** STATES ***//
  const [isLoading, setIsLoading] = useState(false)

  //*** HOOKS ***//
  const router = useRouter()

  //*** DATA ***//
  const formattedTypes = NoteTypes.map((item) => ({ id: item.value, name: item.label }))
  const formattedNames = NoteNames.map((item) => ({ id: item.name, name: item.label }))
  const formattedHighSounds = HighNoteSoundsUrl.map((item) => ({ id: item.url, name: item.name, value: item.url }))
  const formattedLowSounds = LowNoteSoundsUrl.map((item) => ({ id: item.url, name: item.name, value: item.url }))

  //*** FORM VALUES ***//
  const form = useForm<z.infer<typeof NoteSchema>>({
    resolver: zodResolver(NoteSchema),
    defaultValues: {
      name: note?.name,
      type: note?.type,
      soundUrl: note?.soundUrl,
    },
  })

  //*** RECUPERATION DES VALEURS PAR DEFAUT ***//
  const defaultValues = form.formState.defaultValues

  //*** FORM SUBMIT ***//
  const onSubmit = async (data: z.infer<typeof NoteSchema>) => {
    setIsLoading(true)
    // Vérification que les données ont été modifiées
    if (defaultValues?.soundUrl === data.soundUrl
      && defaultValues?.name === data.name
      && defaultValues?.type === data.type
    ) {
      toast({
        title: 'Erreur',
        description: `Aucune modification n'a été effectuée`,
        variant: 'destructive'
      })
      setIsLoading(false)
      return
    }

    try {
      // Récupération du token de l'utilisateur
      const userToken = await useSessionToken()
      if (!userToken) return null

      // Appel de l'API NestJS
      await axios.put(`http://localhost:8000/notes/update/${note.id}`, data, {
        method: 'PUT', headers: {
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

  }




  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" className="flex items-center px-2 h-8 font-normal" title="Modifier cette note">
          <EditIcon className="mr-2 h-4 w-4" />
          Modifier
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edition d'une note</DialogTitle>
          <DialogDescription>
            Validez vos modifications une fois terminé.
          </DialogDescription>
        </DialogHeader>
        <Separator className="h-[0.5px] bg-foreground/10" />

        {/* Formulaire */}

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-5">
              <CustomFormField control={form.control} fieldType={FormFieldsType.SELECT} name="name" placeholder="Nom de la note" label="Nom" data={formattedNames} />
              <CustomFormField control={form.control} fieldType={FormFieldsType.SELECT} name="type" placeholder="Type de la note" label="Type" data={formattedTypes} />
            </div>

            <div className="grid grid-cols-2 gap-5">
              <CustomFormField control={form.control} fieldType={FormFieldsType.SELECT} name="soundUrl" placeholder="Sons Aigüe" data={formattedHighSounds} />
              <CustomFormField control={form.control} fieldType={FormFieldsType.SELECT} name="soundUrl" placeholder="Sons Grave" data={formattedLowSounds} />
            </div>

            <div className="mt-5 space-x-2 ml-auto">
              <DialogClose asChild>
                <Button className="bg-red-primary hover:bg-red-primary/80 transition-colors">Annuler</Button>
              </DialogClose>
              <SubmitButton label="Valider" disabled={isLoading} className="w-fit" />
            </div>

          </form>
        </Form>
      </DialogContent>
    </Dialog>

  )
}

export default EditNoteDialog