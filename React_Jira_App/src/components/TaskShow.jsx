import { useState } from "react";
import TaskCreate from "./TaskCreate";

function TaskShow({task, onDelete, onUpdate}) {
    const [showEdit, setShowEdit] = useState(false);
    const handleDelete = ()=>{
        onDelete(task.id)
    }

    const handleEditClick = ()=>{
        setShowEdit(!showEdit);
    }

    const handleSubmit = (id, updatedTitle, updatedTaskDesc)=>{
        setShowEdit(false);
        onUpdate(id, updatedTitle, updatedTaskDesc);
    }
    return ( 
    <div className="task-show">

        {showEdit ? <TaskCreate task={task} taskFormUpdate={true} onUpdate={handleSubmit}/> : <div>
        <h3 className="task-title">Göreviniz</h3>
        <p>{task.title}</p>
        <h3 className="task-title">Yapılacaklar</h3>
        <p>{task.taskDesc}</p>
        <div>
        <button className="task-delete" onClick={handleDelete}>Sil</button>
        <button className="task-edit" onClick={handleEditClick}>Güncelle</button>
        </div>
            </div>}

        
    </div> 
    );
}

export default TaskShow;