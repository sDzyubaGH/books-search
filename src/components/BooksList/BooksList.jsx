import React from 'react'
import Book from '../Book/Book'
import cl from './BooksList.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { selectLib } from '../../redux/libSlice'
import { selectQuery } from '../../redux/querySlice'
import { selectOptions } from '../../redux/optionsSlice'
import { Fragment } from 'react'
import { setId } from '../../redux/curBookSlice'
import { Link } from 'react-router-dom'
import TotalItems from '../TotalItems/TotalItems'

export default function BooksList(props) {
  const lib = useSelector(selectLib)
  const query = useSelector(selectQuery)
  const options = useSelector(selectOptions)
  const dispatch = useDispatch()

  let sortedList = [...lib]

  if (query.query.notFound) {
    return <h1 className={cl.notFound}>Books not found</h1>
  }

  if (!lib || !lib.length) {
    return <h1 className={cl.notFound}>Here will be your books</h1>
  }

  if (lib && options.category !== 'all') {
    sortedList = lib.filter(book => book.volumeInfo.categories &&
      ~(book.volumeInfo.categories[0].toLowerCase().indexOf(options.category.toLowerCase()))
    )
  }

  if (!query.query.notFound && !sortedList.length && options.category !== 'all') {
    return <h1 className={cl.notFound}>Books not found</h1>
  }

  if (lib && options.sortType !== 'relevance') {
    sortedList = [...sortedList].sort((a, b) => {
      let dateA = 0
      let dateB = 0

      if (!a.volumeInfo.publishedDate) {
        dateA = Number.MIN_SAFE_INTEGER
      } else {
        dateA = new Date(a.volumeInfo.publishedDate).getTime()
      }

      if (!b.volumeInfo.publishedDate) {
        dateB = Number.MIN_SAFE_INTEGER
      } else {
        dateB = new Date(b.volumeInfo.publishedDate).getTime()
      }

      return dateB - dateA
    })
  }

  const loadMoreClick = () => {
    props.queryHandler(query.query.bookName, query.query.startIndex)
  }

  function selectBook(id) {
    dispatch(setId(id))
  }

  return (
    <Fragment>
      <TotalItems />
      <div className={cl.bookList}>
        {sortedList.map((book, index) =>
          <div key={index}>
            <Link to='/book'>
              <Book
                onClick={selectBook}
                id={book.id}
                title={book.volumeInfo.title || ''}
                img={book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.thumbnail : ""}
                category={book.volumeInfo.categories || ''}
                authors={book.volumeInfo.authors || ''}
                date={book.volumeInfo.publishedDate || ''}
              />
            </Link>
          </div>
        )}
      </div>
      <div id="loadMore" className={cl.loadMore}>
        <button onClick={loadMoreClick}>Load more</button>
      </div>

    </Fragment>
  )
}
