import { getCollection } from 'astro:content';
import { Clients, db, Posts } from 'astro:db';

// https://astro.build/db/seed
export default async function seed() {

  await db.insert(Clients).values([
    { id: 1, name: "Laura", age: 24, isActive: true },
    { id: 2, name: "Miguel", age: 18, isActive: false },
    { id: 3, name: "Veronica", age: 68, isActive: false },
    { id: 4, name: "Luis", age: 16, isActive: true },
  ]);

  const posts = await getCollection("blog")
  await db.insert(Posts).values(
    posts.map((post) => ({
      id: post.id,
      title: post.data.title, 
      likes: Math.round(Math.random() * 100)
    }))
  )


  console.log("seed executed")
}
