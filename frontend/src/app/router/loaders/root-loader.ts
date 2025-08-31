import { type LoaderFunctionArgs } from "react-router";

export async function rootLoader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);

  return {
    pathname: url.pathname,
    timestamp: new Date().toISOString(),
  };
}
