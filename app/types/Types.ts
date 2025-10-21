import { Dimensions } from "react-native";

export type Task = {
    id: number | string;
  title: string;
  description: string,
  priority: string;
  status: number;
};

export interface TaskLists {
  todo: Task[];
  inProgress: Task[];
  done: Task[];
}

export const screenWidth = Dimensions.get("screen").width;
export const screenHeight = Dimensions.get("screen").height;

export type ColumnProps = {
  title: string;
  color: string;
  tasks: Task[];
  onEditTask: (updatedTask: Task) => void;
  onDeleteTask: (id: number | string) => void
};

export type TaskCardProps = {
  task: Task;
  color: string;
  onEditTask: (updatedTask: Task) => void;
  onDeleteTask: (id: number | string) => void;
};

export type AddTaskModalProps = {
  visible: boolean;
  onClose: () => void;
  onAddTask: (title: string, description: string, priority: string) => void;
};
