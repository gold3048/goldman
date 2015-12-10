class HookManager extends egret.Sprite {

	/**stage宽*/
	private stageW:number;
	/**stage高*/
	private stageH:number;

	private line:egret.Shape;
	private hookBmp:egret.Bitmap;
	private hook:egret.Sprite;
	private BASE_ROTATION = 60;
	private BASE_LINE_HEIGHT = 50;
	private lineHeight = 50;
	private direction:egret.String;

	private isHitBorder:boolean = false; //钩子是否碰到边缘

	public constructor() {
		super();
		this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
	}

	private onAddToStage(event:egret.Event):void {
		this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
		this.stageW = this.stage.stageWidth;
		this.stageH = this.stage.stageHeight;
		this.createHook();
		this.startRotate();
	}

	private createHook():void {
		this.hook = new egret.Sprite();

		this.line = new egret.Shape();
		this.line.graphics.lineStyle(2, 0x000000);
		this.line.graphics.moveTo(0, 0);
		this.line.graphics.lineTo(0, this.lineHeight);
		this.line.graphics.endFill();
		this.hook.addChild(this.line);

		this.hookBmp = goldman.createBitmapByName("hook");
		this.hook.addChild(this.hookBmp);
		this.hookBmp.x = -this.hookBmp.width / 2;
		this.hookBmp.y = 50;

		this.addChild(this.hook);
	}

	public startRotate():void {
		this.direction = "left";
		this.hook.addEventListener(egret.Event.ENTER_FRAME, this.onRotateEnterFrame, this);
	}

	public stopRotate():void {
		this.hook.removeEventListener(egret.Event.ENTER_FRAME, this.onRotateEnterFrame, this);
	}

	private onRotateEnterFrame(e:egret.Event):void {
		if (this.direction == "left") {
			this.hook.rotation++;
		} else {
			this.hook.rotation--;
		}
		if (this.hook.rotation < -this.BASE_ROTATION) {
			this.direction = "left";
		} else if (this.hook.rotation > this.BASE_ROTATION) {
			this.direction = "right";
		}
	}

	public startGo():void {
		this.stopRotate();
		this.hook.addEventListener(egret.Event.ENTER_FRAME, this.onGoEnterFrame, this);
	}

	private onGoEnterFrame(e:egret.Event):void {
		var vHeight = 5;
		if (this.isHitBorder) {
			vHeight = -5;
		}
		this.lineHeight += vHeight;
		this.line.graphics.clear();
		this.line.graphics.lineStyle(2, 0x000000);
		this.line.graphics.moveTo(0, 0);
		this.line.graphics.lineTo(0, this.lineHeight);
		this.line.graphics.endFill();
		this.hookBmp.y += vHeight;

		if (this.lineHeight < this.BASE_LINE_HEIGHT) {
			this.stopGo();
		}

		if (!this.isHitBorder) {//判断是否出界
			var globalPoint:egret.Point = new egret.Point();
			globalPoint = this.hook.localToGlobal(this.hookBmp.x, this.hookBmp.y, globalPoint);
			if (globalPoint.x < 0) {
				console.log("左边出界了");
				this.isHitBorder = true;
			} else if (globalPoint.x > this.stageW) {
				console.log("右边出界了");
				this.isHitBorder = true;
			} else if (globalPoint.y > this.stageH) {
				console.log("下边出界了");
				this.isHitBorder = true;
			}
		}
	}

	public stopGo():void {
		this.startRotate();
		this.hook.removeEventListener(egret.Event.ENTER_FRAME, this.onGoEnterFrame, this);
	}

}