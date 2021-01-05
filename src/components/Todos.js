import React, {useEffect} from 'react';
import { Jumbotron, Container } from 'react-bootstrap';
import Todo from './Todo';
// Redux
import { useSelector, useDispatch } from 'react-redux';
import { fetchTodo, updateTodo, deleteTodo } from '../actions/TodoActions';
// firebase
import db from '../firebase';

function Todos({items}) {  
  
  const user = useSelector(state => state.user.user);

  const taskView = useSelector(state => {     
    return state.todos.taskView;
  });


  const filteredTodo = useSelector(state => {     
    return state.todos.filteredTodo;    
  });    

  const dispatch = useDispatch();  

  useEffect(() => {   
    // fetch data from firestore db
    if (user) {
      dispatch(fetchTodo(items));
    }    
  }, [dispatch, items, user])

  const updateTaskInCollection = (action) => {
    const type = action.prop;
    const id = action.id;
    const value = action.value;        

    switch (type) {
      case "delete":                  
        dispatch(deleteTodo(id));        
        // delete the document in the firestore
        db.collection('users')
          .doc(user.uid)
          .collection('todos')
          .doc(id)
          .delete();
        break;
      default:
        dispatch(updateTodo({
          id: id,
          prop: type,
          value: value
        }));
        if (type === "completed") {
          // update the DB
          db.collection('users')
            .doc(user.uid)
            .collection('todos')
            .doc(id)
            .update({
              completed: value
            })
            .then(() => console.log("Document successfully updated!"))
            .catch(error => console.error("Error updating document: ", error))
        } else {
          // update the DB
          db.collection('users')
            .doc(user.uid)
            .collection('todos')
            .doc(id)
            .update({
              title: value
            })
            .then(() => console.log("Document successfully updated!"))
            .catch(error => console.error("Error updating document: ", error))
        }
        
        break;
    }
  };  
  
  return (
    <Jumbotron fluid>
      <Container>
        {
          <h1>{filteredTodo?.length} tasks
            {taskView === "ALL" ? " total" : (taskView === "ACTIVE" ? " active" : " completed")}
          </h1>
        }        
        <ul>
          {
            filteredTodo?.map((todo) => (
              <Todo 
                key={todo.id}
                completed={todo.data.completed} 
                title={todo.data.title}
                id={todo.id}
                updateTaskInCollection={updateTaskInCollection}                               
              />  
            ))
          }                  
        </ul>        
      </Container>
    </Jumbotron>
  )
}

export default Todos;
