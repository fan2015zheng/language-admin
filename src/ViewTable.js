import React from 'react'
import './ViewTable.css'

function EditTable({words}) {

  return (<>
    <table className="table table-striped">
      <thead>
        <tr>
          <th></th>
          <th className="text-center">db Page</th>
          <th className="text-center">key</th>
          <th className="text-center">English</th>
          <th className="text-center">中文</th>
          <th className="text-center">拼音</th>
          <th className="text-center">Français</th>
          <th className="text-center">Deutsche</th>
        </tr>
      </thead>
      <tbody>
        {words.map((w,i) => {
          return (
            <tr key={i}>
              <td className="text-center">{i+1}</td>
              <td className="text-center">{w.page}</td>
              <td className="text-center">{w.key}</td>
              <td className="text-center">{w.English}</td>
              <td className="text-center">{w.Chinese}</td>
              <td className="text-center">{w.Pinyin}</td>
              <td className="text-center">{w.French}</td>
              <td className="text-center">{w.German}</td>
            </tr>
          )
        })}
      </tbody>
    </table>
  </>)
}

export default EditTable