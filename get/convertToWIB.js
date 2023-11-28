// Fungsi konversi waktu ke zona waktu Indonesia Barat (WIB)
export function convertToWIB(utcTimeString) {
    const utcDate = new Date(utcTimeString);
    const wibDate = new Date(utcDate.toLocaleString("en-US", { timeZone: "Asia/Jakarta" }));
  
    const options = {
      day: "numeric",
      month: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
    };
  
    return wibDate.toLocaleString("id-ID", options);
  }
  