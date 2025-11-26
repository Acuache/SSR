import type {APIRoute} from 'astro'
import { getCollection } from 'astro:content'
export const prerender = false
export const GET: APIRoute = async ({params, request}) => {
  const blogs = await getCollection("blog")
  const url = new URL(request.url)
  const id = url.searchParams.get('id')
  const filterBlogs = blogs.filter((blog) => blog.id === id)
  console.log(blogs)
  console.log("------")
  console.log(id)
  console.log("************")
  console.log(filterBlogs)
 
  return new Response(JSON.stringify(filterBlogs), {
    status: 200,
    headers: {
      "Content-Type" : "application/json"
    }
  })
}