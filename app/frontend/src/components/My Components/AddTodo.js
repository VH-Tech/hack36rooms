import React, { useState } from 'react';

export const AddTodo = (props) => {
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");    
    const [time1, setTime1] = useState("");    
    const [time2, setTime2] = useState("");    
    const [time3, setTime3] = useState("");    
    const [time4, setTime4] = useState("");    
    const [time5, setTime5] = useState("");    
    const [time6, setTime6] = useState("");    
    const [time7, setTime7] = useState("");    

    const submit = (e) => {
        e.preventDefault();
        if (!title || !desc) {
            alert("Course or Class Link cannot be empty!")
        }
        else {
            alert("Your link has been added sucessfully!")
            props.addTodo(title, desc, time1, time2, time3, time4, time5, time6, time7);
            setTitle("");
            setDesc("")
            setTime1("");
            setTime2("");
            setTime3("");
            setTime4("");
            setTime5("");
            setTime6("");
            setTime7("");
        }
    }
    return (

        <div className="container">
            <h5 className='text-center my-3' style={{fontFamily:"monospace"}}>Add Class Links</h5>
            <form onSubmit={submit}>
                <div className="container mb-3" style={{fontFamily:"monospace"}}>
                    <label htmlFor="title" className="form-label">Course</label>
                    <input type="text" value={title} onChange={(e) => { setTitle(e.target.value) }} className="form-control" id="title" aria-describedby="emailHelp" />
                </div>
                <div className="container mb-3" style={{fontFamily:"monospace"}}>
                    <label htmlFor="desc" className="form-label">Class Link</label>
                    <input type="text" value={desc} onChange={(e) => { setDesc(e.target.value) }} className="form-control" id="desc" />
                </div>
                <div className='input-group  mb-3 ' style={{fontFamily:"monospace"}}>
                <div className="btn-group-vertical mb-3 mx-4">
                    <button className="btn btn-primary" type="button" id="button-addon1" onClick="myfunction()">Monday</button>
                    <input type="time" style={{width :'100%'}} className="fix_width" id="appt1" name="appt" onChange={(e) => { setTime1(e.target.value) }} />
                </div>
                <div className="btn-group-vertical mb-3 mx-4">
                    <button className="btn btn-primary" type="button" id="button-addon1" onClick="myfunction()">Tuesday</button>
                    <input type="time" style={{width :'100%'}} className="fix_width" id="appt2" name="appt" onChange={(e) => { setTime2(e.target.value) }} />
                </div>
                <div className="btn-group-vertical mb-3 mx-4">
                    <button className="btn btn-primary" type="button" id="button-addon1" onClick="myfunction()">Wednesday</button>
                    <input type="time" style={{width :'100%'}} className="fix_width" id="appt3" name="appt" onChange={(e) => { setTime3(e.target.value) }} />
                </div>
                <div className="btn-group-vertical mb-3 mx-4">
                    <button className="btn btn-primary" type="button" id="button-addon1" onClick="myfunction()">Thursday</button>
                    <input type="time" style={{width :'100%'}} className="fix_width" id="appt4" name="appt" onChange={(e) => { setTime4(e.target.value) }} />
                </div>
                <div className="btn-group-vertical mb-3 mx-4">
                    <button className="btn btn-primary" type="button" id="button-addon1" onClick="myfunction()">Friday</button>
                    <input type="time" style={{width :'100%'}} className="fix_width" id="appt5" name="appt" onChange={(e) => { setTime5(e.target.value) }} />
                </div>
                <div className="btn-group-vertical mb-3 mx-4">
                    <button className="btn btn-primary" type="button" id="button-addon1" onClick="myfunction()">Saturday</button>
                    <input type="time" style={{width :'100%'}} className="fix_width" id="appt6" name="appt" onChange={(e) => { setTime6(e.target.value) }} />
                </div>
                <div className="btn-group-vertical mb-3 mx-4">
                    <button className="btn btn-primary" type="button" id="button-addon1" onClick="myfunction()">Sunday</button>
                    <input type="time" style={{width :'100%'}} className="fix_width" id="appt7" name="appt" onChange={(e) => { setTime7(e.target.value) }} />
                </div>
                </div>

                <div style={{fontFamily:"monospace"}}>   <button type="submit" className="btn btn-success mx-3 my-3">Add Link</button>
                </div>
            </form>
        </div>
    )
}
