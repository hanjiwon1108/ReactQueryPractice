import React, { useState } from "react";
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

  const [todosState, setTodosState] = useState<Todo[]>([]);

  React.useEffect(() => {
    if (data) {
      setTodosState(data.slice(0, 10)); // 처음 10개의 데이터를 상태로 설정
    }
  }, [data]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error occurred: {error.message}</div>;

  const handleCheckboxChange = (id: number) => {
    setTodosState((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
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
