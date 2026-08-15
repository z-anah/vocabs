const { createApp } = Vue;

const App = {
    data() {
        return {
            // Current screen
            currentScreen: "language",

            // Available data
            languages: Object.values(LANGUAGES),

            learningModes: [
                {
                    id: "browse",
                    name: "Browse Vocabulary",
                    description: "View all vocabulary items and hear their pronunciation.",
                    icon: "menu_book",
                },
                {
                    id: "one_by_one",
                    name: "Learn One by One",
                    description: "Learn each vocabulary item in a predefined order.",
                    icon: "play_circle",
                },
                {
                    id: "audio_to_image",
                    name: "Guess Image from Audio",
                    description: "Listen to the pronunciation and choose the matching image.",
                    icon: "volume_up",
                },
                {
                    id: "image_guess",
                    name: "Guess the Image",
                    description: "Look at an image and guess the vocabulary item.",
                    icon: "image",
                },
            ],

            categories: [],
            vocabulary: [],

            // User selections
            selectedLanguage: null,
            selectedCategory: null,
            selectedMode: null,

            // Learning session
            currentIndex: 0,
            score: 0,
            testedItems: [],

            // UI state
            isLoading: false,
            errorMessage: "",
        };
    },

    computed: {
        modeCount() {
            return this.learningModes.length;
        },

        currentLanguage() {
            return getLanguage(this.selectedLanguage);
        },

        currentCategory() {
            return this.categories.find(
                (category) => category.id === this.selectedCategory
            ) ?? null;
        },

        currentItem() {
            return this.vocabulary[this.currentIndex] ?? null;
        },

        currentVocabularyText() {
            if (!this.currentItem || !this.selectedLanguage) {
                return "";
            }

            return getVocabularyText(
                this.currentItem,
                this.selectedLanguage
            );
        },

        languageCount() {
            return this.languages.length;
        },

        categoryCount() {
            return this.categories.length;
        },
    },

    async mounted() {
        await this.initialize();
    },

    methods: {

        getCategoryImage(category) {
            return getCategoryImage(category);
        },

        async initialize() {
            this.isLoading = true;
            this.errorMessage = "";

            try {
                this.categories = await loadCategories();
            } catch (error) {
                console.error(error);

                this.errorMessage =
                    "Unable to load vocabulary categories.";
            } finally {
                this.isLoading = false;
            }
        },

        selectLanguage(languageId) {
            this.selectedLanguage = languageId;

            this.selectedCategory = null;
            this.selectedMode = null;
            this.vocabulary = [];

            this.currentIndex = 0;
            this.score = 0;
            this.testedItems = [];

            this.currentScreen = "category";
        },

        async selectCategory(categoryId) {
            this.selectedCategory = categoryId;
            this.selectedMode = null;

            this.currentIndex = 0;
            this.score = 0;
            this.testedItems = [];

            this.isLoading = true;
            this.errorMessage = "";

            try {
                this.vocabulary = await loadVocabulary(categoryId);

                this.currentScreen = "mode";
            } catch (error) {
                console.error(error);

                this.errorMessage =
                    "Unable to load this vocabulary dataset.";
            } finally {
                this.isLoading = false;
            }
        },

        selectMode(modeId) {
            this.selectedMode = modeId;

            this.currentIndex = 0;
            this.score = 0;
            this.testedItems = [];

            this.currentScreen = "learning";
        },

        goToLanguageSelection() {
            this.selectedLanguage = null;
            this.selectedCategory = null;
            this.selectedMode = null;
            this.vocabulary = [];

            this.currentIndex = 0;
            this.score = 0;
            this.testedItems = [];

            this.currentScreen = "language";
        },

        goToCategorySelection() {
            this.selectedCategory = null;
            this.selectedMode = null;
            this.vocabulary = [];

            this.currentIndex = 0;
            this.score = 0;
            this.testedItems = [];

            this.currentScreen = "category";
        },

        goToModeSelection() {
            this.selectedMode = null;

            this.currentIndex = 0;
            this.score = 0;
            this.testedItems = [];

            this.currentScreen = "mode";
        },

        restartLearning() {
            this.currentIndex = 0;
            this.score = 0;
            this.testedItems = [];

            this.currentScreen = "learning";
        },
    },
};

createApp(App).mount("#app");