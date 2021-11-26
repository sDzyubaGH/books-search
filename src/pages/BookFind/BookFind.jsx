import React from 'react'
import Header from '../../components/Header/Header'
import Books from '../../components/Books/Books'

export default function BookFind() {
  return (
    <div className="finding">
      <Header />
      <div className="container">
        <Books />
      </div>
    </div>
  )
}
