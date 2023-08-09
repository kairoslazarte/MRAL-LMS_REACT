import asyncHandler from 'express-async-handler'
import generateToken from "../utils/generateToken.js";
import Teacher from '../models/teachersModel.js'
import Subject from '../models/subjectsModel.js';
import Section from '../models/sectionsModel.js';
import Level from '../models/levelsModel.js';

const authTeacher = asyncHandler(async (req, res) => {
    const { email, password } = req.body

    const teacher = await Teacher.findOne({ email })

    if (teacher && (await teacher.matchPassword(password))) {
        const updatedTeacher = await teacher.save()

        res.json(updatedTeacher)
        res.status(200)
    }  else {
        res.status(401)
        throw new Error('Invalid email or password')
    }
})

const getTeacherSubjects = asyncHandler(async (req, res) => {
    const { subjectIDs } = req.body

    const subjects = await Subject.find({'_id': { $in: subjectIDs }})
    const sections = await Section.find({'_id':  { $in: subjects.map((subject) => subject.section) }})
    const levels = await Level.find({'_id': { $in: sections.map((section) => section.level) }})

    res.status(200).send({
        subjects: subjects,
        sections: sections,
        levels: levels,
    })
})

const attachFileToSubject = asyncHandler(async (req, res) => {
    const { subjectID, attachedFile } = req.body

    const subject = await Subject.findById(subjectID)

    try {
        subject.files.push({
            file: attachedFile
        })

        await subject.save()
        res.status(201).json(subject)
    } catch (error) {
        console.log(error)
    }
})

const getSubjectDetails = asyncHandler(async (req, res) => {
    const { subjectID } = req.body

    const subject = await Subject.findById(subjectID);

    if (subject) {
        res.status(200).json(subject);
    } else {
        throw new Error("Subject not found");
    }
})

const getSectionDetails = asyncHandler(async (req, res) => {
    const { id } = req.body

    const section = await Section.findById(id)

    if (section) {
        res.status(200).json(section)
    } else {
        throw new Error("Section not found");
    }
})

const attachFileToSection = asyncHandler(async (req, res) => {
    const { sectionID, attachedFile } = req.body

    const section = await Section.findById(sectionID)

    try {
        section.files.push({
            name: attachedFile
        })

        await section.save()
        res.status(201).json(section)
    } catch (error) {
        console.log(error)
    }
})

export {
    authTeacher,
    getTeacherSubjects,
    attachFileToSubject,
    getSubjectDetails,
    getSectionDetails,
    attachFileToSection
}