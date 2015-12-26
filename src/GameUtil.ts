module goldman {
	export class GameUtil {
		/**基于矩形的碰撞检测*/
		public static hitTestObjByParentObj(obj1:egret.DisplayObject, obj2:egret.DisplayObject, commonParentObj:egret.DisplayObject):boolean {
			var rect1:egret.Rectangle = obj1.getTransformedBounds(commonParentObj);
			var rect2:egret.Rectangle = obj2.getTransformedBounds(commonParentObj);
			return rect1.intersects(rect2);
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

	export function removeAllchild(diso:egret.DisplayObjectContainer):void{
		while(diso.numChildren) {
			diso.removeChildAt(0);
		}
	}


}