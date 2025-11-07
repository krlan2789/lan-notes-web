import type INoteContent from "~/utils/interfaces/INoteContent";

export interface ListComponentProps {
	items: INoteContent[];
	layout?: "grid" | "list";
	paginate?: boolean;
}
