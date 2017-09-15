var diamondListLocal;

function moveDiamonds(dirction, diamondListPara, callback) {
	diamondListLocal = diamondListPara;

	console.log(diamondListLocal);

	for(var i in diamondListLocal) {
		var diamond = diamondListLocal[i];
		diamond.lastRow = diamond.row;
		diamond.lastColunm = diamond.colunm;
		diamond.lastValue = diamond.value;
		diamond.mergeTo = false;
		diamond.merged = false;
	}

	//遍历现在的方块，往滑动方向移动
	var continueMove = true;
	while(continueMove) {
		continueMove = false;
		switch(dirction) {
			case SwipeDirection.SwipeLeft:
				{
					for(var j = 0; j < 4; j++) {
						for(var i = 0; i < 4; i++) {
							var haveHandle = moveOrMergeHandle(i, j, dirction);
							if(haveHandle) {
								continueMove = true;
							}
						}
					}
				}
				break;
			case SwipeDirection.SwipeRight:
				{
					for(var j = 3; j >= 0; j--) {
						for(var i = 0; i < 4; i++) {
							var haveHandle = moveOrMergeHandle(i, j, dirction);
							if(haveHandle) {
								continueMove = true;
							}
						}
					}
				}
				break;
			case SwipeDirection.SwipeDown:
				{
					for(var i = 3; i >= 0; i--) {
						for(var j = 0; j < 4; j++) {
							var haveHandle = moveOrMergeHandle(i, j, dirction);
							if(haveHandle) {
								continueMove = true;
							}
						}
					}
				}
				break;
			case SwipeDirection.SwipeUp:
				{
					for(var i = 0; i < 4; i++) {
						for(var j = 0; j < 4; j++) {
							var haveHandle = moveOrMergeHandle(i, j, dirction);
							if(haveHandle) {
								continueMove = true;
							}
						}
					}
				}
				break;
		}
	}

	refreshDataToUI(diamondListLocal, callback);
}

function refreshDataToUI(diamondListParam, callback) {
	var length = countDiamondList(diamondListParam);
	if(length > 0) {
		var count = 0;
		for(var i in diamondListParam) {
			var diamond = diamondListParam[i];
			uiRefresh(diamond, function() {
				count++;
				if(count == length) {
					callback();
				}
			});
		}
	} else {
		callback();
	}
}

function countDiamondList(diamondListParam){
	var count = 0;
	for (var i in diamondListParam) {
		count++;
	}
	return count;
}

function moveOrMergeHandle(i, j, dirction) {
	var isExistOfCurrent = isExistAt(i, j, diamondListLocal);
	if(isExistOfCurrent) {
		var diamond = getDiamond(i, j);
		if(!diamond.mergeTo) {
			if(diamond.row != i || diamond.colunm != j) {
				console.log(i + j + "位置中的数据错误1");
			}
			var resultArray = tempDiamond(dirction, diamond);
			var tempMoveSuccess = resultArray[0];
			if(tempMoveSuccess) {
				var diamondTemp = resultArray[1];
				var isExist = isExistAt(diamondTemp.row, diamondTemp.colunm, diamondListLocal);
				if(isExist) {
					if(diamond.row != i || diamond.colunm != j) {
						console.log(i + j + "位置中的数据错误2");
					}
					//处理合并
					var nextDiamond = getDiamond(diamondTemp.row, diamondTemp.colunm);
					var canMerge = checkIfDiamondValueEqual(diamond, nextDiamond);
					if(canMerge && diamond.merged == false) {
						if(diamond.row != i || diamond.colunm != j) {
							console.log(i + j + "位置中的数据错误3");
						}
						console.log("将" + i + j + "并入" + nextDiamond.row + nextDiamond.colunm);
						nextDiamond.value *= 2;
						//					mergeUIFresh(diamond, nextDiamond);
						nextDiamond.merged = true;

						//						nextDiamond.lastColunm = diamond.lastColunm;
						//						nextDiamond.lastRow = diamond.lastRow;
						//						nextDiamond.lastValue = diamond.lastValue;
						diamond.mergeTo = true;
						return true;
					} else {
						//
					}
				} else {
					var oldRow = diamond.row;
					var oldColunm = diamond.colunm;
					diamond.row = diamondTemp.row;
					diamond.colunm = diamondTemp.colunm;
					delete diamondListLocal[oldRow.toString() + oldColunm.toString()];
					diamondListLocal[diamond.row.toString() + diamond.colunm.toString()] = diamond;
					//				moveToUIFresh(oldRow, oldColunm, diamond);
					console.log("移动" + oldRow + oldColunm + "到" + diamond.row + diamond.colunm);
					return true;
				}
			} //滑动方向还有位置
		}
	} //当前位置存在方块
	return false;
}

