import styles from "./page.module.css";
import { BackendService } from "~/services/BackendService";
import { PostCard } from "~/components/PostCard/PostCard";

export default async function Home() {
  const backend = new BackendService();
  const data = await backend.getPostsPage({});
  const posts = Array.isArray(data) ? data : [];

  if (typeof data === "number") {
    return data;
  }

  return (
    <div className={styles.page}>
      <h1>All Posts</h1>
      <main className={styles.posts}>
        {posts.map((post) => (
          <PostCard key={post.id} data={post} />
        ))}
      </main>
    </div>
  );
}
