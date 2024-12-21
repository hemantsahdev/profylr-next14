
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";

interface NotesProps {
    notes: string
  }

const NotesSection = ({ notes }: NotesProps) => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
        >
            <h2 className="text-2xl font-semibold mb-4">Notes</h2>
            <motion.div
                initial={{ rotateX: 90 }}
                animate={{ rotateX: 0 }}
                transition={{ duration: 0.5, delay: 1 }}
            >
                <Card className="bg-yellow-50 dark:bg-yellow-900/20 shadow-md transform rotate-1">
                    <CardContent className="p-6">
                        <div className="font-handwriting text-lg whitespace-pre-wrap">{notes}</div>
                    </CardContent>
                </Card>
            </motion.div>
        </motion.div>
    );
};

export default NotesSection;