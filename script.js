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
        console.log('========================================')
        console.log('Figma users');
        getUsersFigma();
        console.log('========================================')
        console.log('React user');
        getReactUser();
        console.log('========================================')
        console.log('Age users');
        fullAge();
        console.log('========================================')
        console.log('Backend full day users');
        backendFullDay()
        console.log('========================================')
        console.log('Photoshop and figma users +6level')
        getPhotoshopAndFigmaUsers()
        console.log('========================================')
        console.log('Dream Team')
        dreamTeam()

    });


function getInfo() {
    let location = cities.find(city => {
        return city.id === this.personal.locationId;
    });
    if (location && location.name) {
        console.log(`${this.personal.firstName} ${this.personal.lastName}, ${location.name}`);
    }
}

function getUserSpecialization(specName) {
    const spec = specializations.find(specialization => {
        return specialization.name.toLowerCase() === specName;
    });
    if (spec && spec.id) {
        return persons.filter(person => {
            return person.personal.specializationId === spec.id;
        });
    }
}

function getSkillUser(user, skillName) {
    return user.skills.find(skill => {
        return skill.name.toLowerCase() === skillName;
    });
}

function getUsersFigma() {
    const designers = getUserSpecialization('designer');
    if (designers && designers.length > 0) {
        const designersFigma = designers.filter(skill => {
            return getSkillUser(skill, 'figma');
        });
        if (designersFigma.length > 0) {
            designersFigma.forEach(user => {
                return getInfo.call(user);
            });
        }
    }
}

function getReactUser() {
    const reactUser = persons.find(user => {
        return getSkillUser(user, 'react');
    });
    getInfo.call(reactUser);
}

function fullAge() {
    let younger = persons.some(user => {
        let birthdayParty = user.personal.birthday.split('.').reverse();
        let adult = new Date(
            +birthdayParty[0] + 18,
            +birthdayParty[1] - 1,
            +birthdayParty[2]
        );
        return new Date() < adult;
    });
    console.log(!younger ? 'Все старше 18' : 'Есть несовершеннолетние');
}

// function userLocation(user, locName) {
//     const location = cities.find(city => city.name.toLowerCase() === locName);
//     if (location && location.name) {
//         user = persons;
//     }
//     return user.filter(user => {
//         const userLocation = cities.find(city => city.id === user.personal.locationId);
//         return userLocation && userLocation.name.toLowerCase() === locName;
//     });
// }

function userLocation(userArray, locName) {
    const loc = cities.find(city => {
        return city.name.toLowerCase() === locName;
    });
    if (loc && loc.name) {
        return userArray.personal.locationId === loc.id;
    }
}

function workSchedule(user, typeVal) {
    const typeName = user.request.find(item => {
        return item.name.toLowerCase() === 'тип занятости';
    });
    if (typeName && typeName.name) {
        return typeName.value.toLowerCase() === typeVal;
    }
}

function sortSalary(userArray) {
    return userArray.sort((a, b) => {
        return a.request[0].value - b.request[0].value
    });
}

function backendFullDay() {
    const backendUsers = getUserSpecialization('backend')
    if (backendUsers.length > 0) {
        const usersFromMoscow = backendUsers.filter(user => {
            return userLocation(user, 'москва')
        });
        if (usersFromMoscow.length > 0) {
            const usersWorksFullDay = usersFromMoscow.filter(user => {
                return workSchedule(user, 'полная')
            });
            let sortArray = sortSalary(usersWorksFullDay);
            sortArray.forEach(user => {
                getInfo.call(user)
            });
        }
    }
}

function getPhotoshopAndFigmaUsers() {
    const usersPhotoshopAndFigma = persons.filter(user => {
        const photoshopUsers = getSkillUser(user, 'photoshop');
        const figmaUsers = getSkillUser(user, 'figma');
        if ((photoshopUsers && photoshopUsers.name) && (figmaUsers && figmaUsers.name) && (photoshopUsers.level >= 6 && figmaUsers.level >= 6)) {
            return user;
        }
    });
    usersPhotoshopAndFigma.forEach(user => {
        getInfo.call(user);
    });
}

function sortLevel(skillName) {
    let maxLevel = 0;
    let maxLevelItem = 0;
    persons.forEach(user => {
        const skillArray = user.skills.find(skill => {
            return skill.name.toLowerCase() === skillName
        });
        if (skillArray && skillArray.name) {
            const skillLevelNum = parseInt(skillArray.level);
            if (!isNaN(skillLevelNum) && skillLevelNum > maxLevel) {
               maxLevel = skillLevelNum
               return maxLevelItem = user
            }
        }
    });
    getInfo.call(maxLevelItem)
}

function dreamTeam() {
    console.log('Владеет Figma:');
    sortLevel('figma')
    console.log('Владеет Angular:');
    sortLevel('angular')
    console.log('Владеет Go:');
    sortLevel('go')
}

// function dreamDevelopTeam(specName, skillName, minLevel) {
//     const developers = getUserSpecialization(specName);
//     if (developers && developers.length > 0) {
//         const filteredDevelopers = developers.filter(item => {
//             const skill = getSkillUser(item, skillName);
//             if (skill && skill.level) {
//                 return skill.level >= minLevel;
//             }
//         });
//         filteredDevelopers.forEach(user => {
//             getInfo.call(user)
//         })
//     }
// }
//
// function dreamTeam() {
//     console.log('Владеет Figma:');
//     dreamDevelopTeam('designer', 'figma', 10)
//     console.log('Владеет Angular:');
//     dreamDevelopTeam('frontend', 'angular', 9)
//     console.log('Владеет Go:');
//     dreamDevelopTeam('backend', 'go', 9)
// }








