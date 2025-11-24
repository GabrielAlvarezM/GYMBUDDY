'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface ContentCardProps {
  title: string;
  image: string;
  path: string;
  description: string;
}

export default function ContentCard({
  title,
  image,
  path,
  description,
}: ContentCardProps) {
  const router = useRouter();

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => router.push(path)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') router.push(path);
      }}
      className="relative w-full overflow-hidden rounded-3xl cursor-pointer group shadow-xl"
    >
      {/* Imagen */}
      <div className="relative w-full h-56 sm:h-64 md:h-72">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
        />
      </div>

      {/* Degradado oscuro encima */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-900/20 to-transparent" />

      {/* Texto encima */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 p-5 sm:p-6">
        <p className="text-xs font-semibold uppercase tracking-wide text-blue-300 mb-1">
          Sección
        </p>
        <h3 className="text-2xl sm:text-3xl font-bold text-slate-50 mb-1">
          {title}
        </h3>
        <p className="text-sm text-slate-200/90 max-w-xl">
          {description}
        </p>
      </div>
    </div>
  );
}
