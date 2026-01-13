import { useState, ChangeEvent, FormEvent } from "react";
import { toast } from "react-toastify";

export interface ContactFormState {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    subject: string;
    message: string;
}

const initialState: ContactFormState = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
};

export function useContactForm() {
    const [formData, setFormData] = useState<ContactFormState>(initialState);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate API call
        try {
            await new Promise((resolve) => setTimeout(resolve, 1000));
            toast.success("Message sent successfully!");
            setFormData(initialState);
        } catch (error) {
            toast.error("Failed to send message.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return {
        formData,
        handleChange,
        handleSubmit,
        isSubmitting,
    };
}
