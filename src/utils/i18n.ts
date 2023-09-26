import _len from './locate/locate.en';
import _lch from './locate/locate.ch';
enum LOCATE {
	en = 'en',
	ch = 'ch',
}

const locateSetting: LOCATE = LOCATE.ch as LOCATE;

type ITransfer = {
	(param: string): string;
	(param: Record<string, string>): string;
	(param: Record<any, string>): string;
	(param: any): string;
}

type IDictionary = Record<LOCATE, Record<string, string>>;

const dictionary: IDictionary = {
	[LOCATE.en]: _len,
	[LOCATE.ch]: _lch,
}

const transfer: ITransfer = (param) => {
	if (typeof param === 'string') {
		return dictionary[locateSetting][param];
	} else {
		return (locateSetting === LOCATE.en) ? param['en_name'] : param['ch_name'];
	}
}

export default transfer;
