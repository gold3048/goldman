module goldman {
	export class GoldManager extends egret.Sprite {
		private _goldsArr:Gold[] = [];
		public catchGold:Gold;

		private objsConfig:any;

		public constructor() {
			super();
			this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
		}

		private onAddToStage(e:egret.Event):void {
			this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
			this.objsConfig = RES.getRes("objsConfig");
		}

		public createGolds():void {
			var arr:string[] = ["gold1", "gold2", "gold3", "gold4", "stone1", "stone2", "stone3", "stone4"];
			for (var i = 0; i < 8; i++) {
				var ty:string = arr[i];
				var money:number = this.objsConfig[ty].money;
				var backV:number = this.objsConfig[ty].backV;
				console.log(backV);
				var gold:Gold = new Gold(ty, money, backV);
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
			this.catchGold.x = gloablP.x;
			this.catchGold.y = gloablP.y;
			this.catchGold.rotation = rotation;
		}

		public hitObject(gold:Gold):void {
			this.catchGold = gold;
		}

		public removeCurrentGold():Gold {
			var currHookGold:Gold = this._goldsArr.splice(this._goldsArr.indexOf(this.catchGold), 1)[0];
			this.removeChild(currHookGold);
			this.catchGold = null;
			return currHookGold;
		}
	}
}
