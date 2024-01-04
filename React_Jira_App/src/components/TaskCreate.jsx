import { useState } from "react";

function TaskCreate({onCreate, task, taskFormUpdate, onUpdate}) {
    const [title, setTitle] = useState(task ? task.title : '');
    const [taskDesc, settaskDesc] = useState(task ? task.taskDesc : '');

    const handleChange = (e) =>{
        setTitle(e.target.value)
    }

    const handleTaskChange = (e) =>{
        settaskDesc(e.target.value)
    }

    const handleSubmit = (e) =>{
        e.preventDefault();
        if(taskFormUpdate){
            onUpdate(task.id, title,taskDesc)
        }
        else{
            onCreate(title, taskDesc);
        }
        
        setTitle('');       
        settaskDesc('');        //gönderme işleminden sonra formu temizleme.
    }
  
    return ( 
    <div>
        {taskFormUpdate ?  <div className="task-update">
    <h3>Lütfen Task Düzenleyiniz</h3>
    <form className="task-form" onSubmit={handleSubmit}>
        <label className="task-label"> Başlık Düzenleyiniz </label>
        <input className="task-input" value={title} onChange={handleChange} />
        <label className="task-label"> Task Düzenleyiniz </label>
        <textarea className="task-input" rows={5} value={taskDesc} onChange={handleTaskChange} />
        <button className="task-button update-button">Düzenle</button>
    </form>
    </div> :  <div className="task-create">
    <h3>Lütfen Task Ekleyiniz</h3>
    <form className="task-form" onSubmit={handleSubmit}>
        <label className="task-label"> Başlık </label>
        <input className="task-input" value={title} onChange={handleChange} />
        <label className="task-label"> Task Giriniz </label>
        <textarea className="task-input" rows={5} value={taskDesc} onChange={handleTaskChange} />
        <button className="task-button">Oluştur</button>
    </form>
    </div> }
    </div>
   
     );
}

export default TaskCreate ;