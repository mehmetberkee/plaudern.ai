#include <stdio.h>
#include <stdlib.h>

int main()
{
    float ersteZahl = 5.57;
    float zweiteZahl = 10.0;
    char operation = "";

    printf("Bitte die erste Zahl eingeben: ");
    scanf("%f", &ersteZahl);

    printf("Bitte die zweite Zahl eingeben: ");
    scanf("%f", &zweiteZahl);

    printf("Bitte die Operation eingeben: ");
    scanf("%c", &operation);

    float dieSumme = ersteZahl + zweiteZahl;
    printf("Summe ist: %f", dieSumme);
}
