import { useState } from "react";

function UserCard({ user }) {
    const [isOpen, setIsOpen] = useState(false);
    const fullName = `${user.firstName} ${user.lastName}`.trim();
    const displayHeight = user.height ? `${user.height} cm` : "";
    const displayWeight = user.weight ? `${user.weight} kg` : "";

    return (
        <>
            <article
                className="group flex w-72 cursor-pointer flex-col rounded-2xl border border-slate-200 bg-white px-6 py-7 shadow-sm transition hover:-translate-y-1 hover:border-slate-300 hover:shadow-md"
                onClick={() => setIsOpen(true)}
                role="button"
                tabIndex={0}
                onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                        setIsOpen(true);
                    }
                }}
                aria-label={`Open profile for ${fullName}`}
            >
                <div className="flex flex-col items-center text-center">
                    <img
                        src={user.image}
                        alt={fullName}
                        className="h-24 w-24 rounded-full object-cover ring-4 ring-white"
                    />
                    <h1 className="mt-4 text-lg font-semibold text-slate-900">
                        {fullName}
                    </h1>
                    {user.company?.title && (
                        <p className="text-sm text-slate-500">{user.company.title}</p>
                    )}
                    <p className="mt-2 text-xs text-slate-500">{user.email}</p>
                    <span className="mt-4 inline-flex items-center gap-2 rounded-full bg-slate-100 px-4 py-2 text-xs font-semibold text-slate-700">
                        View profile
                        <svg
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            className="h-4 w-4"
                            aria-hidden="true"
                        >
                            <path
                                fillRule="evenodd"
                                d="M7.21 14.77a.75.75 0 0 1 .02-1.06L10.69 10 7.23 6.29a.75.75 0 1 1 1.08-1.04l4 4.25a.75.75 0 0 1 0 1.02l-4 4.25a.75.75 0 0 1-1.06.02Z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </span>
                </div>
            </article>

            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/70 p-4">
                    <div className="relative w-full max-w-4xl rounded-3xl bg-white p-6 shadow-2xl md:p-10">
                        <button
                            type="button"
                            onClick={() => setIsOpen(false)}
                            className="absolute right-5 top-5 inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-500 transition hover:border-slate-300 hover:text-slate-700"
                            aria-label="Close profile"
                        >
                            <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
                                <path
                                    d="M6 6l12 12M18 6l-12 12"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                />
                            </svg>
                        </button>

                        <div className="grid gap-8 md:grid-cols-[260px_1fr]">
                            <div className="flex flex-col items-center text-center md:items-start md:text-left">
                                <div className="relative">
                                    <img
                                        src={user.image}
                                        alt={fullName}
                                        className="h-32 w-32 rounded-3xl object-cover"
                                    />
                                    <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-slate-900 px-3 py-1 text-xs font-semibold text-white md:left-4 md:translate-x-0">
                                        {user.role}
                                    </div>
                                </div>
                                <h2 className="mt-6 text-2xl font-semibold text-slate-900">
                                    {fullName}
                                </h2>
                                <p className="text-sm text-slate-500">{user.company?.title}</p>
                                <div className="mt-4 space-y-2 text-sm text-slate-600">
                                    <div className="flex items-center gap-2">
                                        <MailIcon />
                                        <span>{user.email}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <PhoneIcon />
                                        <span>{user.phone}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <UserIcon />
                                        <span>{user.username}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-6">
                                <div className="grid gap-4 sm:grid-cols-2">
                                    <InfoRow icon={<CalendarIcon />} label="Birth Date" value={user.birthDate} />
                                    <InfoRow icon={<CakeIcon />} label="Age" value={user.age} />
                                    <InfoRow icon={<GenderIcon />} label="Gender" value={user.gender} />
                                    <InfoRow icon={<BloodIcon />} label="Blood" value={user.bloodGroup} />
                                    <InfoRow icon={<EyeIcon />} label="Eye Color" value={user.eyeColor} />
                                    <InfoRow icon={<HairIcon />} label="Hair" value={`${user.hair?.color} ${user.hair?.type}`} />
                                    {displayHeight && <InfoRow icon={<HeightIcon />} label="Height" value={displayHeight} />}
                                    {displayWeight && <InfoRow icon={<WeightIcon />} label="Weight" value={displayWeight} />}
                                    {user.maidenName && (
                                        <InfoRow icon={<IdIcon />} label="Maiden Name" value={user.maidenName} />
                                    )}
                                    <InfoRow icon={<SchoolIcon />} label="University" value={user.university} />
                                    <InfoRow icon={<NetworkIcon />} label="IP" value={user.ip} />
                                </div>

                                <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
                                    <div className="flex items-center gap-2 text-xs font-semibold uppercase text-slate-500">
                                        <LocationIcon />
                                        Address
                                    </div>
                                    <p className="mt-2 text-sm text-slate-700">
                                        {user.address?.address}, {user.address?.city}, {user.address?.stateCode} {user.address?.postalCode}, {user.address?.country}
                                    </p>
                                </div>

                                <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
                                    <div className="flex items-center gap-2 text-xs font-semibold uppercase text-slate-500">
                                        <BriefcaseIcon />
                                        Company
                                    </div>
                                    <p className="mt-2 text-sm font-semibold text-slate-800">{user.company?.name}</p>
                                    <p className="text-sm text-slate-600">
                                        {user.company?.department} · {user.company?.title}
                                    </p>
                                    <p className="text-xs text-slate-500">
                                        {user.company?.address?.city}, {user.company?.address?.stateCode}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

