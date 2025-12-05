import rehypeStringify from 'rehype-stringify'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import rehypeFormat from 'rehype-format'
import { unified } from 'unified'
import { readFile, writeFile } from 'node:fs/promises'
import rehypeDocument from 'rehype-document'
import rehypeTabular from './plugins/rehypeTablular.mjs'
import rehypeCodeBlock from './plugins/rehypeCodeBlock.mjs'

readFile('ubuntu.md')
  .then(content => {
    unified()
      .use(remarkParse)
      .use(remarkRehype)
      .use(rehypeTabular)
      .use(rehypeCodeBlock)
      .use(rehypeStringify)
      .use(rehypeDocument, { title: "ubuntu" })
      .use(rehypeFormat)
      .process(content.toString())
      .then(f => {
        writeFile("ubuntu.html", f.value, 'utf-8', (err) => {
          console.error(err)
        })
        // console.log(f.value)
      })
  })
