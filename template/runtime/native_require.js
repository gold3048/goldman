
var game_file_list = [
    //以下为自动修改，请勿修改
    //----auto game_file_list start----
	"libs/modules/egret/egret.js",
	"libs/modules/egret/egret.native.js",
	"libs/modules/res/res.js",
	"bin-debug/GameContainer.js",
	"bin-debug/GameUtil.js",
	"bin-debug/Main.js",
	"bin-debug/mc/Hook.js",
	"bin-debug/mc/HookManager.js",
	"bin-debug/mc/Obj.js",
	"bin-debug/mc/ObjManager.js",
	"bin-debug/mc/Objs/Diamond.js",
	"bin-debug/mc/Objs/Gold1.js",
	"bin-debug/mc/Objs/Gold2.js",
	"bin-debug/mc/Objs/Gold3.js",
	"bin-debug/mc/Objs/Gutou.js",
	"bin-debug/mc/Objs/Kulou.js",
	"bin-debug/mc/Objs/Mouse.js",
	"bin-debug/mc/Objs/RandomBag.js",
	"bin-debug/mc/Objs/Stone1.js",
	"bin-debug/mc/Objs/Stone2.js",
	"bin-debug/mc/Objs/TNT.js",
	"bin-debug/mc/Objs/MouseDiamond.js",
	//----auto game_file_list end----
];

var window = {};

egret_native.setSearchPaths([""]);

egret_native.requireFiles = function () {
    for (var key in game_file_list) {
        var src = game_file_list[key];
        require(src);
    }
};

egret_native.egretInit = function () {
    egret_native.requireFiles();
    egret.TextField.default_fontFamily = "/system/fonts/DroidSansFallback.ttf";
    //egret.dom为空实现
    egret.dom = {};
    egret.dom.drawAsCanvas = function () {
    };
};

egret_native.egretStart = function () {
    var option = {
        //以下为自动修改，请勿修改
        //----auto option start----
		entryClassName: "Main",
		frameRate: 30,
		scaleMode: "showAll",
		contentWidth: 800,
		contentHeight: 480,
		showPaintRect: false,
		showFPS: false,
		fpsStyles: "x:0,y:0,size:30,textColor:0x00c200,bgAlpha:0.9",
		showLog: false,
		logFilter: "",
		maxTouches: 2,
		textureScaleFactor: 1
		//----auto option end----
    };

    egret.native.NativePlayer.option = option;
    egret.runEgret();
    egret_native.Label.createLabel(egret.TextField.default_fontFamily, 20, "", 0);
    egret_native.EGTView.preSetOffScreenBufferEnable(true);
};