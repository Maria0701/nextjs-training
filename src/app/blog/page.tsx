import PostCard from '@/components/postCard/postCard';
import { getPosts } from '@/lib/data'
import styles from './blog.module.css';

const getData = async () => {
  const res = await fetch('http://localhost:3000/api/blog', {next: {revalidate:3000}})

  if (!res.ok) {
    throw new Error('something went wrong')
  }
  return res.json();
}

const BlogPage = async () => {
  const posts = await getData();
  // const posts = await getPosts();
  return (
    <div className={styles.container}>
      {posts.map((post: any) => (<div className={styles.post}>
        <PostCard post={post} key={post.id}/>
      </div>))}      
    </div>
  )
};

export default BlogPage;
