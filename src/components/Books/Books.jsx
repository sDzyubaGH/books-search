import React, { useState } from 'react'
import SearchBar from '../SearchBar/SearchBar'
import cl from './Books.module.css'
import { useDispatch } from 'react-redux'
import { addBooks, loadMoreBooks, setTotalItems } from '../../redux/libSlice'
import BooksList from '../BooksList/BooksList'
import { setNotFound, incStartIndex } from '../../redux/querySlice'
import Loading from '../UI/Loading/Loading'

export default function Books() {
  const [isLoading, setIsLoading] = useState(false)

  const dispatch = useDispatch()

  const queryHandler = (query, sIndex = 0) => {
    !sIndex && setIsLoading(true)
    let maxRes = sIndex ? 30 : 12
    fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}&startIndex=${sIndex}&maxResults=${maxRes}`)
      .then(response => {
        return response.json()
      })
      .then(res => {
        setIsLoading(false)

        if (res.error) {
          dispatch(setNotFound(true))
          throw new Error(res.error.message)
        }

        if (!res.items) {
          // При нажатии на load more
          if (sIndex) {
            document.querySelector('#loadMore').style.display = 'none'

            return -1
          }

          dispatch(setNotFound(true))
          dispatch(addBooks([]))

          return -1
        }

        dispatch(setNotFound(false))
        dispatch(incStartIndex(30))

        if (sIndex) {
          dispatch(loadMoreBooks(res.items))

          return 0
        }

        dispatch(addBooks(res.items))
        dispatch(setTotalItems(res.totalItems))
      })
      .catch(e => {
        console.log(e.message)
      })
  }

  return (
    <div className={cl.books}>
      <SearchBar queryHandler={queryHandler} />
      {isLoading ? <Loading /> : <BooksList queryHandler={queryHandler} />}
    </div>
  )
}
