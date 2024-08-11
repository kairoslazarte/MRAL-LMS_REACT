import React, { useState } from 'react';
import toast from 'react-hot-toast';
import useTeacherGetAllStudents from '../../../../hooks/teacher/useTeacherGetAllStudents';
import useGetTeacherConversations from '../../../../hooks/teacher/useGetTeacherConversations';
import Conversations from '../../../common/sidebar/Conversations';

const TeacherMessagesSidebar = () => {
    const [searchInput, setSearchInput] = useState("");
    const [searchStudentResult, setSearchStudentResult] = useState();
    const { students } = useTeacherGetAllStudents();
    const { loading, conversations } =  useGetTeacherConversations();

    const handleSearchConversations = (e) => {
        e.preventDefault();
        if(!searchInput) return;
        if (searchInput.length < 3) {
            return toast.error("Search term must be atleast 3 characters long");
        }

        const student = students.find((c) => c?.full_name.toLowerCase().includes(searchInput.toLocaleLowerCase()));

        if(student) {
            setSearchStudentResult(student);
            setSearchInput("");
        } else toast.error("No such user found!");
    }

    return (
        <div className='mx-2 flex flex-col space-y-4 relative'>
           <form onSubmit={handleSearchConversations} className="flex flex-row space-x-2">
                <input 
                    type="text" 
                    className="border border-gray-300 rounded-md text-sm w-full" 
                    placeholder="Search student's name.."
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)} 
                />
                <button 
                    type="submit" 
                    className="text-sm text-white bg-blue-500 h-auto rounded-md px-6 transition duration-200 border border-blue-500 hover:bg-white hover:text-blue-500"
                >
                    Search
                </button>
            </form>

            <Conversations searchResult={searchStudentResult} setSearchResult={setSearchStudentResult} conversations={conversations} loading={loading} />
        </div>
    )
}

export default TeacherMessagesSidebar;