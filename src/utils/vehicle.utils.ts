export function formatLicensePlate(input: string): string {
    // Convert input to uppercase for consistency
    const upperInput = input.toUpperCase();

    // Define the license plate formats
    const formats = [
        { regex: /^([A-Z]{2})(\d{2})(\d{2})$/, format: "$1-$2-$3" }, // XX-99-99
        { regex: /^(\d{2})(\d{2})([A-Z]{2})$/, format: "$1-$2-$3" }, // 99-99-XX
        { regex: /^(\d{2})([A-Z]{2})(\d{2})$/, format: "$1-$2-$3" }, // 99-XX-99
        { regex: /^([A-Z]{2})(\d{2})([A-Z]{2})$/, format: "$1-$2-$3" }, // XX-99-XX
        { regex: /^([A-Z]{2})([A-Z]{2})(\d{2})$/, format: "$1-$2-$3" }, // XX-XX-99
        { regex: /^(\d{2})([A-Z]{2})([A-Z]{2})$/, format: "$1-$2-$3" }, // 99-XX-XX
        { regex: /^(\d{2})([A-Z]{3})(\d)$/, format: "$1-$2-$3" },       // 99-XXX-9
        { regex: /^(\d)([A-Z]{3})(\d{2})$/, format: "$1-$2-$3" },       // 9-XXX-99
        { regex: /^([A-Z]{2})(\d{3})([A-Z])$/, format: "$1-$2-$3" },    // XX-999-X
        { regex: /^([A-Z])(\d{3})([A-Z]{2})$/, format: "$1-$2-$3" },    // X-999-XX
        { regex: /^([A-Z]{3})(\d{2})([A-Z])$/, format: "$1-$2-$3" },    // XXX-99-X
        { regex: /^([A-Z])(\d{2})([A-Z]{3})$/, format: "$1-$2-$3" },    // X-99-XXX
        { regex: /^(\d)([A-Z]{2})(\d{3})$/, format: "$1-$2-$3" },       // 9-XX-999
        { regex: /^(\d{3})([A-Z]{2})(\d)$/, format: "$1-$2-$3" },       // 999-XX-9
    ];

    // Iterate through the formats and apply the first matching one
    for (const { regex, format } of formats) {
        if (regex.test(upperInput)) {
            return upperInput.replace(regex, format);
        }
    }

    // If no format matches, return the input unchanged
    return input;
}