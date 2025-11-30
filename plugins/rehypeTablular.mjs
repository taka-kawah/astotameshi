import { visit } from "unist-util-visit";
import {writeFile} from 'node:fs/promises'


function rehypeTabular() {
  return (tree, _file) => {
    visit(tree, isTabularP, (node) => {
        console.log(node)
      }
    );
  };
};

function isTabularP(node){
  if(node.tagName !== 'p') {
    return false
  }

  if(node.children.length === 0) {
    return false
  }
  
  const child = node.children[0]
  if(child.type !== 'text') {
    return false
  }

  const val = child.value
  if (!val.includes('|')) {
    return false
  }
  if (!val.includes('\n') || !val.includes('\r\n')) {
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
  
  rows.forEach(row => {
    if (row.split('|').length !== colNum) {
      return false
    }
    row = row.replace(/\r/g, "").replace(/\u200b/g, "")
  });
  
  let colSplitter = encircleBySplitSymbol(sanitize(rows[1]))
  if (!isRightHeader(colSplitter) && !isLeftHeader(colSplitter) && !isCenterHeader(colSplitter)) {
    return false
  }
  
  return true
}

function sanitize(str) {
  return str.replace(/\r/g, "").replace(/\u200b/g, "")
}

function encircleBySplitSymbol(colSplitter) {
  if (!colSplitter.startsWith('|')) {
    colSplitter = '|' + colSplitter
  }
  if (!colSplitter.endsWith('|')) {
    colSplitter += '|'
  }
  return colSplitter
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
