
import './App.css'
import { GiPerson, GiSupersonicBullet } from 'react-icons/gi'
import { useEffect, useState, useRef } from 'react'

function App() {

  const inputRef = useRef(null)
  const [top, setTop] = useState(0)
  const [bottom, setBottom] = useState(0)
  const [left, setLeft] = useState(0)
  const [right, setRight] = useState(0)
  const [move, setMove] = useState(false)
  const [topBoundery, setTopBoundery] = useState(false)
  const [position, setPosition] = useState(null)

  useEffect(() => {
    document.addEventListener('keydown', (e) => handleMovement(e))
    document.addEventListener('keyup', () => setMove(false))
    setPosition(inputRef?.current.getBoundingClientRect())
  }, [move])

  useEffect(() => {
    console.log(position);
  }, [position])

  function handleMovement(e) {
    if (e.key === 'ArrowRight') {
      setRight(old => old + 1)
      setMove(true)
    } else if (e.key === 'ArrowLeft') {
      setLeft(old => old + 1)
      setMove(true)
    } else if (e.key === 'ArrowUp') {
      setTop(old => old + 1)
      setMove(true)
    } else if (e.key === 'ArrowDown') {
      setBottom(old => old + 1)
      setMove(true)
    }
  }


  return (
    <div className="App" onKeyDownCapture={(e) => handleMovement(e)} ref={inputRef}>
      <div className='viewport' style={{ position: 'reative', top, left, right, bottom }}>
        <img src="../src/assets/template.jpg" alt="" className='background' id='back' />
      </div>
      <span className='player' >
        {move ? <GiSupersonicBullet size={80} color='gold' /> : <GiPerson size={80} color='gold' />}
      </span>
    </div >
  )
}

export default App
