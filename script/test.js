function getTimeString(time) {
  // Get hours, minutes, and remaining seconds
  const hour = Math.floor(time / 3600);
  let remainingSecond = time % 3600;
  const minute = Math.floor(remainingSecond / 60);
  remainingSecond = remainingSecond % 60;

  // Handle pluralization
  const hourString = hour === 1 ? `${hour} hour` : `${hour} hours`;
  const minuteString = minute === 1 ? `${minute} minute` : `${minute} minutes`;
  const secondString =
    remainingSecond === 1
      ? `${remainingSecond} second`
      : `${remainingSecond} seconds`;

  // Return formatted string
  return `${hourString}, ${minuteString}, and ${secondString} ago`;
}

console.log(getTimeString(7865)); // Output: 2 hours, 11 minutes, and 5 seconds ago
