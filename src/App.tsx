import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import TodoList from "./TodoList";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div>
        <h1>React Query 데모</h1>
        <TodoList />
      </div>
    </QueryClientProvider>
  );
}

export default App;
