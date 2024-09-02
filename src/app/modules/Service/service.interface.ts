export interface TService {
  name: string;
  description: string;
  price: number;
  duration: number;
  isDeleted: boolean;
  image?: string;
}

export interface TUpdateService {
  name?: string;
  description?: string;
  price?: number;
  duration?: number;
  isDeleted?: boolean;
  image?: string;
}
