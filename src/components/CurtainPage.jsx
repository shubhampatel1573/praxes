import React, { useState, useRef, useEffect } from 'react';
import './CurtainPage.css';

const CurtainPage = ({ onEnter }) => {
  const [isFading, setIsFading] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const videoRef = useRef(null);
  const bgVideoRef = useRef(null);

  const [videoSrc, setVideoSrc] = useState(
    window.innerWidth <= 768 ? '/mobvideo.mp4' : '/dskvideo.mp4'
  );

  useEffect(() => {
    const handleResize = () => {
      const newSrc = window.innerWidth <= 768 ? '/mobvideo.mp4' : '/dskvideo.mp4';
      if (videoSrc !== newSrc) {
        setVideoSrc(newSrc);
        if (videoRef.current) {
          videoRef.current.load();
          videoRef.current.play().catch(e => console.log("Play failed on resize:", e));
        }
        if (bgVideoRef.current) {
          bgVideoRef.current.load();
          bgVideoRef.current.play().catch(e => console.log("BG Play failed on resize:", e));
        }
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [videoSrc]);

  // Auto-play both videos muted initially to bypass browser blocks
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = true;
      videoRef.current.play().catch(e => console.log("Autoplay prevented:", e));
    }
    if (bgVideoRef.current) {
      bgVideoRef.current.muted = true;
      bgVideoRef.current.play().catch(e => console.log("BG Autoplay prevented:", e));
    }
  }, []);

  // Keep background video in sync with main video
  useEffect(() => {
    const syncVideos = () => {
      if (bgVideoRef.current && videoRef.current) {
        if (Math.abs(bgVideoRef.current.currentTime - videoRef.current.currentTime) > 0.3) {
          bgVideoRef.current.currentTime = videoRef.current.currentTime;
        }
      }
    };
    const interval = setInterval(syncVideos, 500);
    return () => clearInterval(interval);
  }, []);

  const handleScreenClick = () => {
    // If user hasn't interacted yet, first click unmutes audio
    if (!hasInteracted) {
      setHasInteracted(true);
      if (videoRef.current) {
        videoRef.current.muted = false; // Turn on sound
        videoRef.current.currentTime = 0; // Restart video with sound
        videoRef.current.play().catch(e => console.log("Play failed:", e));
      }
      if (bgVideoRef.current) {
        bgVideoRef.current.currentTime = 0;
        bgVideoRef.current.play().catch(e => console.log("BG Play failed:", e));
      }
      return;
    }

    // Second click finishes the curtain page
    finishCurtain();
  };

  const finishCurtain = () => {
    setIsFading(true);
    setTimeout(() => {
      onEnter();
    }, 800);
  };

  return (
    <div className={`curtain-container ${isFading ? 'fade-out' : ''}`} onClick={handleScreenClick}>
      {/* Blurred background video */}
      <video
        ref={bgVideoRef}
        className="curtain-video-bg"
        src={videoSrc}
        autoPlay
        muted
        playsInline
      />

      {/* Main sharp video in center */}
      <video
        ref={videoRef}
        className="curtain-video"
        src={videoSrc}
        autoPlay
        muted
        playsInline
        onEnded={finishCurtain}
      />
      
      <div className="curtain-overlay">
        <div className="curtain-content">
          {!hasInteracted ? (
             <p className="modern-prompt-text">
               Tap Anywhere to Unmute Sound
             </p>
          ) : (
             <p className="modern-prompt-text">
               Tap Anywhere to Enter Website
             </p>
          )}
          <div className="scanline"></div>
        </div>
      </div>
    </div>
  );
};

export default CurtainPage;
