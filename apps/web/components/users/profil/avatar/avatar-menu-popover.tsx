'use client'

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import ChooseAvatarDialog from "./choose-avatar-dialog"
import ShowAvatarLightbox from "./show-avatar-lightbox"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import UserAvatar from "../../user-avatar"

interface AvatarMenuPopoverProps {
  currentAvatar: string;
  avatars: {
    imgUrl: string;
  }[];
}

const AvatarMenuPopover: React.FC<AvatarMenuPopoverProps> = ({ currentAvatar, avatars }) => {
  //*** STATES ***//
  const [isLightboxOpen, setLightboxOpen] = useState(false);

  const openLightbox = () => setLightboxOpen(true);
  const closeLightbox = () => setLightboxOpen(false);

  return (
    <Popover >
      <PopoverTrigger asChild>
        <div>
          <UserAvatar currentAvatar={currentAvatar ?? ''} className="h-20 w-20 cursor-pointer hover:scale-110 transition-all duration-300" title="Voir ou modifier la photo de profil" />
        </div>

      </PopoverTrigger>

      <PopoverContent align="start" className="p-1 w-[250px] bg-background border-foreground/20">
        <Button variant={'ghost'} className="w-full justify-start text-gray-50" onClick={openLightbox}>Voir mon avatar</Button>
        <ChooseAvatarDialog avatars={avatars} currentAvatar={currentAvatar}/>
      </PopoverContent>
      {/* LightBox */}
      <ShowAvatarLightbox isOpen={isLightboxOpen} onClose={closeLightbox} imageSrc={currentAvatar} />
    </Popover>
  )
}

export default AvatarMenuPopover