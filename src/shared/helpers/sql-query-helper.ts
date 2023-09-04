export function getWhereClauseString(
  value: string | undefined,
  tableColumn: string,
): string {
  if (value === undefined || !value.length) return '';
  return ` AND ${tableColumn} ILIKE('%${value}%')`;
}

export function getWhereClauseNumber(
  value: number | string | undefined,
  tableColumn: string,
): string {
  if (value === undefined || Number.parseInt(value as string) === -1) return '';
  return ` AND ${tableColumn} = ${Number(value)}`;
}

export function getWhereClauseBoolean(
  value: boolean | undefined,
  tableColumn: string,
): string {
  if (value === undefined) return '';
  return ` AND ${tableColumn} = ${String(Boolean(value))}`;
}
