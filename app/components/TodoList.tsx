import { ITask } from "@/types/task";
import React from "react";
import Task from "./Task";

interface TodoListProps {
    tasks: ITask[]
}

const TodoList: React.FC<TodoListProps> = ({ tasks }) => {
    return <div className="overflow-x-auto">
        Todo List
        <table className="table table-zebra">
            {/* Head */}
            <thead>
                <tr>
                    <th>Task Name</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {tasks.map(tasks => (
                    <Task key={tasks.id} task={tasks}/>
                ))}
            </tbody>
        </table>
    </div>;
};

export default TodoList;