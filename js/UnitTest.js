//首先构造原始数据
var diamond1 = new Diamond(1, 0, 2);
var diamond2 = new Diamond(1, 2, 2);

var diamond30 = new Diamond(3,0,2);
var diamond10 = new Diamond(1,0,2);
var diamondListTest = {
	"30": diamond30,
	"10": diamond10
};
var diamond3 = new Diamond(2, 3, 4);
var diamondListTestAnswer = {
	"23": diamond3
};

function test()
{
	testUIRefresh(diamondListTestAnswer);
}
function testMoveAndGen()
{
	testUIRefresh(diamondListTest);
	
	moveDiamonds(SwipeDirection.SwipeUp, diamondListTest);
	
	setTimeout(function() {
		generateDiv(diamond30);
	}, 3000);
}
function testMoveDiamonds() {
	
	testUIRefresh(diamondListTest);
	
	moveDiamonds(SwipeDirection.SwipeUp, diamondListTest);
	
//	refreshDataToUI(diamondListTest);
//	//检查结果
//	if(diamondListTest["23"]) {
//		var diamond4 = diamondListTest["23"];
//		if(diamond4.row == diamond3.row && diamond4.colunm == diamond3.colunm && diamond4.value == diamond3.value) {
//			console.log("验证通过");
//		} else {
//			console.log("验证失败2");
//		}
//	} else {
//		console.log("验证失败1");
//	}
}

function testUIRefresh(diamondListTestParam) {
	//在界面上生成方块
	for(var i in diamondListTestParam) {
		var diamond = diamondListTestParam[i];
		generateDiv(diamond);
	}

	refreshDataToUI(diamondListTestParam);
}

//var diamond4 = new Diamond(0, 1, 2);
//var diamond5 = new Diamond(1, 3, 2);
//var diamondListTestUI = {
//	"20": diamond1,
//	"22": diamond2,
//	"11": diamond4,
//	"23": diamond5
//};

function testMove(){
		//在界面上生成方块
	for(var i in diamondListTestUI) {
		var diamond = diamondListTestUI[i];
		generateDiv(diamond);
	}

	diamond1.lastRow = 1;
	diamond1.lastColunm = 0;
	diamond1.row = 2;
	diamond2.lastRow = 1;
	diamond2.lastColunm = 2;
	diamond2.row = 2;
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
