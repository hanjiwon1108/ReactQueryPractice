import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import TodoList from "./TodoList";
import TodoListWithOptions from "./TodoListWithOptions";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div>
        <h1>React Query 데모</h1>
        <TodoList />
        <h2>TodoListWithOptions</h2>
        <TodoListWithOptions />
      </div>
    </QueryClientProvider>
  );
}

export default App;
