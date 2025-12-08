import { BlogList } from "./BlogList";

export default async function Blogs() {
  const blogs = await fetch(
    `${process.env.NEXT_PUBLIC_RESOLVED_API_BASE_URL}/blog/all`
  );
  const data = await blogs.json();
  const blogsData = data.data;
  return (
    <div>
      <BlogList blogs={blogsData} />
    </div>
  );
}
