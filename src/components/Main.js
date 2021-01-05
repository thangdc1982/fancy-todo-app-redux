import React, {useState, useEffect} from 'react';
import './Main.css';
import logo from '../logo.svg';
import TodoForm from './TodoForm';
import Nav from './Nav';
import Todos from './Todos';
// Redux
import { useSelector } from 'react-redux';
// firebase
import db, { auth } from '../firebase';

function Main() {
  const user = useSelector(state => state.user.user);

  const [items, setItems] = useState([]);

  const signOut = () => {
    if (user) {
      auth.signOut();
    }
  };

  useEffect(() => {   
    // fetch data from firestore db
    if (user) {
      db.collection('users')
        .doc(user.uid)
        .collection('todos')
        .onSnapshot(snaphot => {
          setItems(snaphot.docs.map(doc => {                       
            return {
              id: doc.id, 
              data: doc.data()
            };
          }));           
        });      
    }    
  }, [user])

  return (
    <div className="main">
      <header className="main-header">
        <img src={logo} className="main-logo" alt="logo" />        
        <h1>Todo Demo Application</h1>
        <div onClick={signOut} className="signOut-button">
          <img src={user.photo} alt="Avatar" className="avatar"></img>
          <h3>Hello, {user.displayName}</h3>
        </div>                
      </header>
      <div>
        <TodoForm />        
      </div>
      <div>
        <Nav />
      </div>
      <div>
        <Todos items={items} />
      </div>
    </div>
  )
}

export default Main;
