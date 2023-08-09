import asyncHandler from 'express-async-handler'
import generateToken from "../utils/generateToken.js";
import Student from '../models/studentsModel.js'
import Section from '../models/sectionsModel.js';
import Subject from '../models/subjectsModel.js';
import Teacher from '../models/teachersModel.js';

const authStudent = asyncHandler(async (req, res) => {
    const { email, password } = req.body

    const student = await Student.findOne({ email })

    if (student && (await student.matchPassword(password))) {
        const updatedStudent = await student.save()

        res.json(updatedStudent)
        res.status(200)
    }  else {
        res.status(401)
        throw new Error('Invalid email or password')
    }
})

const getSubjects = asyncHandler(async (req, res) => {
    const { sectionID } = req.body
    
    const subjects = await Subject.find({ 'section': sectionID })

    res.status(200).json(subjects)
})

const getTeachers = asyncHandler(async (req, res) => {
    const { ids } = req.body

    const teachers = await Teacher.find({ _id: { $in: ids } })

    res.status(200).json(teachers)
})

const getSection = asyncHandler(async (req, res) => {
    const { id } = req.body

    const section = await Section.findById(id)
    const advisers = await Teacher.find()

    
    advisers.map((adviser) => (
        adviser.advisoryClass.map((advClass) => (
            advClass.sectionID == id && (
                res.status(200).send({
                    section: section,
                    adviser: adviser
                })
            )
        ))
    ))
})

const getStudentDetails = asyncHandler(async (req, res) => {
    const { studentID } = req.body

    const student = await Student.findById(studentID)

    if (student) {
        res.status(200).json(student)
    } else {
        throw new Error("Student not found!")
    }
})

const getTeacherDetails = asyncHandler(async (req, res) => {

})

const studentSendMessage = asyncHandler(async (req, res) => {
    const { studentID, teacherID, message } = req.body

    const student = await Student.findById(studentID)
    const teachers = await Teacher.find()

    var teachersIDS = []

    teachers?.map((teacher) => {
        teachersIDS.push(teacher?._id)
    }) 

    const teacher = await Teacher.findById(teacherID)
    

    try {
        student.conversations.push({
            teacherID: teacherID,
            name: teacher.first_name + " " + teacher.last_name,
            messages: [
                {
                    senderID: studentID,
                    recipientID: teacherID,
                    message: message
                }
            ]
        })

        teacher.conversations.push({
            studentID: studentID,
            name: student.first_name + " " + student.last_name,
            messages: [
                {
                    senderID: studentID,
                    recipientID: teacherID,
                    message: message
                }
            ]
        })

        const studentMessage = await student.save()
        const teacherMessage = await teacher.save()
        res.status(201).send({
            studentMessage: studentMessage,
            teacherMessage: teacherMessage
        })
    } catch (error) {
        console.log(error)
    }
})

export {
    authStudent,
    getSubjects,
    getTeachers,
    getSection,
    getStudentDetails,
    getTeacherDetails,
    studentSendMessage
}