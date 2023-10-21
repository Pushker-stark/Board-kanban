import React, { useEffect, useState } from "react";

import Board from "./Components/Board/Board";

import "./App.css";
import Editable from "./Components/Editabled/Editable";
import Dashboard from "./Components/Dashboard/Dashboard";

function App() {
  const [boards, setBoards] = useState(
    JSON.parse(localStorage.getItem("prac-kanban")) || []
  );

  const [targetCard, setTargetCard] = useState({
    bid: "",
    cid: "",
  });
  const [view, setView] = useState('users');


  const addboardHandler = (name) => {
    const tempBoards = [...boards];
    tempBoards.push({
      id: Date.now() + Math.random() * 2,
      title: name,
      cards: [],
    });
    setBoards(tempBoards);
  };

  const removeBoard = (id) => {
    const index = boards.findIndex((item) => item.id === id);
    if (index < 0) return;

    const tempBoards = [...boards];
    tempBoards.splice(index, 1);
    setBoards(tempBoards);
  };

  const addCardHandler = (id, title) => {
    const index = boards.findIndex((item) => item.id === id);
    if (index < 0) return;

    const tempBoards = [...boards];
    tempBoards[index].cards.push({
      id: Date.now() + Math.random() * 2,
      title,
      labels: [],
      date: "",
      tasks: [],
      tickets,
      users,
    });
    setBoards(tempBoards);
  };

  const removeCard = (bid, cid) => {
    const index = boards.findIndex((item) => item.id === bid);
    if (index < 0) return;

    const tempBoards = [...boards];
    const cards = tempBoards[index].cards;

    const cardIndex = cards.findIndex((item) => item.id === cid);
    if (cardIndex < 0) return;

    cards.splice(cardIndex, 1);
    setBoards(tempBoards);
  };

  const dragEnded = (bid, cid) => {
    let s_boardIndex, s_cardIndex, t_boardIndex, t_cardIndex;
    s_boardIndex = boards.findIndex((item) => item.id === bid);
    if (s_boardIndex < 0) return;

    s_cardIndex = boards[s_boardIndex]?.cards?.findIndex(
      (item) => item.id === cid
    );
    if (s_cardIndex < 0) return;

    t_boardIndex = boards.findIndex((item) => item.id === targetCard.bid);
    if (t_boardIndex < 0) return;

    t_cardIndex = boards[t_boardIndex]?.cards?.findIndex(
      (item) => item.id === targetCard.cid
    );
    if (t_cardIndex < 0) return;

    const tempBoards = [...boards];
    const sourceCard = tempBoards[s_boardIndex].cards[s_cardIndex];
    tempBoards[s_boardIndex].cards.splice(s_cardIndex, 1);
    tempBoards[t_boardIndex].cards.splice(t_cardIndex, 0, sourceCard);
    setBoards(tempBoards);

    setTargetCard({
      bid: "",
      cid: "",
    });
  };

  const dragEntered = (bid, cid) => {
    if (targetCard.cid === cid) return;
    setTargetCard({
      bid,
      cid,
    });
  };

  const updateCard = (bid, cid, card) => {
    const index = boards.findIndex((item) => item.id === bid);
    if (index < 0) return;

    const tempBoards = [...boards];
    const cards = tempBoards[index].cards;

    const cardIndex = cards.findIndex((item) => item.id === cid);
    if (cardIndex < 0) return;

    tempBoards[index].cards[cardIndex] = card;

    setBoards(tempBoards);
  };

  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      // Fetch tickets
      const apiResponse = await fetch('https://api.quicksell.co/v1/internal/frontend-assignment');
      const apiData = await apiResponse.json();
      console.log(apiData)
      
      // setBoards(ticketsData.boards);
      return apiData;
    }
    fetchData().then((result) => {
      // Do something with the result
      console.log('Data fetched:', result);
      setTickets(result.tickets);
      setUsers(result.users);
      console.log(users);
      // You can set a parameter or use the result in another function
      //anotherFunction(result);
    }).catch((error) => {
      // Handle errors
      console.error('Error:', error);
    });;
    localStorage.setItem("prac-kanban", JSON.stringify(boards));
    // console.log(boards);
    
  }, [boards]);

  // console.log(users);
  // console.log(tickets);
  return (
    <div className="app">
      <div className="app_nav">
        {/* <div>
          <button>
            //icon
            Disply
            icon
          </button>
         {switch &&<div>

          </div>}
        </div> */}
        <div>
        <h1>Kanban Board</h1>
        </div>
      </div>
      <div className="app_boards_container">
        {/* <div className="app_boards">
          {boards.map((item) => (
            <Board
            key={item.id}
            board={item}
            addCard={(id, title) => addCardHandler(id, title, tickets, users)}
            removeBoard={() => removeBoard(item.id)}
            removeCard={removeCard}
            dragEnded={dragEnded}
            dragEntered={dragEntered}
            updateCard={updateCard}
            tickets={tickets}
            users={users}
            />
          ))}
          
          <div className="app_boards_last">
            <Editable
              displayClass="app_boards_add-board"
              editClass="app_boards_add-board_edit"
              placeholder="Enter Board Name"
              text="Add Board"
              buttonText="Add Board"
              onSubmit={addboardHandler}
            />
          </div>
        </div> */}
        <div>
                <select name="viewSelect" id="viewSelect" onChange={(e) => { setView(e.target.value) }}>
                    <option value="Users">Users</option>
                    <option value="status">status</option>
                    <option value="priority">priority</option>
                </select>
            </div>
        <div className="app_boards">
          <Dashboard tickets={tickets} users={users} view={view}/>
        </div>
      </div>
    </div>
  );
}

export default App;