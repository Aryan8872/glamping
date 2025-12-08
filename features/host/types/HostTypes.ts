export interface Host {
    id: number;
    fullName: string;
    email: string;
    profilePicture?: string;
    isFeatured: boolean;
    hostTagline?: string;
    yearsOfExperience?: number;
    campSite?: any[]; // Simplified
}
