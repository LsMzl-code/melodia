import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { User } from "@/src/types/users.type"
import UserAvatar from "../users/user-avatar"
import { Separator } from "../ui/separator"
import Link from "next/link"
import { UserIcon } from "lucide-react"

interface MainUserUserPopoverProps {
  user: User | null
}

const MainUserUserPopover: React.FC<MainUserUserPopoverProps> = ({ user }) => {
  return (
    <Popover>
      <PopoverTrigger asChild className="hidden lg:block">
        <UserAvatar currentAvatar={user?.currentAvatar!} className="cursor-pointer" title="Ouvrir le menu utilisateur" fallBack="mzl"/>
      </PopoverTrigger>
      <PopoverContent className="p-0 bg-background border-foreground/10 text-gray-50">
        <div>
          <p className="font-medium px-3 py-2">{user?.username}</p>
          <Separator className="h-[0.5px] bg-foreground/10"/>
          <div className="py-2 px-3 space-y-2">
            <Link href={'/'} className="flex items-center justify-between">Mon profil <UserIcon/> </Link>
            <Link href={'/'} className="flex items-center justify-between">Déconnexion <UserIcon/> </Link>

            <Separator className="h-[0.5px] bg-foreground/10"/>

            <Link href={'/'} className="flex items-center justify-between">Messages <UserIcon/> </Link>
            
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}

export default MainUserUserPopover