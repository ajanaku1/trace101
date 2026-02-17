import React from "react";
import {
  AbsoluteFill,
  Sequence,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  Easing,
  Audio,
  staticFile,
} from "remotion";

// Colors matching Trace brand
const colors = {
  bg: "#0a0a0f",
  primary: "#8b5cf6",
  secondary: "#6366f1",
  danger: "#ef4444",
  success: "#10b981",
  warning: "#f59e0b",
  text: "#e2e8f0",
  textMuted: "#94a3b8",
  cardBg: "#111118",
  border: "#1e1e2e",
};

// Smooth fade transition component
const FadeTransition: React.FC<{
  children: React.ReactNode;
  durationFrames?: number;
}> = ({ children, durationFrames = 20 }) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(
    frame,
    [0, durationFrames],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.quad) }
  );

  return <div style={{ opacity }}>{children}</div>;
};

// Caption component for consistent styling
const Caption: React.FC<{
  text: string;
  subtext?: string;
  position?: "top" | "bottom";
  startFrame?: number;
  style?: React.CSSProperties;
}> = ({ text, subtext, position = "bottom", startFrame = 0, style }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const opacity = spring({
    frame: frame - startFrame,
    fps,
    config: { damping: 20, stiffness: 80 },
  });

  const y = interpolate(frame - startFrame, [0, 25], [30, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic)
  });

  return (
    <div
      style={{
        position: "absolute",
        [position]: 80,
        left: 0,
        right: 0,
        textAlign: "center",
        opacity,
        transform: `translateY(${position === "bottom" ? y : -y}px)`,
        zIndex: 100,
        ...style,
      }}
    >
      <div
        style={{
          display: "inline-block",
          backgroundColor: "rgba(0,0,0,0.85)",
          padding: "20px 40px",
          borderRadius: 16,
          border: `1px solid ${colors.primary}50`,
          backdropFilter: "blur(10px)",
        }}
      >
        <div style={{ fontFamily: "Inter, system-ui, sans-serif", fontSize: 32, fontWeight: 700, color: colors.text }}>
          {text}
        </div>
        {subtext && (
          <div style={{ fontFamily: "Inter, system-ui, sans-serif", fontSize: 20, color: colors.textMuted, marginTop: 8 }}>
            {subtext}
          </div>
        )}
      </div>
    </div>
  );
};

