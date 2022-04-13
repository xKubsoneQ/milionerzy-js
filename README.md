### milionerzy-js
Mały projekt który ma być podróbką popularnego teleturnieju "Milionerzy". Program wymaga pobrania Node.JS.

##### Uruchomienie
Wpisz `node .` w cmd gdy jesteś w folderze z projektem.

#### FAQ
##### Chcę dodać własne pytanie, ale nie wiem jak to zrobić. Pomożesz?
Jasne! To bardzo proste, musisz otworzyć plik `questions.json` w jakimkolwiek edytorze tekstowym i dodać do niego pytanie w takim formacie:
```
    "numer pytania (numeruj po kolei od zera)": {
        "question": "pytanie",
        "answers": ["odpowiedź 1", "odpowiedź 2", "odpowiedź 3", "odpowiedź 4"],
        "correct": "odpowiedź poprawna"
    }
```
Potem zapisz plik, i gotowe!
