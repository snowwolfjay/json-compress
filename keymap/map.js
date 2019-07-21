const fs = require("fs");
const a = "0123456789abcdefghijklmnopqrstuvwxyz$_!@#%^&*()+-";
const l = a.length;
let i = 0;
// let filename = process.argv[2];
function process(info,map) {
    try {
        if (rawType(info) === "Object") {
            for (let key in info) {
                let sk = geneKey()
                i += 1
                map[sk] = key;
                info[sk] = info[key]
                delete info[key]
                process(info[sk],map)
            }
        } else if (rawType(info) === "Array") {
            info.forEach(element => {
                process(element,map)
            });
        }
    } catch (error) {
        console.log(error)
    }
}

function rawType(e) {
    return Object.prototype.toString.call(e).slice(8, -1)
}

function geneKey() {
    if (i < l) {
        return a[i]
    } else if (i < l * l) {
        let f1 = Math.floor(i / l) - 1
        let f2 = i % l
        return a[f1] + a[f2]
    }
}

module.exports = async function (filename) {
    try {
        if (filename.slice(-5) === ".json") return console.warn("请指定json文件名并不要带后缀")
        let str = fs.readFileSync(filename + ".json", {
            encoding: "utf-8"
        })
        let inf = JSON.parse(str);
        let map = {};
        process(inf,map);
        fs.writeFileSync(filename + ".output.json", JSON.stringify(inf))
        fs.writeFileSync(filename + ".map.json", JSON.stringify(map))
        i = 0;
        return null
    } catch (error) {
        return error
    }
}