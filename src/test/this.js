
function mergeData() {
  console.log('this', this)
}

function testThis() {
    return function mergedDataFn () {
        return mergeData()
    }
}

var func = testThis()
func()