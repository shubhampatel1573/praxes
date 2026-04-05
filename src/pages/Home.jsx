import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AlertTriangle, Calendar, Users, Trophy, Clock, Volume2, VolumeX, Play, Music, Mic, Star, Sparkles, PartyPopper } from 'lucide-react';
import { getEventsList, getIconComponent } from '../utils/eventManager';
import clockSoundUrl from '../assets/clocksound.mp3';
import './Home.css';

const Countdown = () => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isMuted, setIsMuted] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const audioRef = React.useRef(null);
  const prevSecRef = React.useRef(null);
  const bannerRef = React.useRef(null);

  // Monitor if the timer is visible on screen
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsVisible(entry.isIntersecting);
    }, { threshold: 0.1 });

    if (bannerRef.current) {
      observer.observe(bannerRef.current);
    }
    return () => observer.disconnect();
  }, []);

  // Force halt audio immediately if muted or scrolled out of view
  useEffect(() => {
    if (audioRef.current && (isMuted || !isVisible)) {
      audioRef.current.pause();
    }
  }, [isMuted, isVisible]);

  // Unlock audio on first user interaction (browser autoplay policy workaround)
  useEffect(() => {
    const unlockAudio = () => {
      if (audioRef.current && !isMuted && isVisible) {
        audioRef.current.play().catch(() => { });
      }
      document.removeEventListener('click', unlockAudio);
      document.removeEventListener('touchstart', unlockAudio);
      document.removeEventListener('keydown', unlockAudio);
    };
    document.addEventListener('click', unlockAudio);
    document.addEventListener('touchstart', unlockAudio);
    document.addEventListener('keydown', unlockAudio);
    return () => {
      document.removeEventListener('click', unlockAudio);
      document.removeEventListener('touchstart', unlockAudio);
      document.removeEventListener('keydown', unlockAudio);
    };
  }, [isMuted, isVisible]);

  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio(clockSoundUrl);
    }

    // 08/04/2026 10:00 AM (assuming DD/MM/YYYY for India -> April 8, 2026)
    const targetDate = new Date('2026-04-08T10:00:00').getTime();

    const updateTimer = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        const totalSecs = Math.floor(difference / 1000);
        const sec = Math.floor((difference % (1000 * 60)) / 1000);

        // Sync audio if unmuted and visible and second changed
        if (!isMuted && isVisible && prevSecRef.current !== sec && audioRef.current) {
          const offset = (5 - (totalSecs % 5)) % 5;
          audioRef.current.currentTime = offset;
          audioRef.current.play().catch(e => console.log('Autoplay blocked', e));
        }

        prevSecRef.current = sec;

        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: sec
        });
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);

    // Cleanup on unmount (e.g. going to next page)
    return () => {
      clearInterval(interval);
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, [isMuted, isVisible]);

  return (
    <motion.div
      className="countdown-banner"
      ref={bannerRef}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="container countdown-content" style={{ position: 'relative' }}>
        <Clock className="countdown-icon" />
        <div className="countdown-timer">
          <div className="time-block">
            <span className="time-value clamp-text">{String(timeLeft.days).padStart(2, '0')}</span>
            <span className="time-label">Days</span>
          </div>
          <span className="time-separator">:</span>
          <div className="time-block">
            <span className="time-value clamp-text">{String(timeLeft.hours).padStart(2, '0')}</span>
            <span className="time-label">Hrs</span>
          </div>
          <span className="time-separator">:</span>
          <div className="time-block">
            <span className="time-value clamp-text">{String(timeLeft.minutes).padStart(2, '0')}</span>
            <span className="time-label">Min</span>
          </div>
          <span className="time-separator">:</span>
          <div className="time-block">
            <span className="time-value clamp-text">{String(timeLeft.seconds).padStart(2, '0')}</span>
            <span className="time-label">Sec</span>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <p className="countdown-text">Until Event Starts!</p>
          <button
            onClick={() => setIsMuted(!isMuted)}
            style={{ background: 'none', border: 'none', color: 'var(--accent-gold)', cursor: 'pointer', display: 'flex', padding: 0 }}
            title={isMuted ? "Unmute clock ticking sound" : "Mute sound"}
          >
            {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
          </button>
        </div>
      </div>
    </motion.div>
  );
};

