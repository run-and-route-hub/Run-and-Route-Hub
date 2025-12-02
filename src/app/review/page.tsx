/* eslint-disable no-alert */
/* eslint-disable no-nested-ternary */

'use client';

import React, { useState } from 'react';

type RouteInfo = {
  id: number;
  name: string;
  distanceMile: number;
  distanceKm: number;
};

type UserInfo = {
  name: string;
  username: string;
  experienceLevel: 'Beginner' | 'Intermediate' | 'Advanced';
  avatarUrl?: string;
};

// Mock routes data
const MOCK_ROUTES: RouteInfo[] = [
  { id: 1, name: 'Manoa Valley Loop', distanceMile: 3.2, distanceKm: 5.15 },
  { id: 2, name: 'Diamond Head Trail', distanceMile: 1.6, distanceKm: 2.57 },
  { id: 3, name: 'Tantalus Drive', distanceMile: 5.4, distanceKm: 8.69 },
  { id: 4, name: 'Ala Moana Beach Path', distanceMile: 2.1, distanceKm: 3.38 },
  { id: 5, name: 'Kapiolani Park Loop', distanceMile: 2.8, distanceKm: 4.51 },
  { id: 6, name: 'Makiki Heights Trail', distanceMile: 4.3, distanceKm: 6.92 },
  { id: 7, name: 'Waikiki to Kahala', distanceMile: 6.2, distanceKm: 9.98 },
  { id: 8, name: 'Lyon Arboretum Path', distanceMile: 1.9, distanceKm: 3.06 },
  { id: 9, name: 'Round Top Drive', distanceMile: 7.1, distanceKm: 11.43 },
  { id: 10, name: 'UH Campus Circuit', distanceMile: 2.5, distanceKm: 4.02 },
];

// Star Rating Component
function StarRating({
  rating,
  setRating,
  label,
}: {
  rating: number;
  setRating: (rating: number) => void;
  label: string;
}) {
  const [hoverRating, setHoverRating] = useState(0);

  return (
    <div style={{ marginBottom: '1.5rem' }}>
      <label
        style={{
          display: 'block',
          fontSize: '0.9rem',
          fontWeight: 500,
          marginBottom: '0.5rem',
          color: '#555',
        }}
      >
        {label}
      </label>
      <div style={{ display: 'flex', gap: '0.25rem', alignItems: 'center' }}>
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => setRating(star)}
            onMouseEnter={() => setHoverRating(star)}
            onMouseLeave={() => setHoverRating(0)}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontSize: '2rem',
              padding: 0,
              color:
                star <= (hoverRating || rating) ? '#fbbf24' : '#d1d5db',
              transition: 'color 0.2s',
            }}
          >
            ★
          </button>
        ))}
        <span
          style={{
            marginLeft: '0.75rem',
            fontSize: '0.9rem',
            color: '#666',
            fontWeight: 500,
          }}
        >
          {rating > 0 ? `${rating}.0` : 'Not rated'}
        </span>
      </div>
    </div>
  );
}

