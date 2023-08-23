import ViewNewsAndUpdates from "../../components/reusable/ViewNewsAndUpdates"
import StudentClassesLists from "../../components/student/dashboard/classes/StudentClassesLists"
import ViewStudentNewslettersMemos from "../../components/student/dashboard/newslettersMemos/ViewStudentNewslettersMemos"
import StudentHeader from "../../components/student/dashboard/partials/StudentHeader"
import StudentMessages from "../../components/student/dashboard/partials/StudentMessages"
import StudentSidebar from "../../components/student/dashboard/partials/StudentSidebar"
import ViewUpdateStudentProfile from "../../components/student/dashboard/profile/ViewUpdateStudentProfile"
import StudentLogin from "../../components/student/forms/StudentLogin"
import { StudentLoginContext } from "../../contexts/student/StudentLoginContexts"
import { StudentSidebarContexts } from "../../contexts/student/StudentSidebarContexts"
import { useMemo, useState } from "react"

const Student = () => {
    const [student, setStudent] = useState(null)
    const userValue = useMemo(() => ({student, setStudent}), [student, setStudent])
    
    const [activeComponent, setActiveComponent] = useState("Home")
    const sidebarValue = useMemo(() => ({activeComponent, setActiveComponent}), [activeComponent, setActiveComponent])
    return (
        <>
            <StudentLoginContext.Provider value={userValue}>
            {
                !student 
                    ? 
                        <main className="h-full">
                            <StudentLogin /> 
                        </main>
                    : 
                    <StudentSidebarContexts.Provider value={sidebarValue}>
                        <main className="h-[100vh] bg-gray-50">
                            <div className="flex items-center h-full">
                                <div className="flex flex-col h-full">
                                    <StudentSidebar studentDetails={student} />
                                </div>

                                <div className="lg:pl-[18rem] xl:pl-[20rem] h-full w-full">
                                    <StudentHeader studentDetails={student} />

                                    <div className="flex flex-row w-full bg-gray-50 h-full">
                                        <div className="w-full 2xl:px-8 px-4 mt-10">
                                            {activeComponent == "Home" && (
                                                <ViewNewsAndUpdates />
                                            )}
                                            {activeComponent == `${student?.first_name} ${student?.last_name}` && (
                                                <ViewUpdateStudentProfile studentDetails={student} />
                                            )}
                                            {activeComponent == `${student?.level} - ${student?.section}` && (
                                                <StudentClassesLists studentDetails={student} />
                                            )}
                                            {activeComponent == 'General Newsletters / Memos' && (
                                                <ViewStudentNewslettersMemos />
                                            )}
                                        </div>

                                        {/* <div className="w-[25%] bg-white border-l border-gray-200 h-full fixed right-0">
                                            <StudentMessages studentDetails={student} />           
                                        </div> */}
                                    </div>
                                </div>
                            </div>
                        </main>
                    </StudentSidebarContexts.Provider>
                }
            </StudentLoginContext.Provider>
        </>
    )
}

export default Student