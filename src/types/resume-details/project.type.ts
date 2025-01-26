
export interface ProjectForm {
    title: string,
    description: string[],
    technologies: string[],
    role: string,
    achievements: string[],
    duration: {
        from: Date ,
        to: Date 
    },
    link: {
        type: string,
        value: string
    }[]
}