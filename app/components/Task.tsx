"use client";

import { ITask } from "@/types/task";
import { FiEdit3, FiTrash2 } from "react-icons/fi";
import React, { useState } from "react";
import Modal from './Modal';

interface TaskProps {
    task: ITask
}

const Task: React.FC<TaskProps> = ({ task }) => {
    const [openModalEdit, setOpenModalEdit] = useState(false);
    const [openModalDelete, setOpenModalDelete] = useState(false);

    return (
        <tr key={task.id}>
            <th className="w-full">
                {task.text}
            </th>
            <th className="flex gap-5">
                <FiEdit3 onClick={() => setOpenModalEdit(true)} cursor="pointer" className="text-blue-500" size={18}/>
                <Modal modalOpen={openModalEdit} setModalOpen={setOpenModalEdit} setAction={"EDIT"} task={task} />
                <FiTrash2 onClick={() => setOpenModalDelete(true)} cursor="pointer" className="text-red-500" size={18} />
                <Modal modalOpen={openModalDelete} setModalOpen={setOpenModalDelete} setAction={"DELETE"} task={task} />
            </th>
        </tr>
    );
};

export default Task;