// Part divider component
const PartDivider: React.FC<{
  partNumber: number;
  title: string;
  subtitle: string;
}> = ({ partNumber, title, subtitle }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const scale = spring({
    frame,
    fps,
    config: { damping: 15, stiffness: 80 },
  });

  const textOpacity = interpolate(frame, [20, 50], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic)
  });

  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(ellipse at center, #1a1025 0%, ${colors.bg} 70%)`,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div style={{ textAlign: "center", transform: `scale(${scale})` }}>
        <div
          style={{
            fontFamily: "Inter, system-ui, sans-serif",
            fontSize: 24,
            fontWeight: 600,
            color: colors.primary,
            marginBottom: 20,
            letterSpacing: 4,
          }}
        >
          PART {partNumber}
        </div>
        <div
          style={{
            fontFamily: "Inter, system-ui, sans-serif",
            fontSize: 64,
            fontWeight: 800,
            color: colors.text,
            marginBottom: 16,
            opacity: textOpacity,
          }}
        >
          {title}
        </div>
        <div
          style={{
            fontFamily: "Inter, system-ui, sans-serif",
            fontSize: 24,
            color: colors.textMuted,
            opacity: textOpacity,
          }}
        >
          {subtitle}
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ============================================
// INTRO: THE HISTORY OF MONEY
// ============================================

// Intro Scene 1: Traditional Finance - Banks & Government Control
const TradFinanceScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const buildingScale = spring({ frame, fps, config: { damping: 15, stiffness: 60 } });

  // Chain links appearing - SLOWED
  const chainOpacity = interpolate(frame, [100, 160], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // Control lines from building to people - SLOWED
  const controlProgress = interpolate(frame, [160, 260], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // Caption phases - SLOWED for longer reading time
  const phase1 = frame < 140;
  const phase2 = frame >= 140 && frame < 280;
  const phase3 = frame >= 280;

  return (
    <AbsoluteFill style={{ backgroundColor: colors.bg, justifyContent: "center", alignItems: "center" }}>
      {phase1 && <Caption text="For centuries, money meant control" subtext="Banks and governments held the power" position="top" startFrame={0} />}
      {phase2 && <Caption text="They decided who could transact" subtext="Your financial freedom depended on their approval" position="top" startFrame={80} />}
      {phase3 && <Caption text="Accounts could be frozen at any moment" subtext="No permission, no access to your own money" position="top" startFrame={160} />}

      <div style={{ position: "relative", width: 800, height: 500 }}>
        {/* Central Bank/Government Building */}
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: "30%",
            transform: `translate(-50%, -50%) scale(${buildingScale})`,
            textAlign: "center",
          }}
        >
          {/* Building icon */}
          <svg viewBox="0 0 120 100" style={{ width: 180, height: 150 }}>
            {/* Pediment (triangle roof) */}
            <polygon points="60,5 10,40 110,40" fill={colors.cardBg} stroke={colors.danger} strokeWidth="2" />
            {/* Columns */}
            <rect x="20" y="40" width="12" height="55" fill={colors.cardBg} stroke={colors.danger} strokeWidth="2" />
            <rect x="42" y="40" width="12" height="55" fill={colors.cardBg} stroke={colors.danger} strokeWidth="2" />
            <rect x="66" y="40" width="12" height="55" fill={colors.cardBg} stroke={colors.danger} strokeWidth="2" />
            <rect x="88" y="40" width="12" height="55" fill={colors.cardBg} stroke={colors.danger} strokeWidth="2" />
            {/* Base */}
            <rect x="10" y="95" width="100" height="5" fill={colors.danger} />
            {/* Dollar sign */}
            <text x="60" y="30" textAnchor="middle" fill={colors.danger} fontSize="18" fontWeight="bold">$</text>
          </svg>
          <div style={{ fontFamily: "Inter, system-ui, sans-serif", fontSize: 20, fontWeight: 700, color: colors.danger, marginTop: 10 }}>
            CENTRALIZED CONTROL
          </div>
        </div>

        {/* Control lines to people */}
        {[
          { x: 150, y: 380, label: "You" },
          { x: 400, y: 400, label: "Business" },
          { x: 650, y: 380, label: "Family" },
        ].map((person, i) => {
          const lineProgress = interpolate(frame - 100 - i * 15, [0, 40], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

          return (
            <React.Fragment key={i}>
              {/* Control line */}
              <svg
                style={{
                  position: "absolute",
                  left: 0,
                  top: 0,
                  width: "100%",
                  height: "100%",
                  pointerEvents: "none",
                }}
              >
                <line
                  x1="400"
                  y1="180"
                  x2={400 + (person.x - 400) * lineProgress}
                  y2={180 + (person.y - 180) * lineProgress}
                  stroke={colors.danger}
                  strokeWidth="2"
                  strokeDasharray="8,4"
                  opacity={chainOpacity}
                />
              </svg>

              {/* Person icon */}
              <div
                style={{
                  position: "absolute",
                  left: person.x,
                  top: person.y,
                  transform: "translate(-50%, -50%)",
                  textAlign: "center",
                  opacity: lineProgress,
                }}
              >
                <div style={{ fontSize: 50 }}>👤</div>
                <div style={{ fontFamily: "Inter, system-ui, sans-serif", fontSize: 14, color: colors.textMuted, marginTop: 5 }}>
                  {person.label}
                </div>
                {/* Chain/lock icon */}
                <div style={{ fontSize: 24, marginTop: 5, opacity: interpolate(frame, [300, 360], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) }}>
                  🔒
                </div>
              </div>
            </React.Fragment>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

// Intro Scene 2: Solana Revolution
const SolanaRevolutionScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const solanaScale = spring({ frame: frame - 30, fps, config: { damping: 12, stiffness: 80 } });
  const glowPulse = Math.sin(frame / 15) * 15 + 40;

  // Breaking chains animation - SLOWED
  const chainBreak = interpolate(frame, [120, 180], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // Features appearing - SLOWED
  const featuresStart = 240;

  const features = [
    { icon: "⚡", text: "Lightning Fast", delay: 0 },
    { icon: "🔓", text: "Permissionless", delay: 40 },
    { icon: "👤", text: "Self-Custody", delay: 80 },
    { icon: "💰", text: "Low Fees", delay: 120 },
  ];

  // Caption phases - SLOWED for longer reading time
  const phase1 = frame < 150;
  const phase2 = frame >= 150 && frame < 300;
  const phase3 = frame >= 300;

  return (
    <AbsoluteFill style={{ backgroundColor: colors.bg, justifyContent: "center", alignItems: "center" }}>
      {phase1 && <Caption text="Then came Solana" subtext="A high-performance blockchain for the masses" position="top" startFrame={0} />}
      {phase2 && <Caption text="No banks. No permission needed." subtext="The blockchain gave power back to the people" position="top" startFrame={80} />}
      {phase3 && <Caption text="True financial freedom" subtext="You control your own money" position="top" startFrame={160} />}

      <div style={{ position: "relative", textAlign: "center" }}>
        {/* Breaking chains effect */}
        {chainBreak > 0 && chainBreak < 1 && (
          <>
            {[...Array(8)].map((_, i) => {
              const angle = (i / 8) * Math.PI * 2;
              const distance = 100 + chainBreak * 150;
              const x = Math.cos(angle) * distance;
              const y = Math.sin(angle) * distance;
              return (
                <div
                  key={i}
                  style={{
                    position: "absolute",
                    left: "50%",
                    top: "50%",
                    transform: `translate(${x}px, ${y}px)`,
                    fontSize: 30,
                    opacity: 1 - chainBreak,
                  }}
                >
                  ⛓️
                </div>
              );
            })}
          </>
        )}

        {/* Solana logo */}
        <div
          style={{
            transform: `scale(${Math.min(solanaScale, 1)})`,
            marginBottom: 30,
          }}
        >
          <div
            style={{
              width: 150,
              height: 150,
              borderRadius: "50%",
              background: `linear-gradient(135deg, #9945FF, #14F195)`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto",
              boxShadow: `0 0 ${glowPulse}px #9945FF80`,
            }}
          >
            {/* Solana logo - three parallelograms */}
            <svg viewBox="0 0 100 100" style={{ width: 80, height: 80 }}>
              <path d="M20 72 L75 72 L85 82 L30 82 Z" fill="white" />
              <path d="M20 47 L75 47 L85 57 L30 57 Z" fill="white" />
              <path d="M30 18 L85 18 L75 28 L20 28 Z" fill="white" />
            </svg>
          </div>
        </div>

        {/* Features */}
        <div style={{ display: "flex", gap: 30, justifyContent: "center", marginTop: 40 }}>
          {features.map((feature, i) => {
            const featureOpacity = spring({
              frame: frame - featuresStart - feature.delay,
              fps,
              config: { damping: 15, stiffness: 80 },
            });

            return (
              <div
                key={i}
                style={{
                  opacity: Math.min(featureOpacity, 1),
                  transform: `translateY(${(1 - Math.min(featureOpacity, 1)) * 20}px)`,
                  textAlign: "center",
                  padding: "16px 24px",
                  backgroundColor: colors.cardBg,
                  borderRadius: 12,
                  border: `1px solid ${colors.success}40`,
                }}
              >
                <div style={{ fontSize: 36, marginBottom: 8 }}>{feature.icon}</div>
                <div style={{ fontFamily: "Inter, system-ui, sans-serif", fontSize: 16, color: colors.success, fontWeight: 600 }}>
                  {feature.text}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
};

// Intro Scene 3: The Privacy Problem
const PrivacyProblemScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const problemScale = spring({ frame, fps, config: { damping: 15, stiffness: 70 } });

  // Eye watching animation - SLOWED
  const eyeScale = interpolate(frame, [100, 160], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const eyePulse = Math.sin(frame / 10) * 0.05 + 1;

  // Data streams - SLOWED
  const streamProgress = interpolate(frame, [160, 300], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // Caption phases - SLOWED for longer reading time
  const phase1 = frame < 160;
  const phase2 = frame >= 160 && frame < 320;
  const phase3 = frame >= 320;

  return (
    <AbsoluteFill style={{ backgroundColor: colors.bg, justifyContent: "center", alignItems: "center" }}>
      {phase1 && <Caption text="But there's a catch..." subtext="Decentralization came with a tradeoff" position="top" startFrame={0} />}
      {phase2 && <Caption text="Every transaction is PUBLIC" subtext="Anyone can see what you're doing" position="top" startFrame={80} />}
      {phase3 && <Caption text="You escaped the banks..." subtext="But now EVERYONE is watching" position="top" startFrame={160} />}

      <div style={{ position: "relative", width: 900, height: 450 }}>
        {/* User in center */}
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: `translate(-50%, -50%) scale(${problemScale})`,
            textAlign: "center",
          }}
        >
          <div style={{ fontSize: 80 }}>👤</div>
          <div
            style={{
              fontFamily: "monospace",
              fontSize: 14,
              color: colors.primary,
              marginTop: 10,
              padding: "8px 16px",
              backgroundColor: colors.cardBg,
              borderRadius: 8,
            }}
          >
            5icW3...PnLgt
          </div>
        </div>

        {/* Watching eyes around */}
        {[
          { x: 150, y: 100, label: "Hackers" },
          { x: 750, y: 100, label: "Competitors" },
          { x: 100, y: 350, label: "Scammers" },
          { x: 800, y: 350, label: "Trackers" },
          { x: 450, y: 50, label: "Everyone" },
        ].map((eye, i) => {
          const eyeDelay = i * 25;
          const thisEyeScale = interpolate(frame - 100 - eyeDelay, [0, 50], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

          return (
            <div
              key={i}
              style={{
                position: "absolute",
                left: eye.x,
                top: eye.y,
                transform: `translate(-50%, -50%) scale(${thisEyeScale * eyePulse})`,
                textAlign: "center",
              }}
            >
              <div style={{ fontSize: 50 }}>👁️</div>
              <div style={{ fontFamily: "Inter, system-ui, sans-serif", fontSize: 14, color: colors.danger, marginTop: 5, fontWeight: 600 }}>
                {eye.label}
              </div>
            </div>
          );
        })}

        {/* Data stream lines from user to eyes */}
        <svg
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            width: "100%",
            height: "100%",
            pointerEvents: "none",
          }}
        >
          {[
            { x: 150, y: 100 },
            { x: 750, y: 100 },
            { x: 100, y: 350 },
            { x: 800, y: 350 },
            { x: 450, y: 50 },
          ].map((eye, i) => {
            const lineOpacity = interpolate(frame - 200 - i * 20, [0, 50], [0, 0.6], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
            return (
              <line
                key={i}
                x1="450"
                y1="225"
                x2={eye.x}
                y2={eye.y}
                stroke={colors.danger}
                strokeWidth="2"
                strokeDasharray="6,4"
                opacity={lineOpacity}
              />
            );
          })}
        </svg>
      </div>

      {/* Bottom warning */}
      <div
        style={{
          position: "absolute",
          bottom: 80,
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: interpolate(frame, [360, 420], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
        }}
      >
        <div
          style={{
            display: "inline-block",
            backgroundColor: colors.danger + "20",
            padding: "16px 32px",
            borderRadius: 12,
            border: `1px solid ${colors.danger}`,
          }}
        >
          <span style={{ fontFamily: "Inter, system-ui, sans-serif", fontSize: 24, color: colors.danger, fontWeight: 600 }}>
            🔍 Complete financial transparency... to everyone
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ============================================
// PART 1: THE PROBLEM (NOW)
// ============================================

// Scene: Opening - Wallet reveal
const OpeningScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const addressScale = spring({
    frame,
    fps,
    config: { damping: 12, stiffness: 80 },
  });

  const addressOpacity = interpolate(frame, [0, 30], [0, 1], {
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic)
  });

  const glowIntensity = interpolate(frame, [30, 80], [0, 50], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ backgroundColor: colors.bg, justifyContent: "center", alignItems: "center" }}>
      <FadeTransition>
        <Caption text="Your Wallet Address" subtext="A unique identifier on the blockchain" position="top" startFrame={10} />

        <div style={{ textAlign: "center" }}>
          <div
            style={{
              opacity: addressOpacity,
              transform: `scale(${addressScale})`,
              fontFamily: "monospace",
              fontSize: 56,
              color: colors.primary,
              textShadow: `0 0 ${glowIntensity}px ${colors.primary}`,
              letterSpacing: 3,
              marginBottom: 40,
            }}
          >
            5icW3...PnLgt
          </div>
        </div>

        <Caption text="Every transaction you make is public" subtext="Permanently recorded on the blockchain" position="bottom" startFrame={60} />

        {/* Smooth particles */}
        {[...Array(12)].map((_, i) => {
          const angle = (i / 12) * Math.PI * 2;
          const distance = 200 + Math.sin(frame / 15 + i) * 25;
          const x = Math.cos(angle + frame / 60) * distance;
          const y = Math.sin(angle + frame / 60) * distance;
          const particleOpacity = interpolate(frame, [40, 80], [0, 0.6], { extrapolateRight: "clamp" });

          return (
            <div
              key={i}
              style={{
                position: "absolute",
                left: "50%",
                top: "50%",
                width: 8,
                height: 8,
                borderRadius: "50%",
                backgroundColor: colors.primary,
                transform: `translate(${x}px, ${y}px)`,
                opacity: particleOpacity * (0.3 + Math.sin(i) * 0.3),
                transition: "transform 0.1s ease-out",
              }}
            />
          );
        })}
      </FadeTransition>
    </AbsoluteFill>
  );
};

// Scene 2: Network build
const NetworkScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const connections = [
    { label: "Exchange", angle: 45, distance: 240, delay: 0 },
    { label: "DEX", angle: 105, distance: 220, delay: 15 },
    { label: "Friend", angle: 165, distance: 250, delay: 30 },
    { label: "NFT", angle: 225, distance: 230, delay: 45 },
    { label: "DeFi", angle: 285, distance: 245, delay: 60 },
    { label: "Wallet 2", angle: 345, distance: 235, delay: 75 },
  ];

  const dangerPhase = interpolate(frame, [150, 200], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // Caption phases
  const caption1 = frame < 100;
  const caption2 = frame >= 100 && frame < 180;
  const caption3 = frame >= 180;

  return (
    <AbsoluteFill style={{ backgroundColor: colors.bg }}>
      {/* Dynamic captions */}
      {caption1 && <Caption text="Each transaction creates a connection" position="top" startFrame={0} />}
      {caption2 && <Caption text="Your wallet network grows with every interaction" position="top" startFrame={100} />}
      {caption3 && <Caption text="Surveillance platforms see EVERYTHING" subtext="Your entire transaction history is exposed" position="top" startFrame={180} />}

      {/* Center node */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          width: 120,
          height: 120,
          borderRadius: "50%",
          background: dangerPhase > 0.5
            ? `linear-gradient(135deg, ${colors.danger}, ${colors.danger}aa)`
            : `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "Inter, system-ui, sans-serif",
          fontSize: 15,
          fontWeight: 600,
          color: "white",
          textAlign: "center",
          boxShadow: dangerPhase > 0.5
            ? `0 0 60px ${colors.danger}60`
            : `0 0 50px ${colors.primary}60`,
          zIndex: 10,
          transition: "all 0.5s ease-out",
        }}
      >
        Your<br />Wallet
      </div>

      {/* Smooth connections */}
      {connections.map((conn, i) => {
        const progress = spring({
          frame: frame - conn.delay,
          fps,
          config: { damping: 20, stiffness: 60 },
        });
        const rad = (conn.angle * Math.PI) / 180;
        const x = Math.cos(rad) * conn.distance * Math.min(progress, 1);
        const y = Math.sin(rad) * conn.distance * Math.min(progress, 1);
        const lineColor = dangerPhase > 0.5 ? colors.danger : colors.primary;

        return (
          <React.Fragment key={i}>
            <div
              style={{
                position: "absolute",
                left: "50%",
                top: "50%",
                width: conn.distance * Math.min(progress, 1),
                height: 3,
                background: `linear-gradient(90deg, ${lineColor}, ${lineColor}40)`,
                transformOrigin: "left center",
                transform: `rotate(${conn.angle}deg)`,
              }}
            />
            <div
              style={{
                position: "absolute",
                left: `calc(50% + ${x}px)`,
                top: `calc(50% + ${y}px)`,
                transform: "translate(-50%, -50%)",
                opacity: Math.min(progress, 1),
              }}
            >
              <div
                style={{
                  width: 60,
                  height: 60,
                  borderRadius: "50%",
                  border: `3px solid ${lineColor}`,
                  backgroundColor: colors.cardBg,
                }}
              />
              <div
                style={{
                  position: "absolute",
                  top: 68,
                  left: "50%",
                  transform: "translateX(-50%)",
                  fontFamily: "Inter, system-ui, sans-serif",
                  fontSize: 14,
                  color: colors.textMuted,
                  whiteSpace: "nowrap",
                }}
              >
                {conn.label}
              </div>
            </div>
          </React.Fragment>
        );
      })}

      {/* Warning */}
      {dangerPhase > 0.5 && (
        <div
          style={{
            position: "absolute",
            bottom: 80,
            left: 0,
            right: 0,
            textAlign: "center",
            opacity: interpolate(frame, [180, 220], [0, 1], { extrapolateRight: "clamp" }),
          }}
        >
          <div
            style={{
              display: "inline-block",
              backgroundColor: colors.danger + "20",
              padding: "16px 32px",
              borderRadius: 12,
              border: `1px solid ${colors.danger}`,
            }}
          >
            <span style={{ fontFamily: "Inter, system-ui, sans-serif", fontSize: 24, color: colors.danger, fontWeight: 600 }}>
              ⚠️ Network exposed to surveillance
            </span>
          </div>
        </div>
      )}
    </AbsoluteFill>
  );
};

// Scene 3: Profile card
const ProfileScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const cardScale = spring({ frame, fps, config: { damping: 15, stiffness: 80 } });

  const stats = [
    { label: "Identity", value: "KNOWN", delay: 25 },
    { label: "Net Worth", value: "$847K", delay: 40 },
    { label: "Location", value: "EST Timezone", delay: 55 },
    { label: "Linked Wallets", value: "12", delay: 70 },
  ];

  return (
    <AbsoluteFill style={{ backgroundColor: colors.bg, justifyContent: "center", alignItems: "center" }}>
      <Caption text="This is what they know about you" subtext="Built from your public transaction history" position="top" startFrame={0} />

      <div style={{ transform: `scale(${cardScale})`, maxWidth: 550 }}>
        <div
          style={{
            backgroundColor: colors.cardBg,
            borderRadius: 24,
            padding: 40,
            border: `2px solid ${colors.danger}`,
            boxShadow: `0 0 80px ${colors.danger}30`,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 18, marginBottom: 30 }}>
            <div style={{ fontSize: 48 }}>⚠️</div>
            <div>
              <div style={{ fontFamily: "Inter, system-ui, sans-serif", fontSize: 26, color: colors.text, fontWeight: 700 }}>
                Your Surveillance Profile
              </div>
              <div style={{ fontFamily: "Inter, system-ui, sans-serif", fontSize: 16, color: colors.danger, fontWeight: 600 }}>
                HIGH EXPOSURE RISK
              </div>
            </div>
          </div>

          {stats.map((stat, i) => {
            const opacity = spring({
              frame: frame - stat.delay,
              fps,
              config: { damping: 20, stiffness: 100 },
            });
            return (
              <div
                key={i}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "16px 0",
                  borderBottom: i < stats.length - 1 ? `1px solid ${colors.border}` : "none",
                  fontFamily: "Inter, system-ui, sans-serif",
                  opacity: Math.min(opacity, 1),
                }}
              >
                <span style={{ color: colors.textMuted, fontSize: 18 }}>{stat.label}</span>
                <span style={{ color: colors.danger, fontSize: 18, fontWeight: 600 }}>{stat.value}</span>
              </div>
            );
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
};

// Scene 4: Threats
const ThreatsScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const threats = [
    { icon: "🤖", title: "Front-Running", desc: "Bots detect and front-run your trades" },
    { icon: "🎯", title: "Targeted Attacks", desc: "Scammers see your wallet balance" },
    { icon: "👥", title: "Copy Trading", desc: "Your alpha gets copied instantly" },
  ];

  return (
    <AbsoluteFill style={{ backgroundColor: colors.bg, justifyContent: "center", alignItems: "center" }}>
      <Caption text="Why does this matter?" subtext="Public visibility creates real risks" position="top" startFrame={0} />

      <div style={{ display: "flex", gap: 50, marginTop: 30 }}>
        {threats.map((threat, i) => {
          const delay = i * 30;
          const scale = spring({
            frame: frame - delay,
            fps,
            config: { damping: 15, stiffness: 80 },
          });
          const y = interpolate(frame - delay, [0, 30], [40, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.out(Easing.cubic)
          });

          return (
            <div
              key={i}
              style={{
                opacity: Math.min(scale, 1),
                transform: `translateY(${y}px) scale(${Math.min(scale, 1)})`,
                textAlign: "center",
                width: 300,
                padding: 35,
                backgroundColor: colors.cardBg,
                borderRadius: 20,
                border: `1px solid ${colors.danger}40`,
              }}
            >
              <div style={{ fontSize: 70, marginBottom: 20 }}>{threat.icon}</div>
              <div style={{ fontFamily: "Inter, system-ui, sans-serif", fontSize: 26, fontWeight: 700, color: colors.danger, marginBottom: 12 }}>
                {threat.title}
              </div>
              <div style={{ fontFamily: "Inter, system-ui, sans-serif", fontSize: 17, color: colors.textMuted, lineHeight: 1.5 }}>
                {threat.desc}
              </div>
            </div>
          );
        })}
      </div>

      <Caption text="Your transactions make you a target" position="bottom" startFrame={100} />
    </AbsoluteFill>
  );
};

// ============================================
// PART 2: CHECK YOUR EXPOSURE
// ============================================

// Scene 5: Trace Demo
const TraceDemoScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const browserScale = spring({ frame, fps, config: { damping: 18, stiffness: 70 } });

  // Typing animation - SLOWED
  const walletAddress = "5icW3vBEgdvoaHrFeAGjmfivau2ArnNhQqw5MmePnLgt";
  const typedLength = Math.min(Math.floor(frame / 4), walletAddress.length);
  const typedAddress = walletAddress.slice(0, typedLength);

  // Analysis progress - SLOWED
  const analysisStart = 200;
  const analysisProgress = interpolate(frame - analysisStart, [0, 120], [0, 100], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // Results appear - SLOWED
  const resultsOpacity = interpolate(frame, [350, 400], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  const riskScore = Math.min(Math.floor(interpolate(frame, [400, 500], [0, 87], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })), 87);

  // Caption phases - SLOWED for longer reading time
  const phase1 = frame < 200;
  const phase2 = frame >= 200 && frame < 350;
  const phase3 = frame >= 350;

  return (
    <AbsoluteFill style={{ backgroundColor: colors.bg, justifyContent: "center", alignItems: "center", padding: 80 }}>
      {/* Dynamic captions */}
      {phase1 && <Caption text="Step 1: Enter any wallet address" subtext="Trace analyzes its on-chain exposure" position="top" startFrame={0} />}
      {phase2 && <Caption text="Step 2: Analyzing transaction history..." subtext="Scanning surveillance databases" position="top" startFrame={120} />}
      {phase3 && <Caption text="Step 3: View your exposure score" subtext="Higher score = more visible to trackers" position="top" startFrame={220} />}

      {/* Browser mockup */}
      <div
        style={{
          transform: `scale(${browserScale})`,
          width: "100%",
          maxWidth: 1200,
          backgroundColor: "#1a1a24",
          borderRadius: 20,
          overflow: "hidden",
          boxShadow: "0 30px 100px rgba(0,0,0,0.6)",
        }}
      >
        {/* Browser header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            padding: "14px 20px",
            backgroundColor: "#0d0d12",
            gap: 14,
          }}
        >
          <div style={{ display: "flex", gap: 10 }}>
            <div style={{ width: 14, height: 14, borderRadius: "50%", backgroundColor: "#ff5f57" }} />
            <div style={{ width: 14, height: 14, borderRadius: "50%", backgroundColor: "#febc2e" }} />
            <div style={{ width: 14, height: 14, borderRadius: "50%", backgroundColor: "#28c840" }} />
          </div>
          <div
            style={{
              flex: 1,
              backgroundColor: "#252532",
              borderRadius: 8,
              padding: "10px 18px",
              fontFamily: "monospace",
              fontSize: 15,
              color: colors.textMuted,
            }}
          >
            trace-wheat.vercel.app
          </div>
        </div>

        {/* App content */}
        <div style={{ padding: 40 }}>
          {/* Header */}
          <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 35 }}>
            <svg viewBox="0 0 100 100" style={{ width: 50, height: 50 }}>
              <g stroke={colors.primary} strokeLinecap="round">
                <line x1="25" y1="18" x2="52" y2="18" strokeWidth="4" />
                <circle cx="58" cy="18" r="5" fill="none" strokeWidth="3" />
                <line x1="15" y1="34" x2="62" y2="34" strokeWidth="4" />
                <circle cx="68" cy="34" r="5" fill="none" strokeWidth="3" />
                <line x1="12" y1="50" x2="48" y2="50" strokeWidth="4" />
                <circle cx="54" cy="50" r="5" fill="none" strokeWidth="3" />
                <line x1="18" y1="66" x2="42" y2="66" strokeWidth="4" />
                <circle cx="48" cy="66" r="5" fill="none" strokeWidth="3" />
                <line x1="25" y1="82" x2="68" y2="82" strokeWidth="4" />
                <circle cx="74" cy="82" r="5" fill="none" strokeWidth="3" />
              </g>
            </svg>
            <div>
              <div style={{ fontFamily: "Inter, system-ui, sans-serif", fontSize: 28, fontWeight: 700, color: colors.text }}>Trace</div>
              <div style={{ fontFamily: "Inter, system-ui, sans-serif", fontSize: 14, color: colors.textMuted }}>Privacy Intelligence Protocol</div>
            </div>
          </div>

          {/* Input */}
          <div style={{ display: "flex", gap: 14, marginBottom: 30 }}>
            <div
              style={{
                flex: 1,
                backgroundColor: "#252532",
                borderRadius: 12,
                padding: "16px 20px",
                fontFamily: "monospace",
                fontSize: 17,
                color: colors.text,
                border: `2px solid ${colors.primary}40`,
              }}
            >
              {typedAddress}
              <span style={{ opacity: frame % 30 < 15 ? 1 : 0, color: colors.primary }}>|</span>
            </div>
            <div
              style={{
                backgroundColor: colors.primary,
                borderRadius: 12,
                padding: "16px 28px",
                fontFamily: "Inter, system-ui, sans-serif",
                fontSize: 17,
                fontWeight: 600,
                color: "white",
              }}
            >
              Analyze
            </div>
          </div>

          {/* Analysis progress bar */}
          {frame >= analysisStart && frame < 350 && (
            <div style={{ marginBottom: 30 }}>
              <div style={{ fontFamily: "Inter, system-ui, sans-serif", fontSize: 15, color: colors.textMuted, marginBottom: 8 }}>
                Analyzing wallet exposure...
              </div>
              <div style={{ backgroundColor: "#252532", borderRadius: 8, height: 8, overflow: "hidden" }}>
                <div
                  style={{
                    width: `${analysisProgress}%`,
                    height: "100%",
                    background: `linear-gradient(90deg, ${colors.primary}, ${colors.secondary})`,
                    transition: "width 0.15s ease-out",
                  }}
                />
              </div>
            </div>
          )}

          {/* Results */}
          {frame >= 350 && (
            <div style={{ opacity: resultsOpacity, display: "flex", gap: 30 }}>
              {/* Risk Score */}
              <div
                style={{
                  flex: 1,
                  backgroundColor: "#252532",
                  borderRadius: 16,
                  padding: 30,
                  textAlign: "center",
                }}
              >
                <div style={{ fontFamily: "Inter, system-ui, sans-serif", fontSize: 14, color: colors.textMuted, marginBottom: 10 }}>
                  Exposure Score
                </div>
                <div
                  style={{
                    fontFamily: "Inter, system-ui, sans-serif",
                    fontSize: 72,
                    fontWeight: 800,
                    color: riskScore > 60 ? colors.danger : riskScore > 30 ? colors.warning : colors.success,
                  }}
                >
                  {riskScore}
                </div>
                <div style={{ fontFamily: "Inter, system-ui, sans-serif", fontSize: 16, color: colors.danger, fontWeight: 600 }}>
                  HIGH RISK
                </div>
              </div>

              {/* Categories */}
              <div style={{ flex: 2 }}>
                {[
                  { name: "Identity Exposure", score: 92, color: colors.danger },
                  { name: "Transaction Patterns", score: 78, color: colors.danger },
                  { name: "Wallet Clustering", score: 85, color: colors.danger },
                  { name: "Social Links", score: 95, color: colors.danger },
                ].map((cat, i) => {
                  const catOpacity = interpolate(frame - 400 - i * 20, [0, 30], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
                  const barWidth = interpolate(frame - 400 - i * 20, [0, 60], [0, cat.score], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

                  return (
                    <div key={i} style={{ marginBottom: 16, opacity: catOpacity }}>
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                        <span style={{ fontFamily: "Inter, system-ui, sans-serif", fontSize: 15, color: colors.text }}>{cat.name}</span>
                        <span style={{ fontFamily: "Inter, system-ui, sans-serif", fontSize: 15, color: cat.color, fontWeight: 600 }}>{Math.floor(barWidth)}%</span>
                      </div>
                      <div style={{ backgroundColor: "#1a1a24", borderRadius: 4, height: 8 }}>
                        <div
                          style={{
                            width: `${barWidth}%`,
                            height: "100%",
                            backgroundColor: cat.color,
                            borderRadius: 4,
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </AbsoluteFill>
  );
};

// Scene 6: Arkham Demo - Dummy page with John Doe
const ArkhamDemoScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const browserScale = spring({ frame, fps, config: { damping: 18, stiffness: 70 } });

  // Click animation - SLOWED
  const clickScale = interpolate(frame, [100, 120, 140], [1, 0.97, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // Page transition - smoother - SLOWED
  const pageTransition = interpolate(frame, [140, 200], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic)
  });

  // Identity reveal - smoother - SLOWED
  const identityReveal = spring({
    frame: frame - 280,
    fps,
    config: { damping: 15, stiffness: 60 },
  });

  // Warning pulse
  const warningPulse = Math.sin(frame / 12) * 0.02 + 1;

  // Caption phases - SLOWED for longer reading time
  const phase1 = frame < 140;
  const phase2 = frame >= 140 && frame < 340;
  const phase3 = frame >= 340;

  return (
    <AbsoluteFill style={{ backgroundColor: colors.bg, justifyContent: "center", alignItems: "center", padding: 80 }}>
      {/* Dynamic captions */}
      {phase1 && <Caption text="Trace shows which platforms track you" subtext="Click to see what surveillance platforms know" position="top" startFrame={0} />}
      {phase2 && <Caption text="Arkham Intelligence - Surveillance Platform" subtext="Used by institutions, governments, and researchers" position="top" startFrame={70} />}
      {phase3 && <Caption text="Your identity is PERMANENTLY linked" subtext="This information is public and cannot be removed" position="top" startFrame={170} />}

      <div
        style={{
          transform: `scale(${browserScale})`,
          width: "100%",
          maxWidth: 1200,
          backgroundColor: "#1a1a24",
          borderRadius: 20,
          overflow: "hidden",
          boxShadow: "0 30px 100px rgba(0,0,0,0.6)",
        }}
      >
        {/* Browser header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            padding: "14px 20px",
            backgroundColor: "#0d0d12",
            gap: 14,
          }}
        >
          <div style={{ display: "flex", gap: 10 }}>
            <div style={{ width: 14, height: 14, borderRadius: "50%", backgroundColor: "#ff5f57" }} />
            <div style={{ width: 14, height: 14, borderRadius: "50%", backgroundColor: "#febc2e" }} />
            <div style={{ width: 14, height: 14, borderRadius: "50%", backgroundColor: "#28c840" }} />
          </div>
          <div
            style={{
              flex: 1,
              backgroundColor: "#252532",
              borderRadius: 8,
              padding: "10px 18px",
              fontFamily: "monospace",
              fontSize: 15,
              color: colors.textMuted,
            }}
          >
            {pageTransition < 0.5 ? "trace-wheat.vercel.app" : "platform.arkhamintelligence.com/address/5icW3...PnLgt"}
          </div>
        </div>

        {/* Content */}
        <div style={{ padding: 40, minHeight: 400 }}>
          {pageTransition < 0.5 ? (
            // Trace page with Arkham link
            <div>
              <div style={{ fontFamily: "Inter, system-ui, sans-serif", fontSize: 18, color: colors.textMuted, marginBottom: 24 }}>
                Surveillance Platforms Tracking This Wallet:
              </div>

              {/* Arkham Link Card */}
              <div
                style={{
                  transform: `scale(${clickScale})`,
                  backgroundColor: "#252532",
                  borderRadius: 16,
                  padding: 22,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  border: `2px solid ${colors.danger}`,
                  cursor: "pointer",
                  marginBottom: 22,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                  <div
                    style={{
                      width: 55,
                      height: 55,
                      borderRadius: 12,
                      backgroundColor: "#000",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontFamily: "Inter, system-ui, sans-serif",
                      fontSize: 26,
                      fontWeight: 800,
                      color: "#fff",
                    }}
                  >
                    A
                  </div>
                  <div>
                    <div style={{ fontFamily: "Inter, system-ui, sans-serif", fontSize: 18, fontWeight: 600, color: colors.text }}>
                      Arkham Intelligence
                    </div>
                    <div style={{ fontFamily: "Inter, system-ui, sans-serif", fontSize: 15, color: colors.danger }}>
                      Identity LINKED - Click to view profile
                    </div>
                  </div>
                </div>
                <div style={{ fontFamily: "Inter, system-ui, sans-serif", fontSize: 26, color: colors.primary }}>→</div>
              </div>

              {/* Click indicator */}
              {frame >= 60 && frame < 140 && (
                <div
                  style={{
                    position: "absolute",
                    left: 320,
                    top: 200,
                    width: 35,
                    height: 35,
                    borderRadius: "50%",
                    border: `3px solid ${colors.primary}`,
                    opacity: interpolate(frame, [60, 100, 140], [0, 1, 0]),
                    transform: `scale(${interpolate(frame, [100, 140], [1, 1.5])})`,
                  }}
                />
              )}
            </div>
          ) : (
            // Arkham page showing John Doe identity
            <div style={{ opacity: pageTransition }}>
              {/* Arkham header */}
              <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 30 }}>
                <div
                  style={{
                    width: 60,
                    height: 60,
                    borderRadius: 14,
                    backgroundColor: "#000",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: "Inter, system-ui, sans-serif",
                    fontSize: 30,
                    fontWeight: 800,
                    color: "#fff",
                  }}
                >
                  A
                </div>
                <div>
                  <div style={{ fontFamily: "Inter, system-ui, sans-serif", fontSize: 26, fontWeight: 700, color: colors.text }}>
                    Arkham Intelligence
                  </div>
                  <div style={{ fontFamily: "Inter, system-ui, sans-serif", fontSize: 15, color: colors.textMuted }}>
                    Blockchain Intelligence Platform
                  </div>
                </div>
              </div>

              {/* Wallet info */}
              <div
                style={{
                  backgroundColor: "#252532",
                  borderRadius: 18,
                  padding: 30,
                  marginBottom: 22,
                }}
              >
                <div style={{ fontFamily: "monospace", fontSize: 15, color: colors.textMuted, marginBottom: 16 }}>
                  5icW3vBEgdvoaHrFeAGjmfivau2ArnNhQqw5MmePnLgt
                </div>

                {/* Identity Card - John Doe */}
                <div
                  style={{
                    opacity: Math.min(identityReveal, 1),
                    backgroundColor: colors.danger + "20",
                    border: `2px solid ${colors.danger}`,
                    borderRadius: 16,
                    padding: 24,
                    transform: `scale(${warningPulse})`,
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 18, marginBottom: 16 }}>
                    {/* Profile avatar */}
                    <div
                      style={{
                        width: 70,
                        height: 70,
                        borderRadius: "50%",
                        backgroundColor: "#3b82f6",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontFamily: "Inter, system-ui, sans-serif",
                        fontSize: 28,
                        fontWeight: 700,
                        color: "white",
                      }}
                    >
                      JD
                    </div>
                    <div>
                      <div style={{ fontFamily: "Inter, system-ui, sans-serif", fontSize: 12, color: colors.danger, fontWeight: 600, marginBottom: 4, letterSpacing: 1 }}>
                        IDENTITY LINKED
                      </div>
                      <div style={{ fontFamily: "Inter, system-ui, sans-serif", fontSize: 28, fontWeight: 700, color: colors.text }}>
                        John Doe
                      </div>
                      <div style={{ fontFamily: "Inter, system-ui, sans-serif", fontSize: 15, color: colors.textMuted }}>
                        Verified User Profile
                      </div>
                    </div>
                  </div>

                  <div style={{ display: "flex", gap: 35, marginTop: 18 }}>
                    <div>
                      <div style={{ fontFamily: "Inter, system-ui, sans-serif", fontSize: 12, color: colors.textMuted }}>Confidence</div>
                      <div style={{ fontFamily: "Inter, system-ui, sans-serif", fontSize: 18, fontWeight: 600, color: colors.danger }}>HIGH</div>
                    </div>
                    <div>
                      <div style={{ fontFamily: "Inter, system-ui, sans-serif", fontSize: 12, color: colors.textMuted }}>Source</div>
                      <div style={{ fontFamily: "Inter, system-ui, sans-serif", fontSize: 18, fontWeight: 600, color: colors.text }}>On-chain</div>
                    </div>
                    <div>
                      <div style={{ fontFamily: "Inter, system-ui, sans-serif", fontSize: 12, color: colors.textMuted }}>First Linked</div>
                      <div style={{ fontFamily: "Inter, system-ui, sans-serif", fontSize: 18, fontWeight: 600, color: colors.text }}>2024</div>
                    </div>
                    <div>
                      <div style={{ fontFamily: "Inter, system-ui, sans-serif", fontSize: 12, color: colors.textMuted }}>Total Txns</div>
                      <div style={{ fontFamily: "Inter, system-ui, sans-serif", fontSize: 18, fontWeight: 600, color: colors.text }}>1,247</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Warning message */}
              <div
                style={{
                  opacity: interpolate(frame, [400, 460], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
                  display: "flex",
                  alignItems: "center",
                  gap: 14,
                  padding: 18,
                  backgroundColor: colors.danger + "20",
                  borderRadius: 12,
                  border: `1px solid ${colors.danger}40`,
                }}
              >
                <span style={{ fontSize: 26 }}>⚠️</span>
                <span style={{ fontFamily: "Inter, system-ui, sans-serif", fontSize: 16, color: colors.danger }}>
                  John Doe's identity is permanently linked to this wallet's entire transaction history
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ============================================
// PART 3: WHAT TO DO
// ============================================

// Scene 7: Solution - Shield
const SolutionScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const shieldScale = spring({ frame, fps, config: { damping: 12, stiffness: 80 } });
  const glowPulse = Math.sin(frame / 20) * 12 + 35;

  const textOpacity = interpolate(frame, [60, 100], [0, 1], {
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic)
  });

  return (
    <AbsoluteFill style={{ backgroundColor: colors.bg, justifyContent: "center", alignItems: "center" }}>
      <Caption text="The Solution: Selective Privacy" subtext="Break the surveillance chain without losing compliance" position="top" startFrame={0} />

      {/* Breaking lines animation */}
      {[...Array(8)].map((_, i) => {
        const angle = (i / 8) * 360;
        const breakProgress = interpolate(frame, [40, 90], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.out(Easing.cubic)
        });
        const shouldBreak = i % 2 === 0;
        const opacity = shouldBreak ? 1 - breakProgress : 0.4;

        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              width: 350,
              height: 3,
              background: shouldBreak
                ? `linear-gradient(90deg, transparent, ${colors.danger}, transparent)`
                : `linear-gradient(90deg, transparent, ${colors.primary}, transparent)`,
              transformOrigin: "left center",
              transform: `rotate(${angle}deg)`,
              opacity,
            }}
          />
        );
      })}

      <div style={{ transform: `scale(${shieldScale})`, textAlign: "center" }}>
        <svg
          viewBox="0 0 100 120"
          style={{ width: 160, height: 192, filter: `drop-shadow(0 0 ${glowPulse}px ${colors.primary})` }}
        >
          <defs>
            <linearGradient id="shieldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={colors.primary} />
              <stop offset="100%" stopColor={colors.secondary} />
            </linearGradient>
          </defs>
          <path
            d="M50 5 L10 25 L10 55 C10 85 50 110 50 110 C50 110 90 85 90 55 L90 25 Z"
            fill="url(#shieldGrad)"
            fillOpacity={0.3}
            stroke="url(#shieldGrad)"
            strokeWidth={3}
          />
          <path d="M35 55 L45 65 L65 45" fill="none" stroke="white" strokeWidth={5} strokeLinecap="round" strokeLinejoin="round" />
        </svg>

        <div style={{ opacity: textOpacity, marginTop: 30 }}>
          <div style={{ fontFamily: "Inter, system-ui, sans-serif", fontSize: 44, fontWeight: 700, color: colors.text }}>
            Selective Privacy
          </div>
          <div style={{ fontFamily: "Inter, system-ui, sans-serif", fontSize: 20, color: colors.textMuted, marginTop: 12 }}>
            Break the chain. Keep control.
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// Scene 8: Recommendations
const RecommendationsScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const recommendations = [
    {
      icon: "🔄",
      title: "Use Fresh Wallets",
      desc: "Create new wallets for different activities. Never reuse exposed wallets for private transactions.",
      delay: 0
    },
    {
      icon: "🔒",
      title: "Trade Privately",
      desc: "Use encrypt.trade for MEV protection and private order execution.",
      delay: 40
    },
    {
      icon: "🔗",
      title: "Break Wallet Links",
      desc: "Avoid direct transfers between your wallets. Use privacy-preserving bridges.",
      delay: 80
    },
    {
      icon: "📊",
      title: "Monitor Exposure",
      desc: "Regularly check your wallets on Trace to track your privacy score.",
      delay: 120
    },
  ];

  return (
    <AbsoluteFill style={{ backgroundColor: colors.bg, justifyContent: "center", alignItems: "center", padding: 100 }}>
      <Caption text="What to do if your wallet is exposed" subtext="Steps to protect your privacy going forward" position="top" startFrame={0} />

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 30, maxWidth: 1100, marginTop: 50 }}>
        {recommendations.map((rec, i) => {
          const scale = spring({
            frame: frame - rec.delay,
            fps,
            config: { damping: 15, stiffness: 70 },
          });

          return (
            <div
              key={i}
              style={{
                opacity: Math.min(scale, 1),
                transform: `scale(${Math.min(scale, 1)})`,
                backgroundColor: colors.cardBg,
                borderRadius: 20,
                padding: 30,
                border: `1px solid ${colors.primary}30`,
                display: "flex",
                gap: 20,
                alignItems: "flex-start",
              }}
            >
              <div
                style={{
                  width: 60,
                  height: 60,
                  borderRadius: 14,
                  backgroundColor: colors.primary + "20",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 32,
                  flexShrink: 0,
                }}
              >
                {rec.icon}
              </div>
              <div>
                <div style={{ fontFamily: "Inter, system-ui, sans-serif", fontSize: 22, fontWeight: 700, color: colors.text, marginBottom: 8 }}>
                  {rec.title}
                </div>
                <div style={{ fontFamily: "Inter, system-ui, sans-serif", fontSize: 16, color: colors.textMuted, lineHeight: 1.5 }}>
                  {rec.desc}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

// Scene 9: encrypt.trade
const EncryptScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const features = [
    "Private order execution",
    "No mempool visibility",
    "MEV protection",
    "Break wallet clustering",
  ];

  return (
    <AbsoluteFill style={{ backgroundColor: colors.bg, justifyContent: "center", alignItems: "center" }}>
      <Caption text="Trade privately with encrypt.trade" subtext="Selective privacy for DeFi trading" position="top" startFrame={0} />

      <div style={{ textAlign: "center", marginTop: 30 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 22, marginBottom: 45 }}>
          {/* encrypt.trade Logo - Circle with diagonal line */}
          <svg viewBox="0 0 100 100" style={{ width: 75, height: 75 }}>
            <circle
              cx="50"
              cy="50"
              r="32"
              fill="none"
              stroke={colors.primary}
              strokeWidth="6"
            />
            <line
              x1="15"
              y1="85"
              x2="85"
              y2="15"
              stroke={colors.primary}
              strokeWidth="6"
              strokeLinecap="round"
            />
          </svg>
          <div style={{ fontFamily: "Inter, system-ui, sans-serif", fontSize: 54, fontWeight: 700, color: colors.text }}>
            encrypt.trade
          </div>
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 20, maxWidth: 750 }}>
          {features.map((feature, i) => {
            const scale = spring({
              frame: frame - 30 - i * 18,
              fps,
              config: { damping: 15, stiffness: 80 },
            });

            return (
              <div
                key={i}
                style={{
                  opacity: Math.min(scale, 1),
                  transform: `scale(${Math.min(scale, 1)})`,
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  backgroundColor: colors.cardBg,
                  padding: "14px 24px",
                  borderRadius: 30,
                  border: `1px solid ${colors.success}40`,
                }}
              >
                <div style={{ width: 26, height: 26, borderRadius: "50%", backgroundColor: colors.success, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15 }}>
                  ✓
                </div>
                <span style={{ fontFamily: "Inter, system-ui, sans-serif", fontSize: 17, color: colors.text }}>{feature}</span>
              </div>
            );
          })}
        </div>
      </div>

      <Caption text="Your trades, your privacy" position="bottom" startFrame={120} />
    </AbsoluteFill>
  );
};

// Scene 10: CTA
const CTAScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const logoScale = spring({ frame, fps, config: { damping: 15, stiffness: 70 } });
  const textOpacity = interpolate(frame, [40, 80], [0, 1], {
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic)
  });

  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(ellipse at center, #15101f 0%, ${colors.bg} 70%)`,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* Two logos side by side */}
      <div style={{ display: "flex", gap: 60, alignItems: "center", marginBottom: 40, transform: `scale(${logoScale})` }}>
        {/* Trace Logo */}
        <div style={{ textAlign: "center" }}>
          <svg viewBox="0 0 100 100" style={{ width: 90, height: 90 }}>
            <g stroke={colors.primary} strokeLinecap="round">
              <line x1="25" y1="18" x2="52" y2="18" strokeWidth="4" />
              <circle cx="58" cy="18" r="5" fill="none" strokeWidth="3" />
              <line x1="15" y1="34" x2="62" y2="34" strokeWidth="4" />
              <circle cx="68" cy="34" r="5" fill="none" strokeWidth="3" />
              <line x1="12" y1="50" x2="48" y2="50" strokeWidth="4" />
              <circle cx="54" cy="50" r="5" fill="none" strokeWidth="3" />
              <line x1="18" y1="66" x2="42" y2="66" strokeWidth="4" />
              <circle cx="48" cy="66" r="5" fill="none" strokeWidth="3" />
              <line x1="25" y1="82" x2="68" y2="82" strokeWidth="4" />
              <circle cx="74" cy="82" r="5" fill="none" strokeWidth="3" />
            </g>
          </svg>
          <div style={{ fontFamily: "Inter, system-ui, sans-serif", fontSize: 24, fontWeight: 700, color: colors.text, marginTop: 10 }}>
            Trace
          </div>
        </div>

        {/* Divider */}
        <div style={{ width: 2, height: 100, backgroundColor: colors.border, opacity: 0.5 }} />

        {/* encrypt.trade Logo - Circle with diagonal line */}
        <div style={{ textAlign: "center" }}>
          <svg viewBox="0 0 100 100" style={{ width: 90, height: 90 }}>
            {/* Circle */}
            <circle
              cx="50"
              cy="50"
              r="32"
              fill="none"
              stroke="white"
              strokeWidth="6"
            />
            {/* Diagonal line through circle, extending beyond */}
            <line
              x1="15"
              y1="85"
              x2="85"
              y2="15"
              stroke="white"
              strokeWidth="6"
              strokeLinecap="round"
            />
          </svg>
          <div style={{ fontFamily: "Inter, system-ui, sans-serif", fontSize: 24, fontWeight: 700, color: colors.text, marginTop: 10 }}>
            encrypt.trade
          </div>
        </div>
      </div>

      <div style={{ textAlign: "center", opacity: textOpacity }}>
        <div style={{ fontFamily: "Inter, system-ui, sans-serif", fontSize: 52, fontWeight: 700, color: colors.text, marginBottom: 12 }}>
          Your money. Your trades.
        </div>
        <div
          style={{
            fontFamily: "Inter, system-ui, sans-serif",
            fontSize: 52,
            fontWeight: 700,
            background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            marginBottom: 50,
          }}
        >
          Your privacy.
        </div>

        <div style={{ display: "flex", gap: 80, justifyContent: "center" }}>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontFamily: "Inter, system-ui, sans-serif", fontSize: 16, color: colors.textMuted, marginBottom: 8 }}>Check your exposure</div>
            <div style={{ fontFamily: "Inter, system-ui, sans-serif", fontSize: 26, color: colors.primary, fontWeight: 600 }}>trace-wheat.vercel.app</div>
          </div>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontFamily: "Inter, system-ui, sans-serif", fontSize: 16, color: colors.textMuted, marginBottom: 8 }}>Trade privately</div>
            <div style={{ fontFamily: "Inter, system-ui, sans-serif", fontSize: 26, color: colors.primary, fontWeight: 600 }}>encrypt.trade</div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// Main Video - Restructured: Intro (History) → Part 1 (Problem) → Part 2 (Demo) → Part 3 (Solutions)
// SLOWED DOWN for better readability
export const PrivacyVideo: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: colors.bg }}>
      {/* Background Music - ambient electronic track */}
      <Audio
        src={staticFile("background-music.mp3")}
        volume={0.15}
        startFrom={0}
      />
      {/* ============================================ */}
      {/* INTRO: HISTORY OF MONEY (0:00 - 0:50) */}
      {/* ============================================ */}

      {/* Intro 1: Traditional Finance - Banks Control - 0:00-0:15 (450 frames) */}
      <Sequence from={0} durationInFrames={450}>
        <TradFinanceScene />
      </Sequence>

      {/* Intro 2: Solana Revolution - 0:15-0:32 (510 frames) */}
      <Sequence from={450} durationInFrames={510}>
        <SolanaRevolutionScene />
      </Sequence>

      {/* Intro 3: The Privacy Problem - 0:32-0:50 (540 frames) */}
      <Sequence from={960} durationInFrames={540}>
        <PrivacyProblemScene />
      </Sequence>

      {/* ============================================ */}
      {/* PART 1: THE PROBLEM NOW (0:50 - 1:30) */}
      {/* ============================================ */}

      {/* Part 1 Divider - 0:50-0:55 (150 frames) */}
      <Sequence from={1500} durationInFrames={150}>
        <PartDivider
          partNumber={1}
          title="The Problem"
          subtitle="Your wallet is an open book"
        />
      </Sequence>

      {/* Scene: Opening - 0:55-1:05 (300 frames) */}
      <Sequence from={1650} durationInFrames={300}>
        <OpeningScene />
      </Sequence>

      {/* Scene: Network - 1:05-1:18 (390 frames) */}
      <Sequence from={1950} durationInFrames={390}>
        <NetworkScene />
      </Sequence>

      {/* Scene: Profile - 1:18-1:28 (300 frames) */}
      <Sequence from={2340} durationInFrames={300}>
        <ProfileScene />
      </Sequence>

      {/* Scene: Threats - 1:28-1:40 (360 frames) */}
      <Sequence from={2640} durationInFrames={360}>
        <ThreatsScene />
      </Sequence>

      {/* ============================================ */}
      {/* PART 2: CHECK YOUR EXPOSURE (1:40 - 2:30) */}
      {/* ============================================ */}

      {/* Part 2 Divider - 1:40-1:45 (150 frames) */}
      <Sequence from={3000} durationInFrames={150}>
        <PartDivider
          partNumber={2}
          title="Check Your Exposure"
          subtitle="See how visible you are to surveillance"
        />
      </Sequence>

      {/* Scene: Trace Demo - 1:45-2:05 (600 frames) */}
      <Sequence from={3150} durationInFrames={600}>
        <TraceDemoScene />
      </Sequence>

      {/* Scene: Arkham Demo - 2:05-2:25 (600 frames) */}
      <Sequence from={3750} durationInFrames={600}>
        <ArkhamDemoScene />
      </Sequence>

      {/* ============================================ */}
      {/* PART 3: WHAT TO DO (2:25 - 3:20) */}
      {/* ============================================ */}

      {/* Part 3 Divider - 2:25-2:30 (150 frames) */}
      <Sequence from={4350} durationInFrames={150}>
        <PartDivider
          partNumber={3}
          title="What To Do"
          subtitle="Protect your privacy going forward"
        />
      </Sequence>

      {/* Scene: Solution - 2:30-2:42 (360 frames) */}
      <Sequence from={4500} durationInFrames={360}>
        <SolutionScene />
      </Sequence>

      {/* Scene: Recommendations - 2:42-3:00 (540 frames) */}
      <Sequence from={4860} durationInFrames={540}>
        <RecommendationsScene />
      </Sequence>

      {/* Scene: encrypt.trade - 3:00-3:12 (360 frames) */}
      <Sequence from={5400} durationInFrames={360}>
        <EncryptScene />
      </Sequence>

      {/* Scene: CTA - 3:12-3:28 (480 frames) */}
      <Sequence from={5760} durationInFrames={480}>
        <CTAScene />
      </Sequence>
    </AbsoluteFill>
  );
};
