import { Spacer } from "~/components/Spacer/Spacer";
import { ClientPart } from "./ClientPart";
import { BackendService } from "~/services/BackendService";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const postid = Number((await params).id);
  const data = await BackendService.getPostById({ id: postid });

  if (typeof data === "number") return data;

  return (
    <>
      <h1>Editor: </h1>
      <Spacer size={12} />
      <ClientPart initvalue={data.body} id={data.id} />
    </>
  );
}
