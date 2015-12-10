class GoldManager extends egret.Sprite {

	/**stage宽*/
	private stageW:number;
	/**stage高*/
	private stageH:number;

	private goldsArr:Gold[] = [];

	public constructor() {
		super();
		this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
	}

	private onAddToStage(event:egret.Event):void {
		this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
		this.stageW = this.stage.stageWidth;
		this.stageH = this.stage.stageHeight;
	}

	public createGolds():void {
		for (var i = 0; i < 8; i++) {
			var gold:Gold = new Gold();
			gold.x = Math.floor(this.stageW * Math.random());
			gold.y = Math.floor((this.stageH - 100) * Math.random() + 100);
			console.log(gold)
			this.goldsArr.push(gold);
			this.addChild(gold);
		}
	}

}