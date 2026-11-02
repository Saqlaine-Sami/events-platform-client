"use client";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import FormField from "@/components/FormField";
import { authClient } from "@/lib/auth-client";
import { isValidUrl } from "@/lib/validators";

export default function ProfilePage() {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const [values, setValues] = useState({ name: "", image: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // session এলে form-এ বর্তমান তথ্য বসাও
  useEffect(() => {
    if (user) setValues({ name: user.name || "", image: user.image || "" });
  }, [user]);

  const handleChange = (e) =>
    setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = {};
    if (values.name.trim().length < 2) errs.name = "নাম কমপক্ষে ২ অক্ষরের হতে হবে";
    if (!isValidUrl(values.image)) errs.image = "সঠিক Photo URL দিন (https://...)";
    setErrors(errs);
    if (Object.keys(errs).length > 0) {
      toast.error(Object.values(errs)[0]);
      return;
    }

    setLoading(true);
    const { error } = await authClient.updateUser({
      name: values.name.trim(),
      image: values.image,
    });
    setLoading(false);

    if (error) {
      toast.error(error.message || "প্রোফাইল আপডেট ব্যর্থ হয়েছে");
      return;
    }
    toast.success("প্রোফাইল সফলভাবে আপডেট হয়েছে!");
  };

  if (!user) return null;

  return (
    <div className="max-w-md mx-auto px-4 py-12">
      <h1 className="text-3xl md:text-4xl font-bold text-primary text-center mb-8">
        My Profile
      </h1>

      <div className="card bg-base-100 border border-base-300 shadow-lg">
        <form onSubmit={handleSubmit} className="card-body space-y-3">
          <div className="flex flex-col items-center gap-2">
            <div className="avatar">
              <div className="w-24 rounded-full">
                <img
                  src={
                    user.image ||
                    `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}`
                  }
                  alt={user.name}
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
            <p className="font-semibold text-lg">{user.name}</p>
            <p className="text-sm text-base-content/70">{user.email}</p>
          </div>

          <FormField label="Name" error={errors.name}>
            <input
              name="name"
              value={values.name}
              onChange={handleChange}
              className="input w-full"
            />
          </FormField>

          <FormField label="Profile Picture URL" error={errors.image}>
            <input
              name="image"
              value={values.image}
              onChange={handleChange}
              className="input w-full"
            />
          </FormField>

          <button type="submit" disabled={loading} className="btn btn-primary w-full">
            {loading ? <span className="loading loading-spinner" /> : "Update Profile"}
          </button>
        </form>
      </div>
    </div>
  );
}