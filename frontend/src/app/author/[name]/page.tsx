import { BackendService } from "~/services/BackendService";
import styles from "./page.module.css";
import { PostCard } from "~/components/PostCard/PostCard";

export default async function Page({
  params,
}: {
  params: Promise<{ name: string }>;
}) {
  const author = (await params).name;
  const backend = new BackendService();
  const data = await backend.getPostsByAuthor({ author });

  if (typeof data !== "object") {
    return data;
  }

  return (
    <div className={styles.page}>
      <h1>All posts of {author}</h1>
      <div className={styles.posts}>
        {data.map((post) => (
          <PostCard key={post.id} data={post} />
        ))}
      </div>
    </div>
  );
}
