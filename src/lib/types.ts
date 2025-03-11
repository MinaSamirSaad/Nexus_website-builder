import { Notification, Prisma, Role } from "@prisma/client";
import { getAuthUserDetails, getUserPermissions } from "./queries";

export type NotificationWithUser =
    | ({
        users: {
            id: string;
            name: string;
            email: string;
            createdAt: Date;
            updatedAt: Date;
            avatarUrl: string;
            role: Role;
            agencyId: string | null;
        }
    } & Notification)[]
    | undefined;

export type UserWithPermissionsAndSubAccount = Prisma.PromiseReturnType<typeof getUserPermissions>
export type AuthUserWithAgencySidebarOptionsSubAccounts = Prisma.PromiseReturnType<typeof getAuthUserDetails>
