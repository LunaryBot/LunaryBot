export {};

declare global {
    var test = "test";

    interface String {
        shorten(length: number): string;
    }
}