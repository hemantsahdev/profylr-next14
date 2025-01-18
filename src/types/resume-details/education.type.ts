
interface AdvancedEducation {
    institution:string,
    degree:string,
    yearOfCompletion :string,
    result?:string
}

interface BasicEducation {
    institution:string,
    specialization:string,
    yearOfCompletion :string,
    result?:string
}

export interface EducationForm {
    postGraduate?: AdvancedEducation
    undergraduate?: AdvancedEducation,
    higherSecondary?: BasicEducation ,
    secondarySchool?: Pick<BasicEducation, "institution" | "result" | "yearOfCompletion">
} 
