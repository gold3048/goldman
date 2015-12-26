module goldman {

	export class Gold3 extends goldman.Obj {

		public constructor(money:number, backV:number) {
			this._type = "Gold3";
			super(this._type, money, backV);
		}

	}
}
