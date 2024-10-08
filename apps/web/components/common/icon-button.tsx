import { cn } from "@/lib/utils";
import { Button } from "../ui/button"
import Link from "next/link";

interface IconButtonProps {
  onClick?: () => void;
  icon?: React.ReactNode;
  title?: string;
  className?: string;
  href?: string;
}

const IconButton: React.FC<IconButtonProps> = ({ onClick, icon, title, className, href }) => {
  return (
    <Button size={'icon'} className={cn("bg-[#3B3B46] hover:bg-[#383C43] transition-colors", className)} onClick={onClick} title={title}>
      {href ? <Link href={href} title={title}>{icon}</Link> : icon}
    </Button>
  )
}

export default IconButton