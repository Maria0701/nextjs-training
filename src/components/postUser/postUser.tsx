import styles from "./postUser.module.css";
import { getUser } from '@/lib/data'
import Image from "next/image";

// const getData = async (id: string) => {
//   const res = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`)

//   if (!res.ok) {
//     throw new Error('something went wrong')
//   }
//   return res.json();
// }

export const PostUser = async ({ userId }: {userId: string}) => {
  console.log(userId)
  const user = await getUser(userId);

  return (
    <div className={styles.container}>
      <Image
        className={styles.avatar}
        src={user.img ? user.img : "/noavatar.png"}
        alt=""
        width={50}
        height={50}
      />
      <div className={styles.texts}>
        <span className={styles.title}>Author</span>
        <span className={styles.username}>{user.username}</span>
      </div>
    </div>
  );
};

