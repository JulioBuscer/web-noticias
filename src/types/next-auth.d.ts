import "next-auth";

declare module "next-auth" {
    interface Session {
        user: {
            id: number
            name: string;
            email: string;
            token: string;
            role: string;
            isadmin: boolean;
        };
    }
}