"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Form } from "@/components/ui/form"
import CustomFormField from "@/components/common/custom-field"
import { Button } from "@/components/ui/button"
import { FormFieldsType } from "@/src/types"
import { useState } from "react"
import { useRouter } from "next/navigation"
import useSessionToken from "@/hooks/use-session-token"
import axios from "axios"
import { toast } from "@/hooks/use-toast"
import { FamilySchema } from "./family.schema"



const AddChordFamilyForm = () => {
  //*** STATES ***//
  const [isLoading, setIsLoading] = useState(false)

  //*** HOOKS ***//
  const router = useRouter()




  //*** FORM VALUES ***//
  const form = useForm<z.infer<typeof FamilySchema>>({
    resolver: zodResolver(FamilySchema),
    defaultValues: {
      name: "",
    },
  })

  //*** FORM SUBMIT ***//
  const onSubmit = async (data: z.infer<typeof FamilySchema>) => {
    setIsLoading(true)
    try {
      // Récupération du token de l'utilisateur
      const userToken = await useSessionToken()
      if (!userToken) return null

      // Appel de l'API NestJS
      await axios.post(`http://localhost:8000/chord-families/create`, data, {
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
        description: 'Une erreur est survenue lors de la création de la famille',
        variant: 'destructive'
      })
    }
  }


  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="border border-foreground/10 p-5 rounded-xl space-y-5">
        <h2 className="text-2xl font-medium mb-5">Ajouter une famille d'accords</h2>
        <CustomFormField control={form.control} fieldType={FormFieldsType.INPUT} name="name" placeholder="Nom" />
        <Button type="submit" className="ml-auto block bg-blue-primary text-white">Créer</Button>
      </form>
    </Form>)
}

export default AddChordFamilyForm