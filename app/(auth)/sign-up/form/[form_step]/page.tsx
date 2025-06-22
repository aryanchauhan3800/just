import FormOne from "@/components/form-components/FormOne";
import FormTwo from "@/components/form-components/FormTwo";
import FormThree from "@/components/form-components/FormThree";

export default async function SignupStepPage({
  params,
}: {
  params: Promise<{ form_step: string }>;
}) {
  const { form_step } = await params;
  const step = parseInt(form_step, 10);

  let StepFormComponent;
  switch (step) {
    case 1:
      StepFormComponent = <FormOne />;
      break;
    case 2:
      StepFormComponent = <FormTwo />;
      break;
    case 3:
      StepFormComponent = <FormThree />;
      break;
    default:
      StepFormComponent = <div>Invalid step</div>;
  }

  return <div>{StepFormComponent}</div>;
}
