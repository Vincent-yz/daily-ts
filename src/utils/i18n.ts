import _len from './locate/locate.en';
import _lch from './locate/locate.ch';
import LOCATE from './locate';
import config from '@/config';

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

	constructor(locate: LOCATE) {
		this.current = locate;
	}

	public get(): LOCATE {
		return this.current;
	}

	public isCh(): boolean {
		return this.current === LOCATE.ch;
	}

	public set(locate: LOCATE) {
		this.current = locate;
	}

	public transfer: ITransfer = (param) => {
		if (typeof param === 'string') {
			return dicMap[this.current][param];
		} else if (param !== undefined) {
			return (this.current === LOCATE.en) ? param['en_name'] : param['ch_name'];
		} else {
			return '';
		}
	}
}

const i18n = new Internationalization(config.locate);

export default i18n;
