export class Task {
    _id?: number;
    name: string;
    description: string;
    category: string;
    status: string;

    constructor(name:string, description:string, category:string, status:string) {
        this.name = name;
        this.description = description;
        this.category = category;
        this.status = status
    }
}