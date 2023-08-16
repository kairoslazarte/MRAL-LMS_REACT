import { TeacherSidebarContexts } from "../../../../contexts/teacher/TeacherSidebarContext";
import {
    UserIcon,
    AcademicCapIcon,
    BriefcaseIcon,
    HomeIcon
} from "@heroicons/react/outline";
import { useState, useContext } from "react";

function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}

const TeacherSidebar = ({ teacherDetails }) => {
    const { activeComponent, setActiveComponent } = useContext(TeacherSidebarContexts);
    const [activeDropDownSidebar, setActiveDropDownSidebar] = useState(teacherDetails?.first_name + " " + teacherDetails?.last_name);

    let navigation = [
        {
            name: "Home",
            icon: HomeIcon,
        },
        {
            name: teacherDetails?.first_name + " " + teacherDetails?.last_name,
            icon: UserIcon,
        },
        {
            name: "Classes",
            icon: AcademicCapIcon
        },
        {
            name: "Advisory Classes",
            icon: BriefcaseIcon
        },
    ];

    return (
        <aside>
            <div className="hidden xl:flex md:w-[20rem] md:flex-col md:fixed md:inset-y-0 bg-white shadow-lg pt-10 relative">
                <div className="flex flex-col flex-1 min-h-0 bg-oa-gray">
                    <div className="flex items-center flex-shrink-0 h-24 px-2 transition duration-200 mx-2 absolute top-0">
                        <img
                            className="h-20 w-auto"
                            src="/static/images/mral-logo-sm.png"
                            alt="MRAL logo small"
                        />
                    </div>

                    <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden pt-20">
                        <nav className="p-0 space-y-1">
                            {navigation.map((item) =>
                                <button
                                    key={item.name} 
                                    className={classNames(
                                            item.name ==
                                            activeComponent
                                            ? "bg-blue-700 text-white ml-2 hover:text-white"
                                            : "text-blue-700 hover:bg-blue-700 hover:text-white mx-2",
                                        "group flex items-center px-2 py-2 font-medium rounded-md w-full"
                                    )}
                                    onClick={() =>
                                        setActiveComponent(item.name)
                                    }
                                >
                                    <item.icon
                                        className={classNames(
                                            item.name == activeComponent
                                                ? "text-white group-hover:text-white"
                                                : "text-blue-700  group-hover:text-white",
                                            "mr-3 flex-shrink-0 h-8 w-8"
                                        )}
                                        aria-hidden="true"
                                    />
                                    {item.name}
                                </button>
                            )}
                            <button
                                className="group flex items-center px-2 mx-2 py-2 text-sm font-medium rounded-md text-blue-700 hover:bg-blue-700 hover:text-white w-full"
                                onClick={() => window.location.reload()}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"  className="text-blue-700 group-hover:text-white mr-3 flex-shrink-0 h-8 w-8 font-medium">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
                                </svg>
                                Sign Out
                            </button>
                        </nav>

                        <div className="mt-auto pb-4 px-4">
                            <span className="text-blue-700 text-xs italic">Copyright © 2023 all rights reserved - Mt. Rushmore Academy of Laguna</span>
                        </div>
                    </div>
                </div>
            </div>
        </aside>
    );
};

export default TeacherSidebar;
