import Contact from "./Contact"
import { getContactUsContent } from "@/features/contactus/service/aboutUsService"

export default async function page(){
    const contactdata = await getContactUsContent()
    return(
        <Contact data={contactdata}/>
    )
}