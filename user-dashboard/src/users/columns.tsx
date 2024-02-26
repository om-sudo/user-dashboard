"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react" 
import { Button } from "@/components/ui/button"
import DeleteUserDetailModal from "@/components/delete-user-detail-Modal"
import UpdateUserDetailModal from "@/components/update-user-detail-Modal"
export type User = {
  id: string
  name: string
  email: string
  country: string
  lastUpdate: string
}

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "name",
    header: "Name",
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
  {
    accessorKey: "country",
    header: "Country",
  },
  { 
    accessorKey: "lastUpdate",
    header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Last Update
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
    cell: ({ row }) => {
        const date = new Date(row.getValue('lastUpdate'));
        const formatted = date.toLocaleDateString();
        return <div className="font-medium">{formatted}</div>
    }
  },
  {
    id: "delete",
    header:"delete",
    cell: ({ row }) => {
      const user = row.original;
 
      return (
        <DeleteUserDetailModal value={user}/>
      )
    },
  },
  {
    id: "update",
    header:"update",
    cell: ({ row }) => {
      const user = row.original;
      return (
        <UpdateUserDetailModal value={user}/>
      )
    },
  },
]
