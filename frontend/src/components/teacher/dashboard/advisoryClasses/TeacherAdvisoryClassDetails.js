import axios from "axios"
import { useEffect, useState } from "react"

const TeacherAdvisoryClassDetails = ({ sectionID, setOpenSectionDetails }) => {
    const [file, setFile] = useState('')
    const [uploading, setUploading] = useState(false)
    const [section, setSection] = useState(null)

    const getSectionDetails = async() => {
        try {
            const { data } = await axios.post("/api/teachers/get-section-details", { id: sectionID })
            setSection(data)
        } catch (error) {
            console.log(error)
        }
    }

    const attachFileFcn = async (sectionID, attachedFile) => {
        try {
            await axios.post('/api/teachers/attach-section-file', {
                sectionID: sectionID,
                attachedFile: attachedFile
            })
            getSectionDetails()
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

            const { data } = await axios.post('/api/sectionUpload', formData, config)
            
            attachFileFcn(sectionID, data)
            setFile(data)
            setUploading(false)
            alert('Uploaded file successfully!')
        } catch (error) {
            console.error(error)
            alert("File type not supported! Be sure to only upload PDF|JPG|PNG|JPEG files.")
            setUploading(false)
        }
    }

    useEffect(() => {
        getSectionDetails()
    }, setSection)

    return (
        <div>
             <button
                className="bg-red-700 px-4 py-2 text-white rounded-md hover:opacity-70 transition duration-200 mr-auto"
                onClick={() => setOpenSectionDetails(false)}
            >
                Go back
            </button>
            
            <div className="pt-10 flex flex-col space-y-8">
                <div className="flex flex-col space-y-2">
                    <h2 className="text-4xl font-bold tracking-wide uppercase">
                        {section?.section}  
                        <span className="italic text-gray-800 font-normal text-sm pl-3">(ID: {section?._id})</span>
                    </h2>
                    <h4 className="font-medium text-lg">Students: {section?.students?.length}</h4>
                    <h4 className="font-medium text-lg">Subjects: {section?.subjects?.length}</h4>
                </div>

                <div className="flex flex-row items-center space-x-4">
                    <h4 className="font-medium">Upload a file for weekly lesson guide/s</h4>
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

                <div className="pt-10 flex flex-col space-y-6">
                    <h2 className="text-2xl font-medium">Files:</h2>

                    {section?.files ? (
                        <div className="grid grid-cols-4 gap-4 pt-5">
                            {section?.files?.map((file) => (
                                <a
                                    key={file?._id}
                                    className="bg-white px-4 py-8 shadow-lg rounded-md text-center group hover:scale-105 transition duration-200"
                                    href={file?.name?.replace("frontend\\public\\", "")} 
                                    download
                                >   <div className="flex flex-col justify-center h-full">
                                        <span className="text-gray-800 font-medium">
                                            {file?.name?.replace("frontend\\public\\static\\sectionUploads\\", "")}
                                        </span>
                                        <span className="text-blue-500 text-sm italic group-hover:underline pt-4">Click to download</span>
                                    </div>
                                </a>
                            ))}
                        </div>
                    ) : (
                        <span>No files uploaded yet for this section..</span>
                    )}
                </div>
            </div>
        </div>
    )
}

export default TeacherAdvisoryClassDetails