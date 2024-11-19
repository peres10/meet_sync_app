export const getDaysInMonth = (month, year) => {
    const days = [];
    const date = new Date(year, month - 1, 1); // month is 0-based in Date()
  
    while (date.getMonth() === month - 1) {
      days.push(date.getDate());
      date.setDate(date.getDate() + 1);
    }
  
    return days;
  };
  