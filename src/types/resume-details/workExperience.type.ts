
export interface WorkExperienceForm{
    title:string,
    companyName: string,
    employmentDates : {
        from: Date | string,
        to : Date | string,
    },
    location?: string,
    responsibilities : string[],
    achievements : string[],
} 