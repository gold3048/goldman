//钩子
module goldman {
	export class Hook extends egret.Sprite {

		private line:egret.Shape;
		private _hookBmp:egret.Bitmap;
		private _hookGrabBmp:egret.Bitmap;

		public constructor() {
			super();
			this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
		}

		private onAddToStage(e:egret.Event):void {
			this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);

			this.line = new egret.Shape();
			this.addChild(this.line);
			this._hookBmp = goldman.createBitmapByName("hook");
			this.addChild(this._hookBmp);
			this._hookGrabBmp = goldman.createBitmapByName("hookback");
			this._hookGrabBmp.visible = false;
			this.addChild(this._hookGrabBmp);
		}

		public setHookGrabStyle(isGrab:boolean = false):void {
			this._hookBmp.visible = !isGrab;
			this._hookGrabBmp.visible = isGrab;
		}

		public redrawHook(lineHeight:number = 0):void {
			this._hookBmp.y = lineHeight;
			this._hookGrabBmp.y = lineHeight;
			this.line.graphics.clear();
			this.line.graphics.lineStyle(2, 0x000000);
			this.line.graphics.moveTo(0, 0);
			this.line.graphics.lineTo(0, lineHeight);
			this.line.graphics.endFill();
			this._hookBmp.x = -this._hookBmp.width / 2;
			this._hookGrabBmp.x = -this._hookGrabBmp.width / 2;
		}

		get hookBmp():egret.Bitmap {
			return this._hookBmp;
		}

		get hookGrabBmp():egret.Bitmap {
			return this._hookGrabBmp;
		}
	}
}