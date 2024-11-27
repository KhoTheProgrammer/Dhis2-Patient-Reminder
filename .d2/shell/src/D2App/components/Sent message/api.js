export async function getMessage() {
  const url = "https://dhis2-messages-backend.onrender.com/api/messages";
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const data = await response.json();
    console.log("API Response:", data); // Log the response to inspect it
    return data;
  } catch (error) {
    console.error("Error fetching messages:", error.message);
    return [];
  }
}