
import { Form } from "@/components/ui/form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import ApplicationFormHeader from "@/components/application/ApplicationFormHeader";
import ApplicationFormFields from "@/components/application/ApplicationFormFields";
import FormActions from "@/components/application/FormActions";
import { useApplicationForm } from "@/hooks/useApplicationForm";

const ApplicationForm = () => {
  const { 
    form, 
    isSubmitting, 
    isLoading, 
    isEditMode, 
    onSubmit,
    previousEntries,
    showRecruiterFields
  } = useApplicationForm();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-lg text-muted-foreground">Loading...</p>
      </div>
    );
  }

  return (
    <div>
      <ApplicationFormHeader isEditMode={isEditMode} />
      
      <Card>
        <CardHeader>
          <CardTitle>Job Details</CardTitle>
          <CardDescription>
            {isEditMode 
              ? "Update the details of your job application" 
              : "Enter the details of the job you applied for"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <ApplicationFormFields 
                form={form} 
                previousEntries={previousEntries}
                showRecruiterFields={showRecruiterFields}
              />
              <FormActions isSubmitting={isSubmitting} isEditMode={isEditMode} />
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ApplicationForm;
