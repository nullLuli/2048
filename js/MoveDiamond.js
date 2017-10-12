var diamondListLocal;
var diamondTempList; //用于存储中间被并入其他方块的方块

function moveDiamonds(dirction, diamondListPara, callback) {
	diamondListLocal = diamondListPara;
	diamondTempList = new Array;

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

	refreshDataToUI(diamondListLocal, diamondTempList, dirction, callback);
}

function refreshDataToUI(diamondListParam, diamondTempListParam, dirction, callback) {
	var length = countDiamondList(diamondListParam);
	length += countDiamondList(diamondTempListParam);
	if(length > 0) {
		function checkExistAndRefreshColor(i, j) {
			var diamondTemp = getDiamondWithOldPosition(i,j,diamondTempListParam);
			var isDiamondTempExist = isExistAtWithOldPosition(i,j,diamondTempListParam);
			if (isDiamondTempExist) {
				uiColorRefresh(diamondTemp);
			}

			var diamond = getDiamondWithOldPosition(i, j,diamondListLocal);
			var isDiamondExist = isExistAtWithOldPosition(i, j, diamondListLocal);
			if(isDiamondExist) {
				uiColorRefresh(diamond);
			}
		}
		var count = 0;

		function checkIfMoveComplete() {
			if(count == length) {
				//更新颜色和text
				switch(dirction) {
					case SwipeDirection.SwipeLeft:
						{
							for(var j = 0; j < 4; j++) {
								for(var i = 0; i < 4; i++) {
									checkExistAndRefreshColor(i, j);
								}
							}
						}
						break;
					case SwipeDirection.SwipeRight:
						{
							for(var j = 3; j >= 0; j--) {
								for(var i = 0; i < 4; i++) {
									checkExistAndRefreshColor(i, j);
								}
							}
						}
						break;
					case SwipeDirection.SwipeDown:
						{
							for(var i = 3; i >= 0; i--) {
								for(var j = 0; j < 4; j++) {
									checkExistAndRefreshColor(i, j);
								}
							}
						}
						break;
					case SwipeDirection.SwipeUp:
						{
							for(var i = 0; i < 4; i++) {
								for(var j = 0; j < 4; j++) {
									checkExistAndRefreshColor(i, j);
								}
							}
						}
						break;
				}

				callback();
			}
		}
		for(var key in diamondListParam) {
			var diamond = diamondListParam[key];
			uiMove(diamond, function() {
				count++;
				checkIfMoveComplete();
			});
		}
		for(var key in diamondTempListParam) {
			var diamond = diamondTempListParam[key];
			uiMove(diamond, function() {
				count++;
				checkIfMoveComplete();
			});
		}

	} else {
		callback();
	}
}

function countDiamondList(diamondListParam) {
	var count = 0;
	for(var i in diamondListParam) {
		count++;
	}
	return count;
}

function moveOrMergeHandle(i, j, dirction) {
	var isExistOfCurrent = isExistAt(i, j, diamondListLocal);
	if(isExistOfCurrent) {
		var diamond = getDiamond(i, j, diamondListLocal);
		if(!diamond.mergeTo) {
			if(diamond.row != i || diamond.colunm != j) {
				console.log(i + " " + j + "位置中的数据错误1");
			}
			var resultArray = tempDiamond(dirction, diamond);
			var tempMoveSuccess = resultArray[0];
			if(tempMoveSuccess) {
				var diamondTemp = resultArray[1];
				var isExist = isExistAt(diamondTemp.row, diamondTemp.colunm, diamondListLocal);
				if(isExist) {
					if(diamond.row != i || diamond.colunm != j) {
						console.log(i + " " + j + "位置中的数据错误2");
					}
					var nextDiamond = getDiamond(diamondTemp.row, diamondTemp.colunm, diamondListLocal);
					if(nextDiamond.mergeTo == false) {
						//实际方块，需要检查能否合并
						//处理合并
						var canMerge = checkIfDiamondValueEqual(diamond, nextDiamond);
						if(canMerge && diamond.merged == false && nextDiamond.merged == false) {
							if(diamond.row != i || diamond.colunm != j) {
								console.log(i + " " + j + "位置中的数据错误3");
							}
							console.log("将" + i + j + "并入" + nextDiamond.row + nextDiamond.colunm + ";合并value:" + diamond.value + "：" + nextDiamond.value);
							nextDiamond.value *= 2;
							//					mergeUIFresh(diamond, nextDiamond);
							nextDiamond.merged = true;
							
							diamond.mergeTo = true;
							delete diamondListLocal[diamond.row.toString() + diamond.colunm.toString()];
							diamond.row = diamondTemp.row;
							diamond.colunm = diamondTemp.colunm;
							diamondTempList[diamond.row.toString() + diamond.colunm.toString()] = diamond;
							return true;
						} else {
							//前方有方块，且不能合并，因为value不一致，或本方块合并过，或前方方块合并过，所以不动
						}
					} else {
						//前方方块已并入其他地方
						moveDiamondData(diamond, diamondTemp);
						console.log("前方方块已并入其他地方 不对了! 我们已经把并入其他的地方的方块都删掉了");
						return true;
					}
				} else {
					moveDiamondData(diamond, diamondTemp);
					return true;
				}
			} //滑动方向还有位置
		}
	} //当前位置存在方块
	return false;
}

