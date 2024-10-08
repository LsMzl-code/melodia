'use client'

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import Link from "next/link"
import { cn } from "@/lib/utils"
import { buttonVariants } from "../ui/button"
import { AdminRoutes, SettingLinks } from "@/src/constants/admin"
import { usePathname } from "next/navigation"

const AdminMobileNav = () => {
  //*** HOOKS ***//
  const pathname = usePathname();

  return (
    <Sheet>
      <SheetTrigger asChild title="Menu de navigation" className="cursor-pointer">
        <Avatar className="h-7 w-7">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </SheetTrigger>
      <SheetContent side={'right'} className="w-[250px] pr-0">
        <SheetHeader>
          <SheetTitle>
            <Link href="/" className={"text-2xl font-semibold text-start"}>melodia</Link>
          </SheetTitle>
        </SheetHeader>

        <nav className='flex flex-col gap-2 adminLinkHover justify-between h-full'>

          <div>
            <p className='text-sm mt-5 mb-2'>Menus</p>
            {AdminRoutes.map((route) => {
              const isActive = pathname === route.href;
              return (
                <Link href={route.href} className={cn(buttonVariants({ variant: 'hollow' }), 'px-2 rounded-r-none capitalize flex items-center gap-2 relative')} title={route.title} key={route.label}>
                  <div className={cn(isActive ? 'bg-red-600' : 'bg-transparent', 'h-7 w-7 rounded-full relative')}>
                    <span className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>{route.icon}</span>
                  </div>
                  {route.label}
                </Link>
              )
            })}

            <p className='text-sm mt-5 mb-2'>Options</p>
            {SettingLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link href={link.href} className={cn(buttonVariants({ variant: 'hollow' }), 'px-2 rounded-r-none capitalize flex items-center gap-2 relative')} title={link.title} key={link.label}>
                  <div className={cn(isActive ? 'bg-red-600' : 'bg-transparent', 'h-7 w-7 rounded-full relative')}>
                    <span className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>{link.icon}</span>
                  </div>
                  {link.label}
                </Link>
              )
            })}
          </div>

          {/* User */}
          <Link className={cn(buttonVariants({ variant: "hollow" }), 'mb-5 flex gap-2 items-center w-[225px] relative')} href={'/'} title='Profil'>
            <Avatar className='h-8 w-8'>
              <AvatarImage src="https://github.com/shadcn.png" />
            </Avatar>
            <div className='flex flex-col'>
              <p className='font-semibold leading-none text-sm'>Louis Mazzella</p>
              <p className='text-xs text-muted-foreground'>Admin</p>
            </div>
          </Link>
        </nav>
      </SheetContent>
    </Sheet>
  )
}

export default AdminMobileNav