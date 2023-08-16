import { Button, Countdown } from '@opentiny/react'
import './style.css'

const operation = {
  start: () => { },
  reset: () => { }
}

const operate = ({ start, reset }) => {
  operation.start = start
  operation.reset = reset
}

function App() {
  return (
    <>
      <div className="demo-box">
        <h1 className="demo-titile">React</h1>
        <div className="demo-container">
          <div className="tiny-countdown"> <Countdown operate={operate} /> </div>
          <div className="btn-box">
            <Button type="primary" click={() => operation.reset()}>Reset</Button>
            <Button type="danger" click={() => operation.start()}>Start</Button>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
