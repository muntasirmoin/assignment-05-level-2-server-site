export interface TService {
  name: string;
  description: string;
  price: number;
  duration: number;
  isDeleted: boolean;
}

export interface TUpdateService {
  name?: string;
  description?: string;
  price?: number;
  duration?: number;
  isDeleted?: boolean;
}
