function checkIfWin (diamondListParam) {
	for (var key in diamondListParam) {
		var diamond = diamondListParam[key];
		if(parseInt(diamond.value) >= 8)
		{
			//赢了
			return true;
		}
	}
	return false;
}