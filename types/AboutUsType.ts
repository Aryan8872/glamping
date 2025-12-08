import { z } from "zod";

export const CoreValueSchema = z.object({
    id: z.number().optional(),
    title: z.string(),
    description: z.string(),
    icon: z.string().optional(),
});

export const StatSchema = z.object({
    id: z.number().optional(),
    heading: z.string(),
    value: z.string(),
    icon: z.string().optional(),
});

export const AboutUsSchema = z.object({
    id: z.number().optional(),
    aboutUs: z.string(),
    textbox_1: z.string().optional(),
    textbox_2: z.string().optional(),
    mission: z.string(),
    vision: z.string(),
    stats: z.array(StatSchema),
    coreValues: z.array(CoreValueSchema),
});

export type CoreValue = z.infer<typeof CoreValueSchema>;
export type Stat = z.infer<typeof StatSchema>;
export type AboutUs = z.infer<typeof AboutUsSchema>;

export const ABOUT_US_TAG = "aboutus";
