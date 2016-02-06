//钩子
module goldman {
	export class Hook extends egret.Sprite {

		private line:egret.Shape;
		private _hookBmp:egret.Bitmap;
		private _backHookBmp:egret.Bitmap;

		public constructor() {
			super();
			this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
		}

		private onAddToStage(e:egret.Event):void {
			this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);

			this.line = new egret.Shape();
			this.addChild(this.line);
			this._hookBmp = goldman.createBitmapByName("Hook");
			this.addChild(this._hookBmp);
		}

		public setBackHookType(typeStr:string = ""):void {
			if (typeStr) {
				this._backHookBmp = goldman.createBitmapByName(typeStr + "_Back");
				this.addChild(this._backHookBmp);
				this._backHookBmp.x = this._hookBmp.x;
				this._backHookBmp.y = this._hookBmp.y;
				this._hookBmp.visible = false;
			} else {
				if (this._backHookBmp && this.contains(this._backHookBmp)) {
					this.removeChild(this._backHookBmp);
					this._backHookBmp = null;
				}
				this._hookBmp.visible = true;
			}
		}

		public redrawHook(lineHeight:number = 0):void {
			this._hookBmp.y = lineHeight;
			this.line.graphics.clear();
			this.line.graphics.lineStyle(3, 0x3c3841);
			this.line.graphics.moveTo(0, 0);
			this.line.graphics.lineTo(0, lineHeight);
			this.line.graphics.endFill();
			//绳子上的小点 模拟铁链
			for (var i = 0; i <= lineHeight; i += 10) {
				this.line.graphics.beginFill(0x3c3841);
				this.line.graphics.drawCircle(0, i, 2);
				this.line.graphics.endFill();
			}
			this._hookBmp.x = -this._hookBmp.width / 2;
			if(this._backHookBmp) {
				this._backHookBmp.y = lineHeight;
				this._backHookBmp.x = -this._backHookBmp.width / 2;
			}
		}

		get hookBmp():egret.Bitmap {
			return this._hookBmp;
		}

		public destroy():void {
			this.removeChild(this.line);
			this.line = null;
			this.removeChild(this._hookBmp);
			this._hookBmp = null;
			if (this._backHookBmp && this.contains(this._backHookBmp)) {
				this.removeChild(this._backHookBmp);
				this._backHookBmp = null;
			}
		}
	}
}