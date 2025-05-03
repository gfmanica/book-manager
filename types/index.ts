export type Book = {
    id: number;
    title: string;
    author: Author | null;
    category: Category | null;
    publicationYear: number;
    cover: string;
    description: string;
};

export type Author = {
    id: number;
    name: string;
    biography?: string;
};

export type Category = {
    id: number;
    name: string;
    description?: string;
};
