'use server'

import prisma from "@/db";

export const runtime = "nodejs";

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
            createdAt: 'desc'
        }
    });
    return paths
}

const checkSlugExist = async (slug: string) => {

    const check = await prisma.paths.findFirst({
        where:{
            path: slug
        }
    })

    if(check){
        return {
            'found': 'success'
        }
    }
    else{
        return {
            'found': 'failed'
        }
    }
}

const postCode = async(title: string , snippet: string , slug: string) => {
    await prisma.snippets.create({
        data:{
            title: title,
            snippet: snippet,
            slugrel:{
                connect: { path: slug }
            }
        }
    })

}

const getCode = async(slug: string) => {
    const response = await prisma.snippets.findMany({
        where:{
            slug: slug
        },
        orderBy:{
            id: 'desc'
        }
    })

    return response
}


export {
    createNewPath,
    getAllPath,
    checkSlugExist,
    postCode,
    getCode
}