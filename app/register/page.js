"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import FormField from "@/components/FormField";
import { authClient } from "@/lib/auth-client";
import { validateRegister } from "@/lib/validators";

export default function RegisterPage() {
  const router = useRouter();
  const [values, setValues] = useState({
    name: "",
    email: "",
    photoURL: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validateRegister(values);
    setErrors(errs);
    if (Object.keys(errs).length > 0) {
      toast.error(Object.values(errs)[0]);
      return;
    }

    setLoading(true);
    const { error } = await authClient.signUp.email({
      name: values.name.trim(),
      email: values.email,
      password: values.password,
      image: values.photoURL,
    });
    setLoading(false);

    if (error) {
      toast.error(error.message || "রেজিস্ট্রেশন ব্যর্থ হয়েছে");
      return;
    }
    toast.success("রেজিস্ট্রেশন সফল হয়েছে!");
    router.push("/");
  };

  return (
    <div className="max-w-md mx-auto px-4 py-12">
      <div className="card bg-base-100 border border-base-300 shadow-lg">
        <form onSubmit={handleSubmit} className="card-body space-y-3">
          <h1 className="text-3xl font-bold text-primary text-center">Register</h1>

          <FormField label="Name" error={errors.name}>
            <input
              name="name"
              value={values.name}
              onChange={handleChange}
              className="input w-full"
              placeholder="আপনার নাম"
            />
          </FormField>

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

          <FormField label="Photo URL" error={errors.photoURL}>
            <input
              name="photoURL"
              value={values.photoURL}
              onChange={handleChange}
              className="input w-full"
              placeholder="https://..."
            />
          </FormField>

          <FormField label="Password" error={errors.password}>
            <input
              type="password"
              name="password"
              value={values.password}
              onChange={handleChange}
              className="input w-full"
              placeholder="Aa1234"
            />
          </FormField>

          <button type="submit" disabled={loading} className="btn btn-primary w-full">
            {loading ? <span className="loading loading-spinner" /> : "Register"}
          </button>

          <p className="text-center text-sm">
            ইতিমধ্যে অ্যাকাউন্ট আছে?{" "}
            <Link href="/login" className="link link-primary">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}