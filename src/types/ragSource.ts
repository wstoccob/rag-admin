export interface RagSource {
    source_id: string;
    filename: string;
    title: string;
    author: string | null;
    year: number | null;
    edition: string | null;
    publisher: string | null;
    source_url: string | null;
}