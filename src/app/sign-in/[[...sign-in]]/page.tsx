import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center">
      <SignIn 
        appearance={{
          elements: {
            rootBox: "mx-auto",
            card: "bg-gray-900 border border-gray-800",
            headerTitle: "text-white",
            headerSubtitle: "text-gray-400",
            socialButtonsBlockButton: "bg-gray-800 border-gray-700 text-white hover:bg-gray-700",
            formFieldLabel: "text-gray-300",
            formFieldInput: "bg-gray-800 border-gray-700 text-white",
            footerActionLink: "text-blue-500 hover:text-blue-400",
            formButtonPrimary: "bg-blue-500 hover:bg-blue-600",
          }
        }}
        redirectUrl="/app"
        signUpUrl="/sign-up"
      />
    </div>
  );
}
