import React from 'react'


export const TodoItem = ({todo, onDelete}) => {
    return (
        <div className=' container'>
            <h4 style={{fontFamily:"monospace"}} className='container my-2'>{todo.title}</h4>
            <h5 style={{fontFamily:"monospace"}} className="container my-2">{todo.desc}</h5>
            <p className='container'>
                <p style={{fontFamily:"monospace"}} className='container mx-2'>Monday-{todo.time1}</p>
                <p style={{fontFamily:"monospace"}} className='container mx-2'>Tueday-{todo.time2}</p>
                <p style={{fontFamily:"monospace"}} className='container mx-2'>Wednesday-{todo.time3}</p>
                <p style={{fontFamily:"monospace"}} className='container mx-2'>Thursday-{todo.time4}</p>
                <p style={{fontFamily:"monospace"}} className='container mx-2'>Friday-{todo.time5}</p>
                <p style={{fontFamily:"monospace"}} className='container mx-2'>Saturday-{todo.time6}</p>
                <p style={{fontFamily:"monospace"}} className='container mx-2'>Sunday-{todo.time7}</p>
            </p>
            <button style={{fontFamily:"monospace"}} className='btn btn-sm btn-primary mx-2' onClick={()=>{window.open(todo.desc)}}>Join</button>
            <button style={{fontFamily:"monospace"}} className='btn btn-sm btn-danger mx-3 my-1' onClick={()=>{onDelete(todo)}}>Delete</button>
            <hr color='white'></hr>
        </div>
    )
}
