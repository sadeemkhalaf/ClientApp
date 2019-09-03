export interface Candidate {
        id?: number;
        Name: string;
        PhoneNumber: string;
        Email: string;
        CareerLevel: string;
        CurrentPosition: string;
        Degree: string;
        Devexperience: number;
        TeamLeaderExperience?: number;
        EnglishSkills: string;
        ExamScore?: number;
        ExpectedSalary: number;
        GPA1: number;
        GPA2: number;
        Howdidyoufindus: string;
        Major: string;
        Nationality: string;
        OtherUniversity: string;
        Status?: string;
        Technologies?: string;
        ToCallDate?: string;
        InterviewDate?: string;
        University: string;
        JoinDate: string;
        LastUdateLog?: string;
        CvAttachment?: string;
        Notes?: string;
        Title?: string;
        ApplicationDate?: string;
}

export interface CandidatesStatusHistory {
        id: number;
        ApplicantId: number;
        Status: string;
        UpdateDate: Date;
}
