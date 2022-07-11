import React from 'react'

const Button = (props) => {
  return (
    <div>
        <button type={props.type} className='rounded-lg bg-purple-300 text-black font-medium px-1 py-2 hover:bg-purple-200 min-w-[80px] hover:ring-2 hover:ring-black' onClick={props.onClick}>{props.children}</button>
    </div>
  )
}

export default Button