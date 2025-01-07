type ClassObject = {
  [key: string]: unknown;
};
export const cx = (...classes: (string | ClassObject | undefined)[]) => {
  const classnames: string[] = [];

  classes.forEach((item) => {
    if (typeof item === "string") return classnames.push(item);
    if (!item) return;
    Object.entries(item).forEach(([key, flag]) => {
      if (flag) classnames.push(key);
    });
  });

  return classnames.join(" ");
};
