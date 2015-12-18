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
		var shape:egret.Shape = new egret.Shape();
		shape.graphics.beginFill(0xff0000);
		shape.graphics.drawRect(0, 0, this.gold.width, this.gold.height);
		shape.graphics.endFill();
		this.addChild(shape);
		this.addChild(this.gold);
	}

}