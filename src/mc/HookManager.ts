class HookManager extends egret.Sprite {

	/**stage宽*/
	private stageW:number;
	/**stage高*/
	private stageH:number;

	private hook:Hook;
	private BASE_ROTATION_MAX:number = 60;//钩子默认旋转角度
	private LINE_HEIGHT_DEFAULT:number = 50;//绳子默认长度
	private lineHeight:number = 50;//绳子当前长度
	private direction:string;//当前方向
	private GO_V_DEFAULT:number = 5;//钩子出击速度
	private goV:number = 10;//钩子出击当前速度
	private BACK_V_DEFAULT:number = 10;//钩子缩回速度
	private backV:number = 10;//钩子缩回当前速度

	private isGo:boolean = false;//钩子是否在抓取
	public isBack:boolean = false;//钩子是否在收回

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
		this.hook.redrawHook(this.LINE_HEIGHT_DEFAULT);
		this.startRotate();
	}

	private createHook():void {

		this.hook = new Hook();
		this.addChild(this.hook);

		this.goV = this.GO_V_DEFAULT;
		this.backV = this.BACK_V_DEFAULT;
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
			if (this.hook.rotation < -this.BASE_ROTATION_MAX) {
				this.direction = "left";
			} else if (this.hook.rotation > this.BASE_ROTATION_MAX) {
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
		if (this.isBack) {
			vHeight = -this.backV;
		}
		this.lineHeight += vHeight;
		this.hook.redrawHook(this.lineHeight);

		this.dispatchEventWith(HookManager.HOOK_MANAGER_EVENT, false, {
			type: HookManager.UPDATE_HOOK_POSITION_EVENT,
			hook: this.hook,
			hookBmp: this.hook.hookBmp,
			hookGrabBmp: this.hook.hookGrabBmp
		});

		if (this.lineHeight < this.LINE_HEIGHT_DEFAULT) {
			this.goComplete();
		}

		if (!this.isBack) {//判断是否出界
			var hookGlobalPoint = this.hook.localToGlobal(this.hook.hookBmp.x, this.hook.hookBmp.y);
			if (hookGlobalPoint.x < 0 || hookGlobalPoint.x > this.stageW || hookGlobalPoint.y > this.stageH) {//各种边缘出界
				this.isBack = true;
			}
		}
	}

	public hitObject(v:number):void {
		this.isBack = true;
		this.backV = v;
		this.hook.setHookGrabStyle(true);
	}

	public goComplete():void {
		this.hook.setHookGrabStyle(false);
		this.hook.redrawHook(this.LINE_HEIGHT_DEFAULT);
		this.isGo = false;
		this.isBack = false;
		this.backV = this.BACK_V_DEFAULT;
		this.startRotate();
		this.dispatchEventWith(HookManager.HOOK_MANAGER_EVENT, false, {type: HookManager.GO_COMPLETE_EVENT});
	}
}