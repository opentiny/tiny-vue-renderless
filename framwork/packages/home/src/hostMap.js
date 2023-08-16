const map = {
  // 可以在这里配生产环境的路径：本地与生产环境地址
  '//localhost:5173/': 'http://localhost:5173/', // main
  '//localhost:2001/': 'http://localhost:2001', // react
  '//localhost:2002/': 'http://localhost:2002/', // solid
  '//localhost:2003/': 'http://localhost:2003/', // vue2
  '//localhost:2004/': 'http://localhost:2004/' // vue3
}

export default function hostMap(host) {
  if (process.env.NODE_ENV === 'production') return map[host]
  return host
}
