class HookManager extends egret.Sprite {

	private hook:egret.Sprite;
	private BASE_ROTATION = 60;
	private direction:egret.String;

	public constructor() {
		super();
		this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
	}

	private onAddToStage(event:egret.Event):void {
		this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
		this.createHook();
		this.startRotate();
	}

	private createHook():void {
		this.hook = new egret.Sprite();

		var line = new egret.Shape();
		line.graphics.lineStyle(2, 0x000000);
		line.graphics.moveTo(0, 0);
		line.graphics.lineTo(0, 50);
		line.graphics.endFill();
		this.hook.addChild(line);

		var hookBmp = goldman.createBitmapByName("hook");
		this.hook.addChild(hookBmp);
		hookBmp.x = -hookBmp.width / 2;
		hookBmp.y = 50;

		this.addChild(this.hook);
	}

	public startRotate():void {
		this.direction = "left";
		this.hook.addEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
	}

	public stopRotate():void {
		this.hook.removeEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
	}

	private onEnterFrame(e:egret.Event):void {
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
}