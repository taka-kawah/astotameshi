const str = "|--------------|------|"
console.log("|--------------|------|".match(/^[\|](-+\|)+$/g))
console.log(t(str))

function t(colSplitter) {
  if (!colSplitter.startsWith('|')) {
    colSplitter = '|' + colSplitter
  }
  if (!colSplitter.endsWith('|')) {
    colSplitter += '|'
  }
  return colSplitter
}