module goldman {
	export class GameUtil {
		/**基于矩形的碰撞检测*/
		public static hitTestObjByParentObj(obj1:egret.DisplayObject, obj2:egret.DisplayObject, commonParentObj:egret.DisplayObject):boolean {
			var rect1:egret.Rectangle = obj1.getTransformedBounds(commonParentObj);
			var rect2:egret.Rectangle = obj2.getTransformedBounds(commonParentObj);
			return rect1.intersects(rect2);
		}

		public static angleToRadian(angle:number):number {
			return angle * (Math.PI / 180);
		}

		public static radianToAngle(radian:number):number {
			return radian * (180 / Math.PI);
		}

		public static sinD(angle:number):number {
			return Math.sin(this.angleToRadian(angle));
		}

		public static cosD(angle:number):number {
			return Math.cos(this.angleToRadian(angle));
		}

		public static atan2D(y:number, x:number):number {
			return this.radianToAngle(Math.atan2(y, x))
		}
	}

	/**
	 * 根据名称获取位图资源
	 */
	export function createBitmapByName(name:string):egret.Bitmap {
		var result:egret.Bitmap = new egret.Bitmap();
		var texture:egret.Texture = RES.getRes(name);
		result.texture = texture;
		return result;
	}
}