import { SignUp } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import Link from "next/link";

export default function SignUpPage() {
  return (
    <div className="min-h-screen bg-gray-950 flex flex-col items-center justify-center p-4">
      <Link href="/" className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <span className="text-xl font-bold text-white">Trustie</span>
      </Link>
      <SignUp 
        appearance={{
          baseTheme: dark,
          elements: {
            card: "bg-gray-900 border border-gray-800",
            headerTitle: "text-white",
            headerSubtitle: "text-gray-400",
            socialButtonsBlockButton: "bg-gray-800 border-gray-700 text-white hover:bg-gray-700",
            socialButtonsBlockButtonText: "text-white",
            formFieldLabel: "text-gray-300",
            formFieldInput: "bg-gray-800 border-gray-700 text-white",
            formButtonPrimary: "bg-blue-500 hover:bg-blue-600 text-white",
            footerActionLink: "text-blue-500 hover:text-blue-400",
            identityPreviewText: "text-white",
            identityPreviewEditButton: "text-blue-500",
            formFieldInputShowPasswordButton: "text-gray-400",
            dividerLine: "bg-gray-700",
            dividerText: "text-gray-500",
            formFieldLabelRow: "text-gray-300",
            footer: "text-gray-400",
            footerActionText: "text-gray-400",
          }
        }}
        afterSignUpUrl="/app"
        signInUrl="/sign-in"
      />
    </div>
  );
}
