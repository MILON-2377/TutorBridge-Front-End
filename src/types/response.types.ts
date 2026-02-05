

export interface ApiResponse<T> {
    data: T | null;
    success: boolean;
    message?: string;
    errors?: string | null;
    status?: number; 
}