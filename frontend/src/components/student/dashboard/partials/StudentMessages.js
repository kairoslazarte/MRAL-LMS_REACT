import axios from "axios"
import { useEffect, useState } from "react"

const StudentMessages = ({ studentDetails }) => {
    const [teachers, setTeachers] = useState(null)
    const [student, setStudent] = useState(studentDetails)
    const [selectedTeacher, setSelectedTeacher] = useState(null)
    const [onClickSendNewMsg, setOnClickSendNewMsg] = useState(false)

    const [studentMessage, setStudentMessage] = useState(null)
    const [teacherMessage, setTeacherMessage] = useState(null)

    const getAllTeachers = async () => {
        try {
            const { data } = await axios.get("/api/admins/get-teachers");
            setTeachers(data);
        } catch (error) {
            console.log(error);
        }
    };

    const getStudentDetails = async() => {
        try {
            const { data } = await axios.post("/api/students/get-student", { studentID: studentDetails?._id })
            setStudent(data.studentDetails)
            setTeachers(data.teachers)
        } catch (error) {
            console.log(error)
        }
    }

    const selectTeacherFormHandler = async (e) => {
        e.preventDefault()
        try {
            const { data } = await axios.post("/api/students/get-teacher", { teacherID: e.target.teacher.value })
            setSelectedTeacher(data)
            setOnClickSendNewMsg(false)
        } catch (error) {
            console.log(error)
        }
    }

    const sendMessageHandler = async(e) => {
        e.preventDefault()
        try {
            const { data } = await axios.post("/api/students/send-message", {
                studentID: student?._id,
                teacherID: selectedTeacher?._id,
                message: e.target.message.value
            })
            setStudentMessage(data.studentMessage)
            setTeacherMessage(data.teacherMessage)
            getStudentDetails()
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getAllTeachers()
        getStudentDetails()
    }, [setTeachers, setStudent])

    return (
        <div className="flex flex-col h-full p-5 bg-white">
            <div className="flex items-center justify-end space-x-4 w-full border-b border-gray-200 pb-5">
                {onClickSendNewMsg ? (
                    <form onSubmit={selectTeacherFormHandler} className="flex flex-row space-x-2 w-full">
                        <select
                            required
                            id="teacher"
                            name="teacher"
                            className={`relative block w-full appearance-none rounded-md border pl-4 pr-8 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-green-700 focus:outline-none focus:ring-greenborder-green-700 text-sm border-gray-300`}
                        >
                            {teachers?.map((teacher) => (
                                <option value={teacher?._id} key={teacher?._id}>{teacher?.first_name} {teacher?.last_name}</option>
                            ))}
                        </select>
                        <button
                            type="submit"
                            className="bg-blue-700 text-white px-4 py-2 rounded-md text-sm transition duration-200 hover:opacity-75"
                        >
                            Select
                        </button>
                        <button
                            type="button"
                            className="bg-red-700 text-white px-4 py-2 rounded-md text-sm transition duration-200 hover:opacity-75"
                            onClick={() => setOnClickSendNewMsg(false)}
                        >
                            Cancel
                        </button>
                    </form>
                ) : (
                    <div className="flex items-center space-x-4">
                        <span className="font-medium text-gray-800">Send a new message</span>
                        <button 
                            className="border border-blue-700 bg-blue-700 p-2 rounded-md group hover:bg-white transition duration-200"
                            onClick={() => setOnClickSendNewMsg(true, setSelectedTeacher(""))}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-white group-hover:text-blue-700">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                            </svg>
                        </button>
                    </div>
                )}
            </div>
            
            <div className="pt-5 h-full">
                {!selectedTeacher ? (
                    student?.conversations?.length == 0 ? (
                        <h2>No messages yet..</h2>
                    ) : (
                        <div className="flex flex-col space-y-4">
                            {student?.conversations?.map((conversation) => (
                                <div key={conversation?._id}>
                                    {conversation?.name}
                                </div>
                            ))}
                        </div>
                    )
                ) : (
                    <div className="flex flex-col space-y-4 h-full">
                        <div className="flex justify-between items-center">
                            <h2>To: {selectedTeacher?.first_name} {selectedTeacher?.last_name}</h2>
                            <button
                                type="button"
                                className="bg-red-700 text-white px-4 py-2 rounded-md text-sm transition duration-200 hover:opacity-75"
                                onClick={() => setSelectedTeacher("")}
                            >
                                Cancel
                            </button>
                        </div>
                        <div className="border border-gray-200 rounded-md p-4 h-[600px] overflow-y-scroll">
                            {studentMessage}
                        </div>
                        <form onSubmit={sendMessageHandler} className="flex items-center justify-between w-full space-x-4 pt-5">
                            <div className="w-full">
                                <input 
                                    required
                                    type="text"  
                                    id="message"
                                    name="message"
                                    className="border border-gray-200 rounded-md p-2 w-full text-sm" 
                                    placeholder="Enter message here.."   
                                />
                            </div>
                            <div>
                                <button
                                    type="submit"
                                    className="bg-blue-700 text-white px-4 py-2 rounded-md text-sm transition duration-200 hover:opacity-75"
                                >
                                    Send
                                </button>
                            </div>
                        </form>
                    </div>
                )}
            </div>
        </div>
    )
}

export default StudentMessages