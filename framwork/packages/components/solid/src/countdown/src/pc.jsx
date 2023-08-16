import renderless from '@opentiny/renderless/countdown/solid'
import { useSetup } from '@opentiny/solid-common'
import '@opentiny/theme/countdown/index.less'

export default function Countdown(props) {

  const defaultProps = {
    deadline: 60,
    completeZero: true,
    leftSecond: 0,
    ignoreDay: true,
  }
  const {
    state,
  } = useSetup({
    props: { ...props, ...defaultProps },
    renderless
  })

  return (
    <div class='tiny-countdown__container'>{`${state().hour}:${state().minute}:${state().second}`}</div>
  )
}
