export const QUOTES = [
    'Be yourself; everyone else is already taken. - Oscar Wilde',
    'Two things are infinite: the universe and human stupidity; and I\'m not sure about the universe. - Albert Einstein',
    'Programs must be written for people to read. — Abelson & Sussman',
    'Simplicity is the soul of efficiency. — Austin Freeman',
    'You only live once, but if you do it right, once is enough. - Mae West'
];
export function randomQuote() {
    return QUOTES[Math.floor(Math.random()*QUOTES.length)];
}