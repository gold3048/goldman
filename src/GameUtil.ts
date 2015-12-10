module goldman {
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