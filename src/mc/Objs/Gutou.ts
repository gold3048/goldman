module goldman {

	export class Gutou extends goldman.Obj {

		public constructor(money:number, backV:number) {
			this._type = "Gutou";
			super(this._type, money, backV);
		}

	}
}
