let cities = [];
let persons = [];
let specializations = [];

Promise.all(
    [
        fetch("cities.json"),
        fetch("person.json"),
        fetch("specializations.json"),
    ]
).then(async ([citiesResponse, personResponse, specializationsResponse]) => {
    const citiesJson = await citiesResponse.json();
    const personJson = await personResponse.json();
    const specializationsJson = await specializationsResponse.json();
    return [citiesJson, personJson, specializationsJson]
})
    .then(response => {
        cities = response[0];
        persons = response[1];
        specializations = response[2];


        getInfo.call(persons[0]);
        // for (let i = 0; i < persons.length; i++) {
        //     getFigmaUsers.call(persons[i]);
        // }
        getFigmaUsers.call(persons[0]);
    });


function getInfo() {
    let location = cities.find(city => {
        return city.id === this.personal.locationId;
    });
    if (location && location.name) {
        console.log(`${this.personal.firstName} ${this.personal.lastName}, ${location.name}`);
    }
}

// function getFigmaUsers() {
//     let result = persons.map(person => {
//         person.skills.forEach(skill => {
//             let figma = skill.name.toLowerCase() === 'figma';
//             if (figma) {
//                 return person;
//             }
//         });
//     });
//     console.log(result);
// }

// function getFigmaUsers() {
//     let result = persons.map(person => {
//         person.skills.forEach(skill => {
//             if (skill.name.toLowerCase() === 'figma') {
//                 return person;
//             }
//         });
//     });
//     console.log(result);
// }

// function getFigmaUsers() {
//     let figma = [];
//     persons.map(person => {
//         let result = person.skills.filter(skill => {
//             return skill.name.toLowerCase() === 'figma'
//             if (result) {
//                 return figma;
//             }
//         })
//         console.log(figma)
//     })
//
// }

// function getFigmaUsers() {
//     persons.forEach(person => {
//         let result = person.skills.filter(skill => {
//             return skill.name.toLowerCase() === 'figma'
//         })
//         result.find(array => {
//             if (array && array.name) {
//                 console.log(`${this.personal.firstName} ${this.personal.lastName}, владеет Figma`)
//             } else {
//                 console.log(`${this.personal.firstName} ${this.personal.lastName}, не владеет Figma`)
//             }
//         })
//
//     })
// }

// function getFigmaUsers() {
//     persons.map(person => {
//        let result = person.skills.filter(skill => {
//             return skill.name.toLowerCase() === 'figma'
//         })
//         let figma = result.filter(array => {
//             if (array && array.name) {
//                 return person;
//             }
//         })
//         console.log(figma)
//     })
// }


// function getFigmaUsers() {
//     persons.forEach(person => {
//         let result = person.skills.map(skill => {
//             let figma = skill.name.toLowerCase() === 'figma'
//             if (figma) {
//                 return skill;
//             }
//         })
//         result.find(array => {
//             if (array && array.name) {
//                 console.log(`${this.personal.firstName} ${this.personal.lastName}, владеет Figma`)
//             } else {
//                 console.log(`${this.personal.firstName} ${this.personal.lastName}, не владеет Figma`)
//             }
//         })
//
//     })
//
// }


// function getFigmaUsers() {
//     let figma = null;
//     persons.forEach(person => {
//         let result = person.skills.map(skill => {
//             if (skill.name.toLowerCase() === 'figma') {
//                 return person;
//             }
//         })
//         result.findIndex(array => {
//             if (array && array.name) {
//                 console.log(`${this.personal.firstName} ${this.personal.lastName}, владеет Figma`)
//             } else {
//                 console.log(`${this.personal.firstName} ${this.personal.lastName}, не владеет Figma`)
//             }
//         })
//
//     })
//
// }
//
// function getFigmaUsers() {
//     persons.forEach(person => {
//         let figma = person.skills.find(skill => {
//             return skill.name.toLowerCase() === 'figma'
//         })
//         console.log(figma)
//
//     })
// }
//
// function getFigmaUsers() {
//     let figma =  persons.map(person => {
//         person.skills.forEach(skill => {
//             return skill.name.toLowerCase() === 'figma'
//         })
//
//
//     })
//     console.log(figma)
// }


// function getFigmaUsers() {
//     let result = persons.map(person => {
//         person.skills.filter(skill => {
//             if (skill.name.toLowerCase() === 'figma') {
//                 return person;
//             }
//         })
//     })
//     console.log(result)
//     if (result && result.name) {
//         console.log(`${this.personal.firstName} ${this.personal.lastName}, владеет Figma`)
//     } else {
//         console.log(`${this.personal.firstName} ${this.personal.lastName}, не владеет Figma`)
//     }
// }

function getFigmaUsers() {
    let figma = this.skills.find(skill => {
        return skill.name.toLowerCase() === 'figma'
    });
    if (figma) {
        console.log(`${this.personal.firstName} ${this.personal.lastName}, владеет Figma`)
    } else {
        console.log(`${this.personal.firstName} ${this.personal.lastName}, не владеет Figma`)
    }
}









