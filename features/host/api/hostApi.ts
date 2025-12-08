import { HttpGet } from "@/lib/http/http";
import { Host } from "../types/HostTypes";

const HOST_TAG = "hosts";

export async function apiGetFeaturedHosts() {
    const response = await HttpGet("user/featured-hosts", {
        next: {
            tags: [HOST_TAG]
        }
    });
    // userController.js: res.status(200).json({ data: hosts })
    return (response as any).data as Host[];
}
