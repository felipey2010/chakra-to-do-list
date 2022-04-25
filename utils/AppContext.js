import React, { createContext, useState, useEffect } from "react";
import { nanoid } from "nanoid";
import { useToast } from "@chakra-ui/react";

export const AppContext = createContext({});

const AppProvider = ({ children }) => {
  const toastIdRef = React.useRef();
  const toast = useToast();
  // List to store all the todos
  const [list, setList] = useState([]);
  const loadFlag = 0;

  //Manage the list to be shown on the /create-list page
  const [toggle, setToggle] = useState(false);

  // function to add an item to the todo list
  function addItem(text) {
    const newItem = {
      id: nanoid(),
      text: text,
      checked: false,
    };
    let flag = 0;

    if (list === null) {
      setList([newItem]);
    } else {
      list.map(res => {
        // a check to avoid repeating a todo item
        if (res.text === text) {
          flag = 1;
        }
      });

      if (flag === 0) {
        setList([...list, newItem]);
      }
    }
  }

  function addToast() {
    toastIdRef.current = toast({
      description: "Uhuu! Tarefa finalizada!",
      position: "top",
      isClosable: "true",
      duration: 2000,
      status: "success",
      variant: "solid",
    });
  }

  // update the state of a todo item toggling from true to false and vice versa
  function updateList(item) {
    setList(
      list.map(res => {
        if (res.id === item.id) {
          const newItem = {
            id: item.id,
            text: item.text,
            checked: item.checked,
          };

          return newItem;
        } else {
          return res;
        }
      })
    );
  }

  // delete an item from the todo list
  function deleteItem(value) {
    setList(list.filter(item => item.id !== value.id));
  }

  // function to transfer a todo item to the completed list
  function renderCompleted(item) {
    updateList(item);
    addToast();
  }

  useEffect(() => {
    if (list) {
      localStorage.setItem("todo-list", JSON.stringify(list));
    }
  }, [list]);

  //load items stored in the local storage
  useEffect(() => {
    if (loadFlag === 0) {
      setList(JSON.parse(localStorage.getItem("todo-list")));
      loadFlag = 1;
    }
  }, []);

  return (
    <AppContext.Provider
      value={{
        list,
        setList,
        addItem,
        toggle,
        setToggle,
        renderCompleted,
        deleteItem,
        updateList,
      }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
