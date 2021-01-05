export const fetchTodo = (payload) => {     
  return {
    type: "FETCH_TODO", 
    payload   
  };  
};

export const addTodo = (payload) => {
  return {
    type: "ADD_TODO",
    payload
  }
};

export const updateTodo = (payload) => {
  return {
    type: "UPDATE_TODO",
    payload
  }
};

export const deleteTodo = (id) => {
  return {
    type: "DELETE_TODO",
    payload: id
  }
};

export const filterTodo = (view) => {
  return {
    type: "FILTER_TODO",
    payload: view
  }
};