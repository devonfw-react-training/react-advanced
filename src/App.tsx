import React from 'react';
import { BookOverview } from './book/components/BookOverview/BookOverview';
import styles from './App.module.scss';
import { BooksService } from './book/services/BooksService';

export const App = () => (
  <div className={styles.container}>
    <BookOverview bookService={new BooksService()}/>
  </div>
);
