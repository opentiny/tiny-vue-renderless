export const emitter = () => {
  let listeners = {}

  const on = (event, callback, once = false) => {
    if (event && typeof event === 'string' && typeof callback === 'function') {
      const callbacks = listeners[event] || []

      listeners[event] = callbacks
      callbacks.push(callback)
      callback.once = once
    }
  }

  const emitter = {
    emit(eventName) {
      const callbacks = listeners[eventName]

      if (callbacks) {
        callbacks.forEach((callback) => callback.apply(null, [].slice.call(arguments, 1)))

        listeners[eventName] = callbacks.filter((callback) => !callback.once)
      }
    },
    on,
    once(event, callback) {
      on(event, callback, true)
    },
    off(event, callback) {
      if (event && typeof event === 'string') {
        const callbacks = listeners[event]

        if (typeof callback === 'function') {
          listeners[event] = callbacks.filter((cb) => cb !== callback)
        } else {
          delete listeners[event]
        }
      } else {
        listeners = {}
      }
    }
  }

  return emitter
}
