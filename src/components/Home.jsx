import { useEffect, useState } from "react";
import "../App.css";
import arcaneImg from "../../public/arcane.jpg";
import beefphoImg from "../../public/beefpho.png";
import hollowImg from "../../public/hollow.jpg";
import luccaImg from "../../public/lucca.jpg";
import maldivesImg from "../../public/maldives.jpg";
import { Link } from "react-router-dom";

const greetings = [
  "Hello!",
  "Xin chào!",
  "Grüezi!",
  "Ciao!",
  "Bonjour!",
  "Hola!",
  "你好!",
  "Guten Tag!",
  "こんにちは!",
  "नमस्ते!",
];

export default function Home() {
  const [currentGreeting, setCurrentGreeting] = useState(greetings[0]);
  const [fade, setFade] = useState(true);
  const [isHeaderVisible, setIsHeaderVisible] = useState(false);
  const [currFlag, setCurrFlag] = useState(null);
  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme ? JSON.parse(savedTheme) : true;
  });

  // Save theme to localStorage: called when "darkMode" state changes
  useEffect(() => {
    localStorage.setItem("theme", JSON.stringify(darkMode));
  }, [darkMode]);
  // Update theme to light/dark
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("darkmode");
    } else {
      document.body.classList.remove("darkmode");
    }
  }, [darkMode]);

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setIsHeaderVisible(true);
      } else {
        setIsHeaderVisible(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    let greetingIndex = 0;

    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        greetingIndex = (greetingIndex + 1) % greetings.length;
        setCurrentGreeting(greetings[greetingIndex]);
        setFade(true);
      }, 500);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const sections = document.querySelectorAll(".section");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // console.log(`scrolled to ${entry.target.id}`);
            setCurrFlag(entry.target.id);
          }
        });
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0.5,
      }
    );

    sections.forEach((section) => {
      observer.observe(section);
    });

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  return (
    <div className="App">
      <Header
        isHeaderVisible={isHeaderVisible}
        scrollToSection={scrollToSection}
        currFlag={currFlag}
      />
      <Mode darkMode={darkMode} onDarkMode={setDarkMode} />
      <Globe />
      <div className="introduction">
        <Greeting fade={fade} currentGreeting={currentGreeting} />
        <span>I'm Luca, it's really nice to meet you</span>
        <Arrow scrollToSection={scrollToSection} />
      </div>
      <Australia />
      <Vietnam />
      <Switzerland />
      <Italy />
      <Maldives />
      <Games />
    </div>
  );
}

function Greeting({ fade, currentGreeting }) {
  return (
    <>
      <h1 className={`greeting ${fade ? "fade-in" : "fade-out"}`}>
        {currentGreeting}
      </h1>
    </>
  );
}

function Mode({ darkMode, onDarkMode }) {
  return (
    <button className="themeButton" onClick={() => onDarkMode(!darkMode)}>
      {darkMode ? (
        <svg
          className="sun"
          xmlns="http://www.w3.org/2000/svg"
          width="34"
          height="34"
          viewBox="0 0 24 24"
        >
          <path d="M6.995 12c0 2.761 2.246 5.007 5.007 5.007s5.007-2.246 5.007-5.007-2.246-5.007-5.007-5.007S6.995 9.239 6.995 12zM11 19h2v3h-2zm0-17h2v3h-2zm-9 9h3v2H2zm17 0h3v2h-3zM5.637 19.778l-1.414-1.414 2.121-2.121 1.414 1.414zM16.242 6.344l2.122-2.122 1.414 1.414-2.122 2.122zM6.344 7.759 4.223 5.637l1.415-1.414 2.12 2.122zm13.434 10.605-1.414 1.414-2.122-2.122 1.414-1.414z"></path>
        </svg>
      ) : (
        <svg
          className="moon"
          xmlns="http://www.w3.org/2000/svg"
          width="34"
          height="34"
          viewBox="0 0 24 24"
        >
          <path d="M12 11.807A9.002 9.002 0 0 1 10.049 2a9.942 9.942 0 0 0-5.12 2.735c-3.905 3.905-3.905 10.237 0 14.142 3.906 3.906 10.237 3.905 14.143 0a9.946 9.946 0 0 0 2.735-5.119A9.003 9.003 0 0 1 12 11.807z"></path>
        </svg>
      )}
    </button>
  );
}

