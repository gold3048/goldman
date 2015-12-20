module goldman {
	/**
	 * 主游戏容器
	 */
	export class GameContainer extends egret.Sprite {
		/**游戏区域宽*/
		static thisW:number;
		/**游戏区域高*/
		static thisH:number;

		private hookManager:HookManager;
		private goldManager:GoldManager;

		public constructor() {
			super();
			this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
		}

		/**初始化*/
		private onAddToStage(e:egret.Event):void {
			this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
			GameContainer.thisW = this.stage.stageWidth;
			GameContainer.thisH = this.stage.stageHeight;
			this.createGameScene();
		}

		/**创建游戏场景*/
		private createGameScene():void {
			this.goldManager = new GoldManager();
			this.addChild(this.goldManager);
			this.goldManager.createGolds();
			this.hookManager = new HookManager();
			this.hookManager.addEventListener(HookManager.HOOK_MANAGER_EVENT, this.onHookManagerEventHandler, this);
			this.addChild(this.hookManager);
			this.hookManager.x = GameContainer.thisW / 2;
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
					this.onHookGoComplete();
					break;
				case HookManager.UPDATE_HOOK_POSITION_EVENT:
					if (this.hookManager.isBack && this.goldManager.currHookGold) {
						this.updateObjPosition(data.hook, data.hookGrabBmp);
					} else if (!this.hookManager.isBack) {
						this.checkHookHitObject(data.hookBmp);
					}
					break;
			}
		}

		private onHookGoComplete():void {
			if (this.goldManager.currHookGold) {
				this.goldManager.removeCurrentGold();
			}
		}

		private updateObjPosition(hook:egret.Sprite, hookGrabBmp:egret.Bitmap):void {
			var p:egret.Point = hook.localToGlobal(hookGrabBmp.x - hookGrabBmp.width / 2, hookGrabBmp.y + hookGrabBmp.height * 0.45);
			var gloablP:egret.Point = this.globalToLocal(p.x, p.y);
			this.goldManager.setCurrHookGoldPosition(gloablP, hook.rotation)
		}

		private checkHookHitObject(hookBmp:egret.Bitmap):void {
			var goldsArr:Gold[] = this.goldManager.goldsArr;
			for (var i in goldsArr) {
				var gold:Gold = goldsArr[i];
				var isHit:boolean = GameUtil.hitTestObjByParentObj(hookBmp, gold, this);//检测钩子和物体是否相撞
				if (isHit) {
					this.hookManager.hitObject(gold.backV);
					this.goldManager.hitObject(gold);
					break;
				}
			}
		}

		private clickStage(e:egret.TouchEvent):void {
			this.hookManager.startGo();
		}
	}
}