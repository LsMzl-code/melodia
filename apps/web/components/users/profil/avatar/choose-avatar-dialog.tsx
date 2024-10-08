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
import Image from "next/image"

const ChooseAvatarDialog = () => {
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
        {/* //TODO: Mettre un caroussel */}
        <div className="bg-blue-primary/10 rounded-lg w-full flex items-center justify-start gap-2 p-2">
          <Image src={'/assets/img/crabe.jpg'} alt="Avatar" width={100} height={100} className="rounded-lg h-24 w-24 object-cover object-center" />
          <Image src={'/assets/img/crabe.jpg'} alt="Avatar" width={100} height={100} className="rounded-lg h-24 w-24 object-cover object-center" />
          <Image src={'/assets/img/crabe.jpg'} alt="Avatar" width={100} height={100} className="rounded-lg h-24 w-24 object-cover object-center" />
        </div>
        {/* Affichage de la photo selectionnée */}
        {/* //TODO: Composant cloudinary*/}
        <div className="h-[250px] w-[220px] mx-auto rounded-lg overflow-hidden relative">
          <Image src={'/assets/img/crabe.jpg'} alt="Avatar" fill sizes="100%" className="rounded-lg h-24 w-24 object-cover object-center" />
        </div>
        <div className="mt-5 space-x-2 ml-auto">
          <DialogClose asChild>
            <Button className="bg-red-primary hover:bg-red-primary/80 transition-colors">Annuler</Button>
          </DialogClose>
          <DialogClose asChild>
            <Button className="bg-blue-primary hover:bg-blue-primary/80 transition-colors">Valider</Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default ChooseAvatarDialog