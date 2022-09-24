const express = require('express');
const coursesController = require('../controllers/courses.controller')
const routerCourses = express.Router();

routerCourses.use(express.json());

routerCourses.get('/', coursesController.getCourses);
routerCourses.get('/:id', coursesController.getCourseById);
routerCourses.post('/', coursesController.createCourse);
routerCourses.put('/:id', coursesController.updateCourse);
routerCourses.delete('/:id', coursesController.deleteCourse);

module.exports = routerCourses;