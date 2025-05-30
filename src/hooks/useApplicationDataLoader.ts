
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { UseFormReturn } from "react-hook-form";
import { toast } from "@/components/ui/sonner";
import { FormValues } from "@/types/forms";
import { applicationsApi } from "@/services/applicationsApi";

export const useApplicationDataLoader = (
  id: string | undefined, 
  form: UseFormReturn<FormValues>
) => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const isEditMode = !!id;

  // Reset form to defaults when switching to add mode or when route changes
  useEffect(() => {
    if (!isEditMode && location.pathname === '/add') {
      form.reset({
        company: "",
        jobTitle: "",
        jobDescription: "",
        status: "applied",
        notes: "",
        isAnonymous: false,
        dateApplied: new Date(),
        source: "LinkedIn",
        recruiter: "",
        recruitingFirm: "",
      });
    }
  }, [isEditMode, location.pathname, form]);

  useEffect(() => {
    if (isEditMode && id) {
      loadApplication();
    }
  }, [id, isEditMode]);

  const loadApplication = async () => {
    if (!id) return;
    
    setIsLoading(true);
    try {
      const application = await applicationsApi.getApplication(id);
      
      // Check if it's an anonymous application
      const isAnonymous = application.company === "Anonymous";
      
      form.reset({
        company: application.company || "",
        jobTitle: application.jobTitle || "",
        jobDescription: application.jobDescription || "",
        dateApplied: new Date(application.dateApplied),
        status: application.status,
        notes: application.notes || "",
        isAnonymous: isAnonymous,
        source: application.source || "LinkedIn",
        recruiter: application.recruiter || "",
        recruitingFirm: application.recruitingFirm || "",
      });
    } catch (error) {
      console.error("Error loading application:", error);
      toast.error("Failed to load application");
      navigate("/applications");
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, isEditMode };
};
