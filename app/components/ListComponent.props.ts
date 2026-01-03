import type INoteContent from "~/utils/models/INoteContent";

export interface ListComponentProps {
	items: INoteContent[];
	layout?: "grid" | "list";
	paginate?: boolean;
}
