export interface ProductOptionResponse {
  option_id: number;
  description: string;
  price: number;
}

export interface ProductResponse {
  id: number;
  name: string;
  image_url?: string;
  category: string;
  description?: string;
  price: number;
  note?: string;
  options?: ProductOptionResponse[];
}
