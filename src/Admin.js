import React from 'react'
import './Admin.css'

function Admin() {
  return (<>
    <div className="_tableWrap">
      <table className="_table">
        <thead>
          <tr>
            <th className="text-center">db Page</th>
            <th className="text-center">key</th>
            <th className="text-center">English</th>
            <th className="text-center">中文</th>
            <th className="text-center">拼音</th>
            <th className="text-center">Français</th>
            <th className="text-center">Deutsche</th>
            <th>  </th>
          </tr>
        </thead>
        <tbody>
          {[1,2,3,4,5,6,7,8].map((i) => {
            return (
              <tr key={i}>
                <td>
                  <input className="_dbPageInput _input" type="text"></input>
                </td>
                <td>
                  <input className="_keyInput _input" type="text"></input>
                </td>
                <td>
                  <input className="_lanInput _input" type="text"></input>
                </td>
                <td>
                  <input className="_lanInput _input" type="text"></input>
                </td>
                <td>
                  <input className="_lanInput _input" type="text"></input>
                </td>
                <td>
                  <input className="_lanInput _input" type="text"></input>
                </td>
                <td>
                  <input className="_lanInput _input" type="text"></input>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  </>)
}

export default Admin