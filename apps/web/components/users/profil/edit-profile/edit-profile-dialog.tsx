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

import { PencilLine } from "lucide-react"

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

import { EditProfileSchema } from "./edit-profile.schema"
import SubmitButton from "@/components/forms/submit-button"
import InstrumentMultiSelect from "@/components/instrument-multi-select"
import { Separator } from "@/components/ui/separator"
import { User } from "@/src/types/users.type"

interface EditProfileDialogProps {
  user: User
}

const EditProfileDialog: React.FC<EditProfileDialogProps> = ({ user }) => {
  //*** STATES ***//
  const [isLoading, setIsLoading] = useState(false)

  //*** FORM VALUES ***//
  const form = useForm<z.infer<typeof EditProfileSchema>>({
    resolver: zodResolver(EditProfileSchema),
    defaultValues: {
      email: user?.email,
      username: user?.username,
      instrument: user?.instrument ?? "",
    },
  })

  //*** FORM SUBMIT ***//
  const onSubmit = async (data: z.infer<typeof EditProfileSchema>) => {
    setIsLoading(true)
    // try {
    //   axios.post(`http://localhost:8000/auth/inscription`, data).then(async (res) => {
    //     // Creation de la session
    //     await createSession(res.data.userId, res.data.access_token)
    //     setIsLoading(false)
    //     toast({
    //       title: 'Succès',
    //       description: `Un email de confirmation a été envoyé à ${data.email}`,
    //       variant: 'default'
    //     })

    //   })
    //     .catch(err => {
    //       setIsLoading(false)

    //       toast({
    //         title: 'Erreur',
    //         description: `${err.response.data.message}`,
    //         variant: 'destructive'
    //       })
    //     })
    // } catch (error) {
    //   setIsLoading(false)
    //   toast({
    //     title: 'Erreur',
    //     description: 'Une erreur est survenue lors de l\'inscription',
    //     variant: 'destructive'
    //   })
    // }
  }


  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size={'icon'} className={"bg-[#3B3B46] hover:bg-[#383C43] transition-colors"} title="Modifier le profil">
          <PencilLine />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editer mon profil</DialogTitle>
          <DialogDescription>
            Validez vos modifications une fois terminé.
          </DialogDescription>
        </DialogHeader>
        <Separator className="h-[0.5px] bg-foreground/10" />

        {/* Formulaire */}

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-5">
              <CustomFormField control={form.control} fieldType={FormFieldsType.INPUT} name="username" placeholder="Nom d'utilisateur" label="Nom d'utilisateur" />
              <CustomFormField control={form.control} fieldType={FormFieldsType.INPUT} name="email" placeholder="Adresse mail" label="Adresse mail" />
            </div>

            <div className="flex flex-col gap-3">
              <p className="font-semibold text-xs">Instruments</p>
              <InstrumentMultiSelect />
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

export default EditProfileDialog