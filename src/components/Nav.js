import React from 'react';
import './Nav.css';
import { Form, FormCheck } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { filterTodo } from '../actions/TodoActions';

function Nav() {  
  const taskVieww = useSelector(state => {    
    return state.todos.taskView || "ALL";
  });

  const dispatch = useDispatch();  

  /*
   * The second argument that will be passed to
   * `handleChange` from `ToggleButtonGroup`
   * is the SyntheticEvent object, but we are
   * not using it in this example so we will omit it.
   */
  const handleChange = (e) => {              
    dispatch(filterTodo(e.target.value));
  };

  return (
    <div className="nav">
      <Form>
        <div className="mb-3">
          <FormCheck className="text-sewcondary"                         
            inline
            label="Show all tasks"
            type="radio"
            value="ALL"
            checked={taskVieww === "ALL"}
            onChange={handleChange}
            id="show-all-tasks"
          ></FormCheck>
           <FormCheck className="text-primary"             
            inline
            label="Show active tasks"
            type="radio"
            value="ACTIVE"
            checked={taskVieww === "ACTIVE"}
            onChange={handleChange}
            id="show-active-tasks"
          ></FormCheck>
           <FormCheck className="text-success"             
            inline
            label="Show completed tasks"
            type="radio"
            value="COMPLETED"
            checked={taskVieww === "COMPLETED"}
            onChange={handleChange}
            id="show-completed-tasks"
          ></FormCheck>
        </div>
      </Form>
    </div>
  )
}

export default Nav;
