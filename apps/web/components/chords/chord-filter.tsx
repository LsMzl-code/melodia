'use client'

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "../ui/button";
import { RotateCcw } from "lucide-react";

const ChordFilter = () => {
  //***** URL PARAMS *****//
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const searchMode = searchParams.get("mode");
  const searchTonality = searchParams.get("tonality");
  const searchFamily = searchParams.get("family");

  //***** STATES *****//
  // Dièse ou bémol
  const [armor, setArmor] = useState<string>("♯");
  // Gamme par nom
  const [scaleName, setScaleName] = useState<string>("");

  // Dièse ou bémol
  const handleArmor = () => {
    if (armor === "♯") {
      setArmor("♭");
      //  sendFiltersToParent("♭");
    } else if (armor === "♭") {
      setArmor("♯");
      //  sendFiltersToParent("♯");
    }
  };

  // Choix du mode
  const handleMode = (e: string) => {
    const params = new URLSearchParams(searchParams);
    if (e == "reset") {
      params.delete("mode");
      replace(`${pathname}?${params.toString()}`);
    } else {
      params.set("mode", e);
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
      params.set("family", e);
      replace(`${pathname}?${params.toString()}`);
    }
  };
  
  // Choix de la gamme
  const handleScaleByName = (e: any) => {
    setScaleName(e);
    // sendFiltersToParent(e);
  };

  return (
    <div className="flex items-center justify-start md:justify-end gap-2">

      {/* Mode */}
      <div className="w-full max-w-[85px] rounded-md h-[38px]">
        <Select onValueChange={(e: string) => handleMode(e)}>
          <SelectTrigger className="h-[36px] border-none bg-[#313131]">
            <SelectValue
              placeholder={searchMode ? searchMode : "Mode"}
              className="capitalize text-xs text-start"
            />
          </SelectTrigger>
          <SelectContent className="bg-[#313131] text-gray-50 border-foreground/10">
            <SelectItem value="reset">Reset</SelectItem>
            {/* {allModes.map((item) => (
                     <SelectItem
                        key={uuidv4()}
                        value={item.name}
                        className="cursor-pointer capitalize even:bg-foreground/5"
                     >
                        {item.name}
                     </SelectItem>
                  ))} */}
          </SelectContent>
        </Select>
      </div>

      {/* Famille */}
      <div className="w-full max-w-[150px] rounded-md h-[38px]">
        <Select onValueChange={(e: string) => handleScaleByFamily(e)}>
          <SelectTrigger className="h-[36px] border-none bg-[#313131]">
            <SelectValue
              placeholder={searchFamily ? searchFamily : "Famille"}
              className="capitalize text-xs"
            />
          </SelectTrigger>
          <SelectContent className="bg-[#313131] text-gray-50 border-foreground/10">
            {/* <SelectItem value="reset">Reset</SelectItem>
                  {allScaleFamilies.map((family) => (
                     <SelectItem
                        value={family.name}
                        className="cursor-pointer capitalize even:bg-foreground/5"
                        key={uuidv4()}
                     >
                        {family.name}
                     </SelectItem>
                  ))} */}
          </SelectContent>
        </Select>
      </div>

      {/* Accords */}
      <div className="w-full max-w-[190px] rounded-md h-[38px]">
        <Select
          onValueChange={(e: string) => handleScaleByName(e)}
          disabled={
            searchTonality == "" ||
            (searchTonality == "" && searchMode != "") ||
            (searchTonality == "" && searchFamily != "")
          }
        >
          <SelectTrigger className="h-[36px] border-none bg-[#313131]">
            <SelectValue
              placeholder={scaleName ? scaleName : "Accords"}
              className="capitalize text-xs"
            />
          </SelectTrigger>
          <SelectContent className="bg-[#313131] text-gray-50 border-foreground/10">
            {/* Tonalité selectionnée */}
            {/* {searchTonality &&
                     searchMode == "" &&
                     searchFamily == "" &&
                     scaleByTonality.map((item) => (
                        <SelectItem
                           key={uuidv4()}
                           value={item.name.name}
                           className="cursor-pointer capitalize bg-foreground/5"
                        >
                           {item.name.name}
                        </SelectItem>
                     ))} */}
            {/* Mode selectionné */}
            {/* {!searchTonality &&
                     searchMode != "" &&
                     searchFamily == "" &&
                     scaleByMode.map((item) => (
                        <SelectItem
                           key={uuidv4()}
                           value={item.name}
                           className="cursor-pointer capitalize bg-foreground/5"
                        >
                           {item.name}
                        </SelectItem>
                     ))} */}
            {/* Tonalité et mode selectionnés */}
            {/* {searchTonality &&
                     searchMode != "" &&
                     searchFamily == "" &&
                     scaleByTonalityAndMode.map((item) => (
                        <SelectItem
                           key={uuidv4()}
                           value={item.name.name}
                           className="cursor-pointer capitalize bg-foreground/5"
                        >
                           {item.name.name}
                        </SelectItem>
                     ))} */}
            {/* Tonalité et famille selectionnés */}
            {/* {searchTonality &&
                     searchMode == "" &&
                     searchFamily != "" &&
                     scaleByTonalityAndFamily.map((item) => (
                        <SelectItem
                           key={uuidv4()}
                           value={item.name.name}
                           className="cursor-pointer capitalize bg-foreground/5"
                        >
                           {item.name.name}
                        </SelectItem>
                     ))} */}
          </SelectContent>
        </Select>
      </div>

      {/* Reset */}
      <Button className="h-9 w-9 bg-[#313131] p-0">
        <RotateCcw className="h-5 w-5" />
      </Button>

    </div>
  )
}

export default ChordFilter