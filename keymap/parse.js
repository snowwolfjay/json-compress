const fs = require("fs")

function rawType(e) {
    return Object.prototype.toString.call(e).slice(8, -1)
}

function process(info, map) {
    if (rawType(info) === "Object") {
        for (let key in info) {
            info[map[key]] = info[key]
            delete info[key]
            process(info[map[key]],map)
        }
    } else if (rawType(info) === "Array") {
        info.forEach(element => {
            process(element,map)
        });
    }
}
module.exports = async function (filename) {
    let _map = fs.readFileSync(filename + ".map.json", {
        encoding: "utf-8"
    })
    let _outp = fs.readFileSync(filename + ".output.json", {
        encoding: "utf-8"
    })
    let map = JSON.parse(_map)
    let outp = JSON.parse(_outp)
    process(outp, map)
    fs.writeFileSync(filename + ".original.json", JSON.stringify(outp))
}


// console.log(i)
// fs.writeFileSync("t2.output.json",JSON.stringify(outp))