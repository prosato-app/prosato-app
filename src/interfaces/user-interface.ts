import type { UserInAccount } from "@/interfaces/user-in-account-interface"

type UserStatus =
    "ACTIVE" |
    "INACTIVE" |
    "PAUSED" |
    "SUSPENDED" |
    "PENDING"

export interface UserDetailed {
    id: string
    email: string
    firstName: string
    lastName: string | null
    birthDate: Date | null
    phone: string | null
    address: string | null
    profilePicture: string | null
    createdAt: Date
}

export interface User {
    id: string
    email: string
    passwordHash: string
    status: UserStatus
    firstName: string
    lastName: string | null
    birthDate: Date | null
    phone: string | null
    address: string | null
    profilePicture: string | null
    userInAccount?: UserInAccount
    createdAt: Date
    updatedAt: Date
    deletedAt: Date | null
}