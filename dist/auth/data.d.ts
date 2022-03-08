export interface User {
    username: string;
    password: string;
    email: string;
    firstName: string;
    lastName: string;
    gender: string;
    birthday: string;
    phoneNumberPrefix: string;
    phoneNumber: string;
    district: string;
    suburb: string;
}
export declare function findByUsername(username: string): Promise<any>;
export declare function findByEmail(email: string): Promise<any>;
export declare function findById(id: string): Promise<any>;
export declare function createUser(user: User): Promise<any>;
export declare function storeRefreshToken(userId: string, token: string): Promise<void>;
export declare function checkRefreshToken(userId: string, token: String): Promise<boolean>;
