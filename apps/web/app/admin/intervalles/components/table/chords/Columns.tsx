"use client"

import { Button } from "@/components/ui/button"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"
import { CellAction } from "./CellActions"


export type ChordsIntervalColumns = {
  id: number;
  name: string;
  details: string;
  chordsCount: number;
}

export const ChordsIntervalColumns: ColumnDef<ChordsIntervalColumns>[] = [
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
    accessorKey: "details",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Détails
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
