import express from 'express'
const router = express.Router()
import {
    authTeacher,
    getTeacherSubjects,
    attachFileToSubject,
    getSubjectDetails,
    getSectionDetails,
    attachFileToSection
} from '../controllers/teachersController.js'

router.post('/login', authTeacher)
router.post('/get-teacher-subjects', getTeacherSubjects)
router.post('/attach-subject-file', attachFileToSubject)
router.post('/get-subject-details', getSubjectDetails)
router.post('/get-section-details', getSectionDetails)
router.post('/attach-section-file', attachFileToSection)

export default router