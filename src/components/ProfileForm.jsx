"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ProfileForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    lastname: "",
    bio: "",
    photoUrl: "",
    instagram: "",
    facebook: "",
    linkedin: "",
    phone: "",
    email: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/create-profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        router.push(`/u/${data.id}`);
      } else {
        setError(data.error || "Error al crear el perfil");
      }
    } catch (err) {
      setError("Error de conexión. Por favor intenta nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0F16] py-12 px-4">
      <div className="max-w-2xl mx-auto bg-[#111722] rounded-2xl p-8 shadow-[0_8px_30px_rgba(0,20,40,0.6)] border border-white/5">
        <h1 className="text-4xl font-semibold mb-6 text-center text-white tracking-tight">
          Crear tu Perfil
        </h1>

        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-[#C8D3E0]/80 mb-2">
                Nombre *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-[#0A0F16] border border-white/10 rounded-xl text-[#C8D3E0] placeholder:text-[#C8D3E0]/40 focus:ring-2 focus:ring-[#2A3A4F] focus:border-[#2A3A4F] transition-all"
                placeholder="Juan"
              />
            </div>

            <div>
              <label htmlFor="lastname" className="block text-sm font-medium text-[#C8D3E0]/80 mb-2">
                Apellido *
              </label>
              <input
                type="text"
                id="lastname"
                name="lastname"
                required
                value={formData.lastname}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-[#0A0F16] border border-white/10 rounded-xl text-[#C8D3E0] placeholder:text-[#C8D3E0]/40 focus:ring-2 focus:ring-[#2A3A4F] focus:border-[#2A3A4F] transition-all"
                placeholder="Pérez"
              />
            </div>
          </div>

          <div>
            <label htmlFor="bio" className="block text-sm font-medium text-[#C8D3E0]/80 mb-2">
              Descripción corta *
            </label>
            <textarea
              id="bio"
              name="bio"
              required
              value={formData.bio}
              onChange={handleChange}
              rows={3}
              className="w-full px-4 py-3 bg-[#0A0F16] border border-white/10 rounded-xl text-[#C8D3E0] placeholder:text-[#C8D3E0]/40 focus:ring-2 focus:ring-[#2A3A4F] focus:border-[#2A3A4F] transition-all resize-none"
              placeholder="Una breve descripción sobre ti..."
            />
          </div>

          <div>
            <label htmlFor="photoUrl" className="block text-sm font-medium text-[#C8D3E0]/80 mb-2">
              Foto (URL) *
            </label>
            <input
              type="url"
              id="photoUrl"
              name="photoUrl"
              required
              value={formData.photoUrl}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-[#0A0F16] border border-white/10 rounded-xl text-[#C8D3E0] placeholder:text-[#C8D3E0]/40 focus:ring-2 focus:ring-[#2A3A4F] focus:border-[#2A3A4F] transition-all"
              placeholder="https://ejemplo.com/foto.jpg"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="instagram" className="block text-sm font-medium text-[#C8D3E0]/80 mb-2">
                Instagram
              </label>
              <input
                type="url"
                id="instagram"
                name="instagram"
                value={formData.instagram}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-[#0A0F16] border border-white/10 rounded-xl text-[#C8D3E0] placeholder:text-[#C8D3E0]/40 focus:ring-2 focus:ring-[#2A3A4F] focus:border-[#2A3A4F] transition-all"
                placeholder="https://instagram.com/usuario"
              />
            </div>

            <div>
              <label htmlFor="facebook" className="block text-sm font-medium text-[#C8D3E0]/80 mb-2">
                Facebook
              </label>
              <input
                type="url"
                id="facebook"
                name="facebook"
                value={formData.facebook}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-[#0A0F16] border border-white/10 rounded-xl text-[#C8D3E0] placeholder:text-[#C8D3E0]/40 focus:ring-2 focus:ring-[#2A3A4F] focus:border-[#2A3A4F] transition-all"
                placeholder="https://facebook.com/usuario"
              />
            </div>

            <div>
              <label htmlFor="linkedin" className="block text-sm font-medium text-[#C8D3E0]/80 mb-2">
                LinkedIn
              </label>
              <input
                type="url"
                id="linkedin"
                name="linkedin"
                value={formData.linkedin}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-[#0A0F16] border border-white/10 rounded-xl text-[#C8D3E0] placeholder:text-[#C8D3E0]/40 focus:ring-2 focus:ring-[#2A3A4F] focus:border-[#2A3A4F] transition-all"
                placeholder="https://linkedin.com/in/usuario"
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-[#C8D3E0]/80 mb-2">
                Teléfono
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-[#0A0F16] border border-white/10 rounded-xl text-[#C8D3E0] placeholder:text-[#C8D3E0]/40 focus:ring-2 focus:ring-[#2A3A4F] focus:border-[#2A3A4F] transition-all"
                placeholder="+5491123456789"
              />
            </div>

            <div className="md:col-span-2">
              <label htmlFor="email" className="block text-sm font-medium text-[#C8D3E0]/80 mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-[#0A0F16] border border-white/10 rounded-xl text-[#C8D3E0] placeholder:text-[#C8D3E0]/40 focus:ring-2 focus:ring-[#2A3A4F] focus:border-[#2A3A4F] transition-all"
                placeholder="usuario@ejemplo.com"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full px-5 py-3 rounded-xl bg-[#2A3A4F] text-white font-medium hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-[0_4px_12px_rgba(0,20,40,0.4)]"
          >
            {loading ? "Creando perfil..." : "Crear Perfil"}
          </button>
        </form>
      </div>
    </div>
  );
}

