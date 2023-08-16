import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../../../reusable/Loader";

const NewsUpdatesAdminLists = () => {
    const [newsUpdates, setNewsUpdates] = useState();

    const getNewsAndUpdates = async () => {
        try {
            const { data } = await axios.get('/api/admins/get-news-updates')
            setNewsUpdates(data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getNewsAndUpdates()
    }, [setNewsUpdates])

    const handleDeleteBtn = async (id) => {
        if (window.confirm(`Are you sure you want to delete?`)) {
            await axios.post("/api/admins/delete-news-updates", {
                id: id,
            });
            getNewsAndUpdates();
        }
    };

    return (
        <div className="w-full h-full xl:px-8 px-4 mx-auto py-20">
            <div className="my-auto h-full">
                <div className="relative flex flex-row">
                    <h1 className="font-bold text-4xl">
                        View News and Updates:
                    </h1>
                </div>
                <div className="pt-8">
                    <div className="grid grid-cols-4 gap-6">
                        {newsUpdates ? (
                            newsUpdates?.map((item) => (
                                <div 
                                    key={item?._id}
                                    className="bg-white border border-gray-200 shadow-md rounded-md p-5 flex flex-col space-y-4 justify-center relative"
                                >
                                    <button
                                        className="text-white bg-red-500 rounded-md p-2 w-auto transition duration-200 hover:opacity-75 absolute top-4 right-4" 
                                        onClick={() => handleDeleteBtn(item?._id)}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-[1.2rem]">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                        </svg>
                                    </button>
                                    <span className="text-xs text-gray-800 italic">Created at: {new Date(item?.createdAt).toLocaleDateString('en-us', { year:"numeric", month:"short", day:"numeric"})}</span>
                                    {item?.image && (
                                        <div className="h-[200px] object-cover bg-orange-50 rounded-md">
                                            <img 
                                                className='object-cover h-[200px] mx-auto'
                                                src={item?.image}
                                            />
                                        </div>
                                    )}
                                    {item?.text && (
                                        <div 
                                            className={`text-xl h-[200px] overflow-y-scroll`} 
                                            dangerouslySetInnerHTML={{ __html: item?.text }} 
                                        />
                                    )}
                                </div>
                            ))
                        ) : (
                            <Loader />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NewsUpdatesAdminLists;
