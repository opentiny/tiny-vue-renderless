import renderless from '@opentiny/renderless/countdown/react'
import { useSetup } from '@opentiny/react-common'
import '@opentiny/theme/countdown/index.less'

export default function Countdown(props) {
  const defaultProps = {
    deadline: 60,
    completeZero: true,
    leftSecond: 0,
    autoPlay: false,
    ignoreDay: true,
  }

  const newProps = { ...props, ...defaultProps }


  const {
    state,
  } = useSetup({
    props: newProps,
    renderless
  })

  return (
    <div className='tiny-countdown__container'>{`${state.hour}:${state.minute}:${state.second}`}</div>
  )
}
