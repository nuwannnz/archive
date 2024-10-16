export const serialize = (obj: any) => {
  let str = "";
  // eslint-disable-next-line no-restricted-syntax, guard-for-in
  for (const key in obj) {
    if (obj[key] === "" || obj[key] === null) break;
    if (str !== "") {
      str += "&";
    }
    str += `${key}=${obj[key]}`;
  }
  return str;
};

export const getSortOptions = (sortOption: string) => {
  switch (sortOption) {
    case "atz":
      return { sortKey: "name", sortOrder: "asc" };
    case "zta":
      return { sortKey: "name", sortOrder: "desc" };
    case "lth":
      return { sortKey: "price", sortOrder: "asc" };
    case "htl":
      return { sortKey: "price", sortOrder: "desc" };
    default:
      return {};
  }
};

export const filterImages = (images: string[], size: string) =>
  images.filter((url) => url.split("/")[4] === size);

export const handleHeaderHide = (pathname: string) => {
  const hideHeaderPaths: string[] = ["/admin-auth", "/signup"];
  return !(
    pathname.split("/")[1] === "admin" || hideHeaderPaths.includes(pathname)
  );
};

const getRandomString = (bytes: number) => {
  const randomValues = new Uint8Array(bytes);
  window.crypto.getRandomValues(randomValues);
  return Array.from(randomValues)
    .map((nr) => nr.toString(16).padStart(2, "0"))
    .join("");
};

export default { getRandomString };
