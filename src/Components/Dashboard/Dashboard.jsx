import React, { useEffect, useState } from "react";
import NewCard from "../NewCard/NewCard";
import Dropdown from "../Dropdown/Dropdown";
import { MoreHorizontal } from "react-feather";
import "./Dashboard.css";
import priorityDecoderFunc from "../../Utils/PriorityDecoder";

const statusGrouping = ["Backlog", "Todo", "In progress",];
const priorityGrouping = [ 'No priority',"Urgent","High","Medium","Low",];

export default function Dashboard({ tickets, users, view }) {
    const [showDropdown, setShowDropdown] = useState(false);
    const [ticketData, setTicketData] = useState(tickets);


    const [usersData, setUsersData] = useState(users);
    useEffect(() => {
        if (tickets.length) setTicketData(tickets);
    }, [tickets]);
    useEffect(() => {
        if (users.length) setUsersData(users);
    }, [users]);

    let priorPath;
    let hold;
    let statuspath;

    // Determine the image path based on conditions
    

    // if (cardData.status==='Backlog') {
    //     statuspath = './cancel.svg';
    // } else if (cardData.status==='Todo') {
    //     statuspath = './todo.png';
    // }else {
    //     statuspath = './done.png';
    // }


    return (
        <div className="dashboard-parent">
            
            {view === 'status' && statusGrouping.map((itemGroup) => (
                <div className="view-wrapper">
                    <span id="condition"> 
                    {itemGroup==='Backlog' ? (
                        statuspath = './cancel.svg'
                    ) : itemGroup==='Todo' ? (
                        statuspath = './todo.png'
                    ) : (
                        statuspath = './done.png'
                    )},
                  </span>
                  <div id="board_title">
                    <span><img src={process.env.PUBLIC_URL + statuspath} width="20px" alt='status'/></span>
                    <p className="board_header_title">
                        <span>{itemGroup}</span>
                    </p>

                  </div>

                    <div
                        className="board_header_title_more"
                        onClick={() => setShowDropdown(true)}
                    >
                        {/* <MoreHorizontal /> */}
                        {showDropdown && (
                            <Dropdown
                                class="board_dropdown"
                                onClose={() => setShowDropdown(false)}
                            >
                                <p onClick={() => { }}>Delete Board</p>
                            </Dropdown>
                        )}
                    </div>

                    <div className="Card-wrapper">

                        {ticketData?.map((item) => {
                            // Find the corresponding user for the ticket
                            if (item?.status === itemGroup) {

                                const userCardData = usersData.find(u => u.id === item.userId);
                                console.log({userCardData,usersData, item})
                                // const userCardData="null";
                                return (
                                    <>
                                        <NewCard cardData={item} userCardData={userCardData} />
                                    </>
                                );
                            }
                        })}
                    </div>
                </div>
            ))}

            {/* //Users  */}

            {view === 'users' && usersData.map((itemUser) =>
                <div  className="view-wrapper">
                    <div id="board_title">
                        {Object.keys(itemUser).length?<div className='right-column'>
                        <div className='circle-big'> {itemUser.name?.slice(0,2).toUpperCase()}</div>
                        {itemUser.available? <div className='circle dot-position green'></div>: <div className='circle dot-position lightgray'></div>}
                        </div>:null}
                        <p className="board_header_title">
                            <span>{itemUser.name}</span>
                        </p>
                    </div>

                    <div
                        className="board_header_title_more"
                        onClick={() => setShowDropdown(true)}
                    >
                        {/* <MoreHorizontal /> */}
                        {showDropdown && (
                            <Dropdown
                                class="board_dropdown"
                                onClose={() => setShowDropdown(false)}
                            >
                                <p onClick={() => { }}>Delete Board</p>
                            </Dropdown>
                        )}
                    </div>
                    <div className="Card-wrapper">

                        {ticketData?.map((item) => {
                            if (item?.userId === itemUser.id) {
                                return (
                                    <>
                                        <NewCard cardData={item} />
                                    </>
                                );
                            }
                        })}
                    </div>

                </div>
            )}


            {/* //Priority  */}

            {view === 'priority' && priorityGrouping.map((priority) =>
                
                <div  className="view-wrapper">
                   <span id="condition"> {priority==="No priority" ? (
                    priorPath = './no_prior.png'
                  ) : priority==="Low" ? (
                    priorPath = './low_prior.png'
                  ) : priority==="Medium" ? (
                    priorPath = './mid_prior.png'
                  ) : priority==="High" ? (
                    priorPath = './high_prior.png'
                  ) : (
                    priorPath = './urgent-icon.jpg'
                  )},
                  </span>
                  <div id="board_title">
                    <span><img src={process.env.PUBLIC_URL + priorPath} width="20px" alt='high priority'/></span>
                    <p className="board_header_title">
                        <span >{ priority}</span>
                    </p>
                  </div>

                    <div
                        className="board_header_title_more"
                        onClick={() => setShowDropdown(true)}
                    >
                        {/* <MoreHorizontal /> */}
                        {showDropdown && (
                            <Dropdown
                                class="board_dropdown"
                                onClose={() => setShowDropdown(false)}
                            >
                                <p onClick={() => { }}>Delete Board</p>
                            </Dropdown>
                        )}
                    </div>
                    <div className="Card-wrapper">

                        {ticketData?.map((item) => {
                            if (item?.priority === priorityDecoderFunc(priority)) {
                                const userCardData = usersData.find(u => u.id === item.userId);
                                return (
                                    <>
                                        <NewCard cardData={item} userCardData={userCardData} />
                                    </>
                                );
                            }
                        })}
                    </div>

                </div>
            )}
        </div>
    );
}
