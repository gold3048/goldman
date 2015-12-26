module goldman {

	export class Gold2 extends goldman.Obj {

		public constructor(money:number, backV:number) {
			this._type = "Gold2";
			super(this._type, money, backV);
		}
	}
}
