import type { NextRequest } from "next/server";
import { getSearchResults } from "~/server/db/queries";

export async function GET(request: NextRequest) {
  const searchTerm = request.nextUrl.searchParams.get("q");
  if (!searchTerm?.length) {
    return Response.json([]);
  }

  const results = await getSearchResults(searchTerm);

  const response = Response.json(results);
  response.headers.set("Cache-Control", "public, max-age=600");
  return response;
}
