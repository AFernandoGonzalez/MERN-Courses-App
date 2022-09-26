import { React, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import axios from 'axios';


const AddCourse = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [location, setLocation] = useState('');
    const [capacity, setCapacity] = useState(0);

    const navigate = useNavigate();

    const createCourse = async (e) => {
        e.preventDefault();

        let newCourse = {
            // id: uuidv4(),
            title,
            description,
            location,
            capacity
        }
        // 1. way
        try {
            await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/courses`, newCourse);
            e.target.reset();
            navigate('/');
        } catch (error) {
            return new Error({ message: error })
        }
    }

    return (
        <Container component="main" maxWidth="sm" sx={{ mt: 4 }}>
            <form onSubmit={createCourse}>
                <Typography variant="h6" gutterBottom>
                    Add Your Course
                </Typography>
                <Grid container spacing={3}>
                    <Grid item xs={12} >
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
                    Add Course
                </Button>
            </form>
        </Container>
    )
}

export default AddCourse