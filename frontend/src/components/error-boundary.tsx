import { useRouteError, isRouteErrorResponse } from "react-router";
import { Button } from "@/components/ui/button";

export function ErrorBoundary() {
  const error = useRouteError();

  let errorMessage: string;

  if (isRouteErrorResponse(error)) {
    errorMessage = error.data?.message || error.statusText;
  } else if (error instanceof Error) {
    errorMessage = error.message;
  } else if (typeof error === "string") {
    errorMessage = error;
  } else {
    console.error(error);
    errorMessage = "Unknown error";
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-destructive">Oops!</h1>
        <p className="text-lg text-muted-foreground">
          Sorry, an unexpected error has occurred.
        </p>
        <p className="text-sm text-muted-foreground italic">{errorMessage}</p>
        <Button onClick={() => (window.location.href = "/")} variant="outline">
          Go Home
        </Button>
      </div>
    </div>
  );
}
