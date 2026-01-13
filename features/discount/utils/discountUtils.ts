import { TimeLeft } from "../types/discountTypes";

export const calculateTimeLeft = (expiryDate: string): TimeLeft => {
    const difference = +new Date(expiryDate) - +new Date();
    let timeLeft: TimeLeft = {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    };

    if (difference > 0) {
        timeLeft = {
            days: Math.floor(difference / (1000 * 60 * 60 * 24)),
            hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
            minutes: Math.floor((difference / 1000 / 60) % 60),
            seconds: Math.floor((difference / 1000) % 60),
        };
    }

    return timeLeft;
};

export const formatTime = (time: number): string => {
    return time < 10 ? `0${time}` : time.toString();
};
