'use client'

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import ChooseAvatarDialog from "./choose-avatar-dialog"
import ShowAvatarLightbox from "./show-avatar-lightbox"
import { useState } from "react"
import { Button } from "@/components/ui/button"


const AvatarMenuPopover = () => {
  //*** STATES ***//
  const [isLightboxOpen, setLightboxOpen] = useState(false);

  const openLightbox = () => setLightboxOpen(true);
  const closeLightbox = () => setLightboxOpen(false);

  return (
    <Popover >
      <PopoverTrigger asChild>
        <Avatar className="h-20 w-20 cursor-pointer hover:scale-105 transition-all duration-300" title="Voir ou modifier la photo de profil">
          {/* //TODO: Afficher la photo de profil de l'utilisateur connecté */}
          <AvatarImage src="https://github.com/shadcn.png" alt="Image de profil" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </PopoverTrigger>

      <PopoverContent align="start" className="p-1 w-[250px] bg-background border-foreground/20">
        <Button variant={'ghost'} className="w-full justify-start text-gray-50" onClick={openLightbox}>Voir mon avatar</Button>
        <ChooseAvatarDialog />
      </PopoverContent>
      {/* LightBox */}
      <ShowAvatarLightbox isOpen={isLightboxOpen} onClose={closeLightbox} imageSrc="/assets/img/crabe.jpg" />
    </Popover>

  )
}

export default AvatarMenuPopover