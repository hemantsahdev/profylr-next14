
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { CheckCircle2, Circle } from "lucide-react";

const possibleStatuses = [
    "Applied",
    "In Progress",
    "Interview Scheduled",
    "Offer Received",
    "Rejected",
    "Accepted"
];

interface StatusTrajectoryProps {
    statuses: {
      status: string
      date: string
    }[]
  }

const StatusTrajectory = ({statuses}:StatusTrajectoryProps) => {
    return (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="relative w-full"
        >
          <h2 className="text-2xl font-semibold mb-6">Status Trajectory</h2>
          <div className="w-[51rem] p-2 flex flex-nowrap overflow-x-auto custom-scrollbar  ">
            {statuses.map((status, index) => (
              <motion.div
                key={status.status}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className=" flex-shrink-0 w-52 mr-4 last:mr-0 relative"
              >
                <Card className={`h-full bg-gray-50 ${index === statuses.length - 1 ? 'bg-primary text-primary-foreground' : ''}`}>
                  <CardContent className="h-full p-4 flex flex-col items-start justify-start gap-2">
                    <div className="w-full flex items-center justify-start  ">
                        <div className="w-[20%]" >
                            <CheckCircle2 className="w-6 h-6 " />
                        </div>
                      <h3 className="font-semibold">{status.status}</h3>
                    </div>
                    <p className="text-sm text-muted-foreground text-center">{status.date}</p>
                  </CardContent>
                </Card>
                {index < statuses.length - 1 && (
                  <motion.div
                    className="absolute top-1/2 -right-2 w-4 h-0.5 bg-primary"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
                  />
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      )
};

export default StatusTrajectory;