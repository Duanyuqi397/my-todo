export interface ITodoLists  {
    thing: string;
    isComplete: boolean;
    startTime: number;
    endTime: string;
    remindTime: string;
    condition: "All" | "Complete" | "Incomplete";
    remindCondition: string[];
}

export type TAddTodoProps = (newTodoList: string,newEndTime: string,remindCondition: string[]) => void

export type TToggleTodoLists = (selectedTodoLists: ITodoLists) => void