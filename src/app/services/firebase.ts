import { Injectable } from '@angular/core';
import {
  getFirestore, collection, addDoc, getDocs, getDoc,
  CollectionReference, DocumentData, DocumentReference, DocumentSnapshot,
  doc
} from 'firebase/firestore';
import { forkJoin, from, Observable, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { Color, Price, Product } from '../model/product';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {

  private productRepository: ProductRepository = new ProductRepository();


  getProducts(): Observable<Product[]> {
    return this.productRepository.findAll();
  }

  getProduct(id: string): Observable<Product> {
    return this.productRepository.find(id);
  }

  saveProduct(product: Product): Observable<Product> {
    return this.productRepository.create(product);
  }
}

export function decodeFireConfig(encoded: string, key = 24) {
  return atob(encoded)
    .split('')
    .map(c => String.fromCharCode(c.charCodeAt(0) ^ key))
    .join('');
}

abstract class FirebaseRepository<T extends { id?: string }> {

  protected readonly db = getFirestore();
  protected abstract collectionName: string;

  protected get collectionRef(): CollectionReference<DocumentData> {
    return collection(this.db, this.collectionName);
  }

  find(id: string): Observable<T> {
    const docRef = doc(this.db, this.collectionName, id);
    return this.build(docRef);
  }

  findAll(): Observable<T[]> {
    return from(getDocs(this.collectionRef)).pipe(
      mergeMap(snap => {
        return forkJoin(snap.docs.map(docSnap => this.build(docSnap.ref)));
      })
    );
  }

  create(entity: T): Observable<T> {
    const data = this.debuild(entity);
    return from(addDoc(this.collectionRef, data))
      .pipe(mergeMap(docRef => this.build(docRef)));
  }

  protected abstract build(docRef: DocumentReference): Observable<T>;

  protected abstract debuild(entity: T): DocumentData;
}

class ProductRepository extends FirebaseRepository<Product> {

  protected collectionName = 'products';
  
  protected build(docRef: DocumentReference): Observable<Product> {
    return from(
      getDoc(docRef).then((docSnap: DocumentSnapshot) => {
        if (!docSnap.exists())
          return new Product();

        const data = docSnap.data();
        if (!data)
          return new Product();

        const id: string = docSnap.id;
        const name: string = data['name'];
        const description: string = data['description'];
        const category: string = data['category'];
        const color: Color = data['color'];
        const prices: Price[] = this.toPrices(data['prices']);
        const rating: number = data['rating'];
        
        return new Product(id, name, description, category, color, prices, rating);
      })
    );
  }

  protected debuild(entity: Product): DocumentData {
    return {
      name: entity.name,
      description: entity.description,
      category: entity.category,
      color: entity.color,
      prices: this.fromPrices(entity.prices),
      rating: entity.rating
    };
  }

  private toPrices(docData?: DocumentData[]): Price[] {
    if (!docData)
      return [];

    return docData?.map(doc => this.toPrice(doc));
  }

  private toPrice(docData?: DocumentData): Price {
    return new Price(
        docData?.['amount'],
        new Date(
          (docData?.['date'].seconds * 1000)
          + (docData?.['date'].nanoseconds / 1000000)
        )
      );
  }

  private fromPrices(prices: Price[]): DocumentData[] {
    return prices.map(price => this.fromPrice(price));
  }

  private fromPrice(price: Price): DocumentData {
    return {
      amount: price.amount,
      date: price.date
    };
  }
}