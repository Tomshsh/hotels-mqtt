export interface Tag {
    readonly objectId: string;
    product: Product;
    readonly expDate: string;
}


export interface Product {
    readonly objectId: string;
    readonly price: number;
    readonly title: string;
}