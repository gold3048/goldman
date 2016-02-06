module goldman {
	/**
	 * 主游戏容器
	 */
	export class GameContainer extends egret.Sprite {
		/**游戏区域宽*/
		static thisW:number;
		/**游戏区域高*/
		static thisH:number;

		private levelArr:any = [];
		private currLevel:number = 1;

		private levelTimer:egret.Timer;
		private LEVEL_TIME:number = 60;

		private hookManager:HookManager;
		private objManager:ObjManager;
		private levelManager:LevelManager;

		public constructor() {
			super();
			this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
		}

		/**初始化*/
		private onAddToStage(e:egret.Event):void {
			this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
			GameContainer.thisW = this.stage.stageWidth;
			GameContainer.thisH = this.stage.stageHeight;
			this.getLevelData();
		}

		private getLevelData() {
			this.levelArr = RES.getRes("Level");
			this.createGameScene();
			this.createGameTimeInterval();
		}

		/**创建游戏场景*/
		private createGameScene():void {
			this.levelManager = new LevelManager();
			this.levelManager.addEventListener(LevelManager.LEVEL_MANAGER_EVENT, this.onLevelManagerEventHandler, this);
			this.addChild(this.levelManager);
			this.levelManager.createObjs();
			this.levelManager.setGoalText(this.levelArr[this.currLevel - 1].goal);
			this.objManager = new ObjManager();
			this.objManager.addEventListener(ObjManager.OBJ_MANAGER_EVENT, this.onObjManagerEventHandler, this);
			this.addChild(this.objManager);

			this.objManager.createObjs(this.levelArr[this.currLevel - 1].objsArr);
			this.hookManager = new HookManager();
			this.hookManager.addEventListener(HookManager.HOOK_MANAGER_EVENT, this.onHookManagerEventHandler, this);
			this.addChild(this.hookManager);
			this.hookManager.x = GameContainer.thisW / 2;
			this.hookManager.y = 158;

			this.stage.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickStage, this);
			this.addEventListener(egret.Event.ENTER_FRAME, this.onGameEnterFrame, this);
		}

		private createGameTimeInterval():void {
			this.levelTimer = new egret.Timer(1000, this.LEVEL_TIME);
			this.levelTimer.addEventListener(egret.TimerEvent.TIMER, this.gameTimerFunc, this);
			this.levelTimer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, this.gameTimerComFunc, this);
			this.levelTimer.start();
			this.levelManager.setTimeText(this.LEVEL_TIME);
		}

		private gameTimerFunc(e:egret.TimerEvent):void {
			this.levelManager.setTimeText(this.LEVEL_TIME - e.target.currentCount);
		}

		private gameTimerComFunc(e:egret.TimerEvent):void {
			this.levelManager.setTimeText(this.LEVEL_TIME - e.target.currentCount);
			console.log('gameTimerComFunc');
		}

		private onGameEnterFrame(e:Event):void {
			this.hookManager.onUpdateEnterFrame();
		}

		private onLevelManagerEventHandler(e:egret.Event):void {
			var data:any = (e.data);
			switch (data.type) {
			}
		}

		private onObjManagerEventHandler(e:egret.Event):void {
			var data:any = (e.data);
			switch (data.type) {
			}
		}

		private onHookManagerEventHandler(e:egret.Event):void {
			var data:any = (e.data);
			switch (data.type) {
				case HookManager.GO_COMPLETE_EVENT:
					break;
				case HookManager.UPDATE_HOOK_POSITION_EVENT:
					if (!this.hookManager.isBack) {
						this.checkHookHitObject(data.hookBmp);
					}
					break;
			}
		}

		private checkHookHitObject(hookBmp:egret.Bitmap):void {
			var goldsArr:Obj[] = this.objManager.objsArr;
			var me = this;
			for (var i in goldsArr) {
				var obj:Obj = goldsArr[i];
				var isHit:boolean = GameUtil.hitTestObjByParentObj(hookBmp, obj, this);//检测钩子和物体是否相撞
				if (isHit) {
					if (obj.type == "TNT") {
						me.hookManager.hitObject(0);
						me.objManager.removeObjsAtAreaByHitObj(obj);
						obj.overObject();
						setTimeout(function () {
							me.hookManager.hitObject(obj.backV);
							//todo 获取当前价格
							console.log("obj.money " + obj.money);
							me.hookManager.setBackHookType(obj.type);
							obj.destory();
						}, 300);
					} else {
						me.hookManager.hitObject(obj.backV);
						//todo 获取当前价格
						console.log("obj.money " + obj.money);
						me.hookManager.setBackHookType(obj.type);
						obj.destory();
					}
					break;
				}
			}
		}

		private clickStage(e:egret.TouchEvent):void {
			this.hookManager.startGo();
		}
	}
}