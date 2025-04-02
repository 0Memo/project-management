import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getUsers = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const users = await prisma.user.findMany();
        res.json(users);
    } catch (error: any) {
        res.status(500).json({ message: `Erreur lors de la recherche d'utilisateurs: ${ error.message }` });
    }
};

export const postUser = async (req: Request, res: Response) => {
    
    try {
        const {
            username,
            cognitoId,
            profilePictureUrl = "i1.jpg",
            teamId = 1,
        } = req.body;
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
        res.status(500).json({ message: `Erreur lors de la recherche d'utilisateurs: ${ error.message }` });
    }
};

/* export const updateUser = async ( req: Request, res: Response ): Promise<void> => {
    const { userId } = req.params;
    const { status } = req.body;
    try {
        const updatedUser = await prisma.user.update({
            where: {
                id: Number(userId),
            },
        });
        res.json(updatedUser);
    } catch (error: any) {
        res.status(500).json({ message: `Erreur lors de la mise à jour de l'utilisateur ${userId}: ${error.message}` });
    }
}; */