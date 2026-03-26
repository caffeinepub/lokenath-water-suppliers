import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useActor } from "@/hooks/useActor";
import { useInternetIdentity } from "@/hooks/useInternetIdentity";
import { ArrowLeft, Droplets, Loader2 } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

interface Props {
  onBack: () => void;
  onSwitchToLogin: () => void;
}

export function SignupPage({ onBack, onSwitchToLogin }: Props) {
  const { login, isLoggingIn, identity } = useInternetIdentity();
  const { actor } = useActor();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const [done, setDone] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError("");
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name.trim()) {
      setError("Full name is required.");
      return;
    }
    if (!form.email.trim()) {
      setError("Email is required.");
      return;
    }
    if (!form.phone.trim()) {
      setError("Phone number is required.");
      return;
    }
    if (form.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (!identity) {
      // First authenticate, then save profile after identity arrives
      login();
      return;
    }

    if (!actor) {
      setError("Backend not ready. Please try again.");
      return;
    }
    setSaving(true);
    try {
      await actor.saveCallerUserProfile({
        name: form.name,
        email: form.email,
        phone: form.phone,
      });
      setDone(true);
      setTimeout(() => onBack(), 1500);
    } catch {
      setError("Failed to save profile. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  const isLoading = isLoggingIn || saving;

  return (
    <div className="min-h-screen bg-[#E7F1FA] flex flex-col">
      {/* Top bar */}
      <div className="w-full bg-[#153F61] text-white py-2">
        <div className="max-w-6xl mx-auto px-4 text-sm text-center">
          M/s Lokenath Water Suppliers — Wholesale Water & Beverages · Kolkata
        </div>
      </div>

      {/* Back button */}
      <div className="max-w-md mx-auto w-full px-4 pt-6">
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-1.5 text-[#1F5E8C] text-sm font-medium hover:text-[#153F61] transition-colors"
          data-ocid="signup.link"
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
                Create Account
              </CardTitle>
              <p className="text-sm text-gray-500 mt-1">
                Join M/s Lokenath Water Suppliers
              </p>
            </CardHeader>

            <CardContent className="pt-4">
              {done ? (
                <div
                  className="text-center py-8"
                  data-ocid="signup.success_state"
                >
                  <div className="text-green-600 text-4xl mb-3">✓</div>
                  <p className="font-semibold text-gray-700">
                    Account created successfully!
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    Redirecting you back…
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="Enter your full name"
                      value={form.name}
                      onChange={handleChange}
                      data-ocid="signup.input"
                      className="border-gray-300 focus:border-[#1F5E8C] focus:ring-[#1F5E8C]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="you@example.com"
                      value={form.email}
                      onChange={handleChange}
                      data-ocid="signup.input"
                      className="border-gray-300 focus:border-[#1F5E8C] focus:ring-[#1F5E8C]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="10-digit mobile number"
                      value={form.phone}
                      onChange={handleChange}
                      data-ocid="signup.input"
                      className="border-gray-300 focus:border-[#1F5E8C] focus:ring-[#1F5E8C]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      placeholder="Minimum 6 characters"
                      value={form.password}
                      onChange={handleChange}
                      data-ocid="signup.input"
                      className="border-gray-300 focus:border-[#1F5E8C] focus:ring-[#1F5E8C]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      placeholder="Re-enter your password"
                      value={form.confirmPassword}
                      onChange={handleChange}
                      data-ocid="signup.input"
                      className="border-gray-300 focus:border-[#1F5E8C] focus:ring-[#1F5E8C]"
                    />
                  </div>

                  {error && (
                    <p
                      className="text-sm text-red-600 font-medium"
                      data-ocid="signup.error_state"
                    >
                      {error}
                    </p>
                  )}

                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-[#1F5E8C] hover:bg-[#153F61] text-white rounded-full mt-2"
                    data-ocid="signup.submit_button"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        {identity ? "Saving..." : "Authenticating..."}
                      </>
                    ) : identity ? (
                      "Create Account"
                    ) : (
                      "Continue with Internet Identity"
                    )}
                  </Button>

                  <p className="text-center text-sm text-gray-500 pt-1">
                    Already have an account?{" "}
                    <button
                      type="button"
                      onClick={onSwitchToLogin}
                      className="text-[#1F5E8C] font-medium hover:underline"
                      data-ocid="signup.link"
                    >
                      Sign In
                    </button>
                  </p>
                </form>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
