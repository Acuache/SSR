import { Clients, db } from 'astro:db';

// https://astro.build/db/seed
export default async function seed() {

  await db.insert(Clients).values([
    { id: 1, name: "Laura", age: 24, isActive: true },
    { id: 2, name: "Miguel", age: 18, isActive: false },
    { id: 3, name: "Veronica", age: 68, isActive: false },
    { id: 4, name: "Luis", age: 16, isActive: true },
  ]);
  console.log("seed executed")
}
