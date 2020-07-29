import React from 'react'
import './Navbar.css'
import Util from './Util'

function Navbar({mode, updateMode, chapter, updateChapter, lesson,
  updateLesson, page, updatePage, password, updatePassword}){

  const chapterText = chapter && chapter>0 ? "Unit "+chapter : "Chapters"
  const lessonText = lesson && lesson>0 ? "Lesson "+lesson : "Lessons"
  const pageText = page && page>0 ? "Page "+page : "Pages"
  const pageCount = Util.getPageCount("", chapter, lesson)

  let pages = []
  if (pageCount && pageCount>0) {
    for(let i=1; i<=pageCount;i++) {
      pages.push(i)
    }
  }

  let chapterDropdown = null
  let lessonDropdown = null
  let pageDropdown = null

  if (mode === "Edit") {
    chapterDropdown =
      <li className="nav-item dropdown">
        <span className="nav-link dropdown-toggle _pointer" href="#" id="navbardrop" data-toggle="dropdown">
          {chapterText}
        </span>
        <div className="dropdown-menu">
          {[1,2,3].map((i) =>
            <span key={i} onClick={() => {updateChapter(i)}} className="dropdown-item _pointer">Chapter {i}</span>
          )}
        </div>
      </li>
  }

  if (chapterDropdown && chapter && chapter>0) {
    lessonDropdown =
      <li className="nav-item dropdown">
        <span className="nav-link dropdown-toggle _pointer" href="#" id="navbardrop" data-toggle="dropdown">
          {lessonText}
        </span>
        <div className="dropdown-menu">
          {[1,2,3,4,5,6,7,8,9,10,11,12].map((i) =>
            <span key={i} onClick={() => {updateLesson(i)}} className="dropdown-item _pointer">Lesson {i}</span>
          )}
        </div>
      </li>
  }

  if (lessonDropdown && lesson && lesson > 0) {
    pageDropdown = 
      <li className="nav-item dropdown">
        <span className="nav-link dropdown-toggle _pointer" href="#" id="navbardrop" data-toggle="dropdown">
          {pageText}
        </span>
        <div className="dropdown-menu">
          {pages.map((i) =>
            <span key={i} onClick={() => {updatePage(i)}} className="dropdown-item _pointer">Page {i}</span>
          )}
        </div>
      </li>
  }

  return(<>
    <nav className="navbar navbar-expand-sm bg-dark navbar-dark">
      
      <span className="navbar-brand _brand">Happy Admin</span>

      <ul className="navbar-nav mr-auto">
        <li className="nav-item dropdown">
          <span className="nav-link dropdown-toggle _pointer" href="#" id="navbardrop" data-toggle="dropdown">
            {mode}
          </span>
          <div className="dropdown-menu">
            <span onClick={() => {updateMode("Edit")}} className="dropdown-item _pointer">Edit</span>
            <span onClick={() => {updateMode("Create")}} className="dropdown-item _pointer">Create</span>
          </div>
        </li>
        {chapterDropdown}

        {lessonDropdown}

        {pageDropdown}


      </ul> 
      <ul className="navbar-nav">
        <li>
          <input value={password} onChange={(e)=>{ updatePassword(e.target.value) }}
            type="text" class="form-control _password navbar-right" placeholder="Password"/>
        </li> 
      </ul> 
  
    </nav>
  </>)
}

export default Navbar