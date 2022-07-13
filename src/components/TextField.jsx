import React from 'react'

const TextField = React.forwardRef((props, ref) => {
  return (
    <div className='flex flex-col'>
        <label htmlFor={props.id} className={'text-white text-xl ' + (props.required ? '  after:content-["*"]' : '')}>{props.label}</label>
        <input type={props.type} id={props.id} placeholder={props.placeholder} ref={ref} className={'outline-none focus:ring-2 focus:ring-black  mt-3 p-2 rounded-md text-black   shadow-sm shadow-black ' + (props.isError ? ' ring-2 ring-red-300' : '')} />

        <div>
          {props.isError && <div className='text-red-300 pt-1'>{props.isError}</div>}
        </div>
    </div>
  )
})

export default TextField