import React, { useState } from 'react'
import Header from './Header'

const App: React.FC = () => {
  const [counter, setCounter] = useState<number>(0)

  const handleIncreaseClick = () => {
    setCounter((prev) => prev + 1)
  }

  return (
    <>
      <Header />
      <h4>Counter: {counter}</h4>

      <button onClick={handleIncreaseClick}>Increase</button>
    </>
  )
}

export default App
