import React from 'react'
import './EditTable.css'

function EditTable({rows, updateRows}) {
  function onCellChange(rowIdex, columnName, value) {
    const rows2 = rows.map((w,i) => {
      if (i !== rowIdex) {
        return w
      }
      w[columnName] = value
      return w
    })
   
    updateRows(rows2)
  }
 
  return (<>
    <table className="_table">
      <thead>
        <tr>
          <th className="text-center">db Page</th>
          <th className="text-center">key</th>
          <th className="text-center">English</th>
          <th className="text-center">中文</th>
          <th className="text-center">拼音</th>
          <th className="text-center">Français çœéÉîèêâàù</th>
          <th className="text-center">Deutsche äÄ</th>
          <th>  </th>
        </tr>
      </thead>
      <tbody>
        {[0,1,2,3,4,5,6,7].map((i) => {
          return (
            <tr key={i}>
              <td>
                <input value={rows[i].page}
                  onChange={(e)=>{ onCellChange(i,"page",e.target.value) }}
                  className="_dbPageInput _input" type="text"/>
              </td>
              <td>
                <input value={rows[i].key}
                  onChange={(e)=>{ onCellChange(i,"key",e.target.value) }} 
                  className="_keyInput _input" type="text"/>
              </td>
              <td>
                <input value={rows[i].English}
                  onChange={(e)=>{ onCellChange(i,"English",e.target.value) }} 
                  className="_lanInput _input" type="text"/>
              </td>
              <td>
                <input value={rows[i].Chinese}
                  onChange={(e)=>{ onCellChange(i,"Chinese",e.target.value) }} 
                  className="_lanInput _input" type="text"/>
              </td>
              <td>
                <input value={rows[i].Pinyin}
                  onChange={(e)=>{ onCellChange(i,"Pinyin",e.target.value) }} 
                  className="_lanInput _input" type="text"/>
              </td>
              <td>
                <input value={rows[i].French}
                  onChange={(e)=>{ onCellChange(i,"French",e.target.value) }} 
                  className="_lanInput _input" type="text"/>
              </td>
              <td>
                <input value={rows[i].German}
                  onChange={(e)=>{ onCellChange(i,"German",e.target.value) }} 
                  className="_lanInput _input" type="text"/>
              </td>
            </tr>
          )
        })}
      </tbody>
    </table>
  </>)
}

export default EditTable

