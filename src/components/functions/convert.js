export const convertToIdr = (data, prefix = "IDR") => {
  //console.log(data, "data masuk??");

  if (data === null) {
    return prefix + "0";
  }

  //let intoStr = data && data.toString();
  let intoStr = JSON.stringify(data);
  let jumStr = intoStr && intoStr.length;
  let idr = "";
  let i = -3;

  while (jumStr > 0) {
    idr = "." + intoStr.substr(i, jumStr > 3 ? 3 : jumStr) + idr;
    jumStr = jumStr - 3;
    i = jumStr > 3 ? i - 3 : i - jumStr;
  }

  return prefix + " " + idr.substr(1);
};

/**
 *  getFullYear() - Returns the 4-digit year
 *  getMonth() - Returns a zero-based integer (0-11) representing the month of the year.
 *  getDate() - Returns the day of the month (1-31).
 *  getDay() - Returns the day of the week (0-6). 0 is Sunday, 6 is Saturday.
 *  getHours() - Returns the hour of the day (0-23).
 *  getMinutes() - Returns the minute (0-59).
 *  getSeconds() - Returns the second (0-59).
 *  getMilliseconds() - Returns the milliseconds (0-999).
 *  getTimezoneOffset() - Returns the number of minutes between the machine local time and
 **/

export const getMonthFormat = (data) => {
  let months = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];
  let value = months[data];

  return value;
};

export const getMonthFormatSmall = (data) => {
  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "Mei",
    "Jun",
    "Jul",
    "Agt",
    "Sep",
    "Oct",
    "Nov",
    "Des",
  ];
  let value = months[data];

  return value;
};

export const getDayFormat = (data) => {
  let days = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
  let value = days[data];

  return value;
};

export const getTimezone = (format = "Asia/Jakarta") => {
  switch (format) {
    case "Asia/Jakarta":
      return "WIB";
    case "Asia/Makassar":
      return "WITA";
    case "Asia/Jayapura":
      return "WIT";
  }
};
