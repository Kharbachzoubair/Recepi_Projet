import React from "react";
import styles from "./HomePage.module.css";
import { NavLink } from "react-router-dom";
// import recepi from "./recepi.png";

export default function Homepage() {
  return (
    <main className={styles.homepage}>
      <PageNav />

      <section>
        <h1>
          Find your prefered recipets just by one click.
          <br />
          With Recepi
        </h1>
        <h2>
          A site that provide to you more than 1.000.000 recipites and give the
          disponibility of adding recipites to your bookmark ☘
        </h2>
        {/* <a href="google.com" className={styles.cta}>
          Start Now !!
        </a> */}
        <NavLink to="search" className={styles.cta} > Start Now !! </NavLink>
      </section>
    </main>
  );
}

function PageNav() {
  return (
    <nav className={styles.nav}>
      <Logo />

      <ul>
        <li>
          <a href="google.com">About us</a>
        </li>
        <li>
          <a href="#">Choose your language</a>{" "}
          <select name="" id="">
            {/* <option value="" disabled>Choose your Language </option> */}
            <option value="">English</option>
            <option value="">Arabic</option>
          </select>{" "}
        </li>
      </ul>
    </nav>
  );
}

function Logo() {
  return (
    <a href="google.com">
      {/* <img src={recepi} alt="recepi logo" className={styles.logo} /> */}
      <h3 className="text-3xl font-semibold tracking-widest font-mono" >🥦 Recepi</h3>
    
    </a>
  );
}
