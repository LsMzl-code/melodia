"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Form } from "@/components/ui/form"
import CustomFormField from "@/components/common/custom-field"
import { FormFieldsType } from "@/src/types"
import { NoteSchema } from "./note.schema"
import { HighNoteSoundsUrl, LowNoteSoundsUrl, NoteNames, NoteTypes } from "@/src/constants/notes"
import { useState } from "react"
import { useRouter } from "next/navigation"
import axios from "axios"
import { toast } from "@/hooks/use-toast"
import useSessionToken from "@/hooks/use-session-token"
import SubmitButton from "@/components/forms/submit-button"


const AddNoteForm = () => {
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
      name: "",
      type: "",
      soundUrl: "",
    },
  })

  //*** FORM SUBMIT ***//
  const onSubmit = async (data: z.infer<typeof NoteSchema>) => {
    setIsLoading(true)
    try {
      // Récupération du token de l'utilisateur
      const userToken = await useSessionToken()
      if (!userToken) return null

      // Appel de l'API NestJS
      await axios.post(`http://localhost:8000/notes/create`, data, {
        method: 'POST', headers: {
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
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="border border-foreground/10 p-5 rounded-xl space-y-5">
        <h2 className="text-2xl font-medium mb-5">Ajouter une note</h2>
        <div className="grid grid-cols-2 gap-5">
          <CustomFormField control={form.control} fieldType={FormFieldsType.SELECT} name="name" placeholder="Nom" data={formattedNames} />
          <CustomFormField control={form.control} fieldType={FormFieldsType.SELECT} name="type" placeholder="Type" data={formattedTypes} />
        </div>
        <div className="grid grid-cols-2 gap-5">
          <CustomFormField control={form.control} fieldType={FormFieldsType.SELECT} name="soundUrl" placeholder="Sons Aigüe" data={formattedHighSounds} />
          <CustomFormField control={form.control} fieldType={FormFieldsType.SELECT} name="soundUrl" placeholder="Sons Grave" data={formattedLowSounds} />
        </div>
        <SubmitButton label="Créer" disabled={isLoading} className="w-fit ml-auto block"/>
      </form>
    </Form>)
}

export default AddNoteForm