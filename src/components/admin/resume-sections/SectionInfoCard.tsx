import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface InfoCardProps {
  sectionName: string
  description: string
  categories: string[]
  departments: string[]
}

const  SectionInfoCard = ({ sectionName, description, categories, departments }: InfoCardProps)=> {
    return (
        <div className="w-full p-4 bg-gray-100  rounded-xl shadow-xl">
            <div className="space-y-2 ">
                <h4 className="font-semibold  " >{sectionName}</h4>
                <p className="text-sm text-muted-foreground">{description}</p>
                {categories.length > 0 && (
                    <div className=" flex items-center  gap-2 " >
                        <p className="text-muted-foreground text-xs" >Categories:</p> 
                        <div className="flex flex-wrap gap-2">
                            {categories.map((category) => (
                                <Badge key={category} variant={"outline"} className="bg-blue-100" >
                                    {category}
                                </Badge>
                            ))}
                        </div>
                    </div>
                )}
                <div className="" >
                    {departments.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                            <p className="text-muted-foreground text-xs" >Departments:</p> 

                            {departments.map((department) => (
                                <Badge key={department} variant={"outline"} className="bg-green-100" >
                                    {department}
                                </Badge>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SectionInfoCard;
