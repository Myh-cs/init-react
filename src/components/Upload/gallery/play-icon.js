import React from 'react'

const PlayIcon = ({ ...props }) => {
  return (
    <svg height='24' fill='#000000' viewBox='0 0 24 24' width='24' {...props}>
      <path d='M0 0h24v24H0z' fill='none' />
      <path d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z' />
    </svg>
  )
}

export default PlayIcon
