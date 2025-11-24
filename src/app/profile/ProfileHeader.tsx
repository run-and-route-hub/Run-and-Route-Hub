/* eslint-disable react/require-default-props */
/* eslint-disable react/button-has-type */

'use client';

import Image from 'next/image';

export type ProfileHeaderProps = {
  name: string;
  username: string;
  bio?: string;
  avatarUrl?: string;
  bannerUrl?: string;
  location?: string;
  joinedDate?: string;
  onEdit?: () => void;
};

export default function ProfileHeader({
  name,
  username,
  bio = '',
  avatarUrl = '/profile/john.jpg',
  bannerUrl = '/banner/banner.jpeg',
  location = 'UH Mānoa / Mōʻiliʻili',
  joinedDate = 'Nov 2025',
  onEdit,
}: ProfileHeaderProps) {
  return (
    <section className="overflow-hidden rounded-3xl bg-white shadow-md ring-1 ring-black/5">
      {/* Banner */}
      <div className="relative w-full overflow-hidden rounded-t-3xl">
        <Image
          src={bannerUrl}
          alt="Profile banner"
          width={1600}
          height={400}
          className="h-44 w-full object-cover sm:h-56"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
      </div>

      <div className="relative px-5 pb-6 sm:px-8">
        <div className="-mt-14 flex flex-col gap-4 sm:-mt-16 sm:flex-row sm:items-end sm:gap-6">

          <div className="shrink-0">
            <Image
              src={avatarUrl}
              alt={`${name} avatar`}
              width={112}
              height={112}
              className="h-24 w-24 sm:h-28 sm:w-28 rounded-2xl object-cover object-center ring-4 ring-white bg-white"
              priority
            />
          </div>

          <div className="flex-1">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                  {name}
                </h1>
                <p className="text-sm font-medium text-gray-500">
                  @
                  {username}
                </p>
              </div>

              {onEdit && (
                <button
                  type="button"
                  onClick={onEdit}
                  style={{
                    padding: '0.3rem 0.7rem',
                    borderRadius: '999px',
                    fontSize: '0.85rem',
                    cursor: 'pointer',
                  }}
                >
                  Edit Profile
                </button>
              )}
            </div>

            {bio && (
              <p className="mt-3 text-sm leading-relaxed text-gray-700 sm:text-base">
                {bio}
              </p>
            )}

            <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-gray-600 sm:text-sm">
              <span className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-3 py-1">
                📍
                {' '}
                {location}
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-3 py-1">
                🗓️ Joined
                {' '}
                {joinedDate}
              </span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
