"use client";

import { Input } from "~/components/Input/Input";
import styles from "./page.module.css";
import { useRef, useState } from "react";
import { Spacer } from "~/components/Spacer/Spacer";
import { Button } from "~/components/Button/Button";
import { BackendService } from "~/services/BackendService";

export default function Page() {
  const [isRegistration, setIsRegistration] = useState(false);
  const userinput = useRef({
    username: "",
    password: "",
    repeatPassword: "",
  });

  const handleSubmit = async () => {
    // TODO: replace alert with something beautiful
    const data = userinput.current;
    if (!data.username.length || !data.password.length)
      return alert("fill in all required fields");

    if (isRegistration) {
      if (!data.repeatPassword.length)
        return alert("fill in all required fields");
      if (data.password !== data.repeatPassword)
        return alert("passwords do not match");

      const res = await BackendService.register({
        username: data.username,
        password: data.password,
      });
      
      alert(`${res ? "" : "un"}successfull register`);
      if (res) return (window.location.href = "/");
    } else {
      const res = await BackendService.login({
        username: data.username,
        password: data.password,
      });
      
      alert(`${res ? "" : "un"}successfull login`);
      if (res) return (window.location.href = "/");
    }
  };

  return (
    <>
      <div className={styles.pagetop} />
      <form className={styles.form}>
        <Input
          placeholder="username"
          onChange={(a) => void (userinput.current.username = a)}
          className={styles.input}
        />
        <Spacer size={7} />
        <Input
          placeholder="password"
          type="password"
          onChange={(a) => void (userinput.current.password = a)}
          className={styles.input}
        />
        {isRegistration && (
          <>
            <Spacer size={7} />
            <Input
              placeholder="repeat password"
              type="password"
              onChange={(a) => void (userinput.current.repeatPassword = a)}
              className={styles.input}
            />
          </>
        )}
        <Spacer size={14} />
        <Button
          className={styles.button}
          onClick={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          {isRegistration ? "Register" : "Login"}
        </Button>
      </form>
      <Spacer size={6} />
      {isRegistration ? (
        <p>
          already have an account yet?{" "}
          <a
            className={styles.registrationToggler}
            onClick={() => setIsRegistration(false)}
          >
            login
          </a>
        </p>
      ) : (
        <p>
          doesn&apos;t have an account yet?{" "}
          <a
            className={styles.registrationToggler}
            onClick={() => setIsRegistration(true)}
          >
            register
          </a>
        </p>
      )}
      <div className={styles.pagebottom} />
    </>
  );
}
