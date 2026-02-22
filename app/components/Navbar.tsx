"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeToggle from "./ThemeToggle";

const navLinks = [
    { name: "Home", href: "/" },
    { name: "AI/ML", href: "/aiml" },
    { name: "Developer", href: "/developer" },
    { name: "Quant", href: "/quant" },
];

const socialLinks = [
    {
        name: "GitHub",
        href: "https://github.com/ADC-1747",
        icon: (
            <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current">
                <path d="M12 .5C5.73.5.5 5.74.5 12.02c0 5.11 3.29 9.44 7.86 10.97.58.11.79-.25.79-.56v-2.02c-3.2.7-3.88-1.55-3.88-1.55-.53-1.36-1.3-1.72-1.3-1.72-1.06-.73.08-.72.08-.72 1.17.08 1.78 1.2 1.78 1.2 1.04 1.79 2.73 1.27 3.4.97.11-.75.41-1.27.75-1.56-2.55-.29-5.23-1.28-5.23-5.7 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11.1 11.1 0 0 1 5.8 0c2.2-1.49 3.17-1.18 3.17-1.18.64 1.59.24 2.76.12 3.05.74.81 1.19 1.84 1.19 3.1 0 4.43-2.69 5.4-5.25 5.68.42.36.8 1.08.8 2.18v3.24c0 .31.21.68.8.56a11.53 11.53 0 0 0 7.86-10.97C23.5 5.74 18.27.5 12 .5z" />
            </svg>
        ),
    },
    {
        name: "LinkedIn",
        href: "https://linkedin.com/in/ayush-c-86a3492a4/",
        icon: (
            <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current">
                <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.22 8.98h4.56V24H.22V8.98zM8.98 8.98h4.37v2.05h.06c.61-1.16 2.1-2.37 4.32-2.37 4.62 0 5.48 3.04 5.48 6.99V24h-4.56v-6.5c0-1.55-.03-3.55-2.17-3.55-2.17 0-2.5 1.69-2.5 3.43V24H8.98V8.98z" />
            </svg>
        ),
    },
    {
        name: "LeetCode",
        href: "https://leetcode.com/u/adc_17/",
        icon: (
            <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current">
                <path d="M13.483 0L4.418 9.065a6.03 6.03 0 000 8.528l2.99 2.99a6.03 6.03 0 008.528 0l2.2-2.2-2.12-2.12-2.2 2.2a3.03 3.03 0 01-4.285 0l-2.99-2.99a3.03 3.03 0 010-4.285l9.065-9.065L13.483 0zM17.243 5.758l-1.758 1.758 2.12 2.12 1.758-1.758-2.12-2.12z" />
            </svg>
        ),
    },
];

export default function Navbar() {
    const pathname = usePathname();

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center p-4">
            <div className="flex items-center gap-1 rounded-full border border-zinc-200 bg-white/70 px-4 py-2 backdrop-blur-md dark:border-zinc-800 dark:bg-black/70">
                <div className="flex items-center gap-1 mr-2 border-r border-zinc-200 pr-2 dark:border-zinc-800">
                    {navLinks.map((link) => {
                        const isActive = pathname === link.href;
                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${isActive
                                    ? "bg-zinc-100 text-zinc-950 dark:bg-zinc-900 dark:text-zinc-50"
                                    : "text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
                                    }`}
                            >
                                {link.name}
                            </Link>
                        );
                    })}
                </div>

                <div className="flex items-center gap-2">
                    {socialLinks.map((link) => (
                        <a
                            key={link.href}
                            href={link.href}
                            target="_blank"
                            rel="noreferrer"
                            className="text-zinc-500 hover:text-zinc-900 transition-colors dark:text-zinc-400 dark:hover:text-zinc-100"
                            title={link.name}
                        >
                            {link.icon}
                        </a>
                    ))}
                    <div className="ml-1 border-l border-zinc-200 pl-1 dark:border-zinc-800">
                        <ThemeToggle />
                    </div>
                </div>
            </div>
        </nav>
    );
}
