let keymap = require("./keymap")
let path = require("path")
// keymap.map(path.join(__dirname,"test_data")).then(err=>console.log(err))
keymap.parse(path.join(__dirname,"test_data")).then(err=>console.log(err))