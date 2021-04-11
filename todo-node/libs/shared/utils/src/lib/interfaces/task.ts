export interface Task {
    id?: string;
    name: string;
    additionalDetails: string;
    completed: boolean;
    deadline: Date;
    lastModified: Date;
}