import React from 'react'
function BoilerplatePage({children}) {
  return (
    <div className='w-full min-h-screen bg-gray-200 pt-2'>
      <div className='mt-20'>
          <div className=' w-full min-h-screen '>
            {children}
          </div>
      </div>
    </div>
  )
}

export default BoilerplatePage;
