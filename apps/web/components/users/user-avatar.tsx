import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'


interface UserAvatarProps {
  currentAvatar: string;
  className?: string;
  title?: string;
}

const UserAvatar: React.FC<UserAvatarProps> = ({ currentAvatar, className, title }) => {
  return (
    <Avatar className={className} title={title}>
      <AvatarImage src={currentAvatar} />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  )
}

export default UserAvatar