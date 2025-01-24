import React from 'react'
import PropTypes from 'prop-types'



export default function Header(props ) {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
    <div className="container-fluid">
    <a class="navbar-brand" href="/">
    <img src="static/Hack36_Logo.png" width="30" height="30" alt=""/>
    </a>
      <a className="navbar-brand" style={{fontFamily:"monospace"}} href="/">{props.title}</a>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <a className="nav-link active" aria-current="page" style={{fontFamily:"monospace"}} href="/join">Join Room</a>
          </li>
          <li className="nav-item">
            <a className="nav-link active" style={{fontFamily:"monospace"}} href="/classes">Join Class</a>
          </li>
          <li className="nav-item">
            <a className="nav-link active" style={{fontFamily:"monospace"}} href="/create">Create Room</a>
          </li>
      
        </ul>
        {props.searchBar? <form className="d-flex">
          <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
          <button className="btn btn-outline-success" type="submit">Search</button>
        </form>: ""}
      </div>
    </div>
  </nav>
  )
}

Header.defaultProps ={
  title : "Your Title Here",
  searchBar : false
}

Header.propTypes = {

  title : PropTypes.string,
  searchBar : PropTypes.bool
}