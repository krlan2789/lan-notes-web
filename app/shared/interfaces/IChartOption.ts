export interface ILegendConfig {
	position?: string;
}

export interface IPluginConfig {
	legend?: ILegendConfig;
}

export interface IGridConfig {
	color?: string;
	borderColor?: string;
	drawTicks?: boolean;
}

export interface IScaleAxisConfig {
	stacked?: boolean;
	grid?: IGridConfig;
}

export interface IScaleConfig {
	x?: IScaleAxisConfig;
	y?: IScaleAxisConfig;
}

export interface IChartOption {
	maintainAspectRatio?: boolean;
	responsive?: boolean;
	plugins: IPluginConfig;
	scales: IScaleConfig;
}
