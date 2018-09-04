//Turns linux-date to normal
export function normalizeDate(lnxDate) {
  if (lnxDate !== undefined) {
    return lnxDate.replace(/T/, ' ').substr(0, lnxDate.length - 5);
  }
  return lnxDate;
}
