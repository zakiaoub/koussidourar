export function parseDate(dateStr: string): Date | null {
  if (!dateStr) return null;

  // Sépare date et heure si présentes
  const [datePart, timePart] = dateStr.trim().split(' ');

  const [day, month, year] = datePart.split('/').map(Number);
  if (!day || !month || !year) return null;

  let hours = 0, minutes = 0, seconds = 0;

  if (timePart) {
    const timeParts = timePart.split(':').map(Number);
    [hours, minutes, seconds = 0] = timeParts;

    if (
      hours < 0 || hours > 23 ||
      minutes < 0 || minutes > 59 ||
      seconds < 0 || seconds > 59
    ) {
      return null;
    }
  }

  return new Date(year, month - 1, day, hours, minutes, seconds);
}
