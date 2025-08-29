import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { Button } from "@/components/ui/button";

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex flex-col justify-center items-center min-h-svh">
        <Button>Click me</Button>
      </div>
    </QueryClientProvider>
  );
}

export default App;
