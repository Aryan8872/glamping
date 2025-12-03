"use server"

import { getAdventuresApi } from "../api/adventureApi"

export const getAdventuresService = async () => {
    const data = await getAdventuresApi() 
    return data
}