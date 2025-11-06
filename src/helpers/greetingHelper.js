export const getGreeting = (name = "friend") => {
    const hour = new Date().getHours();
    const day = new Date().getDay();

    const greetings = {
        morning: [
            `Welcome back, ${name}`,
            `Good morning, ${name}!`,
            `Rise and shine, ${name}!`,
            `Hope you slept well, ${name}!`,
            `Mornin', ${name}! Nice day for fishin', ain't it?`
        ],
        afternoon: [
            `Welcome back, ${name}`,
            `Good afternoon, ${name}!`,
            `Hope your day's going great, ${name}!`,
            `Nice day, ${name}!`,
            `Hey there, ${name}!`,
            `It's high noon, ${name}...`,
            `Good afternoon, ${name}! And in case I don't see ya, good evening and good night!`
        ],
        evening: [
            `Welcome back, ${name}`,
            `Good evening, ${name}!`,
            `Hope you had a great day, ${name}.`,
            `Nice to see you this evening, ${name}.`,
            `Evening, 007... uh... ${name}`
        ],
        late: [
            `Welcome back, ${name}`,
            `Up late, ${name}?`,
            `Still awake, ${name}?`,
            `You're a night owl, ${name}!`,
            `Ah, you're finally awake, ${name}.`
        ]
    };

    const daySpecials = {
        1: [`Mondays... Mondays never change.`],
        3: [`It's Wednesday, my dude!`],
    };

    let period;
    if (hour >= 5 && hour < 12) period = "morning";
    else if (hour >= 12 && hour < 17) period = "afternoon";
    else if (hour >= 17 && hour < 22) period = "evening";
    else period = "late";

    let options = greetings[period];
    if (daySpecials[day] && Math.random() < 0.25) {
        options = [...options, ...daySpecials[day]];
    }
    return options[Math.floor(Math.random() * options.length)];
}
