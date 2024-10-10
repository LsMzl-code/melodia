"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Form, FormControl } from "@/components/ui/form"
import CustomFormField from "@/components/common/custom-field"
import { Button } from "@/components/ui/button"
import { FormFieldsType } from "@/src/types"
import { ScaleSchema } from "./scale.schema"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { ModeNames, NoteNames, TonalityNames } from "@/src/constants/notes"
import { MultiSelect } from "@/components/ui/multi-select"
import useSessionToken from "@/hooks/use-session-token"
import axios from "axios"
import { toast } from "@/hooks/use-toast"


interface AddScaleFormProps {
  scaleIntervals: {id: number, name: string, details: string}[],
  scaleFamilies: {id: number, name: string}[],
  scaleNames: {id: number, name: string}[],
}

const AddScaleForm: React.FC<AddScaleFormProps> = ({
  scaleIntervals,
  scaleFamilies,
  scaleNames,
}) => {
  //*** STATES ***//
  const [isLoading, setIsLoading] = useState(false)
  const [selectedNotes, setSelectedNotes] = useState<string[]>([]);

  //*** HOOKS ***//
  const router = useRouter()

  //*** FORMATTED DATAS ***//
  const formattedTonalities = TonalityNames.map((item) => ({ id: item.id, name: item.name }))
  const formattedModes = ModeNames.map((item) => ({ id: item.id, name: item.name }))
  const formattedScaleFamilies = scaleFamilies.map((item) => ({ id: item.name, name: item.name }))
  const formattedScaleNames = scaleNames.map((item) => ({ id: item.name, name: item.name }))
  const formattedScaleIntervals = scaleIntervals.map((item) => ({ id: item.name, name: item.name }))
  const formattedNotes = NoteNames.map((item) => ({ value: item.name, label: item.label }))

  //*** FORM VALUES ***//
  const form = useForm<z.infer<typeof ScaleSchema>>({
    resolver: zodResolver(ScaleSchema),
    defaultValues: {
      name: "",
      notes: "",
      mode: "",
      tonality: "",
      interval: "",
      family: "",
      diagram: "",
      degree: "",
    },
  })

  //*** FORM SUBMIT ***//
  const onSubmit = async (data: z.infer<typeof ScaleSchema>) => {
    setIsLoading(true)
    
    // Convertion du tableau de notes en une chaîne de caractères
    const notesToString = selectedNotes.join(',')
    data.notes = notesToString

    try {
      // Récupération du token de l'utilisateur
      const userToken = await useSessionToken();
      if (!userToken) return null;

      await axios.post(`http://localhost:8000/scales/create`, data, {
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
        description: 'Une erreur est survenue lors de la création de la gamme',
        variant: 'destructive'
      })
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="border border-foreground/10 p-5 rounded-xl space-y-3 lg:space-y-5">
        <h2 className="text-2xl font-medium mb-5">Ajouter une gamme</h2>

        <div className="grid grid-cols-3 gap-2 lg:gap-5">
          {/* Tonalité */}
          <CustomFormField control={form.control} fieldType={FormFieldsType.SELECT} name="tonality" placeholder="Tonalité" data={formattedTonalities} />
          {/* Nom */}
          <CustomFormField control={form.control} fieldType={FormFieldsType.SELECT} name="name" placeholder="Nom" data={formattedScaleNames} />
          {/* Famille */}
          <CustomFormField control={form.control} fieldType={FormFieldsType.SELECT} name="family" placeholder="Famille" data={formattedScaleFamilies} />
        </div>

        {/* Notes */}
        <CustomFormField control={form.control} fieldType={FormFieldsType.SKELETON} name="notes" label="Notes" renderSkeleton={(field) => (
          <FormControl>
            <MultiSelect
              options={formattedNotes}
              onValueChange={setSelectedNotes}
              defaultValue={selectedNotes}
              placeholder="Sélectionner les notes"
              variant="inverted"
              animation={2}
              maxCount={3}
              {...field}
            />
          </FormControl>
        )}
        />

        <div className="grid grid-cols-2 gap-2 lg:gap-5">
          {/* Intervalles */}
          <CustomFormField control={form.control} fieldType={FormFieldsType.SELECT} name="interval" placeholder="Intervalles" data={formattedScaleIntervals} />
          {/* Diagramme */}
          <CustomFormField control={form.control} fieldType={FormFieldsType.SELECT} name="diagram" placeholder="Diagrammes" data={[{ id: "1", name: "Majeur" }, { id: "2", name: "mineur" }]} />
        </div>

        <div className="grid grid-cols-2 gap-2 lg:gap-5">
          {/* Degré */}
          <CustomFormField control={form.control} fieldType={FormFieldsType.SELECT} name="degree" placeholder="Degrés" data={[{ id: "1", name: "Majeur" }, { id: "2", name: "mineur" }]} />
          {/* Mode */}
          <CustomFormField control={form.control} fieldType={FormFieldsType.SELECT} name="mode" placeholder="Mode" data={formattedModes} />

        </div>



        <Button type="submit" className="ml-auto block bg-blue-primary text-white">Créer</Button>
      </form>
    </Form>)
}

export default AddScaleForm