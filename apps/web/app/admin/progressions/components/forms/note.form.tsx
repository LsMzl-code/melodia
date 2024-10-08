"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Form } from "@/components/ui/form"
import CustomFormField from "@/components/common/custom-field"
import { Button } from "@/components/ui/button"
import { FormFieldsType } from "@/src/types"
import { ProgressionSchema } from "./progression.schema"



const AddProgressionForm = () => {
  //*** FORM VALUES ***//
  const form = useForm<z.infer<typeof ProgressionSchema>>({
    resolver: zodResolver(ProgressionSchema),
    defaultValues: {
      name: "",
      details: "",
      family: "",
    },
  })

  //*** FORM SUBMIT ***//
  const onSubmit = (data: z.infer<typeof ProgressionSchema>) => {
    console.log(data)
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="border border-foreground/10 p-5 rounded-xl space-y-5">
        <h2 className="text-2xl font-medium mb-5">Ajouter une progression d'accords</h2>
        <div className="grid grid-cols-2 gap-5">
          <CustomFormField control={form.control} fieldType={FormFieldsType.INPUT} name="name" placeholder="Nom" />
          <CustomFormField control={form.control} fieldType={FormFieldsType.INPUT} name="details" placeholder="Détails" />
        </div>
        <CustomFormField control={form.control} fieldType={FormFieldsType.INPUT} name="family" placeholder="Famille" />
        <Button type="submit" className="ml-auto block bg-blue-primary text-white">Créer</Button>
      </form>
    </Form>)
}

export default AddProgressionForm