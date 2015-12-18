class HookManager extends egret.Sprite {

	/**stage宽*/
	private stageW:number;
	/**stage高*/
	private stageH:number;

	private line:egret.Shape;
	private hookBmp:egret.Bitmap;
	private hook:egret.Sprite;
	private BASE_ROTATION:number = 60;//钩子默认旋转角度
	private BASE_LINE_HEIGHT:number = 50;//绳子默认长度
	private lineHeight:number = 50;//绳子当前长度
	private direction:string;//当前方向
	private GO_V_DEFAULT:number = 5;//钩子出击速度
	public goV:number = 10;//钩子出击当前速度
	private BACK_V_DEFAULT:number = 10;//钩子缩回速度
	public backV:number = 10;//钩子缩回当前速度

	private isHitBorder:boolean = false;//钩子是否碰到边缘
	public isHitObj:boolean = false;//钩子是否碰到物体
	private isGo:boolean = false;//钩子是否在抓取

	public static HOOK_MANAGER_EVENT:string = 'HOOK_MANAGER_EVENT';

	public static GO_COMPLETE_EVENT:string = 'GO_COMPLETE_EVENT';
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
		this.hook.addChild(this.line);
		this.hookBmp = goldman.createBitmapByName("hook");
		this.hook.addChild(this.hookBmp);
		this.updateHook("reset");

		this.goV = this.GO_V_DEFAULT;
		this.backV = this.BACK_V_DEFAULT;

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
		var vHeight = this.goV;
		if (this.isHitBorder || this.isHitObj) {
			vHeight = -this.backV;
		}
		this.updateHook("v", vHeight);

		this.dispatchEventWith(HookManager.HOOK_MANAGER_EVENT, false, {
			type: HookManager.UPDATE_HOOK_POSITION_EVENT,
			hook: this.hook,
			hookBmp: this.hookBmp
		});

		if (this.lineHeight < this.BASE_LINE_HEIGHT) {
			this.goComplete();
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

	public goComplete():void {
		console.log("Stop");
		this.updateHook("reset");
		this.isGo = false;
		this.isHitBorder = false;
		this.backV = this.BACK_V_DEFAULT;
		this.startRotate();
		this.dispatchEventWith(HookManager.HOOK_MANAGER_EVENT, false, {type: HookManager.GO_COMPLETE_EVENT});
	}

	private updateHook(mode, v:number = 0):void {
		if (mode == "reset") {
			this.lineHeight = 50;
			this.hookBmp.y = 50;
		} else if(mode == "v") {
			this.hookBmp.y += v;
		}
		this.lineHeight += v;
		this.line.graphics.clear();
		this.line.graphics.lineStyle(2, 0x000000);
		this.line.graphics.moveTo(0, 0);
		this.line.graphics.lineTo(0, this.lineHeight);
		this.line.graphics.endFill();
		this.hookBmp.x = -this.hookBmp.width / 2;
	}
}