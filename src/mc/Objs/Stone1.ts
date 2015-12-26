module goldman {

	export class Stone1 extends goldman.Obj {

		public constructor(money:number, backV:number) {
			this._type = "Stone1";
			super(this._type, money, backV);
		}

	}
}
