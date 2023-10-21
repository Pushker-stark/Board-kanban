import React, { useEffect, useState } from "react";
import "./App.css";
import Dashboard from "./Components/Dashboard/Dashboard";

function App() {
  
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);
  const [view, setView] = useState('users');

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
    // console.log(boards);
    
  }, []);

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
        <div>
                <select name="viewSelect" id="viewSelect" onChange={(e) => { setView(e.target.value) }}>
                    <option value="Users">Users</option>
                    <option value="status">Status</option>
                    <option value="priority">Priority</option>
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