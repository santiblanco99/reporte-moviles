import { Multimedia } from './multimedia';
import { Issue } from './Issue';
export class Bug {
    id?: string;

    is_resolved?: boolean;

    description?: string;

    title?: string;

    priority?: number;

    repository_id?: string;

    multimedia_list?: string[];

    issue: Issue;
}