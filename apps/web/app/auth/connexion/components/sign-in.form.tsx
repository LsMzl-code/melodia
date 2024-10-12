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
import { SignInSchema } from "./sign-in.schema"
import { createSession } from "@/lib/session"
import { AtSignIcon } from "lucide-react"





const SignInForm = () => {
  //*** STATES ***//
  const [isLoading, setIsLoading] = useState(false)

  //*** FORM VALUES ***//
  const form = useForm<z.infer<typeof SignInSchema>>({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })




  //*** FORM SUBMIT ***//
  const onSubmit = async (data: z.infer<typeof SignInSchema>) => {
    setIsLoading(true)
    try {
      axios.post(`http://localhost:8000/auth/connexion`, data).then(async (res) => {
        // Creation de la session
        await createSession(res.data.userId, res.data.access_token, res.data.role)

        setIsLoading(false)
      }).catch(err => {
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
        description: 'Une erreur est survenue lors de la connexion',
        variant: 'destructive'
      })
    }
  }




  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col">
        <div className="space-y-4">
          {/* Email */}
          <CustomFormField required control={form.control} fieldType={FormFieldsType.INPUT} name="email" type="email" placeholder="Adresse mail" icon={<AtSignIcon className="h-5 w-5" />} />

          {/* Password */}
          <CustomFormField required control={form.control} fieldType={FormFieldsType.INPUT} name="password" type="password" placeholder="Mot de passe" />
        </div>

        <Button type="submit" className="w-full bg-gray-50 text-background hover:bg-foreground/50 transition-colors mt-6" disabled={isLoading}>Connexion</Button>
        <Link href={'/auth/mot-de-passe-oublie'} title="Réinitialiser le mot de passe" className="text-xs self-end mt-2 text-foreground/30 hover:text-blue-primary transition-colors duration-300">Mot de passe oublié</Link>
      </form>

      <span className="flex items-center justify-center gap-2 mt-5 text-sm">
        <p className="text-sm text-foreground/50">Vous n'avez pas de compte ?</p>
        <Link href="/auth/inscription" title="S'inscrire" className="text-foreground/50 hover:text-foreground transition-colors">S'inscrire</Link>
      </span>
    </Form>
  )

}

export default SignInForm