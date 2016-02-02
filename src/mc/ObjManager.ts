module goldman {
	export class ObjManager extends egret.Sprite {
		private _objsArr:Obj[] = [];

		private objsConfig:any;

		public static OBJ_MANAGER_EVENT:string = 'OBJ_MANAGER_EVENT';

		public constructor() {
			super();
			this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
		}

		private onAddToStage(e:egret.Event):void {
			this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
			this.objsConfig = RES.getRes("objsConfig");
		}

		public createObjs():void {
			var arr:string[] = ["Mouse", "MouseDiamond", "Gold1", "Gold2", "Gold3", "Stone1", "Stone2", "Diamond", "TNT"];
			for (var i = 0; i < arr.length; i++) {
				var ty:string = arr[i];
				var money:string = this.objsConfig[ty].money;
				var backV:string = this.objsConfig[ty].backV;
				var oClass:any = egret.getDefinitionByName("goldman." + ty);
				var gold:Obj = new oClass(money, backV);
				gold.x = Math.floor(GameContainer.thisW * Math.random());
				gold.y = Math.floor((GameContainer.thisH - 400) * Math.random() + 210);
				this._objsArr.push(gold);
				this.addChild(gold);
			}
		}

		get objsArr():Obj[] {
			return this._objsArr;
		}

		//移除一定范围内的物体
		public removeObjsAtAreaByHitObj(hitObj:Obj):void {
			if (hitObj.type == "TNT") {
				var removeObjsArr:Obj[] = [];
				for (var i in this._objsArr) {
					var o:Obj = this._objsArr[i];
					if (o !== hitObj) {
						var oPoint:egret.Point = new egret.Point(o.x + o.width / 2, o.y + o.height / 2);
						var hPoint:egret.Point = new egret.Point(hitObj.x + o.width / 2, hitObj.y + o.height / 2);
						var distance:number = egret.Point.distance(oPoint, hPoint);
						if (distance <= 150) {
							removeObjsArr.push(o);
						}
					}
				}
				for (var i in removeObjsArr) {
					var o:Obj = removeObjsArr[i];
					this.removeObj(o);
				}
			}
		}

		public removeObj(obj:Obj):Obj {
			var currHookObj:Obj = this._objsArr.splice(this._objsArr.indexOf(obj), 1)[0];
			this.removeChild(currHookObj);
			return currHookObj;
		}
	}
}
