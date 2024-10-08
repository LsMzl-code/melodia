"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Form } from "@/components/ui/form"
import CustomFormField from "@/components/common/custom-field"
import { Button } from "@/components/ui/button"
import { FormFieldsType } from "@/src/types"
import { ScaleSchema } from "./scale.schema"

const AddScaleForm = () => {
  //*** FORM VALUES ***//
  const form = useForm<z.infer<typeof ScaleSchema>>({
    resolver: zodResolver(ScaleSchema),
    defaultValues: {
      name: "",
      notes: [],
      mode: "",
      tonality: "",
      interval: "",
      scaleFamily: "",
      diagram: "",
      degree: "",
    },
  })

  //*** FORM SUBMIT ***//
  const onSubmit = (data: z.infer<typeof ScaleSchema>) => {
    console.log(data)
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="border border-foreground/10 p-5 rounded-xl space-y-3 lg:space-y-5">
        <h2 className="text-2xl font-medium mb-5">Ajouter une gamme</h2>

        <div className="grid grid-cols-3 gap-2 lg:gap-5">
          {/* Tonalité */}
          <CustomFormField control={form.control} fieldType={FormFieldsType.SELECT} name="tonality" placeholder="Tonalité" data={[{ id: "1", name: "Majeur" }, { id: "2", name: "mineur" }]} />
          {/* Nom */}
          <CustomFormField control={form.control} fieldType={FormFieldsType.SELECT} name="name" placeholder="Nom" data={[{ id: "1", name: "Majeur" }, { id: "2", name: "mineur" }]} />
          {/* Famille */}
          <CustomFormField control={form.control} fieldType={FormFieldsType.SELECT} name="scaleFamily" placeholder="Famille" data={[{ id: "1", name: "Majeur" }, { id: "2", name: "mineur" }]} />
        </div>

        {/* Notes */}
        <CustomFormField control={form.control} fieldType={FormFieldsType.INPUT} name="details" placeholder="Détails" />

        <div className="grid grid-cols-2 gap-2 lg:gap-5">
          {/* Intervalles */}
          <CustomFormField control={form.control} fieldType={FormFieldsType.SELECT} name="interval" placeholder="Intervalles" data={[{ id: "1", name: "Majeur", details: "1 2 3 4 5 6 7" }, { id: "2", name: "mineur", details: "1 b2 3 4 5 b6 b7" }]} />
          {/* Diagramme */}
          <CustomFormField control={form.control} fieldType={FormFieldsType.SELECT} name="diagram" placeholder="Diagrammes" data={[{ id: "1", name: "Majeur" }, { id: "2", name: "mineur" }]} />
        </div>

        <div className="grid grid-cols-2 gap-2 lg:gap-5">
          {/* Degré */}
          <CustomFormField control={form.control} fieldType={FormFieldsType.SELECT} name="degree" placeholder="Degrés" data={[{ id: "1", name: "Majeur" }, { id: "2", name: "mineur" }]} />
          {/* Mode */}
          <CustomFormField control={form.control} fieldType={FormFieldsType.SELECT} name="mode" placeholder="Mode" data={[{ id: "1", name: "Majeur" }, { id: "2", name: "mineur" }]} />

        </div>



        <Button type="submit" className="ml-auto block bg-blue-primary text-white">Créer</Button>
      </form>
    </Form>)
}

export default AddScaleForm