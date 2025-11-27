<template>
  <div ref="monacoRef"></div>
</template>
<script>
import * as monacoEditor from 'monaco-editor'
import { watch, onMounted, nextTick, onBeforeUnmount, ref } from 'vue'

export default {
  props: {
    original: {
      type: String
    },
    value: {
      type: String,
      required: true
    },
    theme: {
      type: String,
      default: 'vs'
    },
    language: {
      type: String
    },
    options: {
      type: Object
    },
    amdRequire: {
      type: Function
    },
    diffEditor: {
      type: Boolean,
      default: false
    }
  },
  emits: ['change', 'editorWillMount', 'editorDidMount'],
  setup(props, { emit }) {
    let editor = null

    let monaco = null
    const monacoRef = ref(null)

    const getMonaco = () => editor

    const getEditor = () => editor

    const getModifiedEditor = () => (props.diffEditor ? editor.getModifiedEditor() : editor)

    const getOriginalEditor = () => (props.diffEditor ? editor.getOriginalEditor() : editor)

    const getModelMarkers = () => monaco.editor.getModelMarkers()

    const initMonaco = (monaco) => {
      emit('editorWillMount', monaco)
      let options = {}

      Object.assign(
        options,
        {
          value: props.value,
          theme: props.theme,
          language: props.language
        },
        props.options
      )

      if (props.diffEditor) {
        editor = monaco.editor.createDiffEditor(monacoRef.value, options)
        let originalModel = monaco.editor.createModel(props.original, props.language)

        let modifiedModel = monaco.editor.createModel(props.value, props.language)

        editor.setModel({
          original: originalModel,
          modified: modifiedModel
        })
      } else {
        editor = monaco.editor.create(monacoRef.value, options)
      }

      let editor2 = getModifiedEditor()

      editor2.onDidChangeModelContent((event) => {
        let value = editor2.getValue()

        if (props.value !== value) {
          emit('change', value, event)
        }
      })
      emit('editorDidMount', editor2)
    }

    const focus = () => editor && editor.focus()

    onMounted(() => {
      if (props.amdRequire) {
        props.amdRequire(['vs/editor/editor.main'], () => {
          monaco = window.monaco
          nextTick(() => {
            initMonaco(window.monaco)
          })
        })
      } else {
        monaco = monacoEditor
        nextTick(() => {
          if (monacoRef.value) {
            initMonaco(monacoEditor)
          }
        })
      }
    })

    onBeforeUnmount(() => {
      editor && editor.dispose()
    })

    watch(
      () => props.options,
      (value) => {
        if (editor) {
          let editor2 = getModifiedEditor()

          editor2.updateOptions(value)
        }
      },
      {
        deep: true
      }
    )

    watch(
      () => props.value,
      (newValue) => {
        if (editor) {
          let editor2 = getModifiedEditor()

          if (newValue !== editor2.getValue()) {
            editor2.setValue(newValue)
          }
        }
      }
    )

    watch(
      () => props.original,
      (newValue) => {
        if (editor && props.diffEditor) {
          let editor2 = getOriginalEditor()

          if (newValue !== editor2.getValue()) {
            editor2.setValue(newValue)
          }
        }
      }
    )

    watch(
      () => props.language,
      (newVal) => {
        if (editor) {
          let editor2 = getModifiedEditor()

          monaco.editor.setModelLanguage(editor2.getModel(), newVal)
        }
      }
    )

    watch(
      () => props.theme,
      (newVal) => {
        if (editor) {
          monaco.editor.setTheme(newVal)
        }
      }
    )

    return {
      getMonaco,
      getEditor,
      getModifiedEditor,
      getOriginalEditor,
      initMonaco,
      focus,
      monacoRef,
      getModelMarkers
    }
  }
}
</script>
