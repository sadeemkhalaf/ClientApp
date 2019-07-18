export interface EducationDetails {
    id?: number;
    applicantId: number;
    university: string;
    major: string;
    degree: string;
    startYear: string;
    graduationYear?: string;
    graduated: boolean;
}
