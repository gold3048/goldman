module goldman {
	export class Gold extends egret.Sprite {
		//金钱
		private _money:number;
		private _backV:number;
		private gold:egret.Bitmap;

		public constructor(money:number, backV:number) {
			super();
			this._money = money;
			this._backV = backV;
			this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
		}

		private onAddToStage(e:egret.Event):void {
			this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
			this.gold = goldman.createBitmapByName("gold1");
			this.addChild(this.gold);
		}

		set money(m:number) {
			this._money = m;
		}

		get money():number {
			return this._money;
		}

		set backV(m:number) {
			this._backV = m;
		}

		get backV():number {
			return this._backV;
		}
	}
}
