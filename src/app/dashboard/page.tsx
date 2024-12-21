import ProjectGrid from "@/components/dashboard/ProjectGrid";
import ProjectGridHeader from "@/components/dashboard/ProjectGridHeader";
import StatsPannel from "@/components/dashboard/StatsPannel";
import UpcomingEvents from "@/components/dashboard/UpcomingEvents";
import React from "react";


const Dashboard = () => {
    return (
        <div className="h-full w-full flex px-8" >

            <div className="h-full w-[90%] pt-2 pr-2 pb-4 ">
                <div className="h-full w-full bg-white rounded-[2rem]" >
                    <div className="w-full h-[10%] rounded-t-[2rem] "  >
                        <ProjectGridHeader />
                    </div>
                    <div className="w-full h-[90%] rounded-b-[2rem] px-3 py-2" >
                        <ProjectGrid />
                    </div>
                      
                </div>
            </div>
          
            <div className="h-full w-[20%]  flex flex-col justify-between pt-2 pb-4  pl-2 " >
                <div className="h-[54%] w-full bg-white rounded-[2rem] ">
                    <StatsPannel />
                </div>
                <div className="h-[44%] w-full bg-white rounded-[2rem] " >
                    <UpcomingEvents/>
                </div>
            </div>
           
        </div>
    );
};

export default Dashboard;