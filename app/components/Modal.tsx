"use client";
import { addTodo, editTodo, deleteTodo } from "@/api";
import { v4 } from "uuid"
import React, { FormEventHandler, useState } from "react";
import { useRouter } from "next/navigation";
import { ITask } from "@/types/task";



interface ModalPorps {
    modalOpen: boolean
    setModalOpen: (open: boolean) => boolean | void
    setAction: string
    task?: ITask
}

const Modal: React.FC<ModalPorps> = ({ modalOpen, setModalOpen, setAction, task}) => {
    const router = useRouter()
    const [newTaskValue, setNewTaskValue] = useState<string>('')
    const [taskToEdit, setTaskToEdit] = useState<string>(task?.text)

    const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();

        if (setAction == "CREATE") {
            await addTodo({
                id: v4(),
                text: newTaskValue
            })
            setNewTaskValue("")
        }

        if (setAction == "EDIT") {
            await editTodo({
                id: task?.id,
                text: taskToEdit
            })
        }

        setModalOpen(false)
        router.refresh()
    }
    
    const handleDeleteTask = async (id:string) => {
        await deleteTodo(id)
        setModalOpen(false)
        router.refresh()
    }

    function set(){
        if (setAction == "CREATE") return newTaskValue
        if (setAction == "EDIT") return taskToEdit
    }

    const renderForm = () => {
        if (setAction == "CREATE" || setAction == "EDIT") {
            return (
                <form method="dialog" onSubmit={handleSubmit}>
                    <input 
                        value={set()} 
                        onChange={(e) => {
                            if (setAction == "CREATE") {
                                setNewTaskValue(e.target.value)
                            }
                            if (setAction == "EDIT") {
                                setTaskToEdit(e.target.value)}
                        }} 
                        type="text" 
                        placeholder="Type here" 
                        className="input input-bordered w-full" 
                    />
                    <button type="submit" className="btn btn-primary mx-8 mt-3">Submit</button>
                    <button onClick={() => setModalOpen(false)} className="btn btn-secondary mx-8 mt-3">Close</button>
                </form>
            )
        }
        if (setAction == "DELETE") {
            return (
                <div>
                    <h3 className="text-lg">
                        Are you sure, you want to delete this task?
                    </h3>
                    <div className="modal-action">
                        <button onClick={() => handleDeleteTask(task?.id)} className="btn">
                            yes
                        </button>
                    </div>
                </div>
            )
        }
    }

    return (
        <div className={`modal ${modalOpen ? "modal-open" : ""}`}>
            <div className="modal-box w-full">
                <h3 className="font-bold text-lg">New note!</h3>
                <div className="modal-action ">
                    {renderForm()}
                </div>
            </div>
        </div>
    );
};

export default Modal;