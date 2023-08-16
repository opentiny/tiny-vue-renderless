import { createSignal } from 'solid-js'
import { Button, Countdown } from '@opentiny/solid'

const operation = {
  start: () => { },
  reset: () => { },
  stop: () => { }
}

const operate = ({ start, reset }) => {
  operation.start = start
  operation.reset = reset
}
function App() {

  return (
    <>
      <div class="demo-box">
        <h1 class="demo-titile">Solid</h1>
        <div class="demo-container">
          <div class="tiny-countdown" style="--ti-countdown-font-color:pink;"><Countdown operate={operate}></Countdown></div>
          <div class="btn-box">
            <Button type="primary" onClick={operation.reset()}>Reset</Button>
            <Button type="danger" onClick={operation.start()}>Start</Button>
          </div>
        </div>
      </div>

    </>
  )
}

export default App
