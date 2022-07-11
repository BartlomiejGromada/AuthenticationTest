import React from 'react'

const TextField = React.forwardRef((props, ref) => {
  return (
    <div className='flex flex-col'>
        <label htmlFor={props.id} className='text-white text-xl'>{props.label}</label>
        <input type={props.type} id={props.id} placeholder={props.placeholder} ref={ref} className='outline-none focus:ring-2 focus:ring-black  mt-3 p-2 rounded-md text-black'/>
    </div>
  )
})

export default TextField