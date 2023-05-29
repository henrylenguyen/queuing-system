import React from 'react'
import LoadingImg from 'assets/images/loading.gif'

type Props = {}

const Loading = (props: Props) => {
  return (
    <div className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2'>
      <img src={LoadingImg} alt='loading' />
    </div>
  )
}

export default Loading
