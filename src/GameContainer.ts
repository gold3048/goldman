module goldman {
    /**
     * 主游戏容器
     */
    export class GameContainer extends egret.DisplayObjectContainer {
        public constructor() {
            super();
            this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        }

        /**初始化*/
        private onAddToStage(event:egret.Event) {
            this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
            this.createGameScene();
        }

        /**创建游戏场景*/
        private createGameScene():void {
            console.log("start");
        }
    }
}