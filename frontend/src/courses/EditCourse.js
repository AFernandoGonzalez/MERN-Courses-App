import { React, useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import axios from 'axios';

const EditCourse = () => {
    const [courseId, setCourseId] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [location, setLocation] = useState('');
    const [capacity, setCapacity] = useState(0);

    const navigate = useNavigate();
    const param = useParams();

    const retrieveCourse = async () => {
        const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/courses/${param.id}`);
        return res.data
    }

    useEffect(() => {
        const getCourse = async () => {
            const course = await retrieveCourse();
            setCourseId(course.id)
            setTitle(course.title)
            setDescription(course.description)
            setLocation(course.location)
            setCapacity(course.capacity)
            return course
        }
        getCourse();
    }, []);


    // Update Course
    const updateCourse = async (e) => {
        e.preventDefault();

        let updatedCourse = {
            id: courseId,
            title,
            description,
            location,
            capacity
        };

        try {
            await axios.put(`${process.env.REACT_APP_BACKEND_URL}/api/courses/${param.id}`, updatedCourse);
            navigate('/');
        } catch (error) {
            console.log("Error: ", error);
        }
    }


    return (
        <Container component="main" maxWidth="sm" sx={{ mt: 4 }} >
            <form onSubmit={updateCourse}>
                <Typography variant="h6" gutterBottom>
                    Edit Your Course
                </Typography>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <TextField
                            type="text"
                            required
                            id="title"
                            name="title"
                            label="Title"
                            fullWidth
                            variant="standard"
                            placeholder="Enter Class Title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            required
                            id="description"
                            name="description"
                            label="Description"
                            fullWidth
                            variant="standard"
                            placeholder="Enter a class description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            required
                            id="location"
                            name="location"
                            label="Location"
                            placeholder="Enter a Location"
                            fullWidth
                            variant="standard"
                            select
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            helperText="Please select your currency"
                        >
                            <MenuItem value={'Virtual'}>Virtual</MenuItem>
                            <MenuItem value={'Hybrid'}>Hybrid</MenuItem>
                            <MenuItem value={'In-Person'}>In-Person</MenuItem>
                        </TextField>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            required
                            InputProps={{
                                inputProps: {
                                    max: 1000, min: 0
                                }
                            }}
                            id="capacity"
                            type="number"
                            name="capacity"
                            label="Capacity"
                            placeholder="Max students per class"
                            fullWidth
                            variant="standard"
                            value={capacity}
                            onChange={(e) => setCapacity(e.target.value)}
                        />
                    </Grid>
                </Grid>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                >
                    Update Course
                </Button>
            </form>
        </Container>
    )
}

export default EditCourse