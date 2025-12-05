import { visit } from "unist-util-visit";


function rehypeTabular() {
  return (tree, _file) => {
    visit(tree, isTabularP, (node, index, parent) => {
      const headerAndRows = node.children[0].value.split('\n')
      const header = headerAndRows[0]
      const splitter = headerAndRows[1]
      const rows = headerAndRows.slice(2)

      let tdTextAlign = ""
      if (isCenterHeader(splitter)) {
        tdTextAlign = "center"
      } else if (isRightHeader(splitter)) {
        tdTextAlign = "right"
      } else if (isLeftHeader(splitter)) {
        tdTextAlign = "left"
      }

      // ヘッダー
      const thead = {
        type: "element",
        tagName: "thead",
        properties: {
          style: "border: 1px solid black;background-color: azure;"
        },
        children: [{
          type: "element",
          tagName: "tr",
          children: decircleBySplitSymbol(header).split('|').map(val => ({
            type: "element",
            tagName: "th",
            properties: {
              scope: "col",
              rowspan: "1",
              style: "border: 1px solid gray;"
            },
            children: [{ type: "text", value: val }]
          }))
        }]
      }

      //行
      const tbody = {
        type: "element",
        tagName: "tbody",
        properties: {
          style: "border: 1px solid black;"
        },
        children: rows.map(row => ({
          type: "element",
          tagName: "tr",
          children: decircleBySplitSymbol(row).split('|').map(val => ({
            type: "element",
            tagName: "td",
            properties: {
              style: `border: 1px solid black;text-align: ${tdTextAlign}`
            },
            children: [{ type: "text", value: val }]
          }))
        }))
      }

      //表
      parent.children[index] = {
        type: "element",
        tagName: "table",
        properties: {
          style: "border-collapse: collapse; border: 1px solid black;width: 800px"
        },
        children: [thead, tbody]
      }

      return 'skip'
    }
    );
  };
};

function isTabularP(node) {
  if (node.tagName !== 'p') {
    return false
  }

  if (node.children.length === 0) {
    return false
  }

  const child = node.children[0]
  if (child.type !== 'text') {
    return false
  }

  const val = sanitize(child.value)
  if (!val.includes('|')) {
    return false
  }
  if (!val.includes('\n')) {
    return false
  }

  const rows = val.split('\n')
  if (rows.length < 3) {
    return false
  }
  const cols = rows[0].split('|')
  const colNum = cols.length
  if (colNum < 2) {
    return false
  }

  let colSplitter = encircleBySplitSymbol(rows[1])
  if (!isRightHeader(colSplitter) && !isLeftHeader(colSplitter) && !isCenterHeader(colSplitter)) {
    return false
  }

  return true
}

function sanitize(str) {
  return str.replace(/\r/g, "").replace(/\u200b/g, "")
}

function encircleBySplitSymbol(row) {
  if (!row.startsWith('|')) {
    row = '|' + row
  }
  if (!row.endsWith('|')) {
    row += '|'
  }
  return row
}

function decircleBySplitSymbol(row) {
  if (row.startsWith('|')) {
    row = row.substring(1)
  }
  if (row.endsWith('|')) {
    row = row.substring(0, row.length - 1)
  }
  return row
}

function isLeftHeader(colSplitter) {
  return colSplitter.match(/^[|](-+\|)+$/) || colSplitter.match(/^[|](:-+\|)+$/)
}

function isRightHeader(colSplitter) {
  return colSplitter.match(/^[|](-+:\|)+$/)
}

function isCenterHeader(colSplitter) {
  return colSplitter.match(/^[|](:-+:\|)+$/)
}



export default rehypeTabular
