import { createSlice, nanoid } from "@reduxjs/toolkit";


const initialState = {
    todos: [{id: 1, text: "Hello world"}]
}

export const todoSlice = createSlice({
name: 'todo',
initialState,
reducers: {
    addTodo: (state, action) => {
        const todo = {
            id: nanoid(), 
           text: action.payload
        }
        state.todos.push(todo)
    },
    removeTodo: (state, action) => {
        state.todos = state.todos.filter((todo) => todo.id !== action.payload)
        
    },


      updateTodo: (state, action) => {
            const { id, newText } = action.payload;
            const todoToUpdate = state.todos.find(todo => todo.id === id);
            if (todoToUpdate) {
                todoToUpdate.text = newText;
            }
        },

     addTodo: (state, action) => {
         const todo = {
         id: nanoid(),
        text: action.payload,
        completed: false, 
        };
     state.todos.push(todo); 

      },

      toggleComplete: (state, action) => {
     const todo = state.todos.find((t) => t.id === action.payload);
     if (todo) {
          todo.completed = !todo.completed;
     }
    }

}
})
 
export const { addTodo, removeTodo, updateTodo, toggleComplete } = todoSlice.actions;


export default todoSlice.reducer