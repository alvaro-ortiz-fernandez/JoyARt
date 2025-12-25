import { Injectable } from '@angular/core';
import {
  getFirestore, collection, addDoc, getDocs, getDoc,
  CollectionReference, DocumentData, DocumentReference, DocumentSnapshot
} from 'firebase/firestore';
import { forkJoin, from, Observable, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { Product } from '../model/product';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {

  private productRepository: ProductRepository = new ProductRepository();


  getProducts(): Observable<Product[]> {
    return this.productRepository.findAll();
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
        
        return new Product(id, name);
      })
    );
  }

  protected debuild(entity: Product): DocumentData {
    return {
      name: entity.name
    };
  }
}