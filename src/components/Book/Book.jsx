import React from 'react'
import cl from './Book.module.css'
import notFound from '../../img/notFound.jpg'

export default function Book(props) {
  return (
    <div onClick={() => props.onClick(props.id)} className={cl.bookCard}>
      <div className={cl.img}>
        <img className={cl.img} src={props.img || notFound} alt="тут должна быть обложка" />
      </div>
      <div className={cl.bookInfo}>
        <div className={cl.gridTmp}>
          <div>
            <p className={cl.textAlign}>Title</p>
          </div>
          <div>
            <p>{props.title}</p>
          </div>
        </div>
        <div className={cl.gridTmp}>
          <div>
            <p className={cl.textAlign}>Category</p>
          </div>
          <div>
            {
              props.category && props.category[0]
            }
          </div>
        </div>
        <div className={cl.gridTmp}>
          <div>
            <p className={cl.textAlign}>Authors</p>
          </div>
          <div>
            <div>
              {
                props.authors && props.authors.map((author, index) => <p key={index}>{author}</p>)
              }
            </div>
          </div>
        </div>
      </div>
    </div >
  )
}
