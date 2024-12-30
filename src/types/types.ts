// types.ts

export interface IdentificationResult {
    confidence_score: number;
    detected_objects: string[];
    labels: string[];
    possible_part_numbers: string[];
    image?: string;
    matches?: Array<{
        product: ShopifyProduct;
        score: number;
        match_type: string;
    }>;
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
    matching_products: ShopifyProduct[];
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
    body_html?: string;
    tags?: string[];
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

export interface Subcategories {
    style?: string[];
    type?: string[];
    operation?: string[];
    location?: string[];
}

export interface Category {
    label: string;
    subcategories: Subcategories;
    commonSkus?: {
        [key: string]: string[];
    };
}

export interface FormState {
    sku: string;
    productType: string;
    subType: string;
    style: string;
    operation: string;
    location: string;
    color: string;
    brand: string;
    finish: string;
}

export interface FinishOption {
    value: string;
    label: string;
}

export interface LocationOption {
    value: string;
    label: string;
}

export type PartCategoriesType = Record<string, Category>;

export interface SearchFilters {
    sku?: string;
    color?: string;
    brand?: string;
    productType?: string;
    subType?: string;
    style?: string;
    operation?: string;
    location?: string;
}

export interface NoResultsCardProps {
    searchQuery?: string;
  }
  
  export interface ResultDisplayProps {
    identificationResult: {
      matches?: any[];
      searchQuery?: string;
      image?: string;
    };
    onRetry: () => void;
    filters: {
      searchQuery?: string;
      [key: string]: any;
    };
  }