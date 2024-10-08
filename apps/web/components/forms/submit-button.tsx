import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils";
import { Loader2Icon } from "lucide-react";

interface SubmitButtonProps {
  disabled: boolean;
  label: string;
  className?: string;
}

const SubmitButton = ({ disabled, label, className }: SubmitButtonProps) => {
  return (
    <Button type="submit" className={cn("w-full bg-blue-primary text-gray-50 hover:bg-blue-primary/80 transition-colors", className)} disabled={disabled}>
      {disabled ? <Loader2Icon className="mr-2 h-4 w-4 animate-spin" /> : label}
    </Button>

  )
}

export default SubmitButton