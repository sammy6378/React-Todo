import React, { useState, useReducer } from 'react';
import iconsun from './assets/iconsun.svg';
import cross from './assets/cross.svg'
import './sections/body.scss';
import './App.scss';

const ACTIONS = {
  ADD_TODO: 'add-todo',
  REMOVE_TODO: 'remove-todo',
  COMPLETE: 'complete',
  CLEAR_COMPLETED: 'clear-completed',
};

function reducer(todos:any, action:any) {
  switch (action.type) {
    case ACTIONS.ADD_TODO:
      return [...todos, newTodo(action.payload.name)];
    case ACTIONS.REMOVE_TODO:
      return todos.filter((todo: { id: number; }) => todo.id !== action.payload.id);
    case ACTIONS.COMPLETE:
      return todos.map((todo: { id: number; complete: boolean; }) =>
        todo.id === action.payload.id ? { ...todo, complete: !todo.complete} : todo
      );
    case ACTIONS.CLEAR_COMPLETED:
      return todos.filter((todo: { complete: boolean; }) => !todo.complete);
    default:
      return todos;
  }
}

function newTodo(name:string) {
  return {id:Date.now(),name: name, complete: false };
}

function App() {
  const [name, setName] = useState('');
  const [todos, dispatch] = useReducer(reducer, []);

  function handleKeyDown(e:React.KeyboardEvent) {
    if (e.key === 'Enter') {
      e.preventDefault();
      dispatch({ type: ACTIONS.ADD_TODO, payload: { name: name } });
      setName('');
    }
  }

  function handleSubmit(e:React.FormEvent) {
    e.preventDefault();
    dispatch({ type: ACTIONS.ADD_TODO, payload: { name: name } });
    setName('');
  }

  function completeTodo(id:number) {
    dispatch({ type: ACTIONS.COMPLETE, payload: { id: id } });
  }

  function removeTodo(id:number) {
    dispatch({ type: ACTIONS.REMOVE_TODO, payload: { id: id } });
  }

  function clearCompleted() {
    dispatch({ type: ACTIONS.CLEAR_COMPLETED });
  }

  function theme() {
    document.body.classList.toggle('bg-white');
  }

  return (
    <header>
      <div className="container">
      <div className="hero">
        <h1>TODO</h1>
        <img src={iconsun} alt="togglelight" onClick={theme} />
      </div>
      <div className="inputs">
        <label className="custom-checkbox">
          <input type="checkbox" />
          <span className="checkbox-indicator-1"></span>
        </label>
        <form onSubmit={handleSubmit}>
        <input 
         type="text"
         placeholder="Currently Typing"
         className="enter"
         value={name}
         onChange={e => setName(e.target.value)}
         onKeyDown={handleKeyDown}
        />
        </form>
      </div>

      <div className="add">
      <div className="tasks">
      {todos && todos.map((todo:{name: string, complete: boolean, id: number}) => (
        <div key={todo.id} className='item'>
          <label className="custom-checkbox">
          <input
          type="checkbox"
          checked={!todo.complete}
          onChange={() => completeTodo(todo.id)}
          />
          <span className="checkbox-indicator-1"></span>
          {todo.name}
        </label>
              
              <img src={cross} onClick={() => removeTodo(todo.id)} />
            </div>
          ))}
      </div>
      <div className="footer">
        <div className="content">
          <p><span className="count">0</span> Items left</p>
          <div className="toggle">
            <p className="active">All</p>
            <p className="uncomplete">Active</p>
            <p className="task-completed">Completed</p>
          </div>
          <p className="clear" onClick={clearCompleted}>Clear Completed</p>
        </div>
      </div>
    </div>
    </div>
    </header>
  );
}

export default App;