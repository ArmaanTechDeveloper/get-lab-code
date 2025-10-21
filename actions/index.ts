'use server'

import prisma from "@/db";

const createNewPath = async (path: string) => {
    const newpath = await prisma.paths.create({
        data:{
            path
        }
    })

    return newpath
}

const getAllPath = async () => {
    const paths = await prisma.paths.findMany({
        orderBy:{
            id: 'desc'
        }
    });
    return paths
}

export {
    createNewPath,
    getAllPath
}