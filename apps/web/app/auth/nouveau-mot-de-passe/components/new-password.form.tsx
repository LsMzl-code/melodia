'use client'
//*** FORM ***//
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import CustomFormField from "@/components/common/custom-field"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { toast } from '@/hooks/use-toast';
import axios from 'axios';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react'
import { NewPasswordSchema } from "./new-password.schema"
import { FormFieldsType } from "@/src/types"

const NewPasswordForm = () => {
  //*** STATES ***//
  const [isLoading, setIsLoading] = useState(false)

  //*** HOOKS***//
  const router = useRouter()

  //*** RECUPERATION DU TOKEN DE REINITIALISATION ***//
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  //** VERIFICATION DU TOKEN AU CHARGEMENT DE LA PAGE ***//
  const verifyToken = async () => {
    try {
      axios.get(`http://localhost:8000/auth/verification-reset-password-token?token=${token}`)
        .catch(err => {
          //! Token non reconnu ou aucune demande de réinitialisation en cours
          toast({
            title: 'Erreur',
            description: `${err.response.data.message}`,
            variant: 'destructive'
          })
          // Redirection vers la page de mot de passe oublié
          router.push('/auth/mot-de-passe-oublie')
        })
    } catch (err) {
      toast({
        title: 'Erreur',
        description: 'Une erreur est survenue lors de la vérification du token',
        variant: 'destructive'
      })
    }
  };

  useEffect(() => {
    if (token) {
      verifyToken();
    }
  }, [token])

  //TODO: Déroulé classique de soumission de formulaire
  //*** FORM VALUES ***//
  const form = useForm<z.infer<typeof NewPasswordSchema>>({
    resolver: zodResolver(NewPasswordSchema),
    defaultValues: {
      password: "",
      confirmationPassword: "",
    },
  })

  //*** FORM SUBMIT ***//
  const onSubmit = async (data: z.infer<typeof NewPasswordSchema>) => {
    if (!token) return
    setIsLoading(true)
    console.log('data', data)
    try {
      axios.post(`http://localhost:8000/auth/nouveau-mot-de-passe`, { password: data.password, token: token }).then(async (res) => {
        setIsLoading(false)

        toast({
          title: 'Succès',
          description: 'Votre mot de passe a bien été modifié',
          variant: 'default'
        })
        router.push('/auth/connexion')
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
        description: 'Une erreur est survenue lors de la création du nouveau mot de passe',
        variant: 'destructive'
      })
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-3">
        <CustomFormField control={form.control} fieldType={FormFieldsType.INPUT} name="password" type="password" placeholder="Nouveau mot de passe" />
        <CustomFormField control={form.control} fieldType={FormFieldsType.INPUT} name="confirmationPassword" type="password" placeholder="Confirmation du mot de passe" />
        <Button type="submit" className="w-full bg-blue-primary text-gray-50 hover:bg-blue-primary/80 transition-colors mt-8" disabled={isLoading}>Valider</Button>
      </form>
    </Form>
  )
}

export default NewPasswordForm