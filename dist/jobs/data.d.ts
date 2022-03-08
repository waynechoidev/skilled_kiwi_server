import { JobCategory } from 'data/post_request';
import { District, Suburb } from 'data/user';
export interface Job {
    title: string;
    district: District;
    suburb: Suburb;
    category: JobCategory;
    detail: string;
    images: string[];
    pay: number;
}
export declare function get(q?: string, district?: string, suburb?: string, category?: string): Promise<any>;
export declare function getById(id: string): Promise<any>;
export declare function create(value: Job, userId: string): Promise<any>;
export declare function update(id: string, text: string): Promise<any>;
export declare function remove(id: string): Promise<[import("mysql2/typings/mysql/lib/protocol/packets/OkPacket") | import("mysql2/typings/mysql/lib/protocol/packets/ResultSetHeader") | import("mysql2/typings/mysql/lib/protocol/packets/RowDataPacket")[] | import("mysql2/typings/mysql/lib/protocol/packets/RowDataPacket")[][] | import("mysql2/typings/mysql/lib/protocol/packets/OkPacket")[], import("mysql2/typings/mysql/lib/protocol/packets/FieldPacket")[]]>;
