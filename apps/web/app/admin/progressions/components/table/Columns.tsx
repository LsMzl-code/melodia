"use client"

import { Button } from "@/components/ui/button"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"
import { CellAction } from "./CellActions"


export type ChordsProgessionColumns = {
  id: number;
  name: string;

}

export const ChordsProgessionColumns: ColumnDef<ChordsProgessionColumns>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Nom
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },

  },
  {
    accessorKey: "chordsCount",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Accords
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },

  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => (
      <CellAction data={row.original} />
    ),
  }
]