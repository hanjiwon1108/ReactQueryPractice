import React from "react";
import { useQuery } from "@tanstack/react-query";

type Todo = {
  id: number;
  title: string;
  completed: boolean;
};

async function fetchTodos(): Promise<Todo[]> {
  const res = await fetch("https://jsonplaceholder.typicode.com/todos");
  if (!res.ok) {
    throw new Error("Network response was not ok");
  }
  return res.json();
}

const TodoListWithOptions: React.FC = () => {
  const { data, error, isLoading } = useQuery<Todo[], Error>({
    queryKey: ["todos"],
    queryFn: fetchTodos,
    staleTime: 1000 * 60, // 1 minute
    refetchOnWindowFocus: true, // Refetch on window focus
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error occurred: {error.message}</div>;

  const todos = data ?? []; // Ensure `data` is an array

  return (
    <ul>
      {todos.slice(0, 10).map((todo) => (
        <li key={todo.id}>
          {todo.title} {todo.completed ? "✅" : "❌"}
        </li>
      ))}
    </ul>
  );
};

export default TodoListWithOptions;
