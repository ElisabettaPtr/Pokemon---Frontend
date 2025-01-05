export interface IUser {
    idUser: number;
    firstName: string;
    lastName: string;
    dateOfBirth: string; // LocalDate formato "yyyy-MM-dd"
    username: string;
    email: string;
    password: string;
    isActive: boolean;
    createdAt: string; // LocalDateTime formato "yyyy-MM-dd HH:mm:ss.SSSSS"
}