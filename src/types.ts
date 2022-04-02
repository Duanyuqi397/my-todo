export type TTodoLists = {
    thing: string;
    isComplete: boolean;
    condition: "All" | "Complete" | "Incomplete";
}

export type TAddTodoProps = (newTodoList: string) => void

export type TToggleTodoLists = (selectedTodoLists: TTodoLists) => void