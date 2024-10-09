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

interface ChooseAvatarDialogProps {
  avatars: {
    imgUrl: string;
  }[];
  currentAvatar: string;
}

const ChooseAvatarDialog: React.FC<ChooseAvatarDialogProps> = ({ avatars, currentAvatar }) => {
  //*** STATES ***//
  const [selectedAvatar, setSelectedAvatar] = useState<string>(currentAvatar);

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
        <Carousel className="bg-blue-primary/10 w-full p-2 rounded-lg">
          <CarouselContent>
            {avatars.map(avatar => (
              <CarouselItem className="basis-1/3 relative" key={avatar.imgUrl}>
                <Image src={avatar.imgUrl} alt="Avatar" width={100} height={100} sizes="100%" className=" rounded-lg object-cover object-center" />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        {/* Affichage de la photo selectionnée */}
        <div className="h-[250px] w-[220px] mx-auto rounded-lg overflow-hidden relative">
          <Image src={selectedAvatar} alt="Avatar" fill sizes="100%" className="rounded-lg h-24 w-24 object-cover object-center" />
        </div>
        <div className="mt-5 flex items-center justify-between">
          <AddAvatarDialog />
          <div className="ml-auto space-x-2 ">
            <DialogClose asChild>
              <Button className="bg-red-primary hover:bg-red-primary/80 transition-colors">Annuler</Button>
            </DialogClose>
            <DialogClose asChild>
              <Button className="bg-blue-primary hover:bg-blue-primary/80 transition-colors">Valider</Button>
            </DialogClose>

          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default ChooseAvatarDialog