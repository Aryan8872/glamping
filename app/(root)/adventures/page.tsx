import { getAdventuresService } from "@/features/adventure/service/adventureService"
import AdventureCard from "@/features/adventure/ui/AdventureCard"

export default async function Adventures() {
    const data = await getAdventuresService()
    console.log(data)
    return (
        <div>
            <AdventureCard data={data}/>
        </div>
    )
}