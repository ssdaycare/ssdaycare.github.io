// Define a strict structure for your UI to use
export interface ProgramAvailability {
  programName: string;
  spotsLeft: number;
  isWaitlistActive: boolean;
}

// Replace this placeholder string with the exact CSV link you copied in Step 1
const GOOGLE_SHEET_CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vS52iZQQRd9yKQcHPBTtbqAn8XHp6SX9f2NnUIUnELvVY2VkJwN5AsXreL4zxOAWvbrnCMh_Pe8SLGQ/pub?gid=1895085099&single=true&output=csv";

/**
 * Fetches real-time program capacity metrics straight from the Google Sheet dashboard.
 */
export async function fetchLiveAvailability(): Promise<ProgramAvailability[]> {
  try {
    const response = await fetch(GOOGLE_SHEET_CSV_URL);
    if (!response.ok) {
      throw new Error(`Failed to fetch sheet data. Status: ${response.status}`);
    }
    
    const csvText: string = await response.text();
    
    // Split the text by rows, then map and split each row by its commas
    const rows: string[][] = csvText
      .split("\n")
      .map((row: string) => row.split(","));
      
    const parsedPrograms: ProgramAvailability[] = [];

    // Loop through Rows 2 to 5 (Array indices 1 to 4) representing your 4 age groups
    for (let i = 1; i <= 4; i++) {
      if (!rows[i] || rows[i].length < 2) continue;

      // Clean out residual quotes from the text strings
      const programName: string = rows[i][0].replace(/"/g, "").trim();
      const spotsLeft: number = parseInt(rows[i][1].replace(/"/g, "").trim(), 10);

      if (isNaN(spotsLeft)) continue;

      parsedPrograms.push({
        programName,
        spotsLeft,
        isWaitlistActive: spotsLeft <= 0
      });
    }

    return parsedPrograms;
  } catch (error) {
    console.error("Critical error sync-checking live data feed:", error);
    return []; // Return an empty fallback array to keep the UI from crashing
  }
}
