// 導入模組
var fs = require('fs')
var path = require('path')

// 建立函數，以便重複使用
function readList(name) {
    // 讀取list.txt
    var a = fs.readFileSync(name, 'utf8')
    // 導入陣列
    var b = a.split('\n')

    // 刪除陣列中的空元素、無效值
    b = b.filter(item => item)

    // 進行你要的操作
    for (var i = 0; i < b.length; i++) {
        b[i] = b[i]
        // 必須刪除換行符號，不然導入index.html會出現一大堆換行符
        .replace(/\r+/gi, '')
        // 刪除重複tag
            .replace(/\t+/gi, '\t')
    }
    // 返回陣列(橫)
    return b.join('","')
}

// 讀取index.html
var index = fs.readFileSync('index.html', 'utf8')
// 在陣列中找出「list or listbikkhu 陣列」
var k = index.split('\n')
for (var i = 0; i < k.length; i++) {
    if (/var list\s?\=/.test(k[i])) {
        k[i] = 'var list = ["' + readList('list.txt') + '"]'
    }
    if (/var listbikkhu\s?\=/.test(k[i])) {
        k[i] = 'var listbikkhu = ["' + readList('list_bikkhu.txt') + '"]'
    }
}

// 用相對路徑寫入檔案
fs.writeFileSync('index.html', k.join('\n'), 'utf8')
// 完成時返回通知
console.log('list for index.html is OK')