// Route Selection Component
function RouteSelector({
  onSelectRoute,
}: {
  onSelectRoute: (route: RouteInfo) => void;
}) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredRoutes = MOCK_ROUTES.filter(
    (route) =>
      route.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      route.id.toString().includes(searchQuery)
  );

  return (
    <div>
      {/* Search Bar */}
      <div style={{ marginBottom: '1rem' }}>
        <label
          htmlFor="routeSearch"
          style={{
            display: 'block',
            fontSize: '0.9rem',
            fontWeight: 500,
            marginBottom: '0.5rem',
            color: '#555',
          }}
        >
          Search by route name or ID
        </label>
        <input
          id="routeSearch"
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="e.g., Manoa Valley or 1"
          style={{
            width: '100%',
            padding: '0.6rem 0.75rem',
            border: '1px solid #e0e0e0',
            borderRadius: '0.5rem',
            fontSize: '0.9rem',
          }}
        />
      </div>

      {/* Routes List */}
      <div
        style={{
          maxHeight: '400px',
          overflowY: 'auto',
          border: '1px solid #e0e0e0',
          borderRadius: '0.5rem',
        }}
      >
        {filteredRoutes.length === 0 ? (
          <p
            style={{
              textAlign: 'center',
              padding: '2rem',
              color: '#666',
              margin: 0,
            }}
          >
            No routes found. Try a different search.
          </p>
        ) : (
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {filteredRoutes.map((route, index) => (
              <li
                key={route.id}
                style={{
                  borderBottom:
                    index < filteredRoutes.length - 1
                      ? '1px solid #e0e0e0'
                      : 'none',
                }}
              >
                <button
                  type="button"
                  onClick={() => onSelectRoute(route)}
                  style={{
                    width: '100%',
                    padding: '1rem',
                    background: 'none',
                    border: 'none',
                    textAlign: 'left',
                    cursor: 'pointer',
                    transition: 'background-color 0.2s',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#f9fafb';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      gap: '1rem',
                    }}
                  >
                    <div>
                      <p
                        style={{
                          fontSize: '1rem',
                          fontWeight: 600,
                          margin: 0,
                          marginBottom: '0.25rem',
                        }}
                      >
                        {route.name}
                      </p>
                      <p
                        style={{
                          fontSize: '0.85rem',
                          color: '#666',
                          margin: 0,
                        }}
                      >
                        {route.distanceMile.toFixed(2)} mi (
                        {route.distanceKm.toFixed(2)} km)
                      </p>
                    </div>
                    <span
                      style={{
                        fontSize: '0.85rem',
                        color: '#666',
                        fontWeight: 500,
                      }}
                    >
                      ID: #{route.id}
                    </span>
                  </div>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <p
        style={{
          fontSize: '0.75rem',
          color: '#666',
          marginTop: '0.5rem',
          textAlign: 'center',
        }}
      >
        {filteredRoutes.length} route{filteredRoutes.length !== 1 ? 's' : ''}{' '}
        found
      </p>
    </div>
  );
}

// Review Form Component
function RouteReviewForm({
  route,
  user,
  onBack,
}: {
  route: RouteInfo;
  user: UserInfo;
  onBack: () => void;
}) {
  const [difficultyRating, setDifficultyRating] = useState(0);
  const [enjoyabilityRating, setEnjoyabilityRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (difficultyRating === 0 || enjoyabilityRating === 0) {
      alert('Please provide ratings for both difficulty and enjoyability');
      return;
    }

    if (reviewText.trim().length < 10) {
      alert('Please write a review of at least 10 characters');
      return;
    }

    setSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    console.log('Review submitted:', {
      routeId: route.id,
      userId: user.username,
      difficultyRating,
      enjoyabilityRating,
      reviewText,
    });

    setSubmitting(false);
    setSubmitted(true);

    // Reset form and go back after 2 seconds
    setTimeout(() => {
      setDifficultyRating(0);
      setEnjoyabilityRating(0);
      setReviewText('');
      setSubmitted(false);
      onBack();
    }, 2000);
  };

  return (
    <div>
      {/* Back Button */}
      <button
        type="button"
        onClick={onBack}
        style={{
          marginBottom: '1rem',
          padding: '0.5rem 1rem',
          fontSize: '0.85rem',
          backgroundColor: '#fff',
          color: '#666',
          border: '1px solid #e0e0e0',
          borderRadius: '0.5rem',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
        }}
      >
        ← Back to route selection
      </button>

      {/* Route Information Card */}
      <section
        style={{
          border: '1px solid #e0e0e0',
          borderRadius: '0.75rem',
          padding: '1.25rem',
          marginBottom: '1.5rem',
          backgroundColor: '#ffffff',
        }}
      >
        <h2
          style={{
            fontSize: '1.1rem',
            fontWeight: 600,
            marginBottom: '1rem',
            paddingBottom: '0.75rem',
            borderBottom: '1px solid #e0e0e0',
          }}
        >
          Route Details
        </h2>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1rem',
          }}
        >
          <div>
            <p
              style={{
                fontSize: '0.85rem',
                color: '#666',
                marginBottom: '0.25rem',
              }}
            >
              Route Name
            </p>
            <p style={{ fontSize: '1rem', fontWeight: 600, margin: 0 }}>
              {route.name}
            </p>
          </div>

          <div>
            <p
              style={{
                fontSize: '0.85rem',
                color: '#666',
                marginBottom: '0.25rem',
              }}
            >
              Distance
            </p>
            <p style={{ fontSize: '1rem', fontWeight: 600, margin: 0 }}>
              {route.distanceMile.toFixed(2)} mi ({route.distanceKm.toFixed(2)}{' '}
              km)
            </p>
          </div>

          <div>
            <p
              style={{
                fontSize: '0.85rem',
                color: '#666',
                marginBottom: '0.25rem',
              }}
            >
              Route ID
            </p>
            <p style={{ fontSize: '1rem', fontWeight: 600, margin: 0 }}>
              #{route.id}
            </p>
          </div>
        </div>
      </section>

      {/* User Information Card */}
      <section
        style={{
          border: '1px solid #e0e0e0',
          borderRadius: '0.75rem',
          padding: '1.25rem',
          marginBottom: '1.5rem',
          backgroundColor: '#ffffff',
        }}
      >
        <h2
          style={{
            fontSize: '1.1rem',
            fontWeight: 600,
            marginBottom: '1rem',
            paddingBottom: '0.75rem',
            borderBottom: '1px solid #e0e0e0',
          }}
        >
          Reviewer Information
        </h2>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          {user.avatarUrl && (
            <img
              src={user.avatarUrl}
              alt={user.name}
              style={{
                width: 60,
                height: 60,
                borderRadius: '0.5rem',
                border: '1px solid #e0e0e0',
                objectFit: 'cover',
              }}
            />
          )}
          <div>
            <p style={{ fontSize: '1rem', fontWeight: 600, margin: 0 }}>
              {user.name}
            </p>
            <p
              style={{
                fontSize: '0.85rem',
                color: '#666',
                margin: '0.15rem 0',
              }}
            >
              @{user.username}
            </p>
            <span
              style={{
                display: 'inline-block',
                fontSize: '0.75rem',
                padding: '0.2rem 0.6rem',
                borderRadius: '999px',
                backgroundColor: '#f3f4f6',
                color: '#666',
                marginTop: '0.25rem',
              }}
            >
              {user.experienceLevel}
            </span>
          </div>
        </div>
      </section>

      {/* Review Form */}
      <section
        style={{
          border: '1px solid #e0e0e0',
          borderRadius: '0.75rem',
          padding: '1.25rem',
          backgroundColor: '#ffffff',
        }}
      >
        <h2
          style={{
            fontSize: '1.1rem',
            fontWeight: 600,
            marginBottom: '1rem',
            paddingBottom: '0.75rem',
            borderBottom: '1px solid #e0e0e0',
          }}
        >
          Your Review
        </h2>

        <form onSubmit={handleSubmit}>
          {/* Difficulty Rating */}
          <StarRating
            rating={difficultyRating}
            setRating={setDifficultyRating}
            label="Difficulty Rating"
          />

          {/* Enjoyability Rating */}
          <StarRating
            rating={enjoyabilityRating}
            setRating={setEnjoyabilityRating}
            label="Enjoyability Rating"
          />

          {/* Review Text */}
          <div style={{ marginBottom: '1.5rem' }}>
            <label
              htmlFor="reviewText"
              style={{
                display: 'block',
                fontSize: '0.9rem',
                fontWeight: 500,
                marginBottom: '0.5rem',
                color: '#555',
              }}
            >
              Write Your Review
            </label>
            <textarea
              id="reviewText"
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              placeholder="Share your experience with this route... What did you like? What should others know?"
              style={{
                width: '100%',
                minHeight: '150px',
                padding: '0.75rem',
                border: '1px solid #e0e0e0',
                borderRadius: '0.5rem',
                fontSize: '0.9rem',
                fontFamily: 'inherit',
                resize: 'vertical',
              }}
              required
            />
            <p
              style={{
                fontSize: '0.75rem',
                color: '#666',
                marginTop: '0.25rem',
              }}
            >
              Minimum 10 characters ({reviewText.length}/10)
            </p>
          </div>

          {/* Submit Button */}
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button
              type="submit"
              disabled={submitting || submitted}
              style={{
                padding: '0.6rem 1.5rem',
                fontSize: '0.9rem',
                fontWeight: 500,
                backgroundColor: submitted
                  ? '#10b981'
                  : submitting
                    ? '#9ca3af'
                    : '#3e633e',
                color: '#fff',
                border: 'none',
                borderRadius: '0.5rem',
                cursor: submitting || submitted ? 'not-allowed' : 'pointer',
                transition: 'background-color 0.2s',
              }}
            >
              {submitted
                ? '✓ Review Submitted!'
                : submitting
                  ? 'Submitting...'
                  : 'Submit Review'}
            </button>

            <button
              type="button"
              onClick={() => {
                setDifficultyRating(0);
                setEnjoyabilityRating(0);
                setReviewText('');
              }}
              style={{
                padding: '0.6rem 1.5rem',
                fontSize: '0.9rem',
                fontWeight: 500,
                backgroundColor: '#fff',
                color: '#666',
                border: '1px solid #e0e0e0',
                borderRadius: '0.5rem',
                cursor: 'pointer',
              }}
            >
              Clear
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}

// Main page component
export default function ReviewPage() {
  const [selectedRoute, setSelectedRoute] = useState<RouteInfo | null>(null);

  // Mock user data - replace with actual logged-in user data
  const mockUser: UserInfo = {
    name: 'John Foo',
    username: 'john_foo',
    experienceLevel: 'Intermediate',
    avatarUrl: '/profile/john.jpg',
  };

  return (
    <main style={{ padding: '1.5rem', maxWidth: 900, margin: '0 auto' }}>
      {/* Header */}
      <header style={{ marginBottom: '1.5rem', textAlign: 'center' }}>
        <h1
          style={{
            fontSize: '2rem',
            fontWeight: 700,
            marginBottom: '0.25rem',
          }}
        >
          {selectedRoute ? 'Review Route' : 'Select a Route to Review'}
        </h1>
        <p style={{ color: '#555', fontSize: '0.95rem' }}>
          {selectedRoute
            ? 'Share your experience with this running route'
            : 'Search and select a route from the list below'}
        </p>
      </header>

      {/* Route Selection or Review Form */}
      <section
        style={{
          border: '1px solid #e0e0e0',
          borderRadius: '0.75rem',
          padding: '1.25rem',
          backgroundColor: '#ffffff',
        }}
      >
        {selectedRoute ? (
          <RouteReviewForm
            route={selectedRoute}
            user={mockUser}
            onBack={() => setSelectedRoute(null)}
          />
        ) : (
          <RouteSelector onSelectRoute={setSelectedRoute} />
        )}
      </section>
    </main>
  );
}