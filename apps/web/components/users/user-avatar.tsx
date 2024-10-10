import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'


interface UserAvatarProps {
  currentAvatar: string;
  className?: string;
  title?: string;
  fallBack?: string;
}

const UserAvatar: React.FC<UserAvatarProps> = ({ currentAvatar, className, title, fallBack }) => {
  return (
    <Avatar className={className} title={title}>
      <AvatarImage src={currentAvatar} className="object-cover" />
      <AvatarFallback className='uppercase'>{fallBack? fallBack : "??"}</AvatarFallback>
    </Avatar>
  )
}

export default UserAvatar