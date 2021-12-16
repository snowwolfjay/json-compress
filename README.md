# json-keymap
use autoincrease gene key replace orginal key to compress file.
通过将固定数据结构的key映射到更短的key来节省传输大小

#how to use 使用说明

#1.map this method will generate a .map.json and .output.json file.you can use output.json file for transport ,recommend lzstr compress before send; 

map方法会生成一个.map.json文件和一个.output.json文件，后者可用于传输，所有key都做了映射，关键是有时候为了方便阅读，key值可能比较长，但传输时时不需要可读性的，节省一点时一点

```
let keymap = require("./keymap")
let path = require("path")
 keymap.map(path.join(__dirname,"test_data")).then(err=>console.log(err))
```

#2.parse method will generate a .original.json file,which save the same data as before map;

parse方法用于生成一个.original.json文件，跟原来的文件数据一样，只是某些key值得顺序会发生变化，毕竟对象得key是无序的，而array中顺序依然不会变

```
keymap.parse(path.join(__dirname,"test_data")).then(err=>console.log(err))
```


#3.效果
源文original.json 大小为14.3kb -> 生成了一个map文件15k(这个是一次性的固定map)和7kb的ouput.json, 通过将很长的key缩小减少了50%. 如果是大量需要实时同步的数据，例如游戏数据等，节省的数据还是挺客观的.

#4.更好的办法
将原值map成一个个的数组或者嵌套的数据，仍需探索
