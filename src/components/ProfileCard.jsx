"use client";

import {
  EnvelopeIcon,
  PhoneIcon,
  LinkIcon,
} from "@heroicons/react/24/outline";

export default function ProfileCard({ profile }) {
  if (!profile) return null;

  return (
    <div className="bg-[#111722] rounded-2xl p-8 shadow-[0_8px_30px_rgba(0,20,40,0.6)] border border-white/5">
      {/* Foto y nombre */}
      <div className="text-center mb-8">
        <img
          src={profile.photoUrl}
          alt={`${profile.name} ${profile.lastname}`}
          className="w-32 h-32 rounded-full mx-auto mb-6 object-cover border-4 border-white/10 shadow-[0_4px_12px_rgba(0,20,40,0.4)]"
        />
        <h1 className="text-4xl font-semibold text-white mb-3 tracking-tight">
          {profile.name} {profile.lastname}
        </h1>
        {profile.bio && (
          <p className="text-lg text-[#C8D3E0]/80 max-w-xl mx-auto">{profile.bio}</p>
        )}
      </div>

      {/* Redes sociales */}
      {(profile.instagram || profile.facebook || profile.linkedin) && (
        <div className="mb-8">
          <h2 className="text-sm font-semibold text-[#C8D3E0]/60 mb-4 uppercase tracking-wide">
            Redes Sociales
          </h2>
          <div className="flex flex-wrap gap-3">
            {profile.instagram && (
              <a
                href={profile.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 bg-[#2A3A4F] hover:brightness-110 rounded-xl text-white transition-all shadow-[0_4px_12px_rgba(0,20,40,0.4)]"
              >
                <LinkIcon className="w-5 h-5" />
                Instagram
              </a>
            )}
            {profile.facebook && (
              <a
                href={profile.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 bg-[#2A3A4F] hover:brightness-110 rounded-xl text-white transition-all shadow-[0_4px_12px_rgba(0,20,40,0.4)]"
              >
                <LinkIcon className="w-5 h-5" />
                Facebook
              </a>
            )}
            {profile.linkedin && (
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 bg-[#2A3A4F] hover:brightness-110 rounded-xl text-white transition-all shadow-[0_4px_12px_rgba(0,20,40,0.4)]"
              >
                <LinkIcon className="w-5 h-5" />
                LinkedIn
              </a>
            )}
          </div>
        </div>
      )}

      {/* Contacto */}
      {(profile.phone || profile.email) && (
        <div>
          <h2 className="text-sm font-semibold text-[#C8D3E0]/60 mb-4 uppercase tracking-wide">
            Contacto
          </h2>
          <div className="space-y-3">
            {profile.phone && (
              <a
                href={`tel:${profile.phone}`}
                className="flex items-center gap-3 text-[#C8D3E0] hover:text-white transition-colors"
              >
                <PhoneIcon className="w-5 h-5" />
                <span>{profile.phone}</span>
              </a>
            )}
            {profile.email && (
              <a
                href={`mailto:${profile.email}`}
                className="flex items-center gap-3 text-[#C8D3E0] hover:text-white transition-colors"
              >
                <EnvelopeIcon className="w-5 h-5" />
                <span>{profile.email}</span>
              </a>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

