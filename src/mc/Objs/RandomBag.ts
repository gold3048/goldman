module goldman {

	export class RandomBag extends goldman.Obj {

		public constructor(money:string, backV:string) {
			this._type = "RandomBag";

			var moneyArr:string[] = money.toString().split("-");
			var moneyResult:number = parseInt(moneyArr[0]) + Math.floor(Math.random() * (parseInt(moneyArr[1]) - parseInt(moneyArr[0])));

			var backVArr:string[] = backV.toString().split("-");
			var backVResult:number = parseInt(backVArr[0]) + Math.floor(Math.random() * (parseInt(backVArr[1]) - parseInt(backVArr[0])));

			super(this._type, moneyResult.toString(), backVResult.toString());
		}

	}
}
