'use client'

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

import { ForgotPasswordSchema } from "./forgot-passwod.schema"





const ForgotPasswordForm = () => {
  //*** STATES ***//
  const [isLoading, setIsLoading] = useState(false)

  //*** FORM VALUES ***//
  const form = useForm<z.infer<typeof ForgotPasswordSchema>>({
    resolver: zodResolver(ForgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  })

  //*** FORM SUBMIT ***//
  const onSubmit = async (data: z.infer<typeof ForgotPasswordSchema>) => {
    setIsLoading(true)
    try {
      axios.post(`http://localhost:8000/auth/mot-de-passe-oublie`, data).then(async (res) => {
        setIsLoading(false)
        toast({
          title: 'Succès  ',
          description: `Un email de réinitialisation a été envoyé à ${data.email}`,
        })
        form.reset()
      })
        .catch(err => {
          setIsLoading(false)

          toast({
            title: 'Erreur',
            description: `${err.response.data.message}`,
            variant: 'destructive'
          })
        })
    } catch (error) {
      setIsLoading(false)
      toast({
        title: 'Erreur',
        description: 'Une erreur est survenue lors de l\'inscription',
        variant: 'destructive'
      })
    }
  }


  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col">
        <CustomFormField control={form.control} fieldType={FormFieldsType.INPUT} name="email" placeholder="Adresse mail" />
        <Button type="submit" className="w-full bg-gray-50 text-background hover:bg-foreground/50 transition-colors mt-8" disabled={isLoading}>Réinitialiser</Button>
      </form>
    </Form>
  )


}

export default ForgotPasswordForm