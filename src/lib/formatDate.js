const formatScanDate = (dateString) => {
  if (!dateString) return "Today, 02:36 PM";

  const date = new Date(dateString);
  const now = new Date();

  const time = date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  const isToday = date.toDateString() === now.toDateString();

  return isToday
    ? `Today, ${time}`
    : `${date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })}, ${time}`;
};

export default formatScanDate;
