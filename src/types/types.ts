// Define your types and interfaces here
export interface IdentificationResult {
    confidence_score: number;
    detected_objects: string[];
    labels: string[];
    possible_part_numbers: string[];
}

export interface ApiResponse {
    success: boolean;
    filename: string;
    file_size: number;
    results: {
        labels: string[];
        detected_objects: any[];
        possible_part_numbers: string[];
    };
    record_id: number;
    matching_products: ShopifyProduct[]; // Changed this to array of ShopifyProduct
}

export interface ShopifyProduct {
    id: string;
    title: string;
    description: string;
    price: string;
    sku: string;
    image_url?: string;
    inventory_quantity: number;
    available: boolean;
    confidence?: number;
    relevance_score?: number;
    body_html?: string; // Added this as it's used in the backend
    tags?: string[]; // Added this as it's used in the backend
    variants?: Array<{
        sku: string;
        id: string;
      }>;
    vendor?: string;
    product_type?: string;
    handle?: string;
    variants_count?: number;
    variant_id?: string;
    exact_sku_match?: boolean;
    confidence_score?: number;
}

// Add any additional types you might need
export interface ErrorState {
    message: string;
    code?: number;
}

export interface PartMatch {
    partNumber: string;
    name: string;
    price: number;
    availability: boolean;
    imageUrl?: string;
}