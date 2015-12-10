class Gold extends egret.Sprite {

	/**stage宽*/
	private stageW:number;
	/**stage高*/
	private stageH:number;

	private gold:egret.Bitmap;

	public constructor() {
		super();
		this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
	}

	private onAddToStage(event:egret.Event):void {
		this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
		this.stageW = this.stage.stageWidth;
		this.stageH = this.stage.stageHeight;

		this.gold = goldman.createBitmapByName("gold1");
		this.addChild(this.gold);
	}

}