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

/* export const createUser = async (
    req: Request,
    res: Response
): Promise<void> => {
    const {
        username,
        profilePictureUrl,
        cognitoId,
        teamId
    } = req.body;
    try {
        const newUser = await prisma.user.create({
            data: {
                username,
                profilePictureUrl,
                cognitoId,
                teamId
            },
        });
        res.status(201).json(newUser);
    } catch (error: any) {
        res.status(500).json({ message: `Erreur lors de la création de l'utilisateur': ${ error.message }` });
    }
}; */

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