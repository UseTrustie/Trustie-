import { SignUp } from "@clerk/nextjs";
import { dark } from "@clerk/themes";

export default function SignUpPage() {
  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center">
      <SignUp 
        appearance={{
          baseTheme: dark,
          elements: {
            formButtonPrimary: "bg-blue-500 hover:bg-blue-600",
            footerActionLink: "text-blue-500 hover:text-blue-400",
          }
        }}
        redirectUrl="/app"
        signInUrl="/sign-in"
      />
    </div>
  );
}
