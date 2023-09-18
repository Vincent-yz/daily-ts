enum LOCATE {
	en = 'en',
	ch = 'ch',
}

const locateSetting: LOCATE = LOCATE.en as LOCATE;

type ITransfer = {
	(param: string): string;
	(param: Record<string, string>): string;
	(param: Record<any, string>): string;
	(param: any): string;
}

type IDictionary = Record<LOCATE, Record<string, string>>;

const dictionary: IDictionary = {
	[LOCATE.en]: {
		'poke-index': 'poke-index',
		'king': 'king',
		'raising': 'raising',
		'battle': 'battle',
		'tools': 'tools',
	},
	[LOCATE.ch]: {
		'poke-index': '全国图鉴',
		'king': '天王',
		'raising': '培育',
		'battle': '模拟',
		'tools': '工具',
	},
}

const transfer: ITransfer = (param) => {
	if (typeof param === 'string') {
		return dictionary[locateSetting][param];
	} else {
		return (locateSetting === LOCATE.en) ? param['en_name'] : param['ch_name'];
	}
}

export default transfer;
