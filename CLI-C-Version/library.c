#include <stdio.h>
#include <stdlib.h>
#include "library.h"

void addBook() {
    Book b;
    printf("Enter book title: ");
    scanf("%s", b.title);
    printf("Enter author: ");
    scanf("%s", b.author);
    printf("Enter copies: ");
    scanf("%d", &b.copies);

    FILE *fp = fopen("books.txt", "a");
    fprintf(fp, "%s|%s|%d\n", b.title, b.author, b.copies);
    fclose(fp);
    printf("Book added successfully!\n");
}

void viewBooks() {
    FILE *fp = fopen("books.txt", "r");
    if(!fp){ printf("No books found.\n"); return; }
    char line[256];
    while(fgets(line, sizeof(line), fp)){
        printf("%s", line);
    }
    fclose(fp);
}

int main() {
    int choice;
    while(1){
        printf("\nLibrary Menu:\n1. Add Book\n2. View Books\n3. Exit\nChoice: ");
        scanf("%d", &choice);
        switch(choice){
            case 1: addBook(); break;
            case 2: viewBooks(); break;
            case 3: exit(0);
            default: printf("Invalid choice\n");
        }
    }
    return 0;
}