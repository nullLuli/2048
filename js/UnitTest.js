//首先构造原始数据
var diamond1 = new Diamond(1, 0, 2);
var diamond12 = new Diamond(1, 2, 2);
var diamond30 = new Diamond(3, 0, 2);
var diamond10 = new Diamond(1, 0, 2);
var diamond11 = new Diamond(1, 1, 2);
var diamond23 = new Diamond(2, 3, 2);

var diamond234 = new Diamond(2, 3, 4);
var diamond134 = new Diamond(1, 3, 4);

var diamond338 = new Diamond(3, 3, 8);
var diamond038 = new Diamond(0,3,8);
var diamond138 = new Diamond(1,3,8);

var diamondListTest = {
	"30": diamond30,
	"10": diamond10
};
var diamondListTestAnswer = {
	"23": diamond234
};

var diamondListTest2 = {
	"03":diamond038,
	"12":diamond12,
	"13":diamond138,
	"23":diamond234
}

function test() {
	testMerge(diamondListTest2);
}

function testMerge (diamondListParam) {
	testUIRefresh(diamondListParam,function () {});
	moveDiamonds(SwipeDirection.SwipeDown,diamondListParam,function () {
		console.log("移动完成");
	});
}

function testMoveAndGen() {
	diamondListTest = {
		"11": diamond11,
		"13": diamond134,
		"23": diamond23,
		"30": diamond30,
		"33": diamond338
	};

	testUIRefresh(diamondListTest, function() {});
	moveDiamonds(SwipeDirection.SwipeDown, diamondListTest, function() {
		console.log("移动完成");
		setTimeout(function() {
			generateDiv(diamond11);
		}, 3000);
	});
}

function testMoveDiamonds() {

	testUIRefresh(diamondListTest);

	moveDiamonds(SwipeDirection.SwipeUp, diamondListTest);

	//	refreshDataToUI(diamondListTest);
	//	//检查结果
	//	if(diamondListTest["23"]) {
	//		var diamond4 = diamondListTest["23"];
	//		if(diamond4.row == diamond234.row && diamond4.colunm == diamond234.colunm && diamond4.value == diamond234.value) {
	//			console.log("验证通过");
	//		} else {
	//			console.log("验证失败2");
	//		}
	//	} else {
	//		console.log("验证失败1");
	//	}
}

function testUIRefresh(diamondListTestParam, callback) {
	//在界面上生成方块
	for(var i in diamondListTestParam) {
		var diamond = diamondListTestParam[i];
		generateDiv(diamond);
	}

//	refreshDataToUI(diamondListTestParam, SwipeDirection.SwipeDown,callback);

	//	for(var i in diamondListTestParam) {
	//		var diamond = diamondListTestParam[i];
	//		flash("#" + diamond.id(diamond),5,10,100);
	//	}

}

//var diamond4 = new Diamond(0, 1, 2);
//var diamond5 = new Diamond(1, 3, 2);
//var diamondListTestUI = {
//	"20": diamond1,
//	"22": diamond12,
//	"11": diamond4,
//	"23": diamond5
//};

function testMove() {
	//在界面上生成方块
	for(var i in diamondListTestUI) {
		var diamond = diamondListTestUI[i];
		generateDiv(diamond);
	}

	diamond1.lastRow = 1;
	diamond1.lastColunm = 0;
	diamond1.row = 2;
	diamond12.lastRow = 1;
	diamond12.lastColunm = 2;
	diamond12.row = 2;
	diamond4.lastRow = 0;
	diamond4.lastColunm = 1;
	diamond4.row = 1;
	diamond5.lastRow = 1;
	diamond5.lastColunm = 3;
	diamond5.row = 2;

	setTimeout(function() {
		refreshDataToUI(diamondListTestUI)
	}, 3000);
}