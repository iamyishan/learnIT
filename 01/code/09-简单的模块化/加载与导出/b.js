var foo="bbb"


console.log(exports)

exports.foo='hello'
exports.add=function(x,y){
	return x+y
}

var age=18
exports.age=age

function add(x,y){
	return x-y
}