import React, { memo } from 'react'

const Copyright: React.FC = memo(
  function Copyright() {
    return (
      <footer className='info'>
        <p>
          Created by <a href='https://github.com/Canglangzhuoxi'>Hang</a>
        </p>
        <p>
          Part of <a href='http://todomvc.com'>TodoMVC</a>
        </p>
      </footer>
    )
  },
  () => true,
)

export default Copyright
