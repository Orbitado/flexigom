import { RouterProvider } from "react-router";
import { AppProviders } from "@/app/providers/app-providers";
import { router } from "@/app/router/routes";

function App() {
  return (
    <AppProviders>
      <RouterProvider router={router} />
    </AppProviders>
  );
}

export default App;
