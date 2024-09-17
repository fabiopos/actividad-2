import TodoItem from "@/components/todo/TodoItem";
import { Button } from "@/components/ui/button";
import { CheckedState } from "@radix-ui/react-checkbox";
import { useCallback, useMemo, useState } from "react";
import { type ITodo } from "@/types/ITodo";

export default function TodoPage() {
  const [todos, setTodos] = useState<ITodo[]>([]);
  const todosCount = useMemo(() => todos.length, [todos]);
  const nextId = useMemo(() => {
    const next = todosCount + 1;
    return next.toString();
  }, [todosCount]);

  const addTodo = useCallback(() => {
    setTodos((prev) => [...prev, { done: false, id: nextId, name: "" }]);
  }, [nextId]);
  const onCheckedChange = (id: string, checked: CheckedState) => {
    setTodos((prev) =>
      prev.map((x) => {
        if (x.id === id) return { ...x, done: !!checked };
        return x;
      })
    );
  };

  const onTextChange = (id: string, text: string) => {
    setTodos((prev) =>
      prev.map((x) => {
        if (x.id === id) return { ...x, name: text };
        return x;
      })
    );
  };

  return (
    <div key={todosCount}>
      <>
        <div className="flex justify-end">
          <Button onClick={addTodo}>Add to-do</Button>
          <span>NextId = {nextId}</span>
          <span>Count = {todosCount}</span>
        </div>
        <div className="p-5">
          {todos.map((todo) => (
            <TodoItem
              key={todo.id}
              id={todo.id}
              isDisabled={false}
              isDone={todo.done}
              label={todo.name}
              onCheckedChange={onCheckedChange}
              onChange={onTextChange}
            />
          ))}
        </div>
      </>
    </div>
  );
}
