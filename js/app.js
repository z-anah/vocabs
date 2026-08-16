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

            imageErrors: {},
            ttsError: "",
            isSpeaking: false,

            quizItems: [],
            quizOptions: [],
            quizAnswered: false,
            quizCorrect: false,
            quizFinished: false,
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

    beforeUnmount() {
        stopSpeaking();
      },

    methods: {

        resetImageErrors() {
            this.imageErrors = {};
        },

        hasImageError(item) {
            return Boolean(
                item?.id && this.imageErrors[item.id]
            );
        },

        handleImageError(item) {
            if (!item?.id) {
                return;
            }

            this.imageErrors = {
                ...this.imageErrors,
                [item.id]: true,
            };
        },
        stopSpeech() {
            stopSpeaking();

            this.isSpeaking = false;
        },

        startAudioToImage() {
            this.currentIndex = 0;
            this.score = 0;

            this.testedItems = [];

            this.quizItems = shuffleArray([...this.vocabulary]);
            this.quizOptions = [];
            this.quizAnswered = false;
            this.quizCorrect = false;
            this.quizFinished = false;

            this.createAudioQuestion();
        },

        createAudioQuestion() {
            if (!this.quizItems.length) {
                return;
            }

            const correctItem = this.quizItems[this.currentIndex];

            const otherItems = this.vocabulary.filter(
                (item) => item.id !== correctItem.id
            );

            const randomOthers = shuffleArray(otherItems).slice(0, 3);

            this.quizOptions = shuffleArray([
                correctItem,
                ...randomOthers,
            ]);

            this.quizAnswered = false;
            this.quizCorrect = false;

            this.$nextTick(() => {
                this.speakVocabulary(correctItem);
            });
        },

        answerAudioQuestion(item) {
            if (this.quizAnswered) {
                return;
            }

            const correctItem =
                this.quizItems[this.currentIndex];

            this.quizAnswered = true;

            this.quizCorrect =
                item.id === correctItem.id;

            if (this.quizCorrect) {
                this.score += 1;
            }

            this.testedItems.push(correctItem.id);

            this.stopSpeech();
        },

        nextAudioQuestion() {
            if (this.currentIndex >= this.quizItems.length - 1) {
                this.quizFinished = true;
                return;
            }

            this.currentIndex += 1;

            this.createAudioQuestion();
        },

        restartAudioToImage() {
            this.startAudioToImage();
        },

        startOneByOne() {
            this.currentIndex = 0;
            this.testedItems = [];
            this.score = 0;

            this.speakCurrentItem();
        },

        speakCurrentItem() {
            if (!this.currentItem) {
                return;
            }

            this.speakVocabulary(this.currentItem);
        },

        nextVocabulary() {
            this.stopSpeech();

            if (
                this.currentIndex <
                this.vocabulary.length - 1
            ) {
                this.currentIndex += 1;

                this.$nextTick(() => {
                    this.speakCurrentItem();
                });

                return;
            }

            this.currentIndex = 0;
            this.currentScreen = "mode";
        },

        getVocabularyImage(item, selectedCategory) {
            return getVocabularyImage(item, selectedCategory);
        },

        getVocabularyText(item, languageId) {
            return getVocabularyText(item, languageId);
        },

        getCategoryImage(category) {
            return getCategoryImage(category);
        },

        speakVocabulary(item) {
            const text = getVocabularyText(
                item,
                this.selectedLanguage
            );

            if (!text) {
                return;
            }

            this.ttsError = "";

            this.isSpeaking = true;

            const started = speakText(
                text,
                this.selectedLanguage,
                {
                    onStart: () => {
                        this.isSpeaking = true;
                    },

                    onEnd: () => {
                        this.isSpeaking = false;
                    },

                    onError: () => {
                        this.isSpeaking = false;
                        this.ttsError = "Unable to play pronunciation.";
                    },
                }
            );

            if (!started) {
                this.isSpeaking = false;
                this.ttsError = "Speech synthesis is not available.";
            }
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

            this.quizItems = [];
            this.quizOptions = [];
            this.quizAnswered = false;
            this.quizCorrect = false;
            this.quizFinished = false;

            this.resetImageErrors();
            this.stopSpeech();

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

            this.quizItems = [];
            this.quizOptions = [];
            this.quizAnswered = false;
            this.quizCorrect = false;
            this.quizFinished = false;

            this.resetImageErrors();
            this.stopSpeech();

            this.ttsError = "";

            this.currentScreen = "learning";

            if (modeId === "one_by_one") {
                this.$nextTick(() => {
                    this.startOneByOne();
                });
            }

            if (modeId === "audio_to_image") {
                this.$nextTick(() => {
                    this.startAudioToImage();
                });
            }
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
            this.stopSpeech();
          
            this.currentScreen = "category";
          
            this.selectedMode = null;
          
            this.currentIndex = 0;
            this.score = 0;
          
            this.quizItems = [];
            this.quizOptions = [];
            this.quizAnswered = false;
            this.quizCorrect = false;
            this.quizFinished = false;
          },

        goToModeSelection() {
            this.stopSpeech();
          
            this.currentScreen = "mode";
          
            this.currentIndex = 0;
            this.score = 0;
          
            this.quizItems = [];
            this.quizOptions = [];
            this.quizAnswered = false;
            this.quizCorrect = false;
            this.quizFinished = false;
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