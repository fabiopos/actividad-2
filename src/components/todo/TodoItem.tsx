import { CheckedState } from "@radix-ui/react-checkbox";
import { Checkbox } from "../ui/checkbox";
import { cn } from "@/lib/utils";
import { Input } from "../ui/input";

interface TodoItemProps {
  id: string;
  label: string;
  isDisabled: boolean;
  onCheckedChange: (id: string, checked: CheckedState) => void;
  isDone: boolean;
  onChange: (id: string, text: string) => void;
}
export default function TodoItem(props: TodoItemProps) {
  return (
    <div className="flex flex-row items-center gap-2 mb-2">
      <Checkbox
        id="doneCb"
        disabled={props.isDisabled}
        onCheckedChange={(state) => props.onCheckedChange(props.id, state)}
      />
      {!props.isDone && (
        <Input
          placeholder="Escriba su tarea"
          value={props.label}
          onChange={(e) => props.onChange(props.id, e.target.value)}
        />
      )}
      {props.isDone && (
        <label className={cn(props.isDone ? "line-through" : "")}>
          {props.label}
        </label>
      )}
    </div>
  );
}
