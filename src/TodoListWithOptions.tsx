import React, { useState } from "react";
import { useQuery, useMutation, UseQueryOptions } from "@tanstack/react-query";
import { fetchTodos, updateTodo } from "./api/todoApi";
import { Todo } from "./types";

const TodoListWithOptions: React.FC = () => {
  const queryOptions: UseQueryOptions<Todo[], Error> = {
    queryKey: ["todos"],
    queryFn: fetchTodos,
    staleTime: 1000 * 60,
    refetchOnWindowFocus: true,
    gcTime: 1000 * 60 * 5,
    refetchOnMount: true,
    refetchOnReconnect: true,
  };

  const { data, error, isLoading } = useQuery(queryOptions);

  const [todosState, setTodosState] = useState<Todo[]>([]);

  React.useEffect(() => {
    if (data) {
      setTodosState(data.slice(0, 10));
    }
  }, [data]);

  const mutation = useMutation(updateTodo, {
    onMutate: async (updatedTodo: Todo) => {
      // Optimistic update
      setTodosState((prevTodos) =>
        prevTodos.map((todo) =>
          todo.id === updatedTodo.id
            ? { ...todo, completed: updatedTodo.completed }
            : todo
        )
      );
    },
    onError: (error, updatedTodo, context) => {
      console.error("Error updating todo:", error);
      // Rollback logic can be added here if needed
    },
    onSettled: () => {
      // Optionally refetch todos after mutation
    },
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error occurred: {error.message}</div>;

  const handleCheckboxChange = (id: number) => {
    const todoToUpdate = todosState.find((todo) => todo.id === id);
    if (todoToUpdate) {
      mutation.mutate({ ...todoToUpdate, completed: !todoToUpdate.completed });
    }
  };

  return (
    <div>
      {todosState.map((todo) => (
        <div key={todo.id}>
          <label
            style={{ textDecoration: todo.completed ? "line-through" : "none" }}
          >
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => handleCheckboxChange(todo.id)}
            />
            {todo.title}
          </label>
        </div>
      ))}
    </div>
  );
};

export default TodoListWithOptions;
