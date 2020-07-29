import React, {useState} from 'react';
import './App.css';
import Admin from './Admin'
import Navbar from './Navbar'

function App() {
  const [mode, setMode] = useState("Edit")
  const [chapter, setChapter] = useState(0)
  const [lesson, setLesson] = useState(0)
  const [page, setPage] = useState(0)

  function updateMode (mode) {
    setMode(mode)
  }
  function updateChapter (chap) {
    if (chap !== chapter) {
      setChapter(chap)
      if (lesson && lesson>0) {
        setLesson(1)
      }
      if (page && page>0) {
        setPage(1)
      }
    }
  }
  function updateLesson(less) {
    if (less !== lesson) {
      setLesson(less)
      if (page && page>0) {
        setPage(1)
      }
    }
  }
  function updatePage(page) {
    setPage(page)
  }
  return (<>
    <Navbar mode={mode} updateMode={updateMode}
      chapter={chapter} updateChapter={updateChapter}
      lesson={lesson} updateLesson={updateLesson}
      page={page} updatePage={updatePage}
    />
    <Admin mode={mode} chapter={chapter} lesson={lesson} page={page}/>
  </>);
}

export default App;