function Globe() {
  return (
    <span className="globe">
      <Link to="/extras">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 36 36"
          aria-hidden="true"
          role="img"
          width="3rem"
          height="3rem"
          preserveAspectRatio="xMidYMid meet"
        >
          <circle fill="#88C9F9" cx="18" cy="18" r="18"></circle>
          <path
            fill="#5C913B"
            d="M2.812 25.375c-.062-1-.062-1.187-.062-2.375s.562-1 1.125-1.562s.438-.625 1.375-1.241s.438-1.321.375-1.696s-.625-.063-1.563.061s-.624-.312-1.187-.562s-.812-.625-1.188-1.75s-.438-1.438-.312-2.375s.563-.063.625.937s.938.625.938 1.25s1.25 1.312 1.562 1.5s1.188-.938 1.5-1.25s.688-.75.812-1s1.688-.438 2-.438s1.062.938 1.062 1.375s.375 1.625.688 2.312s1 .812 1.625 1.312s.938.062.938.062s-.25-1.062-.25-1.938s.75-1.625.75-1.625s1.188.875 1.25 1.125s1 1.125 1.062 1.562s.562 1 1.483 1.125s.267-1.062.579-1.875s.75-.938 1.312-1.062s1-.625 1.375-1.125s1.062-1.188 1-1.75s-.25-.938-.5-1.625s.75-.938 1.188-1.75s0 0 1-.25s.562-.25.75-.625s.312-.75.125-1.438s-.875 0-1.562 0S22.938 7.75 23 7s.938-.562 1.562-.625s.812.812 1 1s2.125-1.25 2.625-1.938s-.437-.499-.187-.789s-1.5-.349-2.188-.46s-2.437-.188-3.124-.612s-3.312-.104-4 .237s-1.125-.029-1.438-.5s-1.625-.235-2-.5s-.75.437-1.25.625s-.688.25-1.312-.125s.187-.813-.688-1.125c-.586-.209-1.288-.087-2.38-.111C3.902 5.092 0 11.087 0 18c0 3.42.971 6.605 2.627 9.327c.308-.518.231-1.217.185-1.952zm14.5-1.187c.438.062 1.688 0 .688-.812s-1.562-.188-1.438-1.125s-.625-.938-.625-.938c0 .688-.5 1.438 0 2.125s.938.687 1.375.75z"
          ></path>
          <path
            fill="#5C913B"
            d="M23.688 13.75c-1-.812-.25-.562-.125-1.5s-.625-.938-.625-.938c0 .688-.5 1.438 0 2.125s-1 1.25-.562 1.312s2.312-.187 1.312-.999zm-3.88 9.75c.62.688.38 0 1.192-.312s-.688-1-1.188-1.375s-.997-.389-1.434.438c-.496.937.81.561 1.43 1.249zm7.317 1.25c-.312-.375-1-.562-1.75-.545c-.75.018-.688-.83-1.438-.768s-1.286-.504-1.625-.679c-.737-.38-.25.491 0 1.446s1.188.232 2.062.732s.938-.188 1.75.062s1.125.812 1.904.75s-.59-.623-.903-.998zM25.5 27.5c-.312-.625-1.226-1.188-1.601-1.505s-.962-.424-1.462-.24s-.812 0-1.062-.495s-.688-.322-1.062-.26s-1.875.688-2.75 1.125s-1.273.817-1.847 1.375c-.898.874-.403.312 0 .875c.403.562-.442 2.312-.504 3.312s1.602-.312 2.227-.438s.441-.5.941-.875s.825-.463 1.374.037c.549.5 1.268.963 1.268 1.525s1.979 1.5 2.729 1.125s1.188-1.125 1.875-1.75s.438-1.812.625-2.562s-.439-.624-.751-1.249z"
          ></path>
        </svg>
      </Link>
    </span>
  );
}

