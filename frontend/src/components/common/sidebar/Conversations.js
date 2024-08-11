import React from "react";
import Conversation from "./Conversation";

const Conversations = ({
    searchResult,
    setSearchResult,
    conversations,
    loading
}) => {
    return (
        <div className='py-2 flex flex-col overflow-auto'>
            {searchResult ? <Conversation conversation={searchResult} lastIdx={1} setSearchResult={setSearchResult} /> : (
                conversations.map((conversation, idx) => (
                    <Conversation 
                        key={conversation._id}
                        conversation={conversation} 
                        setSearchResult={setSearchResult}
                        lastIdx={idx === conversations.length - 1}
                    />
                ))
            )}

            {loading ? <span className='loading loading-spinner mx-auto'></span> : null}
        </div>
    )
}

export default Conversations;