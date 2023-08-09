import { useState } from "react"
import axios from "axios"

const TeacherSubjectDetails = ({ setOpenSubjectDetails, subjectDetails }) => {
    const [file, setFile] = useState('')
    const [uploading, setUploading] = useState(false)
    const [subject, setSubject] = useState(subjectDetails)

    const getSubjectDetails = async() => {
        try {
            const { data } = await axios.post("/api/teachers/get-subject-details", { subjectID: subjectDetails?._id })
            setSubject(data)
        } catch(error) {
            console.log(error)
        }
    }

    const attachFileFcn = async (subjectID, attachedFile) => {
        try {
            await axios.post('/api/teachers/attach-subject-file', {
                subjectID: subjectID,
                attachedFile: attachedFile
            })
            getSubjectDetails()
        } catch (error) {
            console.log(error)
        }
    }

    const uploadFileHandler = async (e) => {
        const file = e.target.files[0]
        const formData = new FormData()
        formData.append('file', file)
        setUploading(true)
        setFile(formData)
        try {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }

            const { data } = await axios.post('/api/subjectUpload', formData, config)
            
            attachFileFcn(subjectDetails?._id, data)
            setFile(data)
            setUploading(false)
            alert('Uploaded file successfully!')
        } catch (error) {
            console.error(error)
            alert("File type not supported! Be sure to only upload PDF|JPG|PNG|JPEG files.")
            setUploading(false)
        }
    }

    useState(() => {
        getSubjectDetails()
    }, [setSubject])

    
    return (
        <div>
            <button
                className="bg-red-700 px-4 py-2 text-white rounded-md mb-5 hover:opacity-70 transition duration-200"
                onClick={() => setOpenSubjectDetails(false)}
            >
                Go back
            </button>

            <div className="pt-5 flex flex-row items-center space-x-6 w-full justify-between">
                <h1 className="font-bold text-gray-900 text-4xl uppercase">{subject?.subject}</h1>
                <label className="cursor-pointer flex flex-row items-center font-medium text-white bg-[#e42222] px-4 py-2 rounded-md shadow-md transition duration-200 hover:scale-105">
                    Attach a file
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" class="w-6 h-6 pl-2 cursor-pointer">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32m.009-.01l-.01.01m5.699-9.941l-7.81 7.81a1.5 1.5 0 002.112 2.13" />
                    </svg>
                    <input 
                        type="file"
                        onChange={uploadFileHandler}
                        className="opacity-0 cursor-pointer absolute"
                    />
                </label>
            </div>

            <div className="pt-7">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 bg-white shadow-md rounded-md">
                    <thead className="text-md text-white uppercase bg-[#1D5B79] rounded-t-md">
                        <tr>
                            <th
                                scope="col"
                                className="px-6 py-3"
                            >
                                Day
                            </th>
                            <th
                                scope="col"
                                className="px-6 py-3"
                            >
                                Start Time
                            </th>
                            <th
                                scope="col"
                                className="px-6 py-3"
                            >
                                End Time
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {subject?.schedules?.map((schedule) => (
                            <tr
                                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                                key={schedule?._id}
                            >
                                <td 
                                    scope="row"
                                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                >
                                    {schedule?.day}
                                </td>
                                <td
                                    scope="row"
                                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                >
                                    {schedule?.startTime}
                                </td>
                                <td
                                    scope="row"
                                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                >
                                    {schedule?.endTime}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="pt-10">
                <h2 className="text-gray-800 font-medium text-2xl">Files</h2>

                <div className="grid grid-cols-4 gap-4 pt-5">
                    {subject?.files?.map((subjectFile) => (
                        <a
                            key={subjectFile?._id}
                            className="bg-white px-4 py-8 shadow-lg rounded-md text-center group hover:scale-105 transition duration-200"
                            href={subjectFile?.file?.replace("frontend\\public\\", "")} 
                            download
                        >   <div className="flex flex-col justify-center h-full">
                                <span className="text-gray-800 font-medium">
                                    {subjectFile?.file?.replace("frontend\\public\\static\\subjectUploads\\", "")}
                                </span>
                                <span className="text-blue-500 text-sm italic group-hover:underline pt-4">Click to download</span>
                            </div>
                        </a>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default TeacherSubjectDetails