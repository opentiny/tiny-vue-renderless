export const queryChange = ({ select, state, vm }) => () => {
  state.visible = true

  if (Array.isArray(select.state.options)) {
    const groupOptions = select.state.options.filter(
      (option) => option.state.parent && vm && option.state.parent.label === vm.label
    )

    if (Array.isArray(groupOptions)) {
      state.visible = groupOptions.some((option) => option.visible === true)
    }
  }
}
