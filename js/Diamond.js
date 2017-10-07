				var diamondList = new Array(4);
				var baseColor = 10;

				//初始化格局
				function initRound() {
					//先随机生成位置
					var fristGridRow = GetRandomNum(0, 3);
					var fristGridColumn = GetRandomNum(0, 3);
					var valueOfGrid = GetRandomNum(1, 2);
					valueOfGrid *= 2;
					var diamond = new Diamond(fristGridRow, fristGridColumn, valueOfGrid);

					//然后检查位置是否被占用
					//如被占用则顺序找出未被占用的位置
					var row = diamond.row;
					var colunm = diamond.colunm;
					var isConflict = isExistAt(row, colunm, diamondList);
					var haveFind = true;
					if(isConflict) {
						haveFind = false;
						for(var i = 0; i < 4; i++) {
							for(var j = 0; j < 4; j++) {
								isConflict = isExistAt(i, j, diamondList);
								if(!isConflict) {
									haveFind = true;
									colunm = j;
									break;
								}
							}
							if(haveFind) {
								row = i;
								break;
							}
						}
					}

					if(haveFind) {
						diamond.row = row;
						diamond.colunm = colunm;
						generateDiv(diamond);
						diamondList[row.toString() + colunm.toString()] = diamond;
					} else {
						console.log("图表已满，找不到空位");
					}

				}

				function isExistAt(row, colunm, inDiamondList) {
					var diamond = inDiamondList[row.toString() + colunm.toString()];
					if(!diamond){
						return false;
					}
					else
					{
						return true;
					}
				}

				function generateDiv(diamondPara) {
					var diamondID = "diamond" + diamondPara.row + diamondPara.colunm;
					console.log("生成方块UI" + diamondID);
					var createDiaObject = $("<div>").attr("id",diamondID);
					$("#page").append(createDiaObject);
					$("#" + diamondID).attr("class","diamond");
					var topValue = $("#td" + diamondPara.row + diamondPara.colunm).offset().top;
					var leftValue =  $("#td" + diamondPara.row + diamondPara.colunm).offset().left;
					$("#" + diamondID).offset({top:topValue,left:leftValue});
					$("#" + diamondID).css("background-color",diamondPara.color(diamondPara.value));
					$("#" +diamondID).text(diamondPara.value);
					console.log("生成方块" + diamondPara.row + diamondPara.colunm);
				}
				
				function generateCopyDiv(diamondPara) {
					var diamondID = "copydiamond" + diamondPara.row + diamondPara.colunm;
					console.log("生成方块UI" + diamondID);
					var createDiaObject = $("<div>").attr("id",diamondID);
					$("#page").append(createDiaObject);
					$("#" + diamondID).attr("class","diamond");
					var topValue = diamondPara.row * 50 + $("#tableCopy").offset().top;
					var leftValue = diamondPara.colunm * 50 + $("#tableCopy").offset().left;
					$("#" + diamondID).offset({top:topValue,left:leftValue});
					$("#" + diamondID).css("background-color",diamondPara.color(diamondPara.value));
					$("#" +diamondID).text(diamondPara.value);
					console.log("生成方块" + diamondPara.row + diamondPara.colunm);
				}

				function GetRandomNum(Min, Max) {
					var Range = Max - Min;
					var Rand = Math.random();
					return(Min + Math.round(Rand * Range));
				}

				//可移动的方格对象
				function Diamond(row, colunm, value) {
					this.row = row;
					this.colunm = colunm;
					this.value = value;
					this.lastRow;
					this.lastColunm;
					this.lastValue;
					this.mergeTo = false;//被并入下一个格子
					this.color = function(value) {
						var result;
						switch (value){
							case 2:
							{
								result = "#fdffdf";
							}
								break;
							case 4:
							{
								result = "#f3d7b5";
							}
								break;
							case 8:
							{
								result = "#efcee8";
							}
								break;
							case 16:
							{
								result = "#daf9ca";
							}
								break;
								case 32:
							{
								result = "#c7b3e5";
							}
								break;
								case 64:
							{
								result = "#ffebcc";
							}
								break;
								case 128:
							{
								result = "#ffb86c";
							}
								break;
//								case 2:
//							{
//								result = "#fdffdf";
//							}
//								break;
//								case 2:
//							{
//								result = "#fdffdf";
//							}
								break;
							default:
							{
								result = "#000000";
							}
								break;
					}
						return result;
						
//						var multiBaseColor = (baseColor * value);
//						var color = "rgb(" + multiBaseColor + "," + multiBaseColor + ","+ multiBaseColor + ")";
//						return $.fn.getHexBackgroundColor(color);
					}
					this.id = function(diamond) {
						return "diamond" + diamond.row + diamond.colunm;
					}
					this.merged = false;//有格子并入
				}
				
$.fn.getHexBackgroundColor = function(rgb) {
	if($.browser.msie && $.browser.version > 8 || $.browser.mozilla || $.browser.webkit) {
		rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);

		function hex(x) {
			return("0" + parseInt(x).toString(16)).slice(-2);
		}
		rgb = "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
	}
	return rgb;
}