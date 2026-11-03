
import { useState, useRef } from "react";

import {
  Heart,
  Gift,
  ArrowRight,
  Music,
  Volume2
} from "lucide-react";

import "./App.css";

// ==========================================
// PHOTOGRAPHS
// ==========================================

const photos = [
  {
    src: `${import.meta.env.BASE_URL}photos/56e68394-f4ae-42d0-a7c1-71ec1552798f.jpeg`,
    caption: "My favourite memory ❤️"
  },
  {
    src: `${import.meta.env.BASE_URL}photos/IMG_1354.jpeg`,
    caption: "Make a wish ✨"
  },
  {
    src: `${import.meta.env.BASE_URL}photos/IMG_1356.jpeg`,
    caption: "Celebrating you! 💗"
  }
];

// ==========================================
// WEBSITE SECTIONS
// ==========================================

const stages = [
  "welcome",
  "balloons",
  "cake",
  "flowers",
  "memories",
  "letter",
  "final"
];

function App() {

  // ========================================
  // STATES
  // ========================================

  const [stage, setStage] = useState("welcome");
  const [popped, setPopped] = useState([]);
  const [candleOut, setCandleOut] = useState(false);
  const [letterOpen, setLetterOpen] = useState(false);
  const [music, setMusic] = useState(false);

  // AUDIO REFERENCE

  const audioRef = useRef(null);

  // ========================================
  // PLAY / PAUSE MUSIC
  // ========================================

  const toggleMusic = async () => {

    const audio = audioRef.current;

    if (!audio) return;

    if (music) {

      audio.pause();

    } else {

      try {

        await audio.play();

      } catch (error) {

        console.error("Music playback error:", error);

        setMusic(false);

      }

    }

  };

  // ========================================
  // NEXT SECTION
  // ========================================

  const next = () => {

    const index = stages.indexOf(stage);

    if (index < stages.length - 1) {

      setStage(stages[index + 1]);

    }

  };

  // ========================================
  // POP BALLOONS
  // ========================================

  const popBalloon = (id) => {

    setPopped((prev) => [...prev, id]);

  };

  // ========================================
  // RESTART EXPERIENCE
  // ========================================

  const restart = () => {

    setStage("welcome");
    setPopped([]);
    setCandleOut(false);
    setLetterOpen(false);

    // Music continues playing if already enabled.

  };

  // ========================================
  // WEBSITE UI
  // ========================================

  return (

    <main className="birthday-app">

      {/* ==================================
          BACKGROUND MUSIC
      ================================== */}

      <audio
        ref={audioRef}
        src={`${import.meta.env.BASE_URL}music/leberch-happy-birthday-581704.mp3`}
        loop
        preload="auto"
        onPlay={() => setMusic(true)}
        onPause={() => setMusic(false)}
        onError={() => {
          console.error("Unable to load birthday music");
          setMusic(false);
        }}
      />

      {/* ==================================
          FLOATING HEARTS
      ================================== */}

      <div className="floating-hearts">

        {Array.from({ length: 15 }, (_, i) => (

          <span
            key={i}
            style={{ "--i": i }}
          >
            ♥
          </span>

        ))}

      </div>

      {/* ==================================
          MUSIC BUTTON
      ================================== */}

      <button
        className="music-button"
        onClick={toggleMusic}
        aria-label={music ? "Pause music" : "Play music"}
      >

        {music ? <Volume2 /> : <Music />}

        {music ? "Music on" : "Play music"}

      </button>

      <div className="content">

        {/* =================================
            1. WELCOME SECTION
        ================================= */}

        {stage === "welcome" && (

          <section className="screen">

            <div className="emoji-big">
              💗
            </div>

            <p className="small-heading">
              A SPECIAL DAY FOR SOMEONE SPECIAL
            </p>

            <h1>
              Happy Birthday,
              <br />
              <span>Bhargavi!</span>
            </h1>

            <p className="description">
              I have prepared something special for you.
              Are you ready to open your surprise?
            </p>

            <div className="cute-emoji">
              🧸 🐰 🎀
            </div>

            <button
              className="primary-btn"
              onClick={next}
            >
              Yes, surprise me!
              <Heart size={18} />
            </button>

          </section>

        )}

        {/* =================================
            2. BALLOON SECTION
        ================================= */}

        {stage === "balloons" && (

          <section className="screen">

            <p className="small-heading">
              LET'S START THE CELEBRATION
            </p>

            <h2>
              Pop all 4 balloons!
            </h2>

            <p>
              Tap each balloon to reveal your surprise.
            </p>

            <div className="balloons">

              {["🎈", "🎈", "🎈", "🎈"].map((balloon, i) => (

                <button
                  key={i}
                  className={`balloon ${
                    popped.includes(i) ? "popped" : ""
                  }`}
                  onClick={() => popBalloon(i)}
                  disabled={popped.includes(i)}
                >

                  {popped.includes(i) ? "✨" : balloon}

                </button>

              ))}

            </div>

            <p className="message">

              {popped.length === 4
                ? "You are so special! ❤️"
                : `${popped.length}/4 balloons popped`}

            </p>

            {popped.length === 4 && (

              <button
                className="primary-btn"
                onClick={next}
              >
                Continue
                <ArrowRight size={18} />
              </button>

            )}

          </section>

        )}

        {/* =================================
            3. CAKE SECTION
        ================================= */}

        {stage === "cake" && (

          <section className="screen">

            <p className="small-heading">
              MAKE A WISH
            </p>

            <h2>
              Blow the candle, Bhargavi!
            </h2>

            <div className="cake">

              <div className="flame">
                {candleOut ? "" : "🔥"}
              </div>

              <div className="candle"></div>

              <div className="cake-top"></div>

              <div className="cake-bottom"></div>

            </div>

            <p className="description">

              {candleOut
                ? "May all your wishes come true! ✨"
                : "Close your eyes and make a wish."}

            </p>

            {!candleOut ? (

              <button
                className="primary-btn"
                onClick={() => setCandleOut(true)}
              >
                Blow the candle 🎂
              </button>

            ) : (

              <button
                className="primary-btn"
                onClick={next}
              >
                Continue
                <ArrowRight size={18} />
              </button>

            )}

          </section>

        )}

        {/* =================================
            4. FLOWERS SECTION
        ================================= */}

        {stage === "flowers" && (

          <section className="screen">

            <p className="small-heading">
              A LITTLE GIFT FOR YOU
            </p>

            <h2>
              Your Rose Bouquet 🌹
            </h2>

            <div className="bouquet">
              💐
            </div>

            <p className="description">
              Just like these roses, may your life
              always be filled with beauty and happiness.
            </p>

            <button
              className="primary-btn"
              onClick={next}
            >
              Next surprise
              <ArrowRight size={18} />
            </button>

          </section>

        )}

        {/* =================================
            5. MEMORIES SECTION
        ================================= */}

        {stage === "memories" && (

          <section className="screen memories-screen">

            <p className="small-heading">
              LITTLE MOMENTS, BIG MEMORIES
            </p>

            <h2>
              Some Sweet Moments
            </h2>

            <div className="photos">

              {photos.map((photo, i) => (

                <div
                  className="polaroid"
                  key={i}
                >

                  <img
                    src={photo.src}
                    alt={`Memory ${i + 1}`}
                    loading="lazy"
                  />

                  <p>
                    {photo.caption}
                  </p>

                </div>

              ))}

            </div>

            <button
              className="primary-btn"
              onClick={next}
            >
              Continue
              <ArrowRight size={18} />
            </button>

          </section>

        )}

        {/* =================================
            6. LOVE LETTER SECTION
        ================================= */}

        {stage === "letter" && (

          <section className="screen">

            <p className="small-heading">
              WORDS FROM MY HEART
            </p>

            <h2>
              A Message From My Heart
            </h2>

            {!letterOpen ? (

              <button
                className="envelope"
                onClick={() => setLetterOpen(true)}
              >

                💌

                <span>
                  Open your letter
                </span>

              </button>

            ) : (

              <div className="letter">

                <h3>
                  Dear Bhargavi, ❤️
                </h3>

                <p>
                  Happy Birthday to someone truly special!
                </p>

                <p>
                  I hope your day is filled with laughter,
                  beautiful memories and endless happiness.
                  Never stop smiling and chasing your dreams.
                </p>

                <p>
                  You deserve all the wonderful things
                  life has to offer.
                </p>

                <h3>
                  Lots of love! 💗
                </h3>

              </div>

            )}

            {letterOpen && (

              <button
                className="primary-btn"
                onClick={next}
              >
                One last surprise
                <Gift size={18} />
              </button>

            )}

          </section>

        )}

        {/* =================================
            7. FINAL SURPRISE SECTION
        ================================= */}

        {stage === "final" && (

          <section className="screen final-screen">

            <div className="emoji-big">
              🎁
            </div>

            <p className="small-heading">
              ONE LAST THING...
            </p>

            <h1>
              Happy Birthday!
            </h1>

            <div className="final-gift">
              🎀
              <span>💗</span>
            </div>

            <h2>
              Lots of love for you!
            </h2>

            <p className="description">
              May this year bring you beautiful surprises,
              unforgettable memories and everything
              your heart wishes for.
            </p>

            <div className="final-hearts">
              💗 💕 💖 💝
            </div>

            <button
              className="primary-btn"
              onClick={restart}
            >
              Start again
              <Heart size={18} />
            </button>

          </section>

        )}

      </div>

    </main>

  );

}

export default App;
