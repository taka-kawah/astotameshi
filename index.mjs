import rehypeDocument from 'rehype-document'
import rehypeFormat from 'rehype-format'
import rehypeStringify from 'rehype-stringify'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import {unified} from 'unified'
import {reporter} from 'vfile-reporter'
import rehypeEmbed from '@hongvanpc10/rehype-embed'
import {readFile, writeFile} from 'node:fs/promises'

readFile('ubuntu.md')
  .then(content => {
    unified()
      .use(remarkParse)
      .use(remarkRehype)
      .use(rehypeStringify)
      .process(content.toString())
      .then(f => {
        writeFile("ubuntu.html", f.value, 'utf-8', (err) => {
          console.error(err)
        })
      })
  })
