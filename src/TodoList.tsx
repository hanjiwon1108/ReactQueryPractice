import React from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchTodos } from "./api/todoApi";

type Todo = {
  id: number;
  title: string;
  completed: boolean;
};

const TodoList: React.FC = React.memo(() => {
  const {
    data: todos,
    error,
    isLoading,
  } = useQuery<Todo[], Error>({
    queryKey: ["todos"],
    queryFn: fetchTodos,
  });

  if (isLoading) {
    return <div>로딩 중...</div>;
  }

  if (error) {
    return <div>에러 발생: {error.message}</div>;
  }

  if (!todos || todos.length === 0) {
    return <div>데이터가 없습니다.</div>;
  }

  return (
    <div>
      {todos.slice(0, 10).map((todo) => (
        <div key={todo.id}>
          <label>
            <input type="checkbox" checked={todo.completed} readOnly />
            {todo.title}
          </label>
        </div>
      ))}
    </div>
  );
});

export default TodoList;
