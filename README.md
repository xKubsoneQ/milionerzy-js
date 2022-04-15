### milionerzy-js
Gra, podczas której tworzenia wzorowałem się na formacie popularnego teleturnieju "Milionerzy". Program wymaga pobrania `Node.JS` oraz `npm`.

#### Pobranie
Najprostszą metodą na pobranie gry jest kliknięcie zielonego przycisku "Code" po czym "Download ZIP". Inne sposoby to sklonowanie projektu za pomocą Gita lub wybranie wersji w zakładce "Releases" i pobranie kodu stamtąd.

#### Uruchomienie
Wpisz `npm i` w konsoli (musisz być w folderze z projektem) aby pobrać wszystkie wymagane moduły.
Po pobraniu wpisz `node .` aby uruchomić program.

#### Używane moduły
- `chalk`
- `fs`
#### FAQ
##### Chcę dodać własne pytanie, ale nie wiem jak to zrobić. Pomożesz?
Jasne! To bardzo proste, musisz otworzyć plik `questions.json` w jakimkolwiek edytorze tekstowym i dodać do niego pytanie w takim formacie:
```
    {
        "question": "pytanie",
        "answers": ["odpowiedź 1", "odpowiedź 2", "odpowiedź 3", "odpowiedź 4"],
        "correct": "odpowiedź poprawna"
    }
```
Potem zapisz plik, i gotowe!
