import { Grid, Card, TextField, Select, FormControl, InputLabel, MenuItem } from "@mui/material"
import { useState } from "react"
import axios from 'axios'
import useStyles from './styles'
const Form = () => {
    const [formData, setFormData] = useState({
        name: '',
        imf: '',
        authorType: '',
        myfile: '',
        date: ''
    })
    const {
        name, imf, authorType, file, date
    } = formData
    const classes = useStyles()
    const onChange = e => {
        setFormData({ ...formData, myfile: e.target.files[0] })

    }
    const onSubmit = e => {
        e.preventDefault()
        formData.imf = +formData.imf
        console.log(formData)
        const sfx = new FormData()
        sfx.append('myfile', formData.myfile)
        sfx.append('name', formData.name)
        sfx.append('imf', formData.imf)
        sfx.append('authorType', formData.authorType)
        sfx.append('date', formData.date)


        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }
        axios.post('http://localhost:5000/upload/', sfx, config).then((response) => {
            alert("The file is successfully uploaded");
            console.log('success')
        }).catch((error) => {
            console.log(error.message)
        });



        // axios.post('http://localhost:5000/upload',formData,config).then((res) => {
        //     alert('Uploaded Sucessfully')
        // }).catch((err) => console.log(err.message))


        setFormData({
            name: '',
            imf: '',
            authorType: '',
            file: '',
            date: ''
        })

        // console.log(file)
        // 
    }
    const handleChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }
    return (
        <>
            <form onSubmit={e => onSubmit(e)} name='myForm' id='myForm'>
                <Grid container alignItems='center' sx={{ minHeight: '100vh' }}>
                    <Grid item xs={2} />
                    <Grid item container xs={8}>
                        <Grid item xs={2} />

                        <Grid item container xs={8} justifyContent='center' name='maingrid' spacing={2}>
                            <Card sx={{ minWidth: '30vw', minHeight: '50vh' }}>
                                <Grid item container direction='column' xs={6} spacing={2} sx={{ margin: 1.5 }}>
                                    <Grid item xs={12} sx={{ flex: 1 }}>
                                        <TextField id='standard-basic'
                                            name='name'
                                            label='Enter your name here'
                                            variant='standard' value={name}
                                            onChange={e => handleChange(e)}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sx={{ flex: 1 }}>
                                        <TextField id='standard-basic' label='Impact Factor' variant='standard'
                                            name='imf'
                                            value={imf}
                                            onChange={e => handleChange(e)}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sx={{ flex: 1 }}>
                                        <FormControl fullWidth>
                                            <InputLabel id="authorType">Author Type</InputLabel>
                                            <Select
                                                labelId="authorType"
                                                id="authorType"
                                                name='authorType'
                                                value={authorType}
                                                label="Author Type"
                                                onChange={handleChange}
                                            >
                                                <MenuItem value={'Professor'}>Professor</MenuItem>
                                                <MenuItem value={'Student'}>Student</MenuItem>
                                                <MenuItem value={'Other'}>Other</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item sx={{ flex: 1 }}>
                                        <input type='file' name='myfile' onChange={e => onChange(e)}

                                        />
                                    </Grid>
                                    <Grid item sx={{ flex: 1 }}>
                                        <input type='date' name='date' value={date} onChange={handleChange} />
                                    </Grid>
                                    <Grid item sx={{ flex: 1 }}>
                                        <button type='submit'>Submit</button>
                                    </Grid>
                                </Grid>
                                <Grid item xs={6} />
                            </Card>

                        </Grid>
                        <Grid item xs={2} />

                    </Grid>
                    <Grid item xs={2} />
                </Grid >
            </form>
        </>
    )
}

export default Form
