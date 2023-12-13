//
import ReactDOM from "react-dom/client";
import "./assets/style/global.css";
import "./assets/style/reset.css";
import Routes from "./Routes/index";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <Routes />
  </QueryClientProvider>
);
