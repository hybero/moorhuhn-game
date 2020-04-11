
var students = {
    'adam': {
        'name': 'Adam',
        'points': 65
    },
    'bea': {
        'name': 'Bea',
        'points': 80
    },
    'cyril': {
        'name': 'Cyril',
        'points': 47
    },
    'daniela': {
        'name': 'Daniela',
        'points': 71
    },
    'emil': {
        'name': 'Emil',
        'points': 92
    }
};

console.log(students);

console.log(students.adam);

console.log(students.adam.name);

var grades = {
    'a': {
        'label': 'A',
        'max': 100,
        'maxIncluded': True
        'low': 90,
        'lowAndLower': False
    },
    'b': {
        'label': 'B',
        'max': 90,
        'maxIncluded': False
        'low': 80,
        'lowAndLower': False
    },
    'c': {
        'label': 'C',
        'max': 80,
        'maxIncluded': False
        'low': 70,
        'lowAndLower': False
    },
    'd': {
        'label': 'D',
        'max': 70,
        'maxIncluded': False
        'low': 60,
        'lowAndLower': False
    },
    'e': {
        'label': 'E',
        'max': 60,
        'maxIncluded': False
        'low': 50,
        'lowAndLower': False
    },
    'fx': {
        'label': 'FX',
        'max': 50,
        'maxIncluded': False
        'low': 0,
        'lowAndLower': True
    }
};



if() {

}


if(students.cyril.points > students.daniela.points) {
    console.log('Student '+ students.cyril.name +' ma viac bodov ako '+ students.daniela.name);
} else {
    console.log('Student '+ students.daniela.name +' ma viac bodov ako '+ students.cyril.name);
}


for (var myKey in object) {

    console.log(myKey);

    console.log(object[myKey]);

    if (object[myKey] > 1) {
        console.log(myKey + ' je vacsie ako 1');
    }

}


var amountOfStudents = 0;

for (var studentKey in students) {

    console.log(' '); // tu len vypisujeme prazdy znak aby sa na to lepsie pozeralo vo vypise
    console.log(' '); // tu len vypisujeme prazdy znak aby sa na to lepsie pozeralo vo vypise

	console.log('Idem pripocitat studenta ' + students[studentKey].name); // Tu si dame vypisat meno studenta, na ktorom momentale je loop

    amountOfStudents = amountOfStudents + 1; // tu do premennej amountOfStudents priradime novu hodnotu, ktoru vypocitame tak ze ku hodnote ktora uz je v amountOfStudents pripocitame 1

    console.log('Momentalny stav premennej "amountOfStudents" je: ' + amountOfStudents);

}

console.log(' '); // tu len vypisujeme prazdy znak aby sa na to lepsie pozeralo vo vypise
console.log('Finalne cislo: ' + amountOfStudents); // tu je uz loop dokonceny, toto je finalne cislo ktore sme dostali
