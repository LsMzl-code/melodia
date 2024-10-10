import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils";
import { Loader2Icon } from "lucide-react";

interface SubmitButtonProps {
  disabled: boolean;
  label: string;
  className?: string;
  onClick?: () => void;
}

const SubmitButton = ({ disabled, label, className, onClick }: SubmitButtonProps) => {
  return (
    <Button type="submit" className={cn("w-full bg-blue-primary text-gray-50 hover:bg-blue-primary/80 transition-colors", className)} disabled={disabled} onClick={onClick}>
      {disabled ? <Loader2Icon className="h-5 w-5 animate-spin" /> : label}
    </Button>

  )
}

export default SubmitButton