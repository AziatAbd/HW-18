import { useEffect, useState } from "react";
import "./App.css";
import useFetch from "./helpers/hooks/useFetch";


// const option = {
//   todos: [], 
//   addItem:
// }

function App() {
  const [todo, setTodo] = useState("");
  const [isNot, setIsNot] = useState(false)

  const BASE_URL = 'https://custom-hook-fdcdf-default-rtdb.firebaseio.com/todo.json'
  const {todos, addItem, getFetchTodo, removeItemHandler} = useFetch([], BASE_URL)

  const addTodoHandler = (e) => {
    e.preventDefault();
    addItem({text: todo})
    setTodo('')
  };

  
  const deletehandler = (todoId) => {
    
      removeItemHandler(todoId)
      getFetchTodo(todoId)
    
  }
    useEffect(() => {
      getFetchTodo();
    }, []);

  return (
    <div className="App">
      <form onSubmit={addTodoHandler}>
        <input type="text" value={todo} onChange={(e) => setTodo(e.target.value)} />
        <button>add Todo</button>
      </form>
      <div>
        {todos.map((item) => (
          <li key={item.id}>{item.text}
          <button onClick={()=>deletehandler(item.id)}>delete</button>
          </li>
        ))}
      </div>
    </div>
  );
}

export default App;
