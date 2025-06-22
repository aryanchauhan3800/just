import FormWrapper from '@/components/auth-components/FormWrapper'

export default function FormLayout({ children }: { children: React.ReactNode }) {
  return (
    <FormWrapper>
      {children}
    </FormWrapper>
  );
}