import { RootState } from "@/redux/store";
import { ITask } from "@/type";
import { createSlice, nanoid, PayloadAction } from "@reduxjs/toolkit";
// import { v4 as uuidv4 } from "uuid";
interface IInitialState {
  tasks: ITask[];
  filter: "low" | "high" | "medium" | "all";
}
const initialState: IInitialState = {
  tasks: [
    {
      id: "veve-uni-id-is-here",
      title: "Task 1",
      description: "Description 1",
      dueDate: "2023-06-01",
      isCompleted: false,
      priority: "low",
    },
    {
      id: "veve-uni-is-here",
      title: "Task 1",
      description: "Description 1",
      dueDate: "2023-06-01",
      isCompleted: true,
      priority: "low",
    },
  ],
  filter: "all",
};

type TDraftTask = Pick<ITask, "title" | "description" | "dueDate" | "priority">;
const createTask = (taskData: TDraftTask): ITask => {
  return { id: nanoid(), isCompleted: false, ...taskData };
};

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<ITask>) => {
      const taskData = createTask(action.payload);
      state.tasks.push(taskData);
    },
    toggleCompleteState: (state, action: PayloadAction<string>) => {
      console.log(action);
      state.tasks.forEach((task) =>
        task.id === action.payload
          ? (task.isCompleted = !task.isCompleted)
          : task
      );
    },
    deleteTask: (state, action: PayloadAction<string>) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    },
    updateFilter: (
      state,
      action: PayloadAction<"low" | "high" | "medium" | "all">
    ) => {
      state.filter = action.payload;
    },
  },
});

export const selectTasks = (state: RootState) => {
  if (state.todo.filter === "high") {
    return state.todo.tasks.filter((task) => task.priority === "high");
  } else if (state.todo.filter === "medium") {
    return state.todo.tasks.filter((task) => task.priority === "medium");
  } else if (state.todo.filter === "low") {
    return state.todo.tasks.filter((task) => task.priority === "low");
  } else {
    return state.todo.tasks;
  }
};

export const { addTask, toggleCompleteState, deleteTask, updateFilter } =
  taskSlice.actions;

export default taskSlice.reducer;
