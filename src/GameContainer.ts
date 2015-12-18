module goldman {
	/**
	 * 主游戏容器
	 */
	export class GameContainer extends egret.Sprite {
		/**stage宽*/
		private stageW:number;
		/**stage高*/
		private stageH:number;

		private hookManager:HookManager;
		private goldManager:GoldManager;

		public constructor() {
			super();
			this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
		}

		/**初始化*/
		private onAddToStage(e:egret.Event):void {
			this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
			this.stageW = this.stage.stageWidth;
			this.stageH = this.stage.stageHeight;
			this.createGameScene();
		}

		/**创建游戏场景*/
		private createGameScene():void {
			this.hookManager = new HookManager();
			this.hookManager.addEventListener(HookManager.HOOK_MANAGER_EVENT, this.onHookManagerEventHandler, this);
			this.addChild(this.hookManager);
			this.hookManager.x = this.stageW / 2;
			this.goldManager = new GoldManager();
			this.addChild(this.goldManager);
			this.goldManager.createGolds();
			this.stage.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickStage, this);

			this.addEventListener(egret.Event.ENTER_FRAME, this.onGameEnterFrame, this);
		}

		private onGameEnterFrame(e:Event):void {
			this.hookManager.onUpdateEnterFrame();
		}

		private onHookManagerEventHandler(e:egret.Event):void {
			var data:any = (e.data);
			switch (data.type) {
				case HookManager.GO_COMPLETE_EVENT:
					this.resetHook();
					break;
				case HookManager.UPDATE_HOOK_POSITION_EVENT:
					if (this.hookManager.isHitObj) {
						this.updateObjPosition(data.hook, data.hookBmp);
					} else {
						this.checkHookHitObject(data.hook, data.hookBmp);
					}
					break;
			}
		}

		private resetHook():void {
			console.log("resetHook");
			if (this.goldManager.currHookGold) {
				this.hookManager.isHitObj = false;
				this.goldManager.removeCurrentGold();
			}
		}

		private updateObjPosition(hook:egret.Sprite, hookBmp:egret.Bitmap):void {
			//var rect:egret.Rectangle = hookBmp.getTransformedBounds(this);
			var p:egret.Point = hook.localToGlobal(hookBmp.x - hookBmp.width / 2, hookBmp.y + hookBmp.height);
			var gloablP:egret.Point = this.globalToLocal(p.x, p.y);
			this.goldManager.currHookGold.x = gloablP.x;
			this.goldManager.currHookGold.y = gloablP.y;
			this.goldManager.currHookGold.rotation = hook.rotation;
		}

		private checkHookHitObject(hook:egret.Sprite, hookBmp:egret.Bitmap):void {
			var goldsArr:Gold[] = this.goldManager.goldsArr;
			for (var i in goldsArr) {
				var gold:Gold = goldsArr[i];
				var isHit:boolean = GameUtil.hitTestObjByParentObj(hookBmp, gold, this);//检测钩子和物体是否相撞
				if (isHit) {
					this.hookManager.isHitObj = true;
					this.hookManager.backV = gold.backV;
					this.goldManager.currHookGold = gold;
					break;
				}
			}
		}

		private clickStage(e:egret.TouchEvent):void {
			this.hookManager.startGo();
		}
	}
}