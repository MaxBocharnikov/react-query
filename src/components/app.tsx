import React, { useState } from 'react'
import Post1 from './post1'
import Post2 from './post2'

const App: React.FC = () => {
  const [tab, setTab] = useState<'post1' | 'post2'>('post1')
  return (
    <>
      <button onClick={() => { setTab('post1') }}>Post 1</button>
      <button onClick={() => { setTab('post2') }}>Post 2</button>
      {tab === 'post1' && <Post1 />}
      {tab === 'post2' && <Post2 />}
    </>
  )
}

export default App
