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

// function sortSalary(userArray) {
//     const salary = userArray.request.find(reqItem => {
//         return reqItem.name.toLowerCase() === 'зарплата'
//     });
//     if (salary && salary.name) {
//         salary.sort((a,b) => {
//             return a.value - b.value
//         });
//     }
// }


// function sortSalary(userArray) {
//     return userArray.filter(user => {
//         return user.request.find(req => {
//             let zp = req.name.toLowerCase() === 'зарплата'
//             console.log(zp)
//         })
//
//         // if (salary && salary.value) {
//         //    return userArray.salary.sort((a,b) => {
//         //        return a.value - b.value
//         //    })
//         // }
//     });
// }

// function sortSalary(userArray) {
//     let salary = userArray.filter(user => {
//        return user.request.find(req => {
//             return req.name.toLowerCase() === 'зарплата'
//         });
//
//     });
//     console.log(salary)
// }

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

function dreamTeam() {
    const team = persons.filter(user => {
        const figmaUsers = getSkillUser(user, 'figma');
        const angularUsers = getSkillUser(user, 'angular');
        const goUsers = getSkillUser(user, 'go');
        if (figmaUsers && figmaUsers.name) {
            return user
        }

        if (angularUsers && angularUsers.name) {
            // return user
        }
        if (goUsers && goUsers.name) {
            // return user
        }
    });
    console.log(team);

    // let maxLevel = 0;
    // let maxLevelFigma = null;
    // let maxLevelAngular = null;
    // let maxLevelGo = null;
    //
    // persons.forEach(user => {
    //     const angularUser = user.skills.find(skill => {
    //         return skill.name.toLowerCase() === 'angular'
    //     })
    //     if (angularUser && angularUser.name) {
    //         const angularNum = parseInt(angularUser.level)
    //         if (!isNaN(angularNum) && angularNum > maxLevel) {
    //             maxLevel = angularNum
    //             maxLevelAngular = user
    //         }
    //     }
    //
    //     const figmaUser = user.skills.find(skill => {
    //         return skill.name.toLowerCase() === 'figma'
    //     })
    //     if (figmaUser && figmaUser.name) {
    //         const figmaNum = parseInt(figmaUser.level)
    //         if (!isNaN(figmaNum) && figmaNum > maxLevel) {
    //             maxLevel = figmaNum
    //             maxLevelFigma = user
    //         }
    //     }
    //
    //     const goUser = user.skills.find(skill => {
    //         return skill.name.toLowerCase() === 'go'
    //     })
    //     if (goUser && goUser.name) {
    //         const goNum = parseInt(goUser.level)
    //         if (!isNaN(goNum) && goNum > maxLevel) {
    //             maxLevel = goNum
    //             maxLevelGo = user
    //         }
    //     }
    // })
    //
    // console.log(maxLevelFigma)
    // console.log(maxLevelAngular)
    // console.log(maxLevelGo)
}






