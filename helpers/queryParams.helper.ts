export function objectToQueryParams(obj: Record<string, any>): string {
    const query = Object.entries(obj)
      .filter(([_, value]) => value !== undefined && value !== null) // skip undefined/null
      .map(
        ([key, value]) =>
          `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`
      )
      .join("&");
  
    return query ? `?${query}` : "";
  }
  