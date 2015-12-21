module goldman {
	export class Gold extends egret.Sprite {
		private _type:string;
		private _money:number;//金钱
		private _backV:number;
		private gold:egret.Bitmap;

		public constructor(tp:string, money:number, backV:number) {
			super();
			this._type = tp;
			this._money = money;
			this._backV = backV;
			this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
		}

		private onAddToStage(e:egret.Event):void {
			this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
			this.gold = goldman.createBitmapByName(this._type);
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

		set type(t:string) {
			this._type = t;
		}

		get type():string {
			return this._type;
		}
	}
}
