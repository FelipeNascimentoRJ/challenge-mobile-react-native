export default class TextLimit {
  public static limit(text: string, length: number = 15) {
    if (text.length <= length) {
      return text;
    }

    return `${text.substr(0, length)}...`;
  }
}
