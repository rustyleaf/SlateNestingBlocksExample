const helpers = {
  commands: {
    nextBlockByType(editor) {
      const { value } = editor;
      const { selection } = value;

      console.log('InsideHelpers: ', selection)

    }
  },
}