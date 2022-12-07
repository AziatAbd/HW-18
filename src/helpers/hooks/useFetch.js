import { useEffect, useState } from "react";

const useFetch = (list, url) => {
  const [todos, setTodos] = useState(list);

  const addItem = async (newItem) => {
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newItem),
      });
      
    } catch (error) {}
    getFetchTodo();
  };
  const getFetchTodo = async () => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      const loding = [];

      for (const key in data) {
        loding.push({
          id: key,
          text: data[key].text,
        });
      }
      setTodos(loding);
    } catch (error) {
      console.log(error);
    }
  };
  const removeItemHandler = async (todoId) => {
    try {
      await fetch(
        `https://custom-hook-fdcdf-default-rtdb.firebaseio.com/todo/${todoId}.json`,
        {
          method: "delete",
        }
      );
    } catch (error) {
      console.log(error);
    }
    getFetchTodo();
  };
  return {
    todos,
    addItem,
    getFetchTodo,
    removeItemHandler,
  };
};
export default useFetch;
