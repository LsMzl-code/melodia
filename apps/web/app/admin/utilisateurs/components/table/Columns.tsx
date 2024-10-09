"use client"

import { Button } from "@/components/ui/button"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"
import { CellAction } from "./CellActions"


export type UsersColumns = {
  id: string;
  email: string;
  username: string;
  // currentAvatar: string | null;
  // instrument: string | null;
}

export const UsersColumns: ColumnDef<UsersColumns>[] = [
  // {
  //   accessorKey: "currentAvatar",
  //   header: ({ column }) => {
  //     return (
  //       <Button
  //         variant="ghost"
  //         onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
  //       >
  //         Avatar
  //         <ArrowUpDown className="ml-2 h-4 w-4" />
  //       </Button>
  //     )
  //   },

  // },
  {
    accessorKey: "username",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Pseudo
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },

  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  // {
  //   accessorKey: "instrument",
  //   header: ({ column }) => {
  //     return (
  //       <Button
  //         variant="ghost"
  //         onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
  //       >
  //         Instrument
  //         <ArrowUpDown className="ml-2 h-4 w-4" />
  //       </Button>
  //     )
  //   },
  // },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => (
      <CellAction data={row.original} />
    ),
  }
]