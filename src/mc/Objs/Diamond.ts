module goldman {

	export class Diamond extends goldman.Obj {

		public constructor(money:number, backV:number) {
			this._type = "Diamond";
			super(this._type, money, backV);
		}

	}
}
