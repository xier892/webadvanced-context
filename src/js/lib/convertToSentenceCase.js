const firstLetterUpper = (string) => string.toLowerCase().replace(/(^\s*\w|[\.\!\?]\s*\w)/g, (c) => c.toUpperCase());

const convertToSentenceCase = (string) => firstLetterUpper(string);
