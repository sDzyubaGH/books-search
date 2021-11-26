import React from 'react'
import { useSelector } from 'react-redux'
import cl from './TotalItems.module.css'

export default function TotalItems() {
  const totalItems = useSelector(state => state.lib.totalItems)
  return (
    <div className={cl.totalItems}>
      <p>Books amount: {totalItems || 'unknown'}</p>
    </div>
  )
}
