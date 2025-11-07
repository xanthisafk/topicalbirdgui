import toTitleCase from "@/helpers/toTitlecase";

function formatTimeData(targetDate, locale = undefined) {
    const date = new Date(targetDate);

    const precise = new Intl.DateTimeFormat(locale, {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
    }).format(date);

    const MS_PER_SECOND = 1000;
    const MS_PER_MINUTE = 60 * MS_PER_SECOND;
    const MS_PER_HOUR = 60 * MS_PER_MINUTE;
    const MS_PER_DAY = 24 * MS_PER_HOUR;
    const MS_PER_WEEK = 7 * MS_PER_DAY;
    const MS_PER_MONTH = 30.44 * MS_PER_DAY; 
    const MS_PER_YEAR = 365.25 * MS_PER_DAY;

    const timeDifference = date.getTime() - Date.now();

    const timeUnits = [
        { unit: 'year', ms: MS_PER_YEAR },
        { unit: 'month', ms: MS_PER_MONTH },
        { unit: 'week', ms: MS_PER_WEEK },
        { unit: 'day', ms: MS_PER_DAY },
        { unit: 'hour', ms: MS_PER_HOUR },
        { unit: 'minute', ms: MS_PER_MINUTE },
        { unit: 'second', ms: MS_PER_SECOND },
    ];

    let finalUnit = 'second';
    let finalValue = Math.round(timeDifference / MS_PER_SECOND); 

    for (const { unit, ms } of timeUnits) {
        const value = timeDifference / ms;
        if (Math.abs(value) >= 1) {
            finalUnit = unit;
            finalValue = Math.round(value);
            break;
        }
    }

    const rtf = new Intl.RelativeTimeFormat(locale, {
        numeric: 'auto',
        style: 'long'    
    });
    const relative = toTitleCase(rtf.format(finalValue, finalUnit));

    return {
        relative,
        precise
    };
}

export default formatTimeData;