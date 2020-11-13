import React from 'react'
import style from './Dot.module.css'
export function Dot({ color }){
  return(
    <div style={{
      border: `2px ${color} solid`,
      backgroundColor: `${color}`,
    }} className={style.dot}></div>
  )}
