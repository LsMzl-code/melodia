'use client'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import { Separator } from "@/components/ui/separator"
import { useState } from "react";

// Form
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { UploadAvatarSchema } from "@/app/(root)/profil/components/user-profile.schema";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "@/hooks/use-toast";
import CloudinaryUploader from "./cloudinary-uploader";
import SubmitButton from "@/components/forms/submit-button";
import { FormFieldsType } from "@/src/types";
import CustomFormField from "@/components/common/custom-field";
import Image from "next/image";
import { Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";


const AddAvatarDialog = () => {
  //*** STATES ***//
  const [isLoading, setIsLoading] = useState(false);

  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  //*** HOOKS ***//
  const router = useRouter()

  //*** FORM DEFAULT VALUES ***//
  const form = useForm<z.infer<typeof UploadAvatarSchema>>({
    resolver: zodResolver(UploadAvatarSchema),
    defaultValues: {
      file: null
      // imgUrl: {
      //   name: '',
      //   size: 0,
      //   type: null
      // }
    },
  });

  //*** IMAGE SELECTION ***//
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];

    if (selectedFile) {
      try {
        // Valider le fichier avec Zod
        // UploadAvatarSchema.parse({
        //   name: selectedFile.name,
        //   size: selectedFile.size,
        //   type: selectedFile.type,
        // });

        setFile(selectedFile);

        // Créer une URL temporaire pour l'aperçu de l'image
        const previewUrl = URL.createObjectURL(selectedFile);
        setPreview(previewUrl);
      } catch (err) {
        if (err instanceof z.ZodError) {
          // setError('Fichier non valide. Choisissez une image PNG ou JPEG, max 15 MB.');
          //TODO: mettre un toast d'erreur
        }
        setFile(null);
        setPreview(null); // Réinitialiser l'aperçu si le fichier est invalide
      }
    }
  };

  //*** REMOVE IMAGE ***//
  const handleRemoveImage = () => {
    setFile(null);
    setPreview(null);
  };

  //*** VALIDATE IMAGE ***//
  const validateFile = (file: File) => {
    const maxSize = 15000000; // 15 MB
    const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp', 'image/svg+xml', 'image/gif'];

    if (file.size > maxSize) {
      return "Le fichier doit être inférieur à 15 MB.";
    }
    if (!allowedTypes.includes(file.type)) {
      return "Mauvais format de fichier.";
    }

    return null; // Pas d'erreur
  };

  //*** FORM SUBMISSION ***//
  const onSubmit = async (data: z.infer<typeof UploadAvatarSchema>) => {
    if (!file) return;

    setIsLoading(true)

    // Validation du fichier
    const validateError = validateFile(file)
    if (validateError) {
      toast({
        title: 'Erreur',
        description: validateError,
        variant: 'destructive'
      })
      return
    }

    data.file = file

    const formData = new FormData();
    formData.append('imgUrl', data.file);

    try {
      axios.post(`http://localhost:8000/avatars/upload`, formData)
        .then(async (res) => {
          setIsLoading(false)
          router.refresh()
          toast({
            title: 'Succès',
            description: `${res.data.message}`,
          })
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
        description: 'Une erreur est survenue lors de l\'ajout de l\'image',
        variant: 'destructive'
      })
    }
  }


  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-fit justify-start text-gray-50 bg-blue-primary hover:bg-blue-primary/80 transition-colors" title="Ajouter une nouvelle photo">Ajouter</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Ajouter une nouvelle photo</DialogTitle>
          <DialogDescription>Sélectionner une photo et validez une fois terminé</DialogDescription>
        </DialogHeader>

        <Separator className="h-[0.5px] bg-foreground/30" />

        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="w-full border-2 border-dashed border-blue-primary/20 rounded-md p-4 flex flex-col items-center justify-center h-[400px] bg-[#2A2B34] cursor-pointer hover:bg-[#2A2B34]/70 transition-colors relative">
            <p className="text-blue-primary text-sm">
              Cliquez pour choisir un fichier
            </p>
            <p className="text-xs">SVG, PNG, JPG, GIF, WEBP</p>

            <Input type="file" accept="image/*" onChange={handleFileChange} className="hidden" id="file-input" />
            {/* Affichage de l'image */}
            <Label htmlFor="file-input" className="absolute top-0 left-0 w-full h-full z-10 cursor-pointer">
              {preview && (
                <div className="absolute top-0 left-0 w-full h-full z-10">
                  <Image src={preview} alt="Aperçu de l'image" fill sizes="100%" className="object-cover rounded-lg" />
                  <Button type="button" variant="destructive" size="icon" title="Supprimer l'image" className="z-30 absolute top-2 right-2" onClick={() => handleRemoveImage()}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              )}
            </Label>
          </div>
        </form>


        {/* Sélection de la photo */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            {/* <CustomFormField
              control={form.control}
              fieldType={FormFieldsType.SKELETON}
              name="imgUrl"
              label="Ajouter un document"
              renderSkeleton={(field) => (
                <FormControl>
                  <CloudinaryUploader
                    files={field.value}
                    onChange={field.onChange}
                  />
                </FormControl>
              )}
            /> */}
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

export default AddAvatarDialog