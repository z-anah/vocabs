/**
 * CSV Parser
 *
 * Supports:
 * - quoted fields
 * - commas inside quoted fields
 * - escaped quotes ("")
 * - UTF-8 text including Arabic tashkeel
 */

function parseCSV(csvText) {
    const rows = [];
    let row = [];
    let field = "";
    let insideQuotes = false;
  
    for (let i = 0; i < csvText.length; i++) {
      const char = csvText[i];
      const nextChar = csvText[i + 1];
  
      if (char === '"') {
        if (insideQuotes && nextChar === '"') {
          field += '"';
          i++;
        } else {
          insideQuotes = !insideQuotes;
        }
        continue;
      }
  
      if (char === "," && !insideQuotes) {
        row.push(field);
        field = "";
        continue;
      }
  
      if ((char === "\n" || char === "\r") && !insideQuotes) {
        if (char === "\r" && nextChar === "\n") {
          i++;
        }
  
        row.push(field);
        field = "";
  
        if (row.some((value) => value.trim() !== "")) {
          rows.push(row);
        }
  
        row = [];
        continue;
      }
  
      field += char;
    }
  
    if (field !== "" || row.length > 0) {
      row.push(field);
  
      if (row.some((value) => value.trim() !== "")) {
        rows.push(row);
      }
    }
  
    if (rows.length === 0) {
      return [];
    }
  
    const headers = rows[0].map((header) => header.trim());
  
    return rows.slice(1).map((values) => {
      const record = {};
  
      headers.forEach((header, index) => {
        record[header] = (values[index] ?? "").trim();
      });
  
      return record;
    });
  }
  
  async function loadCSV(path) {
    const response = await fetch(path);
  
    if (!response.ok) {
      throw new Error(
        `Failed to load CSV: ${path} (${response.status})`
      );
    }
  
    const text = await response.text();
  
    return parseCSV(text);
  }