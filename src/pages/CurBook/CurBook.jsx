import React, { useState, useEffect } from 'react'
import cl from './CurBook.module.css'
import { selectId } from '../../redux/curBookSlice'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Loading from '../../components/UI/Loading/Loading'

export default function CurBook(props) {

  const [data, setData] = useState({})
  const [notFound, setNotFound] = useState(false)

  const id = useSelector(selectId)

  useEffect(() => {
    fetchData(id)
  }, [id])

  function fetchData(id) {
    fetch(`https://www.googleapis.com/books/v1/volumes/${id}`)
      .then(resopnse => {
        return resopnse.json()
      })
      .then(res => {
        if (res.error) {
          throw new Error(res.error.message)
        }

        setData(res)
      })
      .catch((e) => {
        if (e.message) {
          setNotFound(true)

          return -1
        }
      })
  }

  if (!data.volumeInfo && notFound) {
    return (
      <>
        <div className={cl.return}>
          <Link to='/'><button>Назад</button></Link>
        </div>
        <h1 className={cl.noData}>Book not found</h1>
      </>
    )
  }

  return (
    !data.volumeInfo
      ?
      <Loading />
      :
      <div className="container">
        <div className={cl.return}>
          <Link to='/'><button>Назад</button></Link>
        </div>
        <div className={cl.curBook}>
          <div className={cl.mainInfo}>
            <div className={cl.img}>
              <img src={data.volumeInfo.imageLinks && data.volumeInfo.imageLinks.small} alt="" />
            </div>
            <div className={cl.bookInfo}>
              <div className={cl.title}>
                <h1>{data.volumeInfo.title || 'no title'}</h1>
              </div>
              <div className={cl.autors}>
                <h2>Authors</h2>
                {data.volumeInfo.authors ? data.volumeInfo.authors && data.volumeInfo.authors.map((author, index) => <p key={index}>{author}</p>) : 'no authors'}
              </div>
              <div className={cl.categories}>
                <h2>Categories</h2>
                {data.volumeInfo.categories ? data.volumeInfo.categories[0].split(' / ').map((category, index) => <p key={index}>{category}</p>) : 'no categories'}
              </div>
            </div>
          </div>
          <div className={cl.description}>
            <h2>Description</h2>
            {data.volumeInfo.description || 'no description'}
          </div>
        </div>
      </div>
  )
}
