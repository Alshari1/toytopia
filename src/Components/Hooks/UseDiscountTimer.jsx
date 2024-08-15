import { useState, useEffect } from 'react';
import moment from 'moment';

const useDiscountTimer = (discountValidUntil) => {
  const [isDiscountValid, setIsDiscountValid] = useState(true);
  const [timeLeft, setTimeLeft] = useState('');

  useEffect(() => {
    const discountDuration = moment.duration(discountValidUntil); // Duration object from milliseconds
    const discountEndTime = moment().add(discountDuration); // End time from now

    const timerInterval = setInterval(() => {
      const now = moment(); // Current time
      const diff = discountEndTime.diff(now); // Difference in milliseconds

      if (diff <= 0) {
        setIsDiscountValid(false);
        clearInterval(timerInterval); // Clear the interval when the discount expires
      } else {
        const duration = moment.duration(diff);
        setTimeLeft(`${duration.days()}d ${duration.hours()}h ${duration.minutes()}m ${duration.seconds()}s`);
      }
    }, 1000);

    // Cleanup the timer on component unmount
    return () => clearInterval(timerInterval);
  }, [discountValidUntil]);

  return { isDiscountValid, timeLeft };
};

export default useDiscountTimer;
