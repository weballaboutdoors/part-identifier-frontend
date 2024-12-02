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
    results: IdentificationResult;
    record_id: number;
    predictions?: {
      confidence: number;
      label: string;
    }[];
    error?: string;
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