module goldman {

	export class MouseDiamond extends goldman.Obj {

		private MOVE_W:number;
		private direction:string;

		public constructor(money:number, backV:number) {
			this._type = "MouseDiamond";
			super(this._type, money, backV);
		}

		public onAddToStage(e:egret.Event):void {
			this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
			this.MOVE_W = 80 + Math.random() * 50;
			this.objBmp = goldman.createBitmapByName(this._type);
			if (Math.random() > 0.5) {
				this.direction = "left";
			} else {
				this.direction = "right";
				this.objBmp.scaleX = -1;
			}
			this.addChild(this.objBmp);
			this.addEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
		}

		private onEnterFrame(e:egret.Event):void {
			if (this.direction == "left") {
				this.objBmp.x--;
			} else if (this.direction == "right") {
				this.objBmp.x++;
			}
			if (this.objBmp.x < -this.MOVE_W) {
				this.direction = "right";
				this.objBmp.scaleX = -1;
			} else if (this.objBmp.x > this.MOVE_W) {
				this.direction = "left";
				this.objBmp.scaleX = 1;
			}
		}

		public destory():void {
			this.removeEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
			super.destory();
		}
	}
}