function Arrow({ scrollToSection }) {
  return (
    <svg
      onClick={() => scrollToSection("australia")}
      className="arrow"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      style={{
        fill: "",
        transform: "",
        msFilter: "",
      }}
    >
      <path d="M11.178 19.569a.998.998 0 0 0 1.644 0l9-13A.999.999 0 0 0 21 5H3a1.002 1.002 0 0 0-.822 1.569l9 13z"></path>
    </svg>
  );
}

function Header({ isHeaderVisible, scrollToSection, currFlag }) {
  return (
    <header className={`side ${isHeaderVisible ? "visible" : ""}`}>
      <span
        className={`flag australia-flag ${
          currFlag === "australia" ? "full-opacity" : ""
        }`}
        onClick={() => scrollToSection("australia")}
      >
        🇦🇺
      </span>
      <span
        className={`flag vietnam-flag ${
          currFlag === "vietnam" ? "full-opacity" : ""
        }`}
        onClick={() => scrollToSection("vietnam")}
      >
        🇻🇳
      </span>
      <span
        className={`flag switzerland-flag ${
          currFlag === "switzerland" ? "full-opacity" : ""
        }`}
        onClick={() => scrollToSection("switzerland")}
      >
        🇨🇭
      </span>
      <span
        className={`flag italy-flag ${
          currFlag === "italy" ? "full-opacity" : ""
        }`}
        onClick={() => scrollToSection("italy")}
      >
        🇮🇹
      </span>
      <span
        className={`flag maldives-flag ${
          currFlag === "maldives" ? "full-opacity" : ""
        }`}
        onClick={() => scrollToSection("maldives")}
      >
        🇲🇻
      </span>
      <span
        className={`flag games-flag ${
          currFlag === "games" ? "full-opacity" : ""
        }`}
        onClick={() => scrollToSection("games")}
      >
        🏁
      </span>
    </header>
  );
}

function Australia() {
  return (
    <div id="australia" className="section">
      <span>🇦🇺</span>
      <div className="content">
        <p>
          Currently in my 2nd year of Software Engineering here at Sydney, UNSW.
        </p>
        <p>
          I love learning and experimenting with code, like with this very
          profile website where I used React for the first time :]
        </p>
        <TechStack />
      </div>
    </div>
  );
}

