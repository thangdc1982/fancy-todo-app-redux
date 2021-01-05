import { initialState } from './index';

const updateViewTodos = (taskView, todos) => {  
  let filteredTodo = [];
  if (taskView === "ACTIVE") {
    todos.forEach(todo => {
      if (!todo.data.completed) {
        filteredTodo.push(todo);
      }
    });
  } else if (taskView === "COMPLETED") {
    todos.forEach(todo => {
      if (todo.data.completed) {
        filteredTodo.push(todo);
      }
    });
  } else {
    filteredTodo = todos;
  }      
  return filteredTodo;
};

const todoReducers = (state = initialState, action) => {
  let newTodos, newState;
  let id, index, taskView = "ALL";
  switch(action.type) {
    case "FETCH_TODO":        
      return {
        ...state,
        todos: action.payload,
        filteredTodo: action.payload,
        taskView: taskView
      }
    case "ADD_TODO":     
      id = action.payload;                  
      newTodos = [...state.todos];
      if (newTodos && newTodos.length) {
        index = newTodos.findIndex((todo) => todo.id === id);        
        if (index >= 0) {
           newTodos = [action.payload, ...state.todos];
          return {
            ...state,
            todos: newTodos,
            filteredTodo : updateViewTodos (state.taskView, newTodos)
          };   
        }
      }
      return state;     
    case "DELETE_TODO":
      // Find the todo and remove it by id
      id = action.payload;                  
      newTodos = [...state.todos];
      if (newTodos && newTodos.length) {
        index = newTodos.findIndex((todo) => todo.id === id);        
        if (index >= 0) {
          newTodos.splice(index, 1);          
        }
      }
      return {
        ...state,
        todos: newTodos,
        filteredTodo : updateViewTodos (state.taskView, newTodos)        
      };
    case "UPDATE_TODO":      
      id = action.payload.id;      
      newTodos = [...state.todos];
      if (newTodos && newTodos.length) {
        index = newTodos.findIndex((todo) => todo.id === id);        
        if (index >= 0) {
          newTodos[index].data[action.payload.prop] = action.payload.value;
        }
      }            
      return {
        ...state,
        todos: newTodos,
        filteredTodo : updateViewTodos (state.taskView, newTodos)
      };
    case "FILTER_TODO":     
      taskView = action.payload;  
      newState = Object.assign({}, state);     
      newTodos = newState.todos;    
      return {
        ...state,
        taskView: taskView,
        filteredTodo : updateViewTodos (taskView, newTodos)
      };        
    default:
      return state;
  }
};

export default todoReducers;