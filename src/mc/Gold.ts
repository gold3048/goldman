module goldman {
	export class Gold extends egret.Sprite {
		//金钱
		public _money:number;
		public backV:number;
		private gold:egret.Bitmap;

		public constructor() {
			super();
			this.money = Math.floor(10 + Math.random() * 10);
			this.backV = Math.floor(2 + Math.random() * 0);
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
	}
}
