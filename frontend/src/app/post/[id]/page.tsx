import { BackendService } from "~/services/BackendService";
import { PostCard } from "~/components/PostCard/PostCard";
import { Spacer } from "~/components/Spacer/Spacer";
import { MDXRemote } from "next-mdx-remote/rsc";

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
    <>
      <PostCard key={data.id} data={data} />
      <Spacer size={10} />
      <hr style={{ width: "40%" }} />
      <Spacer size={10} />
      {/* TODO: сделать нормальное отображение body */}
      <MDXRemote source={data.body} />
    </>
  );
}
