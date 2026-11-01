"use client";
import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { FaHandHoldingHeart } from "react-icons/fa6";
import { authClient } from "@/lib/auth-client";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
    const router = useRouter();
    const { data: session, isPending } = authClient.useSession();
    const user = session?.user;

    // GitHub login থেকে ফিরে এলে success toast দেখাবে
    useEffect(() => {
        if (user && sessionStorage.getItem("justLoggedIn")) {
            sessionStorage.removeItem("justLoggedIn");
            toast.success("লগইন সফল হয়েছে!");
        }
    }, [user]);

    const handleLogout = async () => {
        await authClient.signOut();
        toast.success("লগআউট সফল হয়েছে");
        router.push("/");
    };

    const avatar =
        user?.image ||
        `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || "User")}`;

    return (
        <div className="bg-base-100 shadow-sm sticky top-0 z-50">
            <div className="navbar max-w-7xl mx-auto px-4">
                <div className="navbar-start">
                    <Link
                        href="/"
                        className="flex items-center gap-2 text-xl md:text-2xl font-bold text-primary"
                    >
                        <FaHandHoldingHeart />
                        HelpingHands BD
                    </Link>
                </div>

                <div className="navbar-center">
                    <Link href="/events" className="btn btn-ghost">
                        Upcoming Events
                    </Link>
                </div>

                <div className="navbar-end gap-2">
                    <ThemeToggle />

                    {isPending ? (
                        <div className="skeleton h-10 w-10 rounded-full" />
                    ) : user ? (
                        <>
                            {/* Hover করলে display name দেখাবে */}
                            <div className="dropdown dropdown-end">
                                <div className="tooltip tooltip-bottom" data-tip={user.name}>
                                    <div
                                        tabIndex={0}
                                        role="button"
                                        className="btn btn-ghost btn-circle avatar"
                                    >
                                        <div className="w-10 rounded-full">
                                            <img
                                                src={avatar}
                                                alt={user.name}
                                                referrerPolicy="no-referrer"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <ul
                                    tabIndex={0}
                                    onClick={() => document.activeElement?.blur()}
                                    className="dropdown-content menu bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow border border-base-300"
                                >
                                    <li><Link href="/create-event">Create Event</Link></li>
                                    <li><Link href="/manage-events">Manage Events</Link></li>
                                    <li><Link href="/joined-events">Joined Events</Link></li>
                                    <li><Link href="/profile">My Profile</Link></li>
                                </ul>
                            </div>
                            <button onClick={handleLogout} className="btn btn-primary btn-sm">
                                Logout
                            </button>
                        </>
                    ) : (
                        <Link href="/login" className="btn btn-primary btn-sm">
                            Login
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
}