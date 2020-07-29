import React, {useState} from 'react'
import './Admin.css'
import EditTable from './EditTable'
import ViewTable from './ViewTable'

function Admin() {

  const [rows, setRows] = useState([1,2,3,4,5,6,7,8].map(() => {
    const w = {}
    w.dbPage = "" 
    w.key = ""
    w.English = ""
    w.Chinese = ""
    w.Pinyin = ""
    w.French = ""
    w.German = ""
    return w
  }))
  const [words, setWords] = useState([])

  const [isEditing, setIsEditing] = useState(true)

  function updateRows(rows) {
    setRows(rows)
  }

  function preview() {
    const wds = []
    for(let i=0; i<8; i++) {
      const w = rows[i]
      if (w && w.dbPage && (w.English || w.Chinese || w.Pinyin || w.French || w.German)) {
        wds.push(w)
      }
    }
   
    setWords(wds)
    setIsEditing(false)
  }
  function edit() {
    setIsEditing(true)
  }
  const table = isEditing ? <EditTable rows={rows} updateRows={updateRows}/> : <ViewTable  words={words}/>
  const previewNoDisp = isEditing ? "" : "_noDisp"
  const editNoDisp = isEditing ? "_noDisp" : ""
  const saveNoDisp = isEditing ? "_noDisp" : ""
  return (<>
    {table}
    
    <button onClick={preview} className={`_ready btn btn-info ${previewNoDisp}`}>Preview</button>
    <button onClick={edit} className={`_ready btn btn-info ${editNoDisp}`}>Back</button>
    <button className={`_save btn btn-success ${saveNoDisp}`}>Save to database</button>
  </>)
}

export default Admin

