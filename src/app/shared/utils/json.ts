export function stringifyJson(jsonInput: string): string | null {
  if (!jsonInput.trim()) {
    console.error('Input is empty. Please provide JSON to stringify.');
    return null;
  }

  try {
    const parsedObject = JSON.parse(jsonInput);
    return JSON.stringify(parsedObject, null, 2);
  } catch (e: any) {
    console.error(`Invalid JSON format: ${e.message}`);
    return null;
  }
}
