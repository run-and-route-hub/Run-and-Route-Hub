/* eslint-disable react/require-default-props */
/* eslint-disable react/button-has-type */

'use client';

import Image from 'next/image';

export type ProfileHeaderProps = {
  name: string;
  username: string;
  bio?: string;
  avatarUrl?: string;
  // eslint-disable-next-line react/no-unused-prop-types
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
  location = 'UH Mānoa / Mōʻiliʻili',
  joinedDate = 'Nov 2025',
  onEdit,
}: ProfileHeaderProps) {
  return (
    <section
      style={{
        border: '1px solid #e0e0e0',
        borderRadius: '0.75rem',
        padding: '1.25rem',
        backgroundColor: '#ffffff',
      }}
    >
      {/* Avatar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          gap: '1.25rem',
        }}
      >
        {/* Avatar */}
        <div style={{ flexShrink: 0 }}>
          <Image
            src={avatarUrl}
            alt={`${name} avatar`}
            width={96}
            height={96}
            style={{
              width: 96,
              height: 96,
              borderRadius: '0.75rem',
              border: '1px solid #e0e0e0',
              objectFit: 'cover',
            }}
            priority
          />
        </div>

        {/* Name + button */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem',
            flex: 1,
          }}
        >
          <div>
            <h1
              style={{
                fontSize: '1.75rem',
                fontWeight: 700,
                margin: 0,
                marginBottom: '0.25rem',
              }}
            >
              {name}
            </h1>
            <p
              style={{
                fontSize: '0.9rem',
                fontWeight: 500,
                color: '#666',
                margin: 0,
              }}
            >
              @
              {username}
            </p>
          </div>

          {onEdit && (
            <div style={{ marginTop: '0.25rem' }}>
              <button
                type="button"
                onClick={onEdit}
                style={{
                  padding: '0.35rem 0.8rem',
                  borderRadius: '999px',
                  fontSize: '0.85rem',
                  cursor: 'pointer',
                  border: '1px solid #111',
                  background: '#fff',
                  fontWeight: 500,
                }}
              >
                Edit Profile
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Bio */}
      {bio && (
        <div
          style={{
            marginTop: '1rem',
            paddingTop: '1rem',
            borderTop: '1px solid #e0e0e0',
          }}
        >
          <p
            style={{
              fontSize: '0.9rem',
              lineHeight: 1.6,
              color: '#555',
              margin: 0,
            }}
          >
            {bio}
          </p>
        </div>
      )}

      {/* Meta chips */}
      <div
        style={{
          marginTop: '1rem',
          paddingTop: '1rem',
          borderTop: '1px solid #e0e0e0',
          display: 'flex',
          flexWrap: 'wrap',
          gap: '0.5rem',
          fontSize: '0.85rem',
          color: '#666',
        }}
      >
        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.35rem',
            borderRadius: '999px',
            border: '1px solid #e0e0e0',
            backgroundColor: '#f9f9f9',
            padding: '0.25rem 0.7rem',
          }}
        >
          <span aria-hidden>📍</span>
          <span>{location}</span>
        </span>
        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.35rem',
            borderRadius: '999px',
            border: '1px solid #e0e0e0',
            backgroundColor: '#f9f9f9',
            padding: '0.25rem 0.7rem',
          }}
        >
          <span aria-hidden>🗓️</span>
          <span>
            Joined
            {' '}
            {joinedDate}
          </span>
        </span>
      </div>
    </section>
  );
}
