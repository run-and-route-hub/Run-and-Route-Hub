/* eslint-disable @next/next/no-img-element */

'use client';

import { useState } from 'react';
import {
  Trophy,
  LightningCharge,
  Map,
  Heart,
  Award,
  PinMap,
  Speedometer,
  Calendar3,
} from 'react-bootstrap-icons';

export default function AwardsPage() {
  const [selectedAward, setSelectedAward] = useState<any>(null);

  const awards = [
    // --- Unlocked Awards ---
    {
      title: '3-Day Streak',
      description: 'You ran three days in a row — great consistency!',
      icon: <LightningCharge size={36} className="text-warning" />,
      unlocked: true,
    },
    {
      title: 'Route Explorer',
      description: 'You’ve tried 5+ different running locations around Oʻahu.',
      icon: <Map size={36} className="text-primary" />,
      unlocked: true,
    },
    {
      title: 'Hill Crusher',
      description: 'You completed a route with 300+ ft of elevation gain.',
      icon: <Award size={36} className="text-danger" />,
      unlocked: true,
    },

    // ---- Locked Awards ----
    {
      title: '7-Day Streak',
      description: 'Run 7 days in a row to unlock.',
      icon: <Calendar3 size={36} />,
      unlocked: false,
    },
    {
      title: 'Distance Milestone: 25 Miles',
      description: 'Accumulate 25 total miles.',
      icon: <PinMap size={36} />,
      unlocked: false,
    },
    {
      title: 'Distance Milestone: 50 Miles',
      description: 'Accumulate 50 total miles.',
      icon: <PinMap size={36} />,
      unlocked: false,
    },
    {
      title: 'Pace Master',
      description: 'Complete a run at sub-8-minute pace.',
      icon: <Speedometer size={36} />,
      unlocked: false,
    },
    {
      title: 'Sunrise Runner',
      description: 'Log a run between 5–7 AM.',
      icon: <Trophy size={36} />,
      unlocked: false,
    },
    {
      title: 'Night Owl',
      description: 'Log a run after 9 PM.',
      icon: <Trophy size={36} />,
      unlocked: false,
    },
    {
      title: 'Community Runner',
      description: 'Run with a partner 3+ times.',
      icon: <Heart size={36} />,
      unlocked: false,
    },
    {
      title: 'Route Creator',
      description: 'Add your own route to the system.',
      icon: <Map size={36} />,
      unlocked: false,
    },
    {
      title: 'Consistency Award',
      description: 'Run at least once a week for a month.',
      icon: <Calendar3 size={36} />,
      unlocked: false,
    },
    {
      title: 'Trail Runner',
      description: 'Complete 3+ trail runs.',
      icon: <Award size={36} />,
      unlocked: false,
    },
    {
      title: 'City Explorer',
      description: 'Run through 5 different Honolulu neighborhoods.',
      icon: <Map size={36} />,
      unlocked: false,
    },
    {
      title: 'Speed Demon',
      description: 'Run a mile under 7 minutes.',
      icon: <LightningCharge size={36} />,
      unlocked: false,
    },
    {
      title: 'Hydration Pro',
      description: 'Track runs 5 days in a row.',
      icon: <Heart size={36} />,
      unlocked: false,
    },
    {
      title: 'Marathon Mindset',
      description: 'Accumulate 100 total miles.',
      icon: <Trophy size={36} />,
      unlocked: false,
    },
    {
      title: 'Elevation Beast',
      description: 'Climb over 1,000 ft total.',
      icon: <Award size={36} />,
      unlocked: false,
    },
    {
      title: 'Aloha Spirit Runner',
      description: 'Give feedback on 3+ routes.',
      icon: <Heart size={36} />,
      unlocked: false,
    },
  ];

  return (
    <main className="py-5">
      <div className="container text-center">
        <h1 className="fw-bold mb-4">🏆 Your Awards</h1>

        {/* AWARD GRID */}
        <div className="row g-4">
          {awards.map((award, index) => (
            <div key={index} className="col-md-4">
              <div
                className={`p-4 rounded-3 shadow-sm h-100 award-card ${
                  award.unlocked ? 'award-unlocked' : 'award-locked'
                }`}
                onClick={() => setSelectedAward(award)}
              >
                <div className="mb-3">{award.icon}</div>
                <h4 className="fw-semibold">{award.title}</h4>
                <p className="mb-0">{award.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* AWARD MODAL */}
      {selectedAward && (
        <div className="award-modal-backdrop" onClick={() => setSelectedAward(null)}>
          <div
            className="award-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="fw-bold mb-2">
              {selectedAward.icon} {selectedAward.title}
            </h2>
            <p className="mb-3">{selectedAward.description}</p>

            <button
              className="btn btn-success"
              onClick={() => setSelectedAward(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Styles injected here */}
      <style jsx>{`
        /* Hover animation */
        .award-card {
          cursor: pointer;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .award-card:hover {
          transform: scale(1.05);
          box-shadow: 0 0 12px rgba(0, 0, 0, 0.15);
        }

        /* Unlocked award glow */
        .award-unlocked {
          border: 2px solid gold;
          box-shadow: 0 0 10px gold;
        }

        /* Locked awards dimmed */
        .award-locked {
          opacity: 0.5;
          filter: grayscale(100%);
        }

        /* Modal backdrop */
        .award-modal-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.55);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 2000;
        }

        /* Modal window */
        .award-modal-content {
          background: white;
          padding: 30px;
          width: 350px;
          border-radius: 12px;
          text-align: center;
          animation: pop 0.25s ease-out;
        }

        @keyframes pop {
          from {
            transform: scale(0.8);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }
      `}
      </style>
    </main>
  );
}
