'use client'

import CustomFormField from "@/components/common/custom-field"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"

import { FormFieldsType } from "@/src/types"
//*** FORM ***//
import { zodResolver } from "@hookform/resolvers/zod"
import Link from "next/link"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"

import axios from "axios";
import { toast } from "@/hooks/use-toast"

import { createSession } from "@/lib/session"
import { SignUpSchema } from "./sign-up.schema"




const SignUpForm = () => {
  //*** STATES ***//
  const [isLoading, setIsLoading] = useState(false)

  //*** FORM VALUES ***//
  const form = useForm<z.infer<typeof SignUpSchema>>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      email: "",
      password: "",
      username: "",
    },
  })

  //*** FORM SUBMIT ***//
  const onSubmit = async (data: z.infer<typeof SignUpSchema>) => {
    setIsLoading(true)
    try {
      axios.post(`http://localhost:8000/auth/inscription`, data).then(async (res) => {
        // Creation de la session
        await createSession(res.data.userId, res.data.access_token, res.data.role)
        setIsLoading(false)
        toast({
          title: 'Succès',
          description: `Un email de confirmation a été envoyé à ${data.email}`,
          variant: 'default'
        })

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
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5">
        <CustomFormField control={form.control} fieldType={FormFieldsType.INPUT} name="username" placeholder="Nom d'utilisateur" />
        <CustomFormField control={form.control} fieldType={FormFieldsType.INPUT} name="email" placeholder="Adresse mail" />
        <CustomFormField control={form.control} fieldType={FormFieldsType.INPUT} name="password" placeholder="Mot de passe" />
        <Button type="submit" className="w-full bg-gray-50 text-background hover:bg-foreground/50 transition-colors mt-8" disabled={isLoading}>Inscription</Button>
      </form>

      <span className="flex items-center justify-center gap-2 mt-5 text-sm">
        <p className="text-sm text-foreground/50">Vous avez déjà un compte ?</p>
        <Link href="/auth/connexion" title="Se connecter" className="text-foreground/50 hover:text-foreground transition-colors">Se connecter</Link>
      </span>
    </Form>
  )

}

export default SignUpForm