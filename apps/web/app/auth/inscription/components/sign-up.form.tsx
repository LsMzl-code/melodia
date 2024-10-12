'use client'

import CustomFormField from "@/components/common/custom-field"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"

import { FormFieldsType } from "@/src/types"
//*** FORM ***//
import { zodResolver } from "@hookform/resolvers/zod"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"

import axios from "axios";
import { toast } from "@/hooks/use-toast"

import { createSession } from "@/lib/session"
import { SignUpSchema } from "./sign-up.schema"
import { cn } from "@/lib/utils"
import { AtSignIcon, CheckIcon, DotIcon, UserIcon } from "lucide-react"




const SignUpForm = () => {
  //*** STATES ***//
  const [isLoading, setIsLoading] = useState(false);
  // Vérification des caractères du mot de passe
  const [passwordVerifications, SetPasswordVerifications] = useState({
    hasLetter: false,
    hasNumber: false,
    hasSpecialChar: false,
    isValidLength: false,
  });

  //*** FORM VALUES ***//
  const form = useForm<z.infer<typeof SignUpSchema>>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      email: "",
      password: "",
      username: "",
      avatar: "",
      confirmationPassword: ""
    },
  })

  //*** PASSWORD VERIFICATION ***//
  const passwordWatch = form.watch("password")
  useEffect(() => {
    SetPasswordVerifications({
      hasLetter: /[a-zA-Z]/.test(passwordWatch),
      hasNumber: /\d/.test(passwordWatch),
      hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(passwordWatch),
      isValidLength: /^(?=.{8,20}$)/.test(passwordWatch) // Longueur entre 8 et 20 caractères
    });
  }, [passwordWatch]);

  //*** FORM SUBMIT ***//
  const onSubmit = async (data: z.infer<typeof SignUpSchema>) => {
    setIsLoading(true)
    try {
      // Création d'un avatar par défaut en fonction de l'email
      data.avatar = `https://api.dicebear.com/9.x/adventurer-neutral/svg?seed=${data.email}?scale=100`

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

  const test = form.getValues('password')
  console.log('test', test)
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5">
        {/* Nom d'utilisateur */}
        <CustomFormField control={form.control} fieldType={FormFieldsType.INPUT} name="username" placeholder="Nom d'utilisateur" icon={<UserIcon className="h-5 w-5"/>}/>

        {/* Email */}
        <CustomFormField control={form.control} fieldType={FormFieldsType.INPUT} name="email" placeholder="Adresse mail" icon={<AtSignIcon className="h-5 w-5"/>}/>

        {/* Password */}
        <CustomFormField required control={form.control} fieldType={FormFieldsType.INPUT} name="password" type="password" placeholder="Mot de passe" />
        {/* Affichage des vérifications */}
        <ul className={cn(test !== '' ? "flex flex-col text-xs" : "hidden")}>
          {/* //! Oui */}
          <li className={cn(passwordVerifications.isValidLength ? "text-green-700 transition-colors" : "text-gray-50", "inline-flex")}>
            {passwordVerifications.isValidLength ? (<CheckIcon className="h-4 w-4 mr-2" />) : (<DotIcon className="h-5 w-5 mr-1" />)}
            Contient entre 8 et 20 caractères
          </li>
          {/* //! Oui */}
          <li className={cn(passwordVerifications.hasLetter ? "text-green-700 transition-colors" : "text-gray-50", "inline-flex")}>
            {passwordVerifications.hasLetter ? (<CheckIcon className="h-4 w-4 mr-2" />) : (<DotIcon className="h-5 w-5 mr-1" />)}
            Contient une lettre
          </li>
          {/* //! Oui */}
          <li className={cn(passwordVerifications.hasNumber ? "text-green-700  transition-colors" : "text-gray-50", "inline-flex")}>
            {passwordVerifications.hasNumber ? (<CheckIcon className="h-4 w-4 mr-2" />) : (<DotIcon className="h-5 w-5 mr-1" />)}
            Contient un chiffre
          </li>
          {/* //! Oui */}
          <li className={cn(passwordVerifications.hasSpecialChar ? "text-green-700  transition-colors" : "text-gray-50", "inline-flex")}>
            {passwordVerifications.hasSpecialChar ? (<CheckIcon className="h-4 w-4 mr-2" />) : (<DotIcon className="h-5 w-5 mr-1" />)}
            Contient un caractère spécial
          </li>
        </ul>

        {/* Confirmation du mot de passe */}
        <CustomFormField control={form.control} fieldType={FormFieldsType.INPUT} name="confirmationPassword" type="password" placeholder="Confirmation du mot de passe" className={cn(passwordVerifications.hasLetter && passwordVerifications.hasNumber && passwordVerifications.hasSpecialChar && passwordVerifications.isValidLength ? "block" : "hidden")} />



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