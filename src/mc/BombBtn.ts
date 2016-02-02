module goldman {
	export class BombBtn extends egret.Sprite {

		private bombStaticTextField:egret.TextField;
		private bombTextField:egret.TextField;
		private bombBmp:egret.Bitmap;

		public constructor() {
			super();
			this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
		}

		//todo Õ¨µ¯°´Å¥
		public onAddToStage(e:egret.Event):void {
			this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
		}
	}
}
