'use client'

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
import { Form, FormControl} from "@/components/ui/form"

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
import { Separator } from "@/components/ui/separator"
import { User } from "@/src/types/users.type"
import { MultiSelect } from "@/components/ui/multi-select"
import { InstrumentsList } from "@/src/constants"
import useSessionToken from "@/hooks/use-session-token"
import { useRouter } from "next/navigation"

interface EditProfileDialogProps {
  user: User
}

const EditProfileDialog: React.FC<EditProfileDialogProps> = ({ user }) => {
  //*** STATES ***//
  const [isLoading, setIsLoading] = useState(false)
  const [selectedInstruments, setSelectedInstruments] = useState<string[]>([]);

  //*** HOOKS ***//
  const router = useRouter()

  //*** FORM VALUES ***//
  const form = useForm<z.infer<typeof EditProfileSchema>>({
    resolver: zodResolver(EditProfileSchema),
    defaultValues: {
      email: user?.email,
      username: user?.username,
      instrument: undefined,
    },
  })

  //*** FORM SUBMIT ***//
  const onSubmit = async (data: z.infer<typeof EditProfileSchema>) => {
    setIsLoading(true)
    // Convertion du tableau d'instruments en une chaîne de caractères
    const intrumentsToString = selectedInstruments.join(',')
    data.instrument = intrumentsToString

    try {
      // Récupération du token de l'utilisateur
      const userToken = await useSessionToken();
      if (!userToken) return null;

      await axios.put(`http://localhost:8000/users/update/${user.id}`, data, {
        method: 'POST', headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${userToken}`
        },
      }).then(async (res) => {
        setIsLoading(false)
        router.refresh()
        toast({
          title: 'Succès',
          description: `${res.data.message}`,
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
              <div className="col-span-2">

                <CustomFormField control={form.control} fieldType={FormFieldsType.SKELETON} name="instrument" label="Instruments" renderSkeleton={(field) => (
                  <FormControl>
                    <MultiSelect
                      options={InstrumentsList}
                      onValueChange={setSelectedInstruments}
                      defaultValue={user?.instrument?.split(',') ?? undefined}
                      placeholder="Sélectionner vos instruments"
                      variant="inverted"
                      animation={2}
                      maxCount={3}
                      {...field}
                    />
                  </FormControl>
                )}
                />
              </div>
            </div>

            {/* <div className="flex flex-col gap-3">
              <p className="font-semibold text-xs">Instruments</p>
              <FormField
                control={form.control}
                name="instrument"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Instruments</FormLabel>
                    <FormControl>
                      <MultiSelect
                        options={InstrumentsList}
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        placeholder="Sélectionner vos instruments"
                        variant="inverted"
                        animation={2}
                        maxCount={3}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div> */}

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