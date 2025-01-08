import { BackendService } from "~/services/BackendService";
import styles from "./page.module.css";
import { PostCard } from "~/components/PostCard/PostCard";
import { Spacer } from "~/components/Spacer/Spacer";

export default async function Page({
  params,
}: {
  params: Promise<{ name: string }>;
}) {
  const author = (await params).name;
  const data = await BackendService.getPostsByAuthor({ author });

  return (
    <>
      <h1>All posts of {author}</h1>
      <Spacer size={24} />
      <div className={styles.posts}>
        {typeof data !== "object"
          ? data
          : data.map((post) => <PostCard key={post.id} data={post} />)}
      </div>
    </>
  );
}
