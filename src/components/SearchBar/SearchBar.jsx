import React from 'react'
import { setCategory, setSortType } from '../../redux/optionsSlice'
import { useDispatch } from 'react-redux'
import cl from './SearchBar.module.css'

export default function SearchBar(props) {

  const dispatch = useDispatch()

  const formSubmit = e => {
    e.preventDefault()

    props.queryHandler(document.querySelector('#bookName').value)

    document.getElementById('category').value = 'all'
    document.getElementById('sort').value = 'relevance'

    dispatch(setCategory('all'))
    dispatch(setSortType('relevance'))
  }

  const categoryChange = e => {
    dispatch(setCategory(e.target.value))
  }

  const sortTypeChange = e => {
    dispatch(setSortType(e.target.value))
  }

  return (
    <div className={cl.searchBar}>
      <form className={cl.sbForm} onSubmit={formSubmit}>
        <input id="bookName" type="text" placeholder="Book's name" />
        <button type="submit">Find</button>
      </form>
      <div className={cl.options}>
        <div className={cl.categories}>
          <span>categories</span>
          <select className={cl.selectOptions} onChange={categoryChange} name="" id="category">
            <option autoFocus value="all">all</option>
            <option value="art">art</option>
            <option value="biography">biography</option>
            <option value="computers">computer</option>
            <option value="science">science</option>
          </select>
        </div>
        <div className={cl.sort}>
          <span>sorting by</span>
          <select className={cl.selectOptions} onChange={sortTypeChange} name="" id="sort">
            <option autoFocus value="relevance">relevance</option>
            <option value="newest">newest</option>
          </select>
        </div>
      </div>
    </div>
  )
}
