import React, { useState } from 'react';
import './Todo.css';
import { InputGroup, FormControl } from 'react-bootstrap';
import { useSelector } from 'react-redux';

function Todo({completed, title, updateTaskInCollection, id}) {

  const taskView = useSelector(state => {        
    return state.todos.taskView;
  });

  const viewAll = taskView === "ALL";
  const viewActive = taskView === "ACTIVE";
  const viewComplete = taskView === "COMPLETED";

  const [isComplete, setIsComplete] = useState(completed);  
  const [task, setTask] = useState(title);

  const onEditTask = () => {    
    // update the collection
    updateTaskInCollection({
      id,
      prop: "title",
      value : task      
    });
  }

  const onDeletetask = () => {    
    // update the collection
    updateTaskInCollection({
      id,
      prop: "delete",
      value : isComplete      
    });
  };

  const onCompleteChange = () => {    
    setIsComplete(!isComplete);
    // update the collection
    updateTaskInCollection({
      id,
      prop: "completed",
      value : !isComplete      
    });
  }

  return (    
    <li className={viewAll ? "show" : (viewActive && !isComplete ? "show" : (viewComplete && isComplete ? "show" : "hide"))}>
      <InputGroup className="mb-3">
        <InputGroup.Prepend>
          <InputGroup.Checkbox aria-label={`Checkbox for following task ${title}`} checked={isComplete} onChange={onCompleteChange} />
        </InputGroup.Prepend>
        <FormControl aria-label="input checkbox to mark the task as completed" value={task} disabled={isComplete} onChange={(e) => setTask(e.target.value)} />
        {
          !isComplete && (
            <InputGroup.Append>
                <InputGroup.Text className="btn btn-info" onClick={onEditTask}>Edit</InputGroup.Text>
                <InputGroup.Text className="btn btn-danger" onClick={onDeletetask}>Delete</InputGroup.Text>
            </InputGroup.Append>            
          )
        }   
        </InputGroup>           
    </li>
  )
}

export default Todo;
