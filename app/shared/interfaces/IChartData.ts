export interface IBorderRadiusConfig {
	topLeft?: number;
	topRight?: number;
}

export interface IDatasetConfig {
	type: string;
	label: string;
	backgroundColor: string;
	data?: number[];
	borderRadius?: IBorderRadiusConfig;
	barThickness?: number;
}

export interface IChartData {
	labels?: string[];
	datasets?: IDatasetConfig[];
}
