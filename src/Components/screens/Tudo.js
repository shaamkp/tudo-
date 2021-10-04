import React, { useState } from "react";
import styled from "styled-components";
import { ReactComponent as Delete } from "../assets/images/delete.svg";
import { ReactComponent as Plus } from "../assets/images/plus.svg";
import { ReactComponent as Revert } from "../assets/images/revert.svg";
import { ReactComponent as TickGren } from "../assets/images/tick-green.svg";

export default function Tudo() {
  const [count, setcount] = useState(3);
  const [userInput, setUserInput] = useState("");
  const [list, setList] = useState([
    {
      id: 1,
      name: "BUy 1kg tOm",
    },
  ]);
  const [comlist, setComlist] = useState([
    {
      id: 2,
      name: "playing",
    },
  ]);

  function updateInput(value) {
    setUserInput(value);
  }

  function addItem(e) {
    if (userInput !== "") {
      let userInputObj = {
        id: count,
        name: userInput,
      };
      const listArray = [...list, userInputObj];

      setList(listArray);
      setUserInput("");
      setcount(count + 1);
    } else {
    }
  }

  function compleatedItem(id) {
    if (userInput == "") {
      const listItem = list.find((single) => single.id === id);
      const new_items = list.filter((single) => single.id !== id)
      setComlist([...comlist, listItem]);
      console.log("listItem", listItem);
      console.log("comlist", comlist);
      setList(new_items)
    }
  }

  function deleteItem(id) { 
    console.log(id);    
    const new_items = list.filter((single) => single.id !== id)
    setList(new_items)
  }

  function comDeleteItem(id) { 
    console.log(id);    
    const newcom_items = comlist.filter((comSingle) => comSingle.id !== id)
    setComlist(newcom_items)
  }

  function revertedItem(id) {
    if(userInput == ""){
    const revertItem = comlist.find((single) => single.id == id);
    const newcom_items = comlist.filter((comSingle) => comSingle.id !== id)
    setList(revertItem)
    setList([...list,revertItem]);
    console.log("revertitems", );
    setComlist(newcom_items)
    }
  }
  return (
    <>
      <div className="main">
        <div className="head">
          <h1>Todo List</h1>
        </div>
        <div className="top">
          <h2>Things to be done</h2>
          <ul className="topList">
            {list.map((item, index) => {
              return (
                <li key={index}>
                  <div className="products">
                    <div
                      className="circle"
                      onClick={() => compleatedItem(item.id)}
                    ></div>
                    <h3>
                      {item.id}, {item.name}
                    </h3>
                  </div>
                  <a href="#" onClick={()=> deleteItem(item.id)}>
                    <Delete className="delete" />
                  </a>
                </li>
              );
            })}
          </ul>
          <div className="add">
            <a>
              <Plus className="plus-svg" />
            </a>
            <form>
              <input
                type="text"
                placeholder=" Type new task"
                value={userInput}
                onChange={(e) => updateInput(e.target.value)}
                onKeyPress = {(e) => e.key === "Enter" && addItem()}
                
              />
              <button type="button" onClick={addItem} >
                Add New
              </button>
            </form>
          </div>
        </div>
        <div className="bottom">
          <h2>Completed</h2>
          <ul className="bottomList">
            {comlist.map((comlistItem, index) => {
              return (
                <li key={index}>
                  <div className="work">
                    <TickGren className="tick" />
                    <h4>
                      {comlistItem.id}, {comlistItem.name}
                    </h4>
                  </div>
                  <div className="icons">
                    <a href="#">
                      <Revert className="revert"  onClick={() => revertedItem(comlistItem.id)}/>
                    </a>{" "}
                    <a href="#" onClick={()=>comDeleteItem(comlistItem.id)}>
                      <Delete className="delete" />
                    </a>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
}