const Home = ({ onReplayIntro }) => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    setEvents(getEventsList());
  }, []);

  return (
    <div className="home-container">
      {/* Countdown Banner */}
      <Countdown />

      {/* Alert Banner */}
      <div className="alert-banner">
        <div className="container alert-content">
          <AlertTriangle className="alert-icon" />
          <p><strong>URGENT:</strong> Registrations are open until 08/04/2026, 06:00 PM. Late entries will not be accepted.</p>
        </div>
      </div>

      {/* Hero Section */}
      <motion.section
        className="hero"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="container hero-content">
          <h2 className="hero-subtitle glow-text-gold">Annual Cultural & Technical Fest</h2>
          <h1 className="hero-title glow-text-emerald">PRAXES 2K26</h1>
          <p className="hero-description">
            Experience the ultimate fusion of technology, arts, and culture at Government Engineering College, Palanpur.
          </p>
          <div className="hero-actions">
            <Link to="/register" className="btn btn-primary btn-lg">Register Now</Link>
            <Link to="/events" className="btn btn-emerald btn-lg">Explore Events</Link>
          </div>
          {onReplayIntro && (
            <button
              onClick={onReplayIntro}
              className="watch-intro-btn"
            >
              <Play size={16} /> Watch Intro Video
            </button>
          )}
          <motion.a
            href="https://cultural.gecpalanpur.com"
            target="_blank"
            rel="noopener noreferrer"
            className="cultural-ticket-banner"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="cultural-ticket-img-wrapper">
              <img src="/cultural-ticket.png" alt="Praxes 2K26 Cultural Night - Book Now" className="cultural-ticket-img" />
              <div className="cultural-ticket-overlay"></div>
            </div>
            <div className="cultural-ticket-coming-soon">
              <div className="coming-soon-main">
                <PartyPopper size={24} />
                <span>Cultural Night</span>
                <PartyPopper size={24} />
              </div>
              <div className="coming-soon-sub">Coming Soon</div>
            </div>
          </motion.a>
        </div>
      </motion.section>

      {/* Marquee Section */}
      <div className="marquee-container">
        <div className="marquee-content">
          {events.length > 0 && Array(4).fill(events).flat().map((event, index) => (
            <span key={`${event.id}-${index}`} className={`marquee-item glow-text-${index % 2 === 0 ? 'gold' : 'emerald'}`} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
              {getIconComponent(event.iconName, { size: 20 })} {event.name}
            </span>
          ))}
        </div>
      </div>

      {/* Prize Pool Section */}
      <motion.section
        className="prize-pool-container"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        style={{ textAlign: 'center', padding: '2rem 1rem', marginTop: '1rem' }}
      >
        <h2 className="glow-text-gold" style={{ fontSize: '2.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', margin: 0 }}>
          <Trophy size={40} className="glow-text-gold" /> Total Prize Pool 30,000+ <Trophy size={40} className="glow-text-gold" />
        </h2>
      </motion.section>

      {/* Highlights */}
      <motion.section
        className="highlights container"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.2 } }
        }}
      >
        <motion.div
          className="highlight-card card"
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
          }}
        >
          <Calendar className="highlight-icon glow-text-gold" />
          <h3>2 Days of Events</h3>
          <p>Action-packed schedule featuring 20+ technical and cultural competitions.</p>
        </motion.div>

        <motion.div
          className="highlight-card card"
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
          }}
        >
          <Users className="highlight-icon glow-text-emerald" />
          <h3>1500+ Attendees</h3>
          <p>Join students from across the state in making memories that last a lifetime.</p>
        </motion.div>

        <motion.div
          className="highlight-card card"
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
          }}
        >
          <Trophy className="highlight-icon glow-text-gold" />
          <h3>Amazing Prizes</h3>
          <p>Compete to win cash prizes, certificates, and exciting goodies.</p>
        </motion.div>
      </motion.section>

      {/* Cultural Night Section */}
      <motion.section
        className="cultural-night-section"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8 }}
      >
        <div className="cultural-night-bg-glow" />
        <div className="container cultural-night-content">
          <motion.div
            className="cultural-night-header"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="cultural-night-badge">
              <Sparkles size={16} /> SPECIAL EVENT
            </div>
            <h2 className="cultural-night-title">
              <span className="cultural-night-icon-wrap"><PartyPopper size={36} /></span>
              Cultural Night
              <span className="cultural-night-icon-wrap"><PartyPopper size={36} /></span>
            </h2>
            <p className="cultural-night-subtitle">An unforgettable evening of music, dance, and celebration</p>
            <div className="cultural-night-date-badge">
              <Calendar size={18} />
              <span>10th April 2026 &bull; 7:00 PM Onwards</span>
            </div>
          </motion.div>

          <div className="cultural-night-grid">
            <motion.div
              className="cultural-night-card cn-card-featured"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="cn-card-icon cn-icon-gold">
                <Mic size={32} />
              </div>
              <h3>Live Performances</h3>
              <p>Stunning acts, singing, drama, and performances by talented artists.</p>
            </motion.div>

            <motion.div
              className="cultural-night-card"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.25 }}
            >
              <div className="cn-card-icon cn-icon-purple">
                <Music size={32} />
              </div>
              <h3>DJ Night</h3>
              <p>High-energy beats and electrifying music to light up the night sky.</p>
            </motion.div>

            <motion.div
              className="cultural-night-card"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <div className="cn-card-icon cn-icon-emerald">
                <Star size={32} />
              </div>
              <h3>Dance Battle</h3>
              <p>Show your moves in the ultimate dance showdown under the stars.</p>
            </motion.div>
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default Home;
