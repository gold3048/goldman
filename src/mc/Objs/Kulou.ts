module goldman {

	export class Kulou extends goldman.Obj {

		public constructor(money:number, backV:number) {
			this._type = "Kulou";
			super(this._type, money, backV);
		}

	}
}
