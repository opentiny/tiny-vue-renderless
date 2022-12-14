const hexToRgb = (hex) => {
  hex = hex.slice(1)

  if (hex.length == 3) {
    hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2]
  }

  return {
    r: parseInt(hex.slice(0, 2), 16),
    g: parseInt(hex.slice(2, 4), 16),
    b: parseInt(hex.slice(4, 6), 16)
  }
}

export const handleClick = ({ emit }) => ({ index, node }) => {
  emit('click', index, node)
}

/* istanbul ignore next */
export const flagOprate = ({ constants, refs, state }) => ({ event, over, text }) => {
  const tooltip = refs.tooltip

  if (over) {
    const textEl = event.target.querySelector(constants.FLAG_CONTENT_CLS)

    state.tipContent = text
    tooltip.state.referenceElm = event.target
    tooltip.doDestroy()
    tooltip.setExpectedState(true)
    textEl && textEl.scrollWidth > textEl.clientWidth && tooltip.handleShowPopper()
  } else {
    tooltip.setExpectedState(false)
    tooltip.handleClosePopper()
  }
}

export const getMileIcon = ({ constants, props }) => (node) => {
  const status = props.milestonesStatus[node[props.statusField]] || constants.DEFAULT_COLOR

  const isCompleted = node[props.statusField] === props.completedField
  const switchColor = isCompleted && !props.solid
  const { r, g, b } = hexToRgb(status)

  return {
    background: switchColor ? constants.DEFAULT_BACK_COLOR : status,
    color: switchColor ? status : constants.DEFAULT_BACK_COLOR,
    boxShadow: `rgba(${r},${g},${b},.4) ${constants.BOX_SHADOW_PX}`
  }
}

export const getMileContent = (props) => ({ data, index }) => {
  const content = data[props.flagBefore ? index : index + 1][props.flagField]
  return Array.isArray(content) ? content : []
}

export const getLineColor = (props) => (status) => {
  let background = ''

  if (status) {
    if (/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(props.lineStyle)) {
      background = props.lineStyle
    }

    if (props.lineStyle === 2) {
      background = props.milestonesStatus[status]
    } else if (props.lineStyle === 1) {
      background = status === props.completedField ? props.milestonesStatus[status] : ''
    }
  }

  return { background }
}

export const handleFlagClick = (emit) => ({ idx, flag }) => emit('flagclick', idx, flag)
