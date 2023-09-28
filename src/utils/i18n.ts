import _len from './locate/locate.en';
import _lch from './locate/locate.ch';

export enum LOCATE {
	en = 'en',
	ch = 'ch',
}

type IDicMap = Record<LOCATE, Record<string, string>>;

const dicMap: IDicMap = {
	[LOCATE.en]: _len,
	[LOCATE.ch]: _lch,
}

type ITransfer = {
	(param: string): string;
	(param: Record<string, string>): string;
	(param: Record<any, string>): string;
	(param: any): string;
}

class Internationalization {
	current: LOCATE;

	constructor() {
		this.current = LOCATE.ch as LOCATE;
	}

	public get(): LOCATE {
		return this.current;
	}

	public set(locate: LOCATE) {
		this.current = locate;
	}

	public transfer: ITransfer = (param) => {
		if (typeof param === 'string') {
			return dicMap[this.current][param];
		} else {
			return (this.current === LOCATE.en) ? param['en_name'] : param['ch_name'];
		}
	}
}

const i18n = new Internationalization();

export default i18n;
