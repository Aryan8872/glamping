import { BlogList } from "./BlogList";
import { buildUrl } from "@/lib/http/http";

export default async function Blogs() {
  const blogs = await fetch(buildUrl("blog/all"));
  const data = await blogs.json();
  const blogsData = data.data;
  return (
    <div>
      <BlogList blogs={blogsData} />
    </div>
  );
}
