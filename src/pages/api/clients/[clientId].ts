import type {APIRoute} from 'astro'
import { db, Clients, eq } from 'astro:db';
export const prerender = false

export const GET: APIRoute = async({params}) => {
  const clientId = params.clientId ?? ""
  const client = await db.select().from(Clients).where(eq(Clients.id, +clientId))
  if (client.length === 0) {
    return new Response(JSON.stringify({msg: "No encontrado, o no existe"}), {
      status: 404,
      headers: {
        "Content-Type": "application/json"
      }
    })
  }
  return new Response(JSON.stringify(client.at(0)), {
    status: 200,
    headers: {
      "Content-Type": "application/json"
    }
  })
}

export const DELETE: APIRoute = async({params}) => {
  const clientId = params.clientId ?? ""
  const {rowsAffected} = await db.delete(Clients).where(eq(Clients.id, +clientId ));
  if (rowsAffected >0) {
    return new Response(JSON.stringify({msg: "Eliminado correctamente"}), {
      status: 200,
      headers: {
        "Content-Type": "application/json"
      }
    })
  }
  return new Response(JSON.stringify({msg: "Error en eliminar"}), {
    status: 404,
    headers: {
      "Content-Type": "application/json"
    }
  })
}



export const PATCH: APIRoute = async({params, request}) => {
  const clientId = params.clientId ?? ""
  try {
    const  {id, ...body} = await request.json()

    const result = await db.update(Clients).set(body).where(eq(Clients.id, +clientId))
    const updateClient = await db.select().from(Clients).where(eq(Clients.id , +clientId))
    return new Response(JSON.stringify(updateClient), {
      status: 201,
      headers: {
        "Content-Type": "application/json"
      }
    })
  } catch (error) {
    console.log(error)
    return new Response(JSON.stringify({msg: "Error"}), {
      status: 404,
      headers: {
        "Content-Type": "application/json"
      }
    })
  }
}