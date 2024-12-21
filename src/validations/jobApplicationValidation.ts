import * as z from "zod";

// Define the schema
const jobApplicationValidation = z.object({
    companyName: z
        .string()
        .min(1, "Company name is required")
        .max(100, "Company name cannot exceed 100 characters"),
    jobTitle: z
        .string()
        .min(1, "Job title is required")
        .max(100, "Job title cannot exceed 100 characters"),
    jobLink: z
        .string()
        .url("Job link must be a valid URL")
        .optional()
        .or(z.literal("")), // Allow empty string for optional field
    followUpDate: z
        .union([z.date(), z.null()])
        .nullable()
        .refine((date) => date === null || date instanceof Date, {
            message: "Invalid date format",
        }),
    selectedResume: z.string().min(1, "Selected resume is required"),
    importedResume: z
        .instanceof(File)
        .nullable()
        .optional(), // Allow null and undefined for this field
});

// Infer the schema type (if needed)
 type FormValues = z.infer<typeof jobApplicationValidation>;

export type {FormValues};
export {jobApplicationValidation} ;
