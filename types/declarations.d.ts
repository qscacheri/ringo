import { ProjectStore } from "../stores/ProjectStore";

declare global {
    interface Window { store: ProjectStore }
}