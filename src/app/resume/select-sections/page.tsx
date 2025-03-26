import SectionSelection from "@/components/section-selection/SectionSelection";
  
// will go with sections selection first  because on the basis of sections seleted we will show the template

const SelectSectionsInResume = () => {
    return (
        <div className="h-full w-full px-6 pb-4" >
            <div className="h-full w-full rounded-xl px-4" >
                <SectionSelection/>
            </div>
           
        </div>
    );
};

export default SelectSectionsInResume;