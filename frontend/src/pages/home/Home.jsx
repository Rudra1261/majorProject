import React, { useState } from 'react'

const Home = () => {
    const [formData, setFormData] = useState({
        from: '',
        to: '',
        currentFile:''
    });
    const { from, to } = formData;
    const onChange = e => {
        console.log(e.target.name)
        setFormData({ ...formData, [e.target.name] : e.target.value })
    }
    const onFile = e =>{
            setFormData({...formData, currentFile : e.target.files[0]})
            console.log(typeof(e.target.files[0]))

    }
    return (
        <>
            <form onSubmit={e => {
                e.preventDefault()
                console.log(formData)
            }
            }>
                <input type='date' name='from' value={from} onChange={e => onChange(e)} />
                <input type='date' name='to' value={to} onChange={e => onChange(e)} />
                <input type='file' name = 'currentFile' onChange = {e => onFile(e)}/>
                <button type='submit'>Submit</button>
            </form>
        </>
    )
}

export default Home
