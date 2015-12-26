module goldman {

	export class Gold1 extends goldman.Obj {

		public constructor(money:number, backV:number) {
			this._type = "Gold1";
			super(this._type, money, backV);
		}

	}
}
