export interface Candidate {
        id?: number;
        name: string;
        phoneNumber: string;
        email: string;
        careerLevel: string;
        currentPosition: string;
        degree: string;
        devexperience: number;
        teamLeaderExperience?: number;
        englishSkills: string;
        examScore?: number;
        expectedSalary: number;
        gpA1: number;
        gpA2: number;
        howdidyoufindus: string;
        major: string;
        nationality: string;
        otherUniversity: string;
        status?: string;
        technologies?: string;
        toCallDate?: string;
        interviewDate?: string;
        university: string;
        joinDate: string;
        lastUdateLog?: string;
        cvAttachment?: string;
        notes?: string;
        title?: string;
        applicationDate?: string;
}

export interface CandidatesStatusHistory {
        id: number;
        ApplicantId: number;
        Status: string;
        UpdateDate: Date;
}
