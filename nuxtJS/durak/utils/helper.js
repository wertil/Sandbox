export const getDurakChannelName = (year, quarter) => {
  if (typeof year === "number" && typeof quarter === "number") {
    return `DURAK_${year}_${quarter}_JSON.json`;
  }
  return undefined;
};
