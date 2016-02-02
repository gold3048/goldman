module goldman {
	export class LevelManager extends egret.Sprite {

		private bgBmp:egret.Bitmap;
		private heroBmp:egret.Bitmap;

		private scoreTextField:egret.TextField;
		private goalTextField:egret.TextField;
		private timeTextField:egret.TextField;

		private levelPanelBmp:egret.Bitmap;
		private levelTextField:egret.TextField;

		public static LEVEL_MANAGER_EVENT:string = 'LEVEL_MANAGER_EVENT';

		public constructor() {
			super();
			this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
		}

		private onAddToStage(e:egret.Event):void {
			this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
		}

		public createObjs():void {
			this.bgBmp = goldman.createBitmapByName("bgall");
			this.addChild(this.bgBmp);
			this.heroBmp = goldman.createBitmapByName("Hero");
			this.addChild(this.heroBmp);
			this.heroBmp.x = 330;
			this.heroBmp.y = 34;

			this.scoreTextField = new egret.TextField();
			this.addChild(this.scoreTextField);
			this.scoreTextField.x = 203;
			this.scoreTextField.y = 36;
			this.scoreTextField.width = 80;
			//this.scoreTextField.fontFamily = "Arial";
			this.scoreTextField.textColor = 0x693117;
			this.scoreTextField.textAlign = egret.HorizontalAlign.CENTER;
			this.scoreTextField.size = 36;
			this.scoreTextField.text = "0";

			this.goalTextField = new egret.TextField();
			this.addChild(this.goalTextField);
			this.goalTextField.x = 180;
			this.goalTextField.y = 110;
			this.goalTextField.width = 80;
			//this.goalTextField.fontFamily = "Arial";
			this.goalTextField.textColor = 0x693117;
			this.goalTextField.textAlign = egret.HorizontalAlign.CENTER;
			this.goalTextField.size = 36;
			this.goalTextField.text = "0";

			this.timeTextField = new egret.TextField();
			this.addChild(this.timeTextField);
			this.timeTextField.x = 575;
			this.timeTextField.y = 110;
			this.timeTextField.width = 110;
			//this.timeTextField.fontFamily = "Arial";
			this.timeTextField.textColor = 0xffe400;
			this.timeTextField.textAlign = egret.HorizontalAlign.CENTER;
			this.timeTextField.size = 36;
			this.timeTextField.text = "0s";

			this.levelPanelBmp = goldman.createBitmapByName("LevelPanel");
			this.addChild(this.levelPanelBmp);
			this.levelPanelBmp.x = 235;
			this.levelPanelBmp.y = 1085;

			this.levelTextField = new egret.TextField();
			this.addChild(this.levelTextField);
			this.levelTextField.x = 458;
			this.levelTextField.y = 1107;
			this.levelTextField.width = 80;
			//this.levelTextField.fontFamily = "Arial";
			this.levelTextField.textColor = 0x1a1a1a;
			this.levelTextField.textAlign = egret.HorizontalAlign.CENTER;
			this.levelTextField.size = 60;
			this.levelTextField.text = "1";
		}

		public setScoreText(score:number):void {
			this.scoreTextField.text = score.toString();
		}

		public setGoalText(goalScore:number):void {
			this.goalTextField.text = goalScore.toString();
		}

		public setTimeText(time:number):void {
			this.timeTextField.text = time + "s";
		}
	}
}