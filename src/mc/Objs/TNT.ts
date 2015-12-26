module goldman {

	export class TNT extends goldman.Obj {
		private overBmp:egret.Bitmap;
		private backBmp:egret.Bitmap;
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

		public backObject():void {
			if(this.objBmp && this.contains(this.objBmp)) {
				this.removeChild(this.objBmp);
			}
			if(this.overBmp && this.contains(this.overBmp)) {
				this.removeChild(this.overBmp);
			}
			this.backBmp = goldman.createBitmapByName("TNT_Back");
			this.addChild(this.backBmp);
			super.backObject();
		}
	}
}
