import Link from "next/link";
import styles from "./PostCard.module.css";

type Post = {
  id: number;
  title: string;
  body?: string;
  image: string;
  author: string;
};

type Props = {
  data: Post;
};
export const PostCard = ({ data }: Props) => {
  return (
    <article className={styles.item}>
      <Link href={`/post/${data.id}`} className={styles.itemlink} />
      <div className={styles.photoBG}>
        <img src={data.image} alt="image)" />
      </div>
      <h2 className={styles.title}>{data.title}</h2>
      <p className={styles.price}>
        <Link href={`/author/${data.author}`}>{data.author}</Link>
      </p>
    </article>
  );
};
