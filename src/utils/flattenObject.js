export default function flattenObject(obj) {
  const flatObject = {};
  Object.keys(obj).forEach((key) => {
    if (typeof obj[key] === "object") {
      const subFlat = flattenObject(obj[key]);
      Object.keys(subFlat).forEach((subkey) => {
        flatObject[`${key}.${subkey}`] = subFlat[subkey];
      });
    } else {
      flatObject[key] = obj[key];
    }
  });
  return flatObject;
}
