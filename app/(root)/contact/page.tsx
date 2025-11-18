import { getContactUs } from "@/lib/api/contact"
import Contact from "./Contact"

export default async function page(){
    const contactdata = await getContactUs()
    return(
        <Contact data={contactdata}/>
    )
}