"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { FaGithub } from "react-icons/fa6";
import FormField from "@/components/FormField";
import { authClient } from "@/lib/auth-client";
import { validateLogin } from "@/lib/validators";

export default function LoginPage() {
  const router = useRouter();
  const [values, setValues] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validateLogin(values);
    setErrors(errs);
    if (Object.keys(errs).length > 0) {
      toast.error(Object.values(errs)[0]);
      return;
    }

    setLoading(true);
    const { error } = await authClient.signIn.email({
      email: values.email,
      password: values.password,
    });
    setLoading(false);

    if (error) {
      toast.error(error.message || "ইমেইল বা পাসওয়ার্ড সঠিক নয়");
      return;
    }
    toast.success("লগইন সফল হয়েছে!");
    router.push("/");
  };

  const handleGithub = async () => {
    // GitHub থেকে ফিরে আসার পর Navbar এই flag দেখে success toast দেখাবে
    sessionStorage.setItem("justLoggedIn", "1");
    await authClient.signIn.social({ provider: "github", callbackURL: "/" });
  };

  return (
    <div className="max-w-md mx-auto px-4 py-12">
      <div className="card bg-base-100 border border-base-300 shadow-lg">
        <form onSubmit={handleSubmit} className="card-body space-y-3">
          <h1 className="text-3xl font-bold text-primary text-center">Login</h1>

          <FormField label="Email" error={errors.email}>
            <input
              type="email"
              name="email"
              value={values.email}
              onChange={handleChange}
              className="input w-full"
              placeholder="you@example.com"
            />
          </FormField>

          <FormField label="Password" error={errors.password}>
            <input
              type="password"
              name="password"
              value={values.password}
              onChange={handleChange}
              className="input w-full"
              placeholder="••••••"
            />
          </FormField>

          <button type="submit" disabled={loading} className="btn btn-primary w-full">
            {loading ? <span className="loading loading-spinner" /> : "Login"}
          </button>

          <div className="divider">OR</div>

          <button type="button" onClick={handleGithub} className="btn btn-primary w-full">
            <FaGithub /> Continue with GitHub
          </button>

          <p className="text-center text-sm">
            নতুন ইউজার?{" "}
            <Link href="/register" className="link link-primary">
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}