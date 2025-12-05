import { visit } from "unist-util-visit"

function rehypeCodeBlock() {
    return (tree, _file) => {
        visit(tree, node => node.tagName === 'pre' && node.children[0].tagName === 'code', (node, index, parent) => {
            const code = node.children[0]
            const newFontCode = {
                type: "element",
                tagName: "code",
                properties: {
                    style: "font-family:Verdana, Geneva, Tahoma, sans-serif"
                },
                children: code.children
            }
            parent.children[index] = {
                type: node.type,
                tagName: node.tagName,
                properties: {
                    style: "background-color: gainsboro;padding:6px;border-radius: 5px"
                },
                children: [newFontCode]
            }
            return 'skip'
        })
    }
}

export default rehypeCodeBlock