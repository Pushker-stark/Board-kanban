import React, { useEffect, useState } from "react";
import Board from "../Board/Board";
import Card from "../Card/Card";
import NewCard from "../NewCard/NewCard";
import Dropdown from "../Dropdown/Dropdown";
import { MoreHorizontal } from "react-feather";
import "./Dashboard.css";

const statusGrouping = ["Backlog", "Todo", "In progress",];

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
    return (
        <div className="dashboard-parent">
            
            {view === 'status' && statusGrouping.map((itemGroup) => (
                <div className="view-wrapper">
                    <p className="board_header_title">
                        <span>{itemGroup}</span>
                    </p>

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
                            if (item?.status === itemGroup) {
                                return (
                                    <>
                                        <NewCard cardData={item} />
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
                    <p className="board_header_title">
                        <span>{itemUser.name}</span>
                    </p>

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
        </div>
    );
}
