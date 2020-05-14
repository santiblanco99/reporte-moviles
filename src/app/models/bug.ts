import { Multimedia } from './multimedia';
export interface Bug {
    id ?: string;

    is_resolved ?: boolean;

    description ?: string;

    title ?: string;

    priority ?: number;

    commit_id ?: string;

    repository_id ?: string;

    multimedia_list ?: Multimedia[];



    // constructor(id?: string, is_resolved?: boolean, repository_id?: string, commit_id?: string, description?: string, title?: string, priority?: number, multimedia_list?: Multimedia[]) {
    //     this.id = id;
    //     this.is_resolved = is_resolved;
    //     this.repository_id = repository_id;
    //     this.commit_id = commit_id;
    //     this.description = description;
    //     this.title = title;
    //     this.priority = priority;
    //     this.multimedia_list = multimedia_list;
    // }

}