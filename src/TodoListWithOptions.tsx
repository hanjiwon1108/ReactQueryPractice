import React from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchTodos } from "./api/todoApi";

type Todo = {
  id: number;
  title: string;
  completed: boolean;
};

const TodoListWithOptions: React.FC = () => {
  const { data, error, isLoading } = useQuery<Todo[], Error>({
    queryKey: ["todos"],
    queryFn: fetchTodos,
    staleTime: 1000 * 60,
    refetchOnWindowFocus: true,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error occurred: {error.message}</div>;

  const todos = data ?? [];

  return (
    <select>
      {todos.slice(0, 10).map((todo) => (
        <option key={todo.id} value={todo.id} selected={todo.completed}>
          {todo.title}
        </option>
      ))}
    </select>
  );
};

export default TodoListWithOptions;
