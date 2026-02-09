

export interface ApiResponse<T> {
    data: T | null;
    success: boolean;
    message?: string;
    errors?: string | null;
    status?: number; 
    pagination?: {
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    }
}