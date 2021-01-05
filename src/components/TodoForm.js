import React, { useState } from 'react';
import { Jumbotron , Container, Form, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { addTodo } from '../actions/TodoActions';
// firebase
import db from '../firebase';

function TodoForm() {
  const user = useSelector(state => state.user.user);

  // Flat button
  const FlatButtonStyle = {
    "backgroundColor": "purple",
    "color": "white"
  };
  // Input state
  const [input, setInput] = useState("");

  const dispatch = useDispatch();

  const onAddNewTodo = (e) => {
    e.preventDefault(); 
    if(input) {
      setInput("");
      const todo = {              
        title: input,
        completed: false
      };    
      // Update to DB
      try {
        db.collection('users')
        .doc(user.uid)
        .collection('todos')      
        .add(todo)
        .then((docRef) => {                  
          dispatch(addTodo({
            id: docRef.id,
            data : todo     
          }));                   
        })
        .catch(err => console.log(err.message));
      } catch (error) {}      
    }           
  };

  return (
    <Jumbotron fluid>
      <Container>        
        <Form onSubmit={onAddNewTodo}>
          <Form.Group controlId="exampleForm.ControlTextarea1">
            <Form.Label><h1>What needs to be done?</h1></Form.Label>
            <Form.Control as="input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
          </Form.Group>
          {/** The button will be disabled if there is no text */}
          <Button variant="flat" disabled={!input} style={FlatButtonStyle}
            type="submit">Add</Button>
        </Form>      
      </Container>      
    </Jumbotron>
  )
}

export default TodoForm;
