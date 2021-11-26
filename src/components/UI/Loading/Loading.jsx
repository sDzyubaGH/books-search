import React from 'react'
import classes from './Loading.module.css'

export default function Loading() {
  return (
    <div className={classes.loader}>
      <div className={classes.circle}>
        <div className={classes.innerCircle}></div>
      </div>
    </div>
  )
}
