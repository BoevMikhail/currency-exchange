import React from 'react'
import classes from './MyInput.module.css'

const MyInput = React.forwardRef((props, ref) => {
  return (
    <input ref={ref} className={classes.input} type='text' {...props} />
  )
})

export default MyInput