function getDiamond(row, colunm) {
	return diamondListLocal[row.toString() + colunm.toString()];
}

function checkIfDiamondValueEqual(diamond1, diamond2) {
	return diamond1.value == diamond2.value;
}

function tempDiamond(dirction, diamond) {
	if(dirction == SwipeDirection.SwipeLeft) {
		//colunm--
		var colunm;
		var colunmTemp = diamond.colunm - 1;
		if(colunmTemp >= 0) {
			colunm = colunmTemp;
			var tempDia = new Diamond(diamond.row, colunm, diamond.value);
			return [true, tempDia];
		} else {
			return [false];
		}

	} else if(dirction == SwipeDirection.SwipeRight) {
		var colunm;
		var colunmTemp = diamond.colunm + 1;
		if(colunmTemp <= 3) {
			colunm = colunmTemp;
			var tempDia = new Diamond(diamond.row, colunm, diamond.value);
			return [true, tempDia];
		} else {
			return [false];
		}
	} else if(dirction == SwipeDirection.SwipeDown) {
		var row;
		var rowTemp = diamond.row + 1;
		if(rowTemp <= 3) {
			row = rowTemp;
			var temDia = new Diamond(row, diamond.colunm, diamond.value);
			return [true, temDia];
		} else {
			return [false];
		}
	} else if(dirction == SwipeDirection.SwipeUp) {
		var row;
		var rowTemp = diamond.row - 1;
		if(rowTemp >= 0) {
			row = rowTemp;
			var temDia = new Diamond(row, diamond.colunm, diamond.value);
			return [true, temDia];
		} else {
			return [false];
		}
	}
}

function uiRefresh(diamond, callback) {
	var oldID = "diamond" + diamond.lastRow + diamond.lastColunm;
	var newID = "diamond" + diamond.row + diamond.colunm;
	console.log(oldID + "应该移动到" + newID);
	var topValue = diamond.row * 50 + $("#table").offset().top;
	var leftValue = diamond.colunm * 50 + $("#table").offset().left;
	$("#" + oldID).animate({
		top: topValue,
		left: leftValue
	}, "slow", function() {
		$("#" + oldID).text(diamond.value);
		var color = diamond.color(diamond.value);
		$("#" + oldID).css("background-color", color);
		if(diamond.mergeTo) {
			delete diamondListLocal[diamond.row.toString() + diamond.colunm.toString()];
			$("#" + oldID).remove();
			console.log("移除：" + oldID);
		} else {
			$("#" + oldID).attr("id", newID);
			console.log(oldID + "变成" + newID);
		}
		callback();
	});
}

function moveToUIFresh(oldRow, oldColunm, newDiamond) {
	var oldID = "diamond" + oldRow + oldColunm;
	console.log(oldID + "移动到" + newDiamond.id(newDiamond));
	var topValue = newDiamond.row * 50 + $("#table").offset().top;
	var leftValue = newDiamond.colunm * 50 + $("#table").offset().left;
	//	$("#" + oldID).offset({
	//		top: topValue,
	//		left: leftValue
	//	});
	$("#" + oldID).animate({
		top: topValue,
		left: leftValue
	});
	$("#" + oldID).text(newDiamond.value);
	$("#" + oldID).attr("id", newDiamond.id(newDiamond));
}

function mergeUIFresh(diamond, newDiamond) {
	var deleteID = "diamond" + diamond.row + diamond.colunm;
	$("#" + deleteID).remove();

	var newDiamondID = newDiamond.id(newDiamond);
	var color = newDiamond.color(newDiamond.value);
	console.log(deleteID + "并入" + newDiamondID + "颜色：" + color);
	$("#" + newDiamondID).css("background-color", color);
	$("#" + newDiamondID).text(newDiamond.value);
}