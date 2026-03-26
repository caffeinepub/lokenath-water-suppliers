import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useActor } from "@/hooks/useActor";
import { useInternetIdentity } from "@/hooks/useInternetIdentity";
import { ArrowLeft, Droplets, Loader2 } from "lucide-react";
import { motion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";

interface Props {
  onBack: () => void;
  onSwitchToSignup: () => void;
  onLoginSuccess: (name: string) => void;
}

export function LoginPage({ onBack, onSwitchToSignup, onLoginSuccess }: Props) {
  const { login, isLoggingIn, isLoginError, loginError, identity } =
    useInternetIdentity();
  const { actor, isFetching } = useActor();
  const [fetching, setFetching] = useState(false);
  const fetchedRef = useRef(false);

  const handleLoginSuccess = useCallback(
    (name: string) => onLoginSuccess(name),
    [onLoginSuccess],
  );

  useEffect(() => {
    if (!identity || !actor || isFetching || fetchedRef.current) return;
    fetchedRef.current = true;
    setFetching(true);
    actor
      .getCallerUserProfile()
      .then((profile) => {
        const name =
          profile && typeof profile === "object" && "name" in profile
            ? (profile as { name: string }).name
            : "User";
        handleLoginSuccess(name);
      })
      .catch(() => {
        handleLoginSuccess("User");
      })
      .finally(() => setFetching(false));
  }, [identity, actor, isFetching, handleLoginSuccess]);

  const isLoading = isLoggingIn || fetching;

  return (
    <div className="min-h-screen bg-[#E7F1FA] flex flex-col">
      {/* Top bar */}
      <div className="w-full bg-[#153F61] text-white py-2">
        <div className="max-w-6xl mx-auto px-4 text-sm text-center">
          M/s Lokenath Water Suppliers — Wholesale Water &amp; Beverages ·
          Kolkata
        </div>
      </div>

      {/* Back button */}
      <div className="max-w-md mx-auto w-full px-4 pt-6">
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-1.5 text-[#1F5E8C] text-sm font-medium hover:text-[#153F61] transition-colors"
          data-ocid="login.link"
        >
          <ArrowLeft size={16} />
          Back to site
        </button>
      </div>

      {/* Card */}
      <div className="flex-1 flex items-start justify-center px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="w-full max-w-md"
        >
          <Card className="shadow-lg border-0">
            <CardHeader className="pb-2 text-center">
              <div className="w-12 h-12 rounded-full bg-[#1F5E8C] flex items-center justify-center mx-auto mb-3">
                <Droplets size={24} className="text-white" />
              </div>
              <CardTitle className="text-2xl font-bold text-[#1F5E8C]">
                Sign In
              </CardTitle>
              <p className="text-sm text-gray-500 mt-1">
                Welcome back to Lokenath Water Suppliers
              </p>
            </CardHeader>

            <CardContent className="pt-6 pb-6">
              <div className="text-center space-y-6">
                <div className="bg-[#E7F1FA] rounded-xl p-5 text-sm text-gray-600 leading-relaxed">
                  <p className="font-medium text-gray-700 mb-1">Secure Login</p>
                  Sign in securely using Internet Identity — a
                  privacy-preserving authentication system. No passwords needed.
                </div>

                {isLoginError && (
                  <p
                    className="text-sm text-red-600"
                    data-ocid="login.error_state"
                  >
                    {loginError?.message ?? "Login failed. Please try again."}
                  </p>
                )}

                <Button
                  onClick={login}
                  disabled={isLoading}
                  className="w-full bg-[#1F5E8C] hover:bg-[#153F61] text-white rounded-full py-6 text-base font-semibold"
                  data-ocid="login.primary_button"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Signing in…
                    </>
                  ) : (
                    "Sign In with Internet Identity"
                  )}
                </Button>

                <p className="text-sm text-gray-500">
                  New customer?{" "}
                  <button
                    type="button"
                    onClick={onSwitchToSignup}
                    className="text-[#1F5E8C] font-medium hover:underline"
                    data-ocid="login.link"
                  >
                    Create Account
                  </button>
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
