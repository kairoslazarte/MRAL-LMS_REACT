import express from 'express'
const router = express.Router()
import {
    authStudent,
    getSubjects,
    getTeachers,
    getSection,
    getStudentDetails,
    getTeacherDetails,
    studentSendMessage
} from '../controllers/studentsController.js'

router.post('/login', authStudent)
router.post('/get-subjects', getSubjects)
router.post('/get-teachers', getTeachers)
router.post('/get-section', getSection)
router.post('/get-student', getStudentDetails)
router.post('/get-teacher', getTeacherDetails)
router.post('/send-message', studentSendMessage)

export default router