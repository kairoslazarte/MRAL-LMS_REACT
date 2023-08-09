import Loader from "../../../reusable/Loader"
import axios from "axios"
import { useEffect, useState } from "react"

const ViewStudentNewslettersMemos = () => {
    const [newslettersMemos, setNewslettersMemos] = useState(null)

    const getNewslettersMemos = async() => {
        try {
            const { data } = await axios.get("/api/admins/get-newsletters-memos")
            setNewslettersMemos(data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getNewslettersMemos()
    }, [setNewslettersMemos])
    return (
        <div>
            <h1 className="font-bold text-gray-900 text-4xl uppercase">General Newsletters or Memos</h1>
            <div className="pt-5">
                {newslettersMemos ? (
                    <div className="grid grid-cols-3 gap-6 pt-4">
                        {newslettersMemos?.map((newsletterMemo) => (
                            newsletterMemo?.file ? (
                                <>
                                    <a
                                        className="border-2 border-[#e42222] hover:bg-[#e42222] px-4 py-8 shadow-lg rounded-md text-center group hover:scale-105 transition duration-200 group"
                                        href={newsletterMemo?.file?.replace("frontend\\public\\", "")} 
                                        download
                                    >   <div className="flex flex-col justify-center h-full">
                                            <span className="text-[#e42222] group-hover:text-white font-medium break-words">
                                                {newsletterMemo?.file?.replace("frontend\\public\\static\\newsletterUploads\\", "")}
                                            </span>
                                            <span className="text-blue-500 text-sm italic group-hover:underline pt-2 group-hover:text-white">Click to download</span>
                                        </div>
                                    </a>
                                </>
                            ) : (
                                <>
                                    <a
                                        className="border-2 border-blue-700 hover:bg-blue-700 px-4 py-8 shadow-lg rounded-md text-center group hover:scale-105 transition duration-200 group"
                                        href={newsletterMemo?.link} 
                                        target="_blank"
                                        rel="noreferrer"
                                    >   <div className="flex flex-col justify-center h-full">
                                            <span className="text-blue-700 group-hover:text-white font-medium break-words">
                                                {newsletterMemo?.link}
                                            </span>
                                            <span className="text-blue-500 text-sm italic group-hover:underline pt-2 group-hover:text-white">Click to open in new tab</span>
                                        </div>
                                    </a>
                                </>
                            )
                        ))}
                    </div>
                ) : (
                    <Loader />
                )}
            </div>      
        </div>
    )
}

export default ViewStudentNewslettersMemos