export type TTodoLists = {
    thing: string;
    isComplete: boolean;
    startTime: number;
    endTime: string;
    remindTime: string;
    condition: "All" | "Complete" | "Incomplete";
}

export type TAddTodoProps = (newTodoList: string,newEndTime: string) => void

export type TToggleTodoLists = (selectedTodoLists: TTodoLists) => void