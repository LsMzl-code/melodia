'use client'
import { Button } from "@/components/ui/button"
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
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
import Image from "next/image"
import { useState } from "react";
import AddAvatarDialog from "./add-avatar-dialog";
import SubmitButton from "@/components/forms/submit-button";
import useSessionToken from "@/hooks/use-session-token";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "@/hooks/use-toast";
import { getCurrentUser } from "@/src/server/data/users.query";

interface ChooseAvatarDialogProps {
  avatars: {
    imgUrl: string;
  }[];
  currentAvatar: string;
}

const ChooseAvatarDialog: React.FC<ChooseAvatarDialogProps> = ({ avatars, currentAvatar }) => {
  //*** STATES ***//
  const [selectedAvatar, setSelectedAvatar] = useState<string>(currentAvatar);
  const [isLoading, setIsLoading] = useState(false);

  //*** HOOKS ***//
  const router = useRouter()

  //*** CHANGEMENT DE L'AVATAR ***//
  const handleChangeAvatar = async () => {
    setIsLoading(true)
    try {
      // Récupération du token de l'utilisateur
      const userToken = await useSessionToken()
      if (!userToken) return null
      const currentUser = await getCurrentUser()
      if (!currentUser) return null

      axios.put(`http://localhost:8000/users/update-avatar/${currentUser?.id}`, {imgUrl: selectedAvatar}, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${userToken}`
        }
      })
        .then((res) => {
          setIsLoading(false)
          toast({
            title: 'Succès',
            description: `${res.data.message}`,
          })
          router.refresh();
        })
        .catch(err => {
          setIsLoading(false)
          toast({
            title: 'Erreur',
            description: `${err.response.data.message}`,
            variant: 'destructive'
          })
        });
    } catch (error) {
      setIsLoading(false)
      toast({
        title: 'Erreur',
        description: 'Une erreur est survenue lors de la création de la note',
        variant: 'destructive'
      })
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={'ghost'} className="w-full justify-start text-gray-50">Choisir une photo de profil</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Modifier ma photo de profil</DialogTitle>
          <DialogDescription>Sélectionner une photo et validez une fois terminé</DialogDescription>
        </DialogHeader>

        <Separator className="h-[0.5px] bg-foreground/30" />

        {/* Gallerie d'avatar de l'utilisateur */}
        <div>
          <p className="text-sm text-gray-50 font-semibold mb-2">Vos photos</p>
          <Carousel className="bg-blue-primary/10 w-full p-2 rounded-lg">
            <CarouselContent>
              {avatars.map(avatar => (
                <CarouselItem className="basis-1/3.5 relative" key={avatar.imgUrl} onClick={() => setSelectedAvatar(avatar.imgUrl)}>
                  <Image src={avatar.imgUrl} alt="Avatar" width={100} height={100} sizes="100%" className=" rounded-lg object-cover object-center h-[120px] w-[120px] cursor-pointer hover:scale-110 transition-all duration-300" />
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>

        </div>

        {/* Affichage de la photo selectionnée */}
        <div className="h-[250px] w-[220px] mx-auto rounded-lg overflow-hidden relative">
          <Image src={selectedAvatar} alt="Avatar" fill sizes="100%" className="rounded-lg h-24 w-24 object-cover object-center" />
        </div>
        <div className="mt-5 flex items-center justify-between">
          {/* Menu d'ajout d'une nouvelle photo */}
          <AddAvatarDialog />

          <div className="ml-auto space-x-2 ">
            <DialogClose asChild>
              <Button className="bg-red-primary hover:bg-red-primary/80 transition-colors">Annuler</Button>
            </DialogClose>
            <SubmitButton label="Valider" disabled={isLoading} className="w-fit" onClick={() => handleChangeAvatar()} />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default ChooseAvatarDialog