'use client'

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button, buttonVariants } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

import Link from "next/link"
import { cn } from "@/lib/utils"
import { logout } from "@/lib/auth"
import { userType } from "@/src/types"


interface MobileNavProps {
  user: userType
}

const MobileNav: React.FC<MobileNavProps> = ({ user }) => {

  //*** LOGOUT ***//
  const handleLogout = async () => {
    await logout()
  }

  return (
    <Sheet>
      <SheetTrigger asChild title="Menu de navigation" className="cursor-pointer">
        <Avatar>
          {/* <AvatarImage src="https://github.com/shadcn.png" /> */}
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </SheetTrigger>
      <SheetContent side={'right'} className="w-[300px]">
        <SheetHeader>
          <SheetDescription className="hidden">blablabla</SheetDescription>
          <SheetTitle>
            <Link href="/" className={"text-2xl font-semibold text-start"}>melodia</Link>
          </SheetTitle>
        </SheetHeader>
        <nav>

          {/* Authentification */}
          <div className="space-y-2 mt-7 px-2">
            {user
              ? (
                <Button onClick={() => handleLogout()} className="w-full bg-[#191919]">Se déconnecter</Button>
              ) : (
                <>
                  <Link href="/auth/connexion" className={cn(buttonVariants(), 'w-full bg-[#191919]')}>Connexion</Link>
                  <Link href="/auth/inscription" className={cn(buttonVariants(), 'w-full bg-[#313131]')}>Inscription</Link>
                </>
              )}

          </div>

          {user ? (
            <Link href={`/profil/${user.username}`} title="Voir mon profil" className="flex items-center justify-between mt-7 group">
              <p className="font-medium px-2 group-hover:underline underline-offset-2">{user?.username}</p>
              <Avatar className="h-5 w-5 group-hover:scale-110 duration-200">
                {/* <AvatarImage src="https://github.com/shadcn.png" /> */}
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>

            </Link>
          ) : (
            <div className="flex items-center justify-between mt-7">
              <p className="font-medium px-2">Visiteur</p>
              <Avatar className="h-5 w-5">
                {/* <AvatarImage src="https://github.com/shadcn.png" /> */}
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>

            </div>
          )}


          <Separator className="my-5 bg-foreground/30" />

          <Accordion type="multiple">
            {/* Gammes */}
            <AccordionItem value="scales">
              <AccordionTrigger>Gammes</AccordionTrigger>
              <AccordionContent>
                <Link href={'/gammes'} className={cn(buttonVariants({ variant: 'hollow' }), 'px-2')} title="Parcourir les gammes">Parcourir</Link>
              </AccordionContent>
            </AccordionItem>

            {/* Accords */}
            <AccordionItem value="chords">
              <AccordionTrigger>Accords</AccordionTrigger>
              <AccordionContent>
                <div className="flex flex-col mt-2">
                  <Link href={'/accords'} className={cn(buttonVariants({ variant: 'hollow' }), 'px-2')} title="Parcourir les gammes">Parcourir</Link>
                  <Link href={'/tonalite/accords'} className={cn(buttonVariants({ variant: 'hollow' }), 'px-2')} title="Parcourir les gammes">Tonalité d'une suite d'accords</Link>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Tonalités */}
            <AccordionItem value="tonalities">
              <AccordionTrigger>Tonalité</AccordionTrigger>
              <AccordionContent>
                <div className="flex flex-col gap-2 mt-2">
                  <Link href={'/tonalite/melodie'} className={cn(buttonVariants({ variant: 'hollow' }), 'px-2')} title="Parcourir les gammes">Tonalité d'une mélodie</Link>
                  <Link href={'/tonalite/accords'} className={cn(buttonVariants({ variant: 'hollow' }), 'px-2')} title="Parcourir les gammes">Tonalité d'une suite d'accords</Link>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>



        </nav>
      </SheetContent>
    </Sheet>
  )
}

export default MobileNav