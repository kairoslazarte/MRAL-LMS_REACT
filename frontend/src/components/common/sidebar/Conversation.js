

import React from "react";
import { useSocketContext } from "../../../contexts/socket/SocketContext";
import useConversation from "../../../zustand/useConversation";

const Conversation = ({ conversation, lastIdx, setSearchResult }) => {
    const { selectedConversation, setSelectedConversation } = useConversation();

    const isSelected = selectedConversation?._id === conversation._id;
    const { onlineUsers } = useSocketContext();
	const isOnline = onlineUsers.includes(conversation._id);

    const handleOnClickConversation = () => {
        setSelectedConversation(conversation);
        setSearchResult(null);
    }

    return (
        <>
            <div
				className={`flex gap-2 items-center hover:bg-sky-500 rounded p-2 py-1 cursor-pointer
				${isSelected ? "bg-sky-500" : ""}
			`}
                onClick={handleOnClickConversation}
            >
                <div className={`avatar ${isOnline ? "online" : ""}`}>
                    <div className='w-14 rounded-full'>
                        <img 
                            src={!conversation?.image ? "../static/images/default_user.png" : conversation?.image} 
                            alt='user avatar' 
                            className='rounded-full w-14 h-14 bg-white' 
                        />
                    </div>
                </div>

                <div className='flex flex-col flex-1'>
                    <div className='flex gap-3 justify-between'>
                        <p className='font-bold text-black'>{conversation?.first_name} {conversation?.last_name}</p>
                        {/* <span className='text-xl'>{emoji}</span> */}
                    </div>
                </div>
            </div>

            {!lastIdx && <div className='divider my-0 py-0 h-1' />}
        </>
    )
}

export default Conversation;