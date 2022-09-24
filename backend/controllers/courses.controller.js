const mongoose = require('mongoose');
const Course = require('../models/course');
require('dotenv').config();

const URI = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@coursesdb.51wwjr8.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`
mongoose.connect(URI)
    .then(() => {
        console.log('DB Connected!')
    })
    .catch(() => {
        console.log('Cannot connect to DB')
    })

const getCourses = async (req, res, next) => {
    const courses = await Course.find().exec()
    res.json(courses);
}

const getCourseById = async (req, res, next) => {
    const courseId = req.params.id;
    let course;
    try {
        course = await Course.findById(courseId)
    } catch (error) {
        return new Error({ message: error })
    }
    res.json(course.toObject({ getters: true }));
}

const createCourse = async (req, res, next) => {
    const { title, description, location, capacity } = req.body;
    const newCourse = new Course({
        title,
        description,
        location,
        capacity
    });

    let results;
    try {
        results = await newCourse.save();
    } catch (error) {
        return new Error({ message: error })
    };

    res.json(results)
}

const updateCourse = async (req, res, next) => {
    const courseId = req.params.id;
    const { title, description, location, capacity } = req.body;
    let course;
    // 1. get the course
    try {
        course = await Course.findById(courseId)
    } catch (error) {
        return new Error({ message: error })
    }

    // 2. update and
    course.title = title;
    course.description = description;
    course.location = location;
    course.capacity = capacity;

    // 3. save
    try {
        await course.save();
    } catch (error) {
        return new Error({ message: error })
    }

    res.json(course.toObject({ getters: true }))
}

const deleteCourse = async (req, res, next) => {
    const courseId = req.params.id;
    let course;
    try {
        course = await Course.findById(courseId);
    } catch (error) {
        return new Error({ message: error })
    }

    try {
        await course.remove();
    } catch (error) {
        return new Error({ message: error })
    }

    res.json(course);
}

exports.getCourses = getCourses;
exports.getCourseById = getCourseById;
exports.createCourse = createCourse;
exports.updateCourse = updateCourse;
exports.deleteCourse = deleteCourse;