function InfoRow({ icon, label, value }) {
    return (
        <div className="flex items-start gap-3 rounded-2xl border border-slate-100 bg-white p-3 shadow-sm">
            <div className="mt-0.5 text-slate-500">{icon}</div>
            <div>
                <p className="text-[11px] font-semibold uppercase text-slate-400">{label}</p>
                <p className="text-sm text-slate-700">{value || "-"}</p>
            </div>
        </div>
    );
}

function MailIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden="true">
            <path
                d="M4 6h16a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="m3 8 9 6 9-6"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}

function PhoneIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden="true">
            <path
                d="M5 4h4l1 4-3 2a12 12 0 0 0 5 5l2-3 4 1v4c0 1-1 2-2 2A14 14 0 0 1 4 7c0-1 1-3 1-3Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}

function UserIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden="true">
            <path
                d="M20 21a8 8 0 1 0-16 0"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
            />
            <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="1.5" />
        </svg>
    );
}

function CalendarIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
            <rect x="3" y="5" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="1.5" />
            <path d="M8 3v4M16 3v4M3 10h18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
    );
}

function CakeIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
            <path
                d="M4 12h16v6a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-6Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinejoin="round"
            />
            <path d="M4 12c2.5 2.5 5 0 7.5 0S16 14.5 20 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M9 4c0 1.5 1.2 2.5 3 2.5s3-1 3-2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
    );
}

function GenderIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
            <path d="M12 15a5 5 0 1 0-5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M14 4h6v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M20 4l-7 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
    );
}

function BloodIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
            <path
                d="M12 3c4 4.4 7 7.4 7 11a7 7 0 0 1-14 0c0-3.6 3-6.6 7-11Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinejoin="round"
            />
        </svg>
    );
}

function EyeIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
            <path
                d="M2 12s4-6 10-6 10 6 10 6-4 6-10 6S2 12 2 12Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinejoin="round"
            />
            <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5" />
        </svg>
    );
}

function HairIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
            <path
                d="M5 12a7 7 0 0 1 14 0v6H5v-6Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinejoin="round"
            />
            <path d="M7 12c0-2 2-4 5-4s5 2 5 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
    );
}

function HeightIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
            <path d="M6 4v16M10 6h8M10 12h6M10 18h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
    );
}

function WeightIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
            <rect x="4" y="6" width="16" height="14" rx="3" stroke="currentColor" strokeWidth="1.5" />
            <path d="M8 9h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
    );
}

function IdIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
            <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" />
            <path d="M7 10h6M7 14h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <circle cx="16" cy="11" r="2" stroke="currentColor" strokeWidth="1.5" />
        </svg>
    );
}

function SchoolIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
            <path d="M12 3 2 8l10 5 10-5-10-5Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
            <path d="M6 10v5a6 6 0 0 0 12 0v-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
    );
}

function NetworkIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
            <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5" />
            <path d="M3 12h6M15 12h6M12 3v6M12 15v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
    );
}

function LocationIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden="true">
            <path
                d="M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinejoin="round"
            />
            <circle cx="12" cy="10" r="2.5" stroke="currentColor" strokeWidth="1.5" />
        </svg>
    );
}

function BriefcaseIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden="true">
            <path d="M4 7h16a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2Z" stroke="currentColor" strokeWidth="1.5" />
            <path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M2 12h20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
    );
}

export default UserCard;