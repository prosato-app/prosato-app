import type { UserInAccount } from "@/interfaces/user-in-account-interface"

type AccountStatus = "ACTIVE" | "INACTIVE" | "PAUSED" | "FINISHED"

export interface Account {
    id: string
    status: AccountStatus
    createdAt: Date
    updatedAt: Date
    deletedAt?: Date | null
    usersInAccount?: UserInAccount[]
}