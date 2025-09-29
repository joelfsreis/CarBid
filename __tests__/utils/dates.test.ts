import { formatBidDate } from '../../src/utils/dates';

describe('Utils - Dates', () => {
  describe('formatBidDate', () => {
    it('should format past dates correctly', () => {
      const pastDate = new Date();
      pastDate.setHours(pastDate.getHours() - 25); // 5 hours in the future
      const result = formatBidDate(pastDate);
      expect(result.ended).toBe(true);
      expect(result.message).toBe('Auction ended');
    });

    it('should past past dates correctly with less than a day', () => {
      const pastDate = new Date();
      pastDate.setHours(pastDate.getHours() - 23); // 3 hours in the past
      const result = formatBidDate(pastDate);
      expect(result.ended).toBe(false);
      expect(result.message).toBe('about 23 hours');
    });

    it('should handle dates that are exactly now', () => {
      const now = new Date();
      const result = formatBidDate(now);
      expect(result.ended).toBe(false);
      expect(result.message).toBe('less than a minute');
    });
  });
});
