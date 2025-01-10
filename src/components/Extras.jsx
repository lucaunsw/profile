import React from "react";
import { Link } from "react-router-dom";

export default function Extras() {
  return (
    <div className="about">
      <ExitArrow />
      <div>
        <h1 className="extras">Extras</h1>
        <span>
          Here's some extra info about me that I couldn't fit under a flag...
        </span>
      </div>
      <hr />
      <div>
        <h2>Tricking</h2>
        <span>
          Although it's been a while (a couple years actually 💀) I enjoyed
          training tricking a lot. You’ve probably never heard of it, but it’s basically a crazy mix of gymnastics, martial arts, and breakdancing.{" "}
          <a href="https://youtu.be/reMjScwSlqs" target="_blank">
            Here's a clip
          </a>{" "}
          of the proudest movement I've ever attempted back in the day - a
          touchdown raiz boxcutter.
        </span>
      </div>
    </div>
  );
}

function ExitArrow() {
  return (
    <Link to="/home">
      <svg
        className="exit-arrow"
        xmlns="http://www.w3.org/2000/svg"
        width="30"
        height="30"
        viewBox="0 0 24 24"
      >
        <path d="m4.431 12.822 13 9A1 1 0 0 0 19 21V3a1 1 0 0 0-1.569-.823l-13 9a1.003 1.003 0 0 0 0 1.645z"></path>
      </svg>
    </Link>
  );
}
