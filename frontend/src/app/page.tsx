import styles from "./page.module.css";
import { BackendService } from "~/services/BackendService";
import { PostCard } from "~/components/PostCard/PostCard";
import { Spacer } from "~/components/Spacer/Spacer";

export default async function Home() {
  const data = await BackendService.getPostsPage({});
  const posts = Array.isArray(data) ? data : [];

  if (typeof data === "number") {
    return data;
  }

  return (
    <>
      <h1>All Posts</h1>
      <Spacer size={24} />
      <main className={styles.posts}>
        {posts.map((post) => (
          <PostCard key={post.id} data={post} />
        ))}
      </main>
    </>
  );
}
