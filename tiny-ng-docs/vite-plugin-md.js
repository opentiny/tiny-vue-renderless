const fileRegex = /\.md$/;

export const dealBrace = () => {
  return {
    name: 'deal-brace',

    transform(src, id) {
      if (fileRegex.test(id)) {
        return {
          code: src.replace(/{{(.*?)}}/g, `{{$attrs.startBrace}}$1{{$attrs.endBrace}}`),
          map: null,
        };
      }
    },
  };
};
