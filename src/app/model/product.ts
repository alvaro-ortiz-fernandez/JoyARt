export class Product {
    id: string;
    name: string;
    description: string;
    category: string;
    color: Color;
    prices: Price[];
    rating: number;

    constructor(id: string = '', name: string = '', description: string = '', category: string = '',
            color: Color = Color.Gris, prices: Price[] = [ new Price() ], rating: number = 5) {

        this.id = id;
        this.name = name;
        this.description = description;
        this.category = category;
        this.color = color;
        this.prices = prices;
        this.rating = rating;
    }

    getCurrentPrice(): number {
        return this.prices
            .reduce((latest, current) =>
                current.date > latest.date ? current : latest
            ).amount;
    }

    getPreviousPrice(): number | null {
        if (this.prices.length < 2)
            return null;

        const sortedPrices = [...this.prices]
            .sort((a, b) => b.date.getTime() - a.date.getTime());

        return sortedPrices[1].amount;
    }

    getStarts(): any[] {
        return Array.from({ length: 5 });
    }

    getFilledStarts(): number {
        return Math.min(this.rating ?? 0, 5);
    }
}

export class Price {
    amount: number;
    date: Date;

    constructor(amount: number = 1.0, date: Date = new Date()) {
        this.amount = amount;
        this.date = date;
    }
}

export enum Color {
  Blanco = 'Blanco',
  Gris = 'Gris',
  Negro = 'Negro',
  Amarillo = 'Amarillo',
  Rojo = 'Rojo',
  Morado = 'Morado',
  Azul = 'Azul',
  Verde = 'Verde'
}