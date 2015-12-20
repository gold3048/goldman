module goldman {
	export class GoldManager extends egret.Sprite {
		private _goldsArr:Gold[] = [];
		public currHookGold:Gold = null;

		public constructor() {
			super();
			this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
		}

		private onAddToStage(e:egret.Event):void {
			this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
		}

		public createGolds():void {
			for (var i = 0; i < 8; i++) {
				var money = Math.floor(10 + Math.random() * 10);
				var backV = Math.floor(2 + Math.random() * 0);
				var gold:Gold = new Gold(money, backV);
				gold.x = Math.floor(GameContainer.thisW * Math.random());
				gold.y = Math.floor((GameContainer.thisH - 100) * Math.random() + 100);
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

		public hitObject(gold:Gold):void {
			this.currHookGold = gold;
		}

		public removeCurrentGold():Gold {
			var currHookGold:Gold = this._goldsArr.splice(this._goldsArr.indexOf(this.currHookGold), 1)[0];
			this.removeChild(currHookGold);
			this.currHookGold = null;
			return currHookGold;
		}
	}
}
