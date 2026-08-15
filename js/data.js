async function loadCategories() {
    return loadCSV("./data/categories.csv");
  }
  
  async function loadVocabulary(categoryId) {
    const path = getCategoryVocabularyPath(categoryId);
  
    const items = await loadCSV(path);
  
    if (!validateVocabularyDataset(items)) {
      throw new Error(
        `Invalid vocabulary dataset: ${categoryId}`
      );
    }
  
    return items;
  }