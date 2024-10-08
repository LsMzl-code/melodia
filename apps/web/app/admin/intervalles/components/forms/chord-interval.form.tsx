"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Form } from "@/components/ui/form"
import CustomFormField from "@/components/common/custom-field"
import { Button } from "@/components/ui/button"
import { FormFieldsType } from "@/src/types"
import { ChordIntervalSchema } from "./chord-interval.schema"

const ChordIntervalForm = () => {
  //*** FORM VALUES ***//
  const form = useForm<z.infer<typeof ChordIntervalSchema>>({
    resolver: zodResolver(ChordIntervalSchema),
    defaultValues: {
      name: "",
      details: "",
    },
  })

  //*** FORM SUBMIT ***//
  const onSubmit = (data: z.infer<typeof ChordIntervalSchema>) => {
    console.log(data)
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="border border-foreground/10 p-5 rounded-xl space-y-5">
        <h2 className="text-2xl font-medium mb-5">Ajouter un intervalle d'accord</h2>
        <CustomFormField control={form.control} fieldType={FormFieldsType.INPUT} name="name" placeholder="Nom" />
        <CustomFormField control={form.control} fieldType={FormFieldsType.INPUT} name="details" placeholder="Détails" />
        <Button type="submit" className="ml-auto block bg-blue-primary text-white">Créer</Button>
      </form>
    </Form>)
}

export default ChordIntervalForm