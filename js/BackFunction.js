var diamondListHistory = new Array;

function record(diamondListParam) {
	var newDiamondList = new Array;
	//要生成许多diamond，防止后面diamond改变
	for(var key in diamondListParam) {
		var diamond = diamondListParam[key];
		var newDiamond = copyDiamondFrom(diamond);
		newDiamondList[key] = newDiamond;
	}
	diamondListHistory.push(newDiamondList);
}

function copyDiamondFrom(diamond) {
	var newDiamond = new Diamond(diamond.row, diamond.colunm, diamond.value);
	return newDiamond;
}

function lastData() {
	return diamondListHistory.pop();
}

function clearUI() {
	//清空
	var count = 0;
	$("div[id^='diamond']").each(function() {
		$(this).remove();
		count++;
	});
	console.log("查找到 " + count + "个对象");
}
function generateDiamondFromList (diamondListParam) {
	for(var i in diamondListParam) {
		var diamond = diamondListParam[i];
		generateDiv(diamond);
	}
}