#ifndef LIBRARY_H
#define LIBRARY_H

typedef struct {
    char title[100];
    char author[100];
    int copies;
} Book;

void addBook();
void viewBooks();

#endif