function TechStack() {
  return (
    <div className="tech-stack">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="44"
        height="44"
        viewBox="0 0 24 24"
        style={{ fill: "#e54d26" }}
      >
        <path d="M4.136 3.012h15.729l-1.431 16.15-6.451 1.826-6.414-1.826-1.433-16.15zm5.266 7.302-.173-2.035 7.533.002.173-1.963-9.87-.002.522 5.998h6.835l-.243 2.566-2.179.602-2.214-.605-.141-1.58H7.691l.247 3.123L12 17.506l4.028-1.08.558-6.111H9.402v-.001z"></path>
      </svg>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="44"
        height="44"
        viewBox="0 0 24 24"
        style={{ fill: "#264ee4" }}
      >
        <path d="M4.192 3.143h15.615l-1.42 16.034-6.404 1.812-6.369-1.813L4.192 3.143zM16.9 6.424l-9.8-.002.158 1.949 7.529.002-.189 2.02H9.66l.179 1.913h4.597l-.272 2.62-2.164.598-2.197-.603-.141-1.569h-1.94l.216 2.867L12 17.484l3.995-1.137.905-9.923z"></path>
      </svg>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="44"
        height="44"
        viewBox="0 0 24 24"
        style={{ fill: "#d8c546" }}
      >
        <path d="M3 3h18v18H3V3zm16.525 13.707c-.131-.821-.666-1.511-2.252-2.155-.552-.259-1.165-.438-1.349-.854-.068-.248-.078-.382-.034-.529.113-.484.687-.629 1.137-.495.293.09.563.315.732.676.775-.507.775-.507 1.316-.844-.203-.314-.304-.451-.439-.586-.473-.528-1.103-.798-2.126-.775l-.528.067c-.507.124-.991.395-1.283.754-.855.968-.608 2.655.427 3.354 1.023.765 2.521.933 2.712 1.653.18.878-.652 1.159-1.475 1.058-.607-.136-.945-.439-1.316-1.002l-1.372.788c.157.359.337.517.607.832 1.305 1.316 4.568 1.249 5.153-.754.021-.067.18-.528.056-1.237l.034.049zm-6.737-5.434h-1.686c0 1.453-.007 2.898-.007 4.354 0 .924.047 1.772-.104 2.033-.247.517-.886.451-1.175.359-.297-.146-.448-.349-.623-.641-.047-.078-.082-.146-.095-.146l-1.368.844c.229.473.563.879.994 1.137.641.383 1.502.507 2.404.305.588-.17 1.095-.519 1.358-1.059.384-.697.302-1.553.299-2.509.008-1.541 0-3.083 0-4.635l.003-.042z"></path>
      </svg>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="44"
        height="44"
        viewBox="0 0 24 24"
        style={{ fill: "#61DBFB" }}
      >
        <circle cx="12" cy="11.245" r="1.785"></circle>
        <path d="m7.002 14.794-.395-.101c-2.934-.741-4.617-2.001-4.617-3.452 0-1.452 1.684-2.711 4.617-3.452l.395-.1.111.391a19.507 19.507 0 0 0 1.136 2.983l.085.178-.085.178c-.46.963-.841 1.961-1.136 2.985l-.111.39zm-.577-6.095c-2.229.628-3.598 1.586-3.598 2.542 0 .954 1.368 1.913 3.598 2.54.273-.868.603-1.717.985-2.54a20.356 20.356 0 0 1-.985-2.542zm10.572 6.095-.11-.392a19.628 19.628 0 0 0-1.137-2.984l-.085-.177.085-.179c.46-.961.839-1.96 1.137-2.984l.11-.39.395.1c2.935.741 4.617 2 4.617 3.453 0 1.452-1.683 2.711-4.617 3.452l-.395.101zm-.41-3.553c.4.866.733 1.718.987 2.54 2.23-.627 3.599-1.586 3.599-2.54 0-.956-1.368-1.913-3.599-2.542a20.683 20.683 0 0 1-.987 2.542z"></path>
        <path d="m6.419 8.695-.11-.39c-.826-2.908-.576-4.991.687-5.717 1.235-.715 3.222.13 5.303 2.265l.284.292-.284.291a19.718 19.718 0 0 0-2.02 2.474l-.113.162-.196.016a19.646 19.646 0 0 0-3.157.509l-.394.098zm1.582-5.529c-.224 0-.422.049-.589.145-.828.477-.974 2.138-.404 4.38.891-.197 1.79-.338 2.696-.417a21.058 21.058 0 0 1 1.713-2.123c-1.303-1.267-2.533-1.985-3.416-1.985zm7.997 16.984c-1.188 0-2.714-.896-4.298-2.522l-.283-.291.283-.29a19.827 19.827 0 0 0 2.021-2.477l.112-.16.194-.019a19.473 19.473 0 0 0 3.158-.507l.395-.1.111.391c.822 2.906.573 4.992-.688 5.718a1.978 1.978 0 0 1-1.005.257zm-3.415-2.82c1.302 1.267 2.533 1.986 3.415 1.986.225 0 .423-.05.589-.145.829-.478.976-2.142.404-4.384-.89.198-1.79.34-2.698.419a20.526 20.526 0 0 1-1.71 2.124z"></path>
        <path d="m17.58 8.695-.395-.099a19.477 19.477 0 0 0-3.158-.509l-.194-.017-.112-.162A19.551 19.551 0 0 0 11.7 5.434l-.283-.291.283-.29c2.08-2.134 4.066-2.979 5.303-2.265 1.262.727 1.513 2.81.688 5.717l-.111.39zm-3.287-1.421c.954.085 1.858.228 2.698.417.571-2.242.425-3.903-.404-4.381-.824-.477-2.375.253-4.004 1.841.616.67 1.188 1.378 1.71 2.123zM8.001 20.15a1.983 1.983 0 0 1-1.005-.257c-1.263-.726-1.513-2.811-.688-5.718l.108-.391.395.1c.964.243 2.026.414 3.158.507l.194.019.113.16c.604.878 1.28 1.707 2.02 2.477l.284.29-.284.291c-1.583 1.627-3.109 2.522-4.295 2.522zm-.993-5.362c-.57 2.242-.424 3.906.404 4.384.825.47 2.371-.255 4.005-1.842a21.17 21.17 0 0 1-1.713-2.123 20.692 20.692 0 0 1-2.696-.419z"></path>
        <path d="M12 15.313c-.687 0-1.392-.029-2.1-.088l-.196-.017-.113-.162a25.697 25.697 0 0 1-1.126-1.769 26.028 26.028 0 0 1-.971-1.859l-.084-.177.084-.179c.299-.632.622-1.252.971-1.858.347-.596.726-1.192 1.126-1.77l.113-.16.196-.018a25.148 25.148 0 0 1 4.198 0l.194.019.113.16a25.136 25.136 0 0 1 2.1 3.628l.083.179-.083.177a24.742 24.742 0 0 1-2.1 3.628l-.113.162-.194.017c-.706.057-1.412.087-2.098.087zm-1.834-.904c1.235.093 2.433.093 3.667 0a24.469 24.469 0 0 0 1.832-3.168 23.916 23.916 0 0 0-1.832-3.168 23.877 23.877 0 0 0-3.667 0 23.743 23.743 0 0 0-1.832 3.168 24.82 24.82 0 0 0 1.832 3.168z"></path>
      </svg>
    </div>
  );
}

