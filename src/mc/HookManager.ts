class HookManager extends egret.Sprite {

	/**stage宽*/
	private stageW:number;
	/**stage高*/
	private stageH:number;

	private line:egret.Shape;
	private hookBmp:egret.Bitmap;
	private shape:egret.Shape
	private hook:egret.Sprite;
	private BASE_ROTATION:number = 60;//钩子默认旋转角度
	private BASE_LINE_HEIGHT:number = 50;//绳子默认长度
	private lineHeight:number = 50;//绳子当前长度
	private direction:string;//当前方向
	private GO_V:number = 5;
	private BACK_V:number = 10;

	private isHitBorder:boolean = false;//钩子是否碰到边缘
	public isHitObj:boolean = false;//钩子是否碰到物体
	private isGo:boolean = false;//钩子是否在抓取

	public static HOOK_MANAGER_EVENT:string = 'HOOK_MANAGER_EVENT';

	public static RESET_HOOK_EVENT:string = 'RESET_HOOK_EVENT';
	public static UPDATE_HOOK_POSITION_EVENT:string = 'UPDATE_HOOK_POSITION_EVENT';

	public constructor() {
		super();
		this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
	}

	private onAddToStage(e:egret.Event):void {
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
		this.shape = new egret.Shape();
		this.shape.graphics.beginFill(0x00ff00);
		this.shape.graphics.drawRect(0, 0, this.hookBmp.width, this.hookBmp.height);
		this.shape.graphics.endFill();
		this.shape.x = -this.hookBmp.width / 2;
		this.shape.y = 50;
		this.hook.addChild(this.shape);
		this.hook.addChild(this.hookBmp);
		this.hookBmp.x = -this.hookBmp.width / 2;
		this.hookBmp.y = 50;

		this.addChild(this.hook);
	}

	public onUpdateEnterFrame():void {
		this.onUpdateRotation();
		if (this.isGo) {
			this.onUpdateGo();
		}
	}

	public startRotate():void {
		this.direction = "left";
	}

	private onUpdateRotation():void {
		if (this.direction == "left") {
			this.hook.rotation++;
		} else if (this.direction == "right") {
			this.hook.rotation--;
		}
		if (this.direction != "stop") {
			if (this.hook.rotation < -this.BASE_ROTATION) {
				this.direction = "left";
			} else if (this.hook.rotation > this.BASE_ROTATION) {
				this.direction = "right";
			}
		}
	}

	public startGo():void {
		this.isGo = true;
		this.direction = "stop";
	}

	private onUpdateGo():void {
		var vHeight = this.GO_V;
		if (this.isHitBorder) {
			vHeight = -this.BACK_V;
		}
		if (this.isHitObj) {
			vHeight = -this.GO_V;//todo 返回速度根据物体的重量
		}
		this.lineHeight += vHeight;
		this.line.graphics.clear();
		this.line.graphics.lineStyle(2, 0x000000);
		this.line.graphics.moveTo(0, 0);
		this.line.graphics.lineTo(0, this.lineHeight);
		this.line.graphics.endFill();
		this.hookBmp.y += vHeight;
		this.shape.y += vHeight;

		this.dispatchEventWith(HookManager.HOOK_MANAGER_EVENT, false, {
			type: HookManager.UPDATE_HOOK_POSITION_EVENT,
			hook: this.hook,
			hookBmp: this.hookBmp
		});

		if (this.lineHeight < this.BASE_LINE_HEIGHT) {
			this.stopGo();
			this.isHitBorder = false;
			this.dispatchEventWith(HookManager.HOOK_MANAGER_EVENT, false, {type: HookManager.RESET_HOOK_EVENT});
		}

		if (!this.isHitBorder) {//判断是否出界
			var hookGlobalPoint = new egret.Point();
			hookGlobalPoint = this.hook.localToGlobal(this.hookBmp.x, this.hookBmp.y, hookGlobalPoint);
			if (hookGlobalPoint.x < 0) {
				//console.log("左边出界了");
				this.isHitBorder = true;
			} else if (hookGlobalPoint.x > this.stageW) {
				//console.log("右边出界了");
				this.isHitBorder = true;
			} else if (hookGlobalPoint.y > this.stageH) {
				//console.log("下边出界了");
				this.isHitBorder = true;
			}
		}
	}

	public stopGo():void {
		this.isGo = false;
		this.startRotate();
	}

}