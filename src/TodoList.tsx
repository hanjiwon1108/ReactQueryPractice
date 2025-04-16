import React from "react";
import { useQuery } from "@tanstack/react-query";

type Todo = {
  id: number;
  title: string;
  completed: boolean;
};

async function fetchTodos(): Promise<Todo[]> {
  const response = await fetch("https://jsonplaceholder.typicode.com/todos");
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
}

const TodoList: React.FC = () => {
  const { data, error, isLoading } = useQuery<Todo[], Error>({
    queryKey: ["todos"],
    queryFn: fetchTodos,
  });

  if (isLoading) return <div>로딩 중...</div>;
  if (error) return <div>에러 발생: {error.message}</div>;

  return (
    <ul>
      {data?.slice(0, 10).map((todo) => (
        <li key={todo.id}>
          {todo.title} {todo.completed ? "✅" : "❌"}
        </li>
      )) || <div>데이터가 없습니다.</div>}
    </ul>
  );
};

export default TodoList;
