import { React, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import { Container } from '@mui/material';
import axios from 'axios';

const CoursesList = () => {
    const [courses, setCourses] = useState();
    const navigate = useNavigate();

    // Retrieve api
    const retrieveCourses = async () => {
        const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/courses/`)
        return res.data;
    }

    useEffect(() => {
        const getAllCourses = async () => {
            const allCourses = await retrieveCourses();
            if (allCourses) setCourses(allCourses)
        }
        getAllCourses();
    }, [])

    const removeCourseHandler = async (id) => {
        await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/api/courses/${id}`);
        const removeCourse = courses.filter((course) => {
            return course.id !== id;
        });
        setCourses(removeCourse);

        const getAllCourses = async () => {
            const allCourses = await retrieveCourses();
            if (allCourses) setCourses(allCourses)
        }
        getAllCourses();
    }

    return (
        <Container>
            <h1>My Courses</h1>
            <button onClick={() => navigate('./courses/add')} className="btn btn-sm btn-success mb-2">Add Course</button>
            <Grid pt={4} container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }} >
                {courses?.map((course) =>
                    <Grid item xs={12} sm={4} md={4} key={course._id}>
                        <Card key={course.id}>
                            <CardContent sx={{ flex: 1 }}>
                                <Typography component="h2" variant="h5">
                                    {course.title}
                                </Typography>
                                <Typography variant="subtitle1" color="text.secondary">
                                    Description: {course.description }
                                </Typography>
                                <Typography variant="subtitle1" paragraph>
                                    Location : {course.location}
                                </Typography>
                                <Typography variant="subtitle1" paragraph>
                                    Total Students : {course.capacity}
                                </Typography>
                            </CardContent>
                            <IconButton aria-label="delete" onClick={() => removeCourseHandler(course._id)} color="error">
                                <DeleteIcon />
                            </IconButton>
                            <IconButton aria-label="delete" onClick={() => navigate(`./course/edit/${course._id}`)} sx={{ color: 'blue' }}>
                                <EditIcon />
                            </IconButton>
                        </Card>
                    </Grid>
                )}
            </Grid>
        </Container>
    )
}

export default CoursesList