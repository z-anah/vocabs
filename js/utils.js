const LANGUAGES = {
    indonesian: {
        id: "indonesian",
        name: "Indonesian",
        nativeName: "Bahasa Indonesia",
        csvField: "indonesian",
        ttsCode: "id-ID",
    },

    arabic: {
        id: "arabic",
        name: "Arabic",
        nativeName: "العربية",
        csvField: "arabic",
        ttsCode: "ar-SA",
    },

    english_us: {
        id: "english_us",
        name: "English (USA)",
        nativeName: "English (USA)",
        csvField: "english_us",
        ttsCode: "en-US",
    },

    french: {
        id: "french",
        name: "French",
        nativeName: "Français",
        csvField: "french",
        ttsCode: "fr-FR",
    },

    malagasy: {
        id: "malagasy",
        name: "Malagasy",
        nativeName: "Malagasy",
        csvField: "malagasy",
        ttsCode: "mg-MG",
    },
};

const DEFAULT_LANGUAGE = "english_us";

function getLanguage(languageId) {
    return LANGUAGES[languageId] ?? LANGUAGES[DEFAULT_LANGUAGE];
}

function getVocabularyText(item, languageId) {
    if (!item || !languageId) {
        return "";
    }

    const language = getLanguage(languageId);

    if (!language || !language.csvField) {
        return "";
    }

    return item[language.csvField] ?? "";
}

function getVocabularyImage(item, categoryId) {
    if (!item || !categoryId || !item.image) {
        return "";
    }

    return `./assets/images/${categoryId}/${item.image}`;
}

function shuffle(array) {
    const result = [...array];

    for (let i = result.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));

        [result[i], result[j]] = [result[j], result[i]];
    }

    return result;
}

function getRandomItems(items, count) {
    return shuffle(items).slice(0, count);
}

function getRandomWrongAnswers(items, correctItem, count) {
    return shuffle(
        items.filter((item) => item.id !== correctItem.id)
    ).slice(0, count);
}

function createMultipleChoiceOptions(
    items,
    correctItem,
    optionCount = 4
) {
    const wrongCount = Math.max(0, optionCount - 1);

    const wrongAnswers = getRandomWrongAnswers(
        items,
        correctItem,
        wrongCount
    );

    return shuffle([
        correctItem,
        ...wrongAnswers,
    ]);
}

function validateVocabularyItem(item) {
    const requiredFields = [
        "id",
        "category_id",
        "english_us",
        "indonesian",
        "arabic",
        "french",
        "malagasy",
        "image",
    ];

    return requiredFields.every(
        (field) =>
            Object.prototype.hasOwnProperty.call(item, field) &&
            item[field] !== ""
    );
}

function validateVocabularyDataset(items) {
    return Array.isArray(items) &&
        items.every(validateVocabularyItem);
}

function getCategoryImage(category) {
    return `./assets/images/categories/${category.image}`;
}

function getCategoryVocabularyPath(categoryId) {
    return `./data/${categoryId}/vocabulary.csv`;
}

function speakText(text, languageId) {
    if (!text || !("speechSynthesis" in window)) {
        return;
    }

    const language = getLanguage(languageId);

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);

    utterance.lang = language.ttsCode;
    utterance.rate = 0.9;
    utterance.pitch = 1;

    window.speechSynthesis.speak(utterance);
}