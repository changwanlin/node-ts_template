/**
 * 請參考 human.ts 的語法完成 Rational 類
 */
export class Rational {
    private numerator: number;
    private denominator: number;

    constructor(numerator: number, denominator: number) {
        if (denominator === 0) {
            throw new Error("Denominator can't be zero.");
        }
        const gcd = this.gcd(numerator, denominator);
        this.numerator = numerator / gcd;
        this.denominator = denominator / gcd;
    }

    getNumerator(): number {
        return this.numerator;
    }

    getDenominator(): number {
        return this.denominator;
    }

    normalize(): Rational {
        const gcd = this.gcd(this.numerator, this.denominator);
        return new Rational(this.numerator / gcd, this.denominator / gcd);
    }

    private gcd(a: number, b: number): number {
        while (b !== 0) {
            const temp = b;
            b = a % b;
            a = temp;
        }
        return Math.abs(a);
    }

    isWhole(): boolean {
        return this.numerator % this.denominator === 0;
    }

    isDecimal(): boolean {
        return !this.isWhole();
    }

    equals(r: Rational): boolean {
        const normalizedThis = this.normalize();
        const normalizedR = r.normalize();
        return (
            normalizedThis.numerator === normalizedR.numerator &&
            normalizedThis.denominator === normalizedR.denominator
        );
    }

    static _parseRational(char1: string[], char2: string[]): Rational {
        const numerator = parseInt(char1.join(''));
        const denominator = parseInt(char2.join(''));

        if (isNaN(numerator) || isNaN(denominator)) {
            throw new Error("Invalid input. Unable to parse integers from input arrays.");
        }
        return new Rational(numerator, denominator);
    }

    static parseRational(str: string): Rational {
        const parts = str.split('/');

        if (parts.length !== 2) {
            throw new Error("Input string must be in the form 'numerator/denominator'.");
        }
        const numerator = parseInt(parts[0].trim());
        const denominator = parseInt(parts[1].trim());

        if (isNaN(numerator) || isNaN(denominator)) {
            throw new Error("Invalid input. Unable to parse integers from input string.");
        }

        return new Rational(numerator, denominator);
    }

    toString(): string {
        return `${this.numerator}/${this.denominator}`;
    }
}
