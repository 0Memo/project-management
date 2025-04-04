import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getUsers = async ( req: Request, res: Response ): Promise<void> => {
    try {
        const users = await prisma.user.findMany();
        res.json(users);
    } catch (error: any) {
        res
            .status(500)
            .json({ message: `Erreur lors de la recherche d'utilisateurs: ${ error.message }` });
    }
};

export const getUser = async ( req: Request, res: Response ): Promise<void> => {
    const { cognitoId } = req.params;
    try {
        const user = await prisma.user.findUnique({
            where: {
                cognitoId: cognitoId,
            },
        });
        res.json(user);
    } catch (error: any) {
        res
            .status(500)
            .json({ message: `Erreur lors de la recherche de l'utilisateur: ${error.message}` });
    }
};

export const postUser = async (req: Request, res: Response): Promise<void> => {
    const { username, cognitoId, profilePictureUrl = "i1.jpg", teamId = 1 } = req.body;

    try {
        const existingUser = await prisma.user.findUnique({
            where: { cognitoId },
        });

        if (existingUser) {
            res.status(200).json({ message: "L'utilisateur existe déjà", user: existingUser });
            return;
        }

        const newUser = await prisma.user.create({
            data: {
                username,
                cognitoId,
                profilePictureUrl,
                teamId,
            }
        });
        res.json({ message: "Utilisateur créé", newUser });
    } catch (error: any) {
        res
            .status(500)
            .json({ message: `Erreur lors de la recherche d'utilisateurs: ${ error.message }` });
    }
};