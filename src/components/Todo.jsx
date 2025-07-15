import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeTodo, updateTodo, toggleComplete } from '../features/todo/todoSlice';
import { updateStreak, loadStreak } from '../utils/streak';

function Todos() {
  const todos = useSelector((state) => state.todos);
  const dispatch = useDispatch();

  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState('');
  const [streak, setStreak] = useState(loadStreak().count);

  const handleEdit = (todo) => {
    setEditId(todo.id);
    setEditText(todo.text);
  };

  const handleSave = () => {
    if (editText.trim() !== '') {
      dispatch(updateTodo({ id: editId, newText: editText }));
      setEditId(null);
      setEditText('');
    }
  };

  const handleToggleComplete = (id) => {
    dispatch(toggleComplete(id));
    const updated = updateStreak();
    setStreak(updated);
  };

  return (
    <div className="max-w-xl mx-auto mt-10">
      <h2 className="text-white text-2xl font-bold mb-2 text-center">📝 My Todo List</h2>

      <div className="text-yellow-400 text-lg font-semibold text-center mb-6">
        🔥 Current Streak: {streak} Day{streak > 1 ? 's' : ''}
      </div>

      <ul>
        {todos.map((todo) => (
          <li
            key={todo.id}
            className="flex items-center justify-between bg-gray-800 rounded-xl px-4 py-3 mb-4 shadow-lg transition-all hover:scale-[1.01]"
          >
            <div className="flex items-center space-x-3 w-full">
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => handleToggleComplete(todo.id)}
                className="h-5 w-5 accent-green-500 cursor-pointer"
              />

              {editId === todo.id ? (
                <input
                  className="bg-gray-700 text-white px-3 py-1 rounded w-full outline-none focus:ring-2 ring-indigo-500"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  autoFocus
                />
              ) : (
                <span
                  className={`text-white text-lg ${
                    todo.completed ? 'line-through text-gray-400' : ''
                  }`}
                >
                  {todo.text}
                </span>
              )}
            </div>

            <div className="flex space-x-2 ml-4">
              {editId === todo.id ? (
                <button
                  onClick={handleSave}
                  className="bg-green-500 hover:bg-green-600 text-white px-4 py-1 rounded-md text-sm font-medium"
                >
                  ✅
                </button>
              ) : (
                <button
                  onClick={() => handleEdit(todo)}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded-md text-sm font-medium"
                >
                  Edit
                </button>
              )}

              <button
                onClick={() => dispatch(removeTodo(todo.id))}
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-md"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                  />
                </svg>
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Todos;