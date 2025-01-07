"use client";

import { Input } from "~/components/Input/Input";
import styles from "./page.module.css";
import { useRef, useState } from "react";
import { Spacer } from "~/components/Spacer/Spacer";
import { Button } from "~/components/Button/Button";

export default function Page() {
  const [isRegistration, setIsRegistration] = useState(false);
  const userinput = useRef({
    username: "",
    password: "",
    repeatPassword: "",
  });

  const handleSubmit = async () => {
    console.log(userinput.current);
  };

  return (
    <div className={styles.page}>
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
    </div>
  );
}
