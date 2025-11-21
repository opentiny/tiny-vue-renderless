export type MyType = {
  img: any
  title: string
  desc: {
    info: string
    name: string
    date?: string
    tag?: string
    other?: string
  }
  link?: string // 可选属性
}

export type ArticleType = {
  img: any
  markId: string //与markdown文件同名
  title: string
  tag: string
  type: string
  content: string
  instruct: {
    write: string
    declaration: string
    author: string
    date: string
    apply: string
  }
  link?: string // 可选属性
}