function Vietnam() {
  return (
    <div id="vietnam" className="section">
      <span>🇻🇳</span>
      <div className="content">
        <p>
          My background is Vietnamese. Plain basic Phở is probably my all-time
          favourite comfort food.
        </p>
        <img className="pho" src={beefphoImg} />
      </div>
    </div>
  );
}

function Switzerland() {
  return (
    <div id="switzerland" className="section">
      <span>🇨🇭</span>
      <div className="content">
        <p>
          Fun fact, I was born in the Switzerland city, Geneva (I know it's
          kinda ridiculous).
        </p>
        <img className="lucca" src={luccaImg} />
      </div>
    </div>
  );
}

function Italy() {
  return (
    <div id="italy" className="section">
      <span>🇮🇹</span>
      <div className="content">
        <p>
          One of my favourite places in the world is Positano in Italy (I was
          actually named after a city called{" "}
          <a
            href="https://www.google.com/search?client=firefox-b-d&q=lucca+italy"
            target="_blank"
          >
            Lucca
          </a>{" "}
          in Italy), the artwork in the museums there were insane. I've recently
          gotten back into digital painting—here is an in-progress of a scene
          from the show Arcane!
        </p>
        <img className="arcane" src={arcaneImg} />
      </div>
    </div>
  );
}

function Games() {
  return (
    <div id="games" className="section">
      <span>🏁</span>
      <div className="content">
        <p>I play a lot of games in my free time.</p>
        <p>
          I enjoy FPS games like Valorant but have recently gotten into
          Metroidvania and Soulslike games such as Hollow Knight and God of War.
        </p>
        <img className="games" src={hollowImg} />
      </div>
    </div>
  );
}

function Maldives() {
  return (
    <div id="maldives" className="section">
      <span>🇲🇻</span>
      <div className="content">
        <p>In my opinion, the best holiday location is the Maldives.</p>
        <p>
          Spending time there with my family after completing the HSC was an
          experience I'll never forget. Here's a photo I took...
        </p>
        <img className="maldives" src={maldivesImg} />
      </div>
    </div>
  );
}
