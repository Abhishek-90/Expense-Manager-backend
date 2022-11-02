import dotenv from "dotenv";

dotenv.config({path:".env"});

export const databaseURL:string = process.env.DATABASE_URL!;
export const encryptionKey:string = process.env.ENCRYPTION_KEY!;
export const port:string = process.env.PORT!;
export const frontendURL:string = process.env.FRONTEND_URL!;