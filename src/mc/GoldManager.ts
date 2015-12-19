class GoldManager extends egret.Sprite {
	/**stage宽*/
	private stageW:number;
	/**stage高*/
	private stageH:number;

	private _goldsArr:Gold[] = [];
	public currHookGold:Gold = null;

	public constructor() {
		super();
		this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
	}

	private onAddToStage(e:egret.Event):void {
		this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
		this.stageW = this.stage.stageWidth;
		this.stageH = this.stage.stageHeight;
	}

	public createGolds():void {
		for (var i = 0; i < 8; i++) {
			var gold:Gold = new Gold();
			gold.x = Math.floor(this.stageW * Math.random());
			gold.y = Math.floor((this.stageH - 100) * Math.random() + 100);
			this._goldsArr.push(gold);
			this.addChild(gold);
		}
	}

	get goldsArr():Gold[] {
		return this._goldsArr;
	}

	public setCurrHookGoldPosition(gloablP:egret.Point, rotation:number):void {
		this.currHookGold.x = gloablP.x;
		this.currHookGold.y = gloablP.y;
		this.currHookGold.rotation = rotation;
	}

	public removeCurrentGold():Gold {
		var currHookGold:Gold = this._goldsArr.splice(this._goldsArr.indexOf(this.currHookGold), 1)[0];
		this.removeChild(currHookGold);
		this.currHookGold = null;
		return currHookGold;
	}


}