/**
 * Sample code for 345Tool.com blog
 * @license MIT
 * License: https://github.com/345Tool/blog-examples/LICENSE
 */
import { serve, ServerRequest } from "https://deno.land/std/http/server.ts";
import { listUsers, addUser, User } from "./user-service.ts";

const respondNotFound = (req: ServerRequest) =>
  req.respond({
    status: 404,
    body: "request not found!",
  });

const respondWithBody = <T>(req: ServerRequest, body?: T) => {
  const headers = new Headers();
  headers.append("Content-Type", "application/json");

  req.respond({
    status: 200,
    headers,
    body: JSON.stringify(body),
  });
};

/**
 * read the request body stream and return the parsed body object
 * @param req servre request object
 */
const parseRequestBody = async <T>(req: ServerRequest): Promise<T> => {
  const buf = new Uint8Array(req.contentLength || 0);
  let bufSlice = buf;
  let totRead = 0;
  while (true) {
    const nread = await req.body.read(bufSlice);
    if (nread === null) break;
    totRead += nread;
    if (totRead >= req.contentLength!) break;
    bufSlice = bufSlice.subarray(nread);
  }
  const str = new TextDecoder("utf-8").decode(bufSlice);
  return JSON.parse(str) as T;
};

const app = serve({ port: 4040 });

for await (const req of app) {
  switch (req.url) {
    case "/user": {
      switch (req.method) {
        case "POST": {
          const newUser = await parseRequestBody<User>(req);
          addUser(newUser);
          respondWithBody(req, true);
          break;
        }
        default:
          respondNotFound(req);
      }
      break;
    }
    case "/users": {
      switch (req.method) {
        case "GET": {
          respondWithBody<User[]>(req, listUsers());
          break;
        }
        default:
          respondNotFound(req);
      }
      break;
    }
    default:
      respondNotFound(req);
  }
}
