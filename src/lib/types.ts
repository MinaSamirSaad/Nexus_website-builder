import { Notification, Role } from "@prisma/client";

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