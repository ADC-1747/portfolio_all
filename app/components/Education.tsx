import React from "react";

const Education = () => {
    const educationData = [
        {
            degree: "B.S. in Data Science",
            institution: "IIT Madras",
            duration: "2021 — Present",
        },
        {
            degree: "B.Tech in Electronics and Telecommunication Engineering",
            institution: "Government College of Engineering, Nagpur",
            duration: "2020 — 2024",
        },
    ];

    return (
        <div className="space-y-4">
            <h2 className="text-sm font-medium tracking-wide text-zinc-500 dark:text-zinc-400 uppercase">
                Education
            </h2>
            <div className="grid gap-4">
                {educationData.map((edu, index) => (
                    <div
                        key={index}
                        className="rounded-2xl border border-zinc-200 bg-zinc-50 p-5 dark:border-zinc-800 dark:bg-zinc-900"
                    >
                        <h3 className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                            {edu.degree}
                        </h3>
                        <p className="text-xs text-zinc-500">
                            {edu.institution} · {edu.duration}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Education;
