import React from 'react'

export const metadata = {
  title:"Nostr forum"
}

//This important use the children in a layout
function layout({children}) {
  return (
    <div>
      {children}
    </div>
  )
}

export default layout
