
export class ParseError extends Error {
  constructor(public code: number, public message: string) {
    super();
  }
}
