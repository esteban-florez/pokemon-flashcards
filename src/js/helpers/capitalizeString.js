const capitalizeString = (string) => {
    const words = string.split('-');
    
    const capitalizedWords = words.map(word => {
        const upperFirstLetter = word[0].toUpperCase()
        const remainingLetters = word.slice(1);
        return `${upperFirstLetter}${remainingLetters}`;   
    });

    return capitalizedWords.join(' ');
}
export default capitalizeString;