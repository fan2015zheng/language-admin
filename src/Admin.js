import React, {useState, useEffect} from 'react'
import './Admin.css'
import EditTable from './EditTable'
import ViewTable from './ViewTable'
import Util from './Util'

function emptyRows() {
  return [1,2,3,4,5,6,7,8].map(() => {
    const w = {}
    w.page = "" 
    w.key = ""
    w.English = ""
    w.Chinese = ""
    w.Pinyin = ""
    w.French = ""
    w.German = ""
    return w
  })
}

function addPond(text) {
  if(text && text.charAt(0) !== '#') {
    return '#'+text
  }
  return text
}

function Admin({mode, chapter, lesson, page, password}) {

  const [rows, setRows] = useState(() => emptyRows())
  const [words, setWords] = useState([])

  const [isEditing, setIsEditing] = useState(true)

  const dbPage = Util.getDatabasePage("", chapter, lesson, page)
  const chapterLessonPage = `${chapter}-${lesson}-${dbPage}`

  function load() {
    fetch(`https://language5.herokuapp.com/words/${chapterLessonPage}`)
    .then(res => res.json())
    .then(data => {
      const newRows = emptyRows()
      for(let i=0; i<data.length && i<8; i++) {
        newRows[i] = data[i]
      }
      setRows(newRows)
    })
  }

  useEffect(load, [chapterLessonPage])

  function updateRows(rows) {
    setRows(rows)
  }

  function preview() {
    const wds = []
    for(let i=0; i<8; i++) {
      const w = rows[i]
      
      if (w && w.page && (w.English || w.Chinese || w.Pinyin || w.French || w.German)) {
        if (!w._id) {
          w.key = addPond(w.key)
          w.English = addPond(w.English)
          w.Chinese = addPond(w.Chinese)
          w.Pinyin = addPond(w.Pinyin)
          w.French = addPond(w.French)
          w.German = addPond(w.German)
        }
        w.admin = 1   // set a flag in case the admin page produce mass error data
        wds.push(w)
      }
    }
    if (wds.length < 1) {
      alert("Please enter at least a db-page and a language")
      return
    }
   
    setWords(wds)
    setIsEditing(false)
  }
  function edit() {
    setIsEditing(true)
  }

  function save() {
    if (password !== "快乐管理") {
      alert("Incorrect passord")
      return
    }
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(words)
    }
    fetch('https://language5.herokuapp.com/word', options)
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          setIsEditing(true)
          if (mode === "Create") {
            setRows(emptyRows())
          }
          else {
            load()
          }
        } else {
          alert("Database Error !")
        }
      })
    
  }

  const table = isEditing ? 
    <EditTable rows={rows} updateRows={updateRows}
      mode={mode} chapter={chapter} lesson={lesson} page={page}
    /> : 
    <ViewTable  words={words}/>
  const previewNoDisp = isEditing ? "" : "_noDisp"
  const editNoDisp = isEditing ? "_noDisp" : ""
  const saveNoDisp = isEditing ? "_noDisp" : ""
  const bigSpace = <span>
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  </span>
  return (<>
    {table}
    
    <button onClick={preview} className={`_ready btn btn-info ${previewNoDisp}`}>Preview {bigSpace} Preview  {bigSpace} Preview </button>
    <button onClick={edit} className={`_ready btn btn-info ${editNoDisp}`}>Back</button>
    <button onClick={save} className={`_save btn btn-success ${saveNoDisp}`}>Save to database</button>
  </>)
}

export default Admin

