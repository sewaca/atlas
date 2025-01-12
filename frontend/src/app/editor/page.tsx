"use client";

import { useRef } from "react";
import { Button } from "~/components/Button/Button";
import { Input } from "~/components/Input/Input";
import { MarkdownEditor } from "~/components/MarkdownEditor/MarkdownEditor";
import { Spacer } from "~/components/Spacer/Spacer";

import styles from "./page.module.css";
import { cx } from "~/utils/cx";
import { createPostAction } from "./action";
import { FileInput } from "~/components/FileInput/FileInput";

const INITIAL_TITLE = "My beautiful story";
const INITIAL_BODY = "**Nice day to share something with the world!**";

export default function Page() {
  const userdata = useRef({
    body: INITIAL_BODY,
    title: INITIAL_TITLE,
    image: "",
  });

  const handleChangeImage = async (file: File | null) => {
    if (!file) return (userdata.current.image = "");
    const base64image = await new Promise<string | ArrayBuffer | null>(
      (resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
      }
    );
    if (!base64image) {
      userdata.current.image = "";
      return alert("something gone wrong with file uploading");
    }
    userdata.current.image = base64image.toString();
  };

  const handleSubmit = async () => {
    if (
      !userdata.current.body ||
      !userdata.current.title
    ) {
      return alert("fill up all neccessary fields!");
    }

    const res = await createPostAction({
      body: userdata.current.body,
      title: userdata.current.title,
      image: userdata.current.image || "",
    });

    console.log(res);

    if (res === true) {
      alert("success");
      return (window.location.href = "/");
    } else {
      alert("something gone wrong");
    }
  };

  return (
    <>
      <h1>Editor: </h1>
      <Spacer size={12} />
      <FileInput
        className={cx(styles.input, styles.fileinput)}
        onChange={handleChangeImage}
        label="Post preview image: "
        accept="image/*"
      />
      <Spacer size={12} />
      <Input
        className={styles.input}
        onChange={(a) => (userdata.current.title = a)}
        required
        initValue={userdata.current.title}
        label="Title: "
      />
      <Spacer size={12} />
      <div style={{ width: "100%" }}>
        <p className={styles.label}>Body:</p>
        <MarkdownEditor
          initialValue={INITIAL_BODY}
          onChange={(a) => (userdata.current.body = a)}
        />
      </div>
      <Spacer size={22} />
      <Button onClick={handleSubmit}>Save</Button>
    </>
  );
}
