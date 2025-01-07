import { BackendService } from "~/services/BackendService";
import styles from "./page.module.css";
import { PostCard } from "~/components/PostCard/PostCard";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const pageid = Number((await params).id);
  const backend = new BackendService();
  const data = await backend.getPostById({ id: pageid });

  if (typeof data === "number") {
    return "404";
  }

  return (
    <div className={styles.page}>
      <PostCard key={data.id} data={data} />
    </div>
  );
}
