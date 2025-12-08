import Contact from "./Contact";
import { getContactUsContent } from "@/features/contactus/service/aboutUsService";

export default async function page() {
  let contactdata;
  try {
    contactdata = await getContactUsContent();
  } catch (error) {
    console.error("Failed to fetch contact content:", error);
    // Fallback data (Industrial Standard: Graceful Degradation)
    contactdata = {
      email: "contact@campanyon.com",
      phoneNumber: "+1 (555) 123-4567",
      address: "123 Adventure Lane, Nature City, NC 90210",
    };
  }

  return <Contact data={contactdata} />;
}
