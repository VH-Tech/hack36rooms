import React from 'react'
import { TodoItem } from './TodoItem'

export const Todos = (props) => {
    return (
        <div className="container" style={{fontFamily:"monospace"}}>
            <h5 className='text-center mx-3 my-3'>Class Links</h5>
            {props.todos.length===0? "No Links to show." :
            props.todos.map((todo) => {
                return <TodoItem className="container-fluid" sytle={{width : '33%',}} todo={todo} key={todo.sno} onDelete={props.onDelete} />
            })
            }
        </div>
    )
}
