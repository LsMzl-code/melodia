import * as React from "react"

import { cn } from "@/lib/utils"
import { EyeIcon, EyeOffIcon } from "lucide-react";

export interface PasswordInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
}

const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputProps>(({ icon, className, ...props }, ref) => {
    const [showPassword, SetShowPassword] = React.useState<boolean>(false)
    return (
      <div className="flex gap-2 items-center relative w-full">
        <input
          className={cn(
            "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
          ref={ref}
          {...props}
          type={showPassword ? "text" : "password"}
        />
        <span className="absolute top-[50%] translate-y-[-50%] right-2 cursor-pointer" onClick={() => SetShowPassword(!showPassword)}>{showPassword ? <EyeOffIcon className=" h-6 w-6 hover:text-blue-primary transition-colors" /> : <EyeIcon className=" h-6 w-6 hover:text-blue-primary transition-colors" />}</span>
      </div>
    )
  }
)
PasswordInput.displayName = "PasswordInput"

export { PasswordInput }
