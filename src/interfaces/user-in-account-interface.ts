type Role = "OWNER" | "MEMBER"

export interface UserInAccount {
    id: string
    userId: string
    accountId: string
    role: Role
    linkedAt: Date
    createdAt: Date
    updatedAt: Date
    deletedAt: Date | null
}