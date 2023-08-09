import ViewNewsAndUpdates from "../../components/reusable/ViewNewsAndUpdates"
import StudentMessages from "../../components/student/dashboard/partials/StudentMessages"
import TeacherAdvisoryClassesLists from "../../components/teacher/dashboard/advisoryClasses/TeacherAdvisoryClassesLists"
import TeacherClassesLists from "../../components/teacher/dashboard/classes/TeacherClassesLists"
import TeacherHeader from "../../components/teacher/dashboard/partials/TeacherHeader"
import TeacherMessages from "../../components/teacher/dashboard/partials/TeacherMessages"
import TeacherSidebar from "../../components/teacher/dashboard/partials/TeacherSidebar"
import ViewUpdateTeacherProfile from "../../components/teacher/dashboard/profile/ViewUpdateTeacherProfile"
import TeacherLogin from "../../components/teacher/forms/TeacherLogin"
import { TeacherLoginContext } from "../../contexts/teacher/TeacherLoginContexts"
import { TeacherSidebarContexts } from "../../contexts/teacher/TeacherSidebarContext"
import { useMemo, useState } from "react"

const Teacher = () => {
    const [teacher, setTeacher] = useState(null)
    const userValue = useMemo(() => ({teacher, setTeacher}), [teacher, setTeacher])
    
    const [activeComponent, setActiveComponent] = useState("Home")
    const sidebarValue = useMemo(() => ({activeComponent, setActiveComponent}), [activeComponent, setActiveComponent])

    return (
        <>
            <TeacherLoginContext.Provider value={userValue}>
                {
                !teacher 
                    ? 
                        <main className="h-full">
                            <TeacherLogin /> 
                        </main>
                    : 
                    <TeacherSidebarContexts.Provider value={sidebarValue}>
                        <main className="h-full bg-gray-50">
                            <div className="flex items-center h-full">
                                <div className="flex flex-col h-full">
                                    <TeacherSidebar teacherDetails={teacher} />
                                </div>

                                <div className="xl:pl-[20rem] h-full w-full">
                                    <TeacherHeader teacherDetails={teacher} />

                                    <div className="flex flex-row w-full">
                                        <div className="w-full xl:px-8 px-4 mt-10">
                                            {activeComponent == "Home" && (
                                                <ViewNewsAndUpdates />
                                            )}
                                            {activeComponent == `${teacher?.first_name} ${teacher?.last_name}` && (
                                                <ViewUpdateTeacherProfile teacherDetails={teacher} />
                                            )}
                                            {activeComponent == 'Classes' && (
                                                <TeacherClassesLists teacherDetails={teacher} />
                                            )}
                                            {activeComponent == 'Advisory Classes' && (
                                                <TeacherAdvisoryClassesLists teacherDetails={teacher} />
                                            )}
                                        </div>

                                        {/* <div className="w-[30%] bg-white border-l border-gray-200">
                                            <TeacherMessages teacherDetails={teacher} />           
                                        </div> */}
                                    </div>
                                </div>
                            </div>
                        </main>
                    </TeacherSidebarContexts.Provider>
                }
            </TeacherLoginContext.Provider>
        </>
    )
}

export default Teacher