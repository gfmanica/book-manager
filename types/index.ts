export type Book = {
    id: number;
    title: string;
    author: string;
    category: string;
    publicationYear: number;
    cover: string;
    description: string;
};

export type Author = {
    id: number;
    name: string;
    biography?: string;
};
