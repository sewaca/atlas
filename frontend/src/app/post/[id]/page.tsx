import { BackendService } from "~/services/BackendService";
import { PostCard } from "~/components/PostCard/PostCard";
import { Spacer } from "~/components/Spacer/Spacer";
import { MDXRemote } from "next-mdx-remote/rsc";
import { AuthorizationManager, Role } from "~/utils/AuthorizationManager/index";
import { Button } from "~/components/Button/Button";
import Link from "next/link";
import styles from "./page.module.css";
import { DeletePostButton } from "./DeletePostButton";



export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const pageid = Number((await params).id);
  const data = await BackendService.getPostById({ id: pageid });
  const canEdit = (await AuthorizationManager.getUserRole()) >= Role.manager;
  const canDelete = (await AuthorizationManager.getUserRole()) === Role.admin;
  

  if (typeof data === "number") {
    return "404";
  }

  return (
    <>
      <PostCard key={data.id} data={data} />
      <Spacer size={6} />
      {canEdit && (
        <div className={styles.postActions}>
          {canEdit && (
            <Link href={`/editor/${data.id}`}>
              <Button>Edit</Button>
            </Link>
          )}
          {canDelete && (<DeletePostButton id={data.id} />)}
        </div>
      )}
      <Spacer size={10} />
      <hr style={{ width: "40%" }} />
      <Spacer size={10} />
      {await MDXRemote({source: data.body})}
    </>
  );
}