function moveDiamondData(diamond, diamondTemp) {
	var oldRow = diamond.row;
	var oldColunm = diamond.colunm;
	diamond.row = diamondTemp.row;
	diamond.colunm = diamondTemp.colunm;
	delete diamondListLocal[oldRow.toString() + oldColunm.toString()];
	diamondListLocal[diamond.row.toString() + diamond.colunm.toString()] = diamond;
	//				moveToUIFresh(oldRow, oldColunm, diamond);
	console.log("移动" + oldRow + oldColunm + "到" + diamond.row + diamond.colunm + "；value:" + diamond.value);
}

function getDiamond(row, colunm, diamondListParam) {
	return diamondListParam[row.toString() + colunm.toString()];
}

function getDiamondWithOldPosition(row, colunm, diamondListParam) {
	for(var key in diamondListParam) {
		var diamond = diamondListParam[key];
		if(diamond.lastRow == row && diamond.lastColunm == colunm) {
			return diamond;
		}
	}
}

function isExistAtWithOldPosition(row, colunm, inDiamondList) {
	for(var key in inDiamondList) {
		var diamond = inDiamondList[key];
		if(diamond.lastRow == row && diamond.lastColunm == colunm) {
			return true;
		}
	}
	return false;
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

function uiMove(diamond, callback) {
	var oldID = "diamond" + diamond.lastRow + diamond.lastColunm;
	var newID = "diamond" + diamond.row + diamond.colunm;
	console.log(oldID + "应该移动到" + newID);

	var topValue = $("#td" + diamond.row + diamond.colunm).offset().top;
	var leftValue = $("#td" + diamond.row + diamond.colunm).offset().left;
	$("#" + oldID).animate({
		top: topValue,
		left: leftValue
	}, 200, function() {
		callback();
	});
}

function uiColorRefresh(diamond) {
	var oldID = "diamond" + diamond.lastRow + diamond.lastColunm;
	var newID = "diamond" + diamond.row + diamond.colunm;

	$("#" + oldID).text(diamond.value);
	var color = diamond.color(diamond.value);
	$("#" + oldID).css("background-color", color);
	console.log(oldID + "：" + diamond.value);
	if(diamond.mergeTo) {
//		delete diamondListLocal[diamond.row.toString() + diamond.colunm.toString()];
		$("#" + oldID).remove();
		console.log("UI移除：" + oldID);
	} else {
		$("#" + oldID).attr("id", newID);
		console.log(oldID + "变成" + newID);

		if(diamond.merged) {
			//合并动画
			flash("#" + newID, 3, 10, 50);
		}
	}
}

function flash(obj, time, wh, fx) {
	var x = $(obj).offset().left;
	var y = $(obj).offset().top;
	var width = $(obj).width();
	var height = $(obj).height();
	for(var i = 1; i <= time; i++) {
		if(i % 2 == 0) {
			$(obj).animate({
				left: x + wh,
				width: width - 2 * wh,
				top: y + wh,
				height: height - 2 * wh
			}, fx);
		} else {
			$(obj).animate({
				left: x,
				width: width,
				top: y,
				height: height
			}, fx);
		}
	}
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