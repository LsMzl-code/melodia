'use client'

import { usePathname, useRouter, useSearchParams } from "next/navigation";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "../ui/button";
import { RotateCcw } from "lucide-react";
import { ModeNames } from "@/src/constants/notes";
import { ScaleFamily } from "@/src/types/families.type";

interface ScaleFilterProps {
  scaleFamilies: ScaleFamily[]
}

const ScaleFilter: React.FC<ScaleFilterProps> = ({ scaleFamilies }) => {
  //***** URL PARAMS *****//
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const searchMode = searchParams.get("mode");
  const searchFamily = searchParams.get("family");

  //*** SET URL PARAMS ***//
  // Choix du mode
  const handleMode = (e: string) => {
    const params = new URLSearchParams(searchParams);
    if (e == "reset") {
      params.delete("mode");
      replace(`${pathname}?${params.toString()}`);
    } else {
      params.set("mode", e.toLowerCase());
      replace(`${pathname}?${params.toString()}`);
    }
  };
  // Choix de la famille
  const handleScaleByFamily = (e: any) => {
    const params = new URLSearchParams(searchParams);
    if (e == "reset") {
      params.delete("family");
      replace(`${pathname}?${params.toString()}`);
    } else {
      params.set("family", e.toLowerCase());
      replace(`${pathname}?${params.toString()}`);
    }
  };
  // Reset
  const handleResetParams = () => {
    const params = new URLSearchParams(searchParams);
    params.delete("mode");
    params.delete("family");
    params.delete("tonality");
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="flex items-center justify-start md:justify-end gap-2">
      {/* Mode */}
      <div className="w-full max-w-[85px] rounded-md h-[38px]">
        <Select onValueChange={(e: string) => handleMode(e)}>
          <SelectTrigger className="h-[36px] border-none bg-[#313131]" title="Trier les gammes par mode">
            <SelectValue
              placeholder={searchMode ? searchMode : "Mode"}
              className="capitalize text-xs text-start"
            />
          </SelectTrigger>
          <SelectContent className="bg-[#313131] text-gray-50 border-foreground/10">
            {ModeNames.map((item) => (
              <SelectItem
                key={item.name}
                value={item.name}
                className="cursor-pointer capitalize"
              >
                {item.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Famille */}
      <div className="w-full max-w-[150px] rounded-md h-[38px]">
        <Select onValueChange={(e: string) => handleScaleByFamily(e)}>
          <SelectTrigger className="h-[36px] border-none bg-[#313131]" title="Trier les gammes par famille">
            <SelectValue
              placeholder={searchFamily ? searchFamily : "Famille"}
              className="capitalize text-xs"
            />
          </SelectTrigger>
          <SelectContent className="text-gray-50 border-foreground/10 ">
            {scaleFamilies.map((family) => (
              <SelectItem
                value={family.name}
                className="cursor-pointer capitalize "
                key={family.name}
              >
                {family.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Reset */}
      <Button className="h-9 w-9 bg-[#313131] p-0" onClick={handleResetParams} title="Réinitialiser les filtres">
        <RotateCcw className="h-5 w-5" />
      </Button>
    </div>
  )
}

export default ScaleFilter