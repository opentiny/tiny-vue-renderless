import hasOwnProp from '../base/hasOwnProp'

const objectEach = (obj, iterate, context) => {
  if (obj) {
    Object.keys(obj).forEach((key) => {
      if (hasOwnProp(obj, key)) {
        iterate.call(context, obj[key], key, obj)
      }
    })
  }
}

export default objectEach
