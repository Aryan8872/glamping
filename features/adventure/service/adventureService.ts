"use server"

import { getAdventureBySlugApi, getAdventuresApi } from "../api/adventureApi"

export const getAdventuresService = async () => {
    const data = await getAdventuresApi() 
    return data
}

export const getAdventureBySlug = async(slug:string)=>{
    const data = await getAdventureBySlugApi(slug)
    return data
}