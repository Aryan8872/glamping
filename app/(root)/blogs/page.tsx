import { BlogList } from "./BlogList";

export default async function Blogs() {
  const blogs = await fetch("http://localhost:8080/blog/all");
  const data = await blogs.json();
  const blogsData = data.data;
  return (
    <div>
      <BlogList blogs={blogsData} />
    </div>
  );
}
