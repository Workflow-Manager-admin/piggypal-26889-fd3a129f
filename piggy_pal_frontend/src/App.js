import React, { useState } from 'react';
import './App.css';

// Import screens for navigation
import HomeDashboard from './components/HomeDashboard';
import SavingsGoalForm from './components/SavingsGoalForm';
import RewardsGamification from './components/RewardsGamification';
import ParentalDashboard from './components/ParentalDashboard';
import EducationZone from './components/EducationZone';
import SavingsReport from './components/SavingsReport';
import SecuritySharing from './components/SecuritySharing';

// Define the main sections/tabs: route, label, icon (emoji), component
const TABS = [
  {
    key: "home",
    label: "Home",
    icon: "🐷",
    component: HomeDashboard
  },
  {
    key: "goal",
    label: "Goal",
    icon: "🎯",
    component: SavingsGoalForm
  },
  {
    key: "rewards",
    label: "Rewards",
    icon: "🏅",
    component: RewardsGamification
  },
  {
    key: "parent",
    label: "Parent",
    icon: "👨‍👩‍👧",
    component: ParentalDashboard
  },
  {
    key: "education",
    label: "Learn",
    icon: "📚",
    component: EducationZone
  },
  {
    key: "report",
    label: "Reports",
    icon: "📈",
    component: SavingsReport
  },
  {
    key: "security",
    label: "Safe",
    icon: "🔒",
    component: SecuritySharing
  }
];

function App() {
  // Simple state-based tab navigation
  const [activeTab, setActiveTab] = useState('home');

  // Pick the correct component based on tab
  const ActiveComponent = TABS.find(t => t.key === activeTab)?.component || HomeDashboard;

  return (
    <div
      className="app"
      style={{
        background: "var(--background)",
        minHeight: "100vh"
      }}
    >
      <nav
        className="navbar"
        style={{
          background: "var(--nav-bg)",
          borderBottom: "3.5px solid var(--primary)"
        }}
      >
        <div className="container" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div className="logo"
            style={{
              fontFamily: "'Fredoka One','Comic Sans MS','Inter',sans-serif",
              fontWeight: 700,
              fontSize: "1.5rem",
              letterSpacing: 1,
              // Use playful high-contrast color for nav brand
              color: "var(--primary)", // Instead of var(--text-dark) (was muted charcoal)
              textShadow: "0 2px 8px var(--accent-1)25"
            }}
          >
            <span
              className="logo-symbol"
              style={{
                color: "var(--accent-orange)",
                fontSize: "2rem",
                marginRight: 6,
                textShadow: "0 3px 11px var(--primary)50"
              }}
            >
              🐷
            </span>
            PiggyPal
          </div>
          {/* playful color-bar accent line */}
          <div
            style={{
              height: 6,
              flex: 1,
              marginLeft: 16,
              background: "linear-gradient(90deg, var(--primary) 0%, var(--secondary) 25%, var(--accent-1) 52%, var(--accent-2) 100%)",
              borderRadius: 4,
              maxWidth: 220,
              boxShadow: "0 2.5px 14px var(--primary)18"
            }}
          />
        </div>
      </nav>
      <main style={{ paddingTop: 84, flex: 1 }}>
        {/* Remove .container for HomeDashboard area - let child card backgrounds show */}
        <ActiveComponent />
      </main>
      <nav
        className="piggy-nav-tabs"
        style={{
          width: '100%',
          position: 'fixed',
          left: 0,
          bottom: 0,
          background: 'var(--nav-bg)',
          borderTop: '3.5px solid var(--accent-1)',
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'center',
          padding: '8px 0',
          zIndex: 110,
          boxShadow: '0 -2px 12px 0 #2125290D'
        }}
      >
        {TABS.map(tab => (
          <button
            key={tab.key}
            className="btn"
            style={{
              background: 'none',
              border: 'none',
              color: activeTab === tab.key
                ? 'var(--primary)'
                : 'var(--accent-1)',
              fontWeight: activeTab === tab.key ? 700 : 500,
              fontSize: activeTab === tab.key ? '1.30rem' : '1.15rem',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 1,
              cursor: 'pointer',
              borderRadius: 12,
              padding: '7px 12px',
              boxShadow: activeTab === tab.key
                ? '0 2px 8px 0 #3A86FF11'
                : 'none',
              transition: 'color 0.22s, font-size 0.15s'
            }}
            aria-label={tab.label}
            onClick={() => setActiveTab(tab.key)}
          >
            <span aria-hidden style={{ fontSize: '1.45rem', lineHeight: 1.15 }}>{tab.icon}</span>
            <span style={{
              marginTop: 2,
              fontSize: activeTab === tab.key ? '1.05rem' : '0.93rem',
              fontFamily: "inherit",
              letterSpacing: 0.2
            }}>
              {tab.label}
            </span>
          </button>
        ))}
      </nav>
    </div>
  );
}

export default App;