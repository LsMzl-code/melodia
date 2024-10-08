'use client'
import IconButton from '../common/icon-button'
import { ChevronLeft } from 'lucide-react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'
import { AdminRoutes, SettingLinks } from '@/src/constants/admin'
import { usePathname } from 'next/navigation'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'

interface AdminNavProps {
  user: {
    username: string | undefined;
    role: string;
    avatar?: string;
  }
}

/**
 * Barre de navigation latérale pour l'admin.
 * -
 * @returns 
 */
const AdminNav: React.FC<AdminNavProps> = ({ user }) => {
  //*** HOOKS ***//
  const pathname = usePathname();

  return (
    <div className='border-r border-foreground/5 h-screen max-h-screen pl-4 pt-2 hidden lg:flex relative flex-col justify-between w-[15%]'>
      <div>
        <span className='flex items-center justify-between my-5'>
          <p className='text-2xl font-semibold'>melodia</p>
          <IconButton icon={<ChevronLeft className="h-5 w-5" />} title="Accueil" className='ml-10 mr-3' href='/' />
        </span>

        <nav className='flex flex-col gap-2 adminLinkHover'>
          <p className='text-sm mt-10 mb-2'>Menus</p>
          {AdminRoutes.map((route) => {
            const isActive = pathname.includes(route.href);
            return (
              <Link href={route.href} className={cn(buttonVariants({ variant: 'hollow' }), 'px-2 rounded-r-none capitalize flex items-center gap-2 relative')} title={route.title} key={route.label}>
                <div className={cn(isActive ? 'bg-red-600' : 'bg-transparent', 'h-7 w-7 rounded-full relative')}>
                  <span className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>{route.icon}</span>
                </div>
                {route.label}
              </Link>
            )
          })}

          <p className='text-sm mt-10 mb-2'>Options</p>
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
          }
          )}
        </nav>
      </div>


      {/* User */}
      <Link className={cn(buttonVariants({ variant: "hollow", size: "lg" }), 'p-2 rounded-r-none capitalize flex items-center gap-2 relative mb-5')} href={'/'} title='Profil'>
        <Avatar className='h-8 w-8'>
          {/* <AvatarImage src="https://github.com/shadcn.png" /> */}
          <AvatarFallback>LM</AvatarFallback>
        </Avatar>
        <div className='flex flex-col'>
          <p className='font-semibold leading-none text-sm'>{user.username}</p>
          <p className='text-xs text-muted-foreground capitalize'>{user.role.toLowerCase()}</p>
        </div>
      </Link>
    </div>
  )
}

export default AdminNav