module goldman {
	export class Obj extends egret.Sprite {
		public _type:string;
		public _money:number;//金钱
		public _backV:number;
		public objBmp:egret.Bitmap;


		public constructor(tp:string, money:string|number, backV:string|number) {
			super();
			this.name = (Math.floor(Math.random() * 9999999999)).toString();
			this._type = tp;
			this._money = Number(money);
			this._backV = Number(backV);
			this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
		}

		public onAddToStage(e:egret.Event):void {
			this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
			this.objBmp = goldman.createBitmapByName(this._type);
			this.addChild(this.objBmp);

			var oMoneyTextField = new egret.TextField();
			this.addChild(oMoneyTextField);
			oMoneyTextField.textAlign = egret.HorizontalAlign.LEFT;
			oMoneyTextField.textColor = 0x000000;
			oMoneyTextField.width = 22;
			oMoneyTextField.size = 18;
			oMoneyTextField.text = this._money.toString();
		}

		public overObject():void {
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

		public destory():void {
			this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
			removeAllchild(this);
		}
	}
}
