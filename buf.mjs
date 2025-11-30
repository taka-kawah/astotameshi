const str1 = "古館くれあさんで、フル勃ち...w"
const buf1 = Buffer.from(str1)
console.log(buf1)

console.log(buf1.readInt32BE(0))
console.log(buf1.toString())
