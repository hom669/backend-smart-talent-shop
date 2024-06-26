// Función para generar una letra aleatoria de A a Z
const randomLetter = (): string => {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const randomIndex = Math.floor(Math.random() * letters.length);
    return letters[randomIndex];
};

// Función para generar un dígito aleatorio de 0 a 9
const randomDigit = (): string => {
    return Math.floor(Math.random() * 10).toString();
};

// Función para generar un código aleatorio con 3 letras y 4 números
export const generateRandomCode = (): string => {
    // Generar 3 letras
    const letters = Array.from({ length: 3 }, randomLetter);

    // Generar 4 números
    const numbers = Array.from({ length: 4 }, randomDigit);

    // Combinar letras y números
    const combined = [...letters, ...numbers];

    // Mezclar el arreglo combinado
    for (let i = combined.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [combined[i], combined[j]] = [combined[j], combined[i]]; // Intercambio de posiciones
    }

    // Unir el arreglo para obtener el código final
    return combined.join('');
};

export const imageRandomAuto = (nameImage: string): string => {
    const wordSearch = nameImage.split(' ');
    //console.log(wordSearch[0].trim(), process.env.REP_IMAGE);
    return process.env.REP_IMAGE + wordSearch[0].trim();
}