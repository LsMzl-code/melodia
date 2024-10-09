'use client'

import { ChevronLeft } from "lucide-react"
import IconButton from "../common/icon-button"
import MobileNav from "./mobile-nav"
import { useRouter } from "next/navigation"

/**
 * Bouton de retour et avatar avec menu sheet
 * @returns 
 */
const TopNavMobile = () => {
  //*** HOOKS ***//
  const router = useRouter()

  return (
    <div className="flex items-center justify-between">
      <IconButton icon={<ChevronLeft className="h-5 w-5" />} onClick={() => router.back()} title="Retour" />
      {/* <MobileNav /> */}
    </div>
  )
}

export default TopNavMobile