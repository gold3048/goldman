module goldman {

	export class TNT extends goldman.Obj {
		private overBmp:egret.Bitmap;
		public constructor(money:number, backV:number) {
			this._type = "TNT";
			super(this._type, money, backV);
		}

		public overObject():void {
			if(this.objBmp && this.contains(this.objBmp)) {
				this.removeChild(this.objBmp);
			}
			this.overBmp = goldman.createBitmapByName("TNT_Over");
			this.addChild(this.overBmp);
		}
	}
}
