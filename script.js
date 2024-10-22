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
        getUsersFigma();
        getReactUser();
        fullAge();
        backendFullDay();

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


// Не понимаю, почему он тут возвращает всех юзеров, если я использую метод find, должен же возвращать первого попавшегося
function getReactUser() {
    const frontend = getUserSpecialization('frontend');
    if (frontend && frontend.length > 0) {
        const frontendReact = frontend.filter(skill => {
            return getSkillUser(skill, 'react');
        });
        if (frontendReact.length > 0) {
            frontendReact.find(user => {
                return getInfo.call(user);
            });
        }
    }
}

// Код проверки на возраст, понимаю, что не совсем верно, т.к. нужно помимо года сверять ещё день и месяц, да и почему-то уверен, что в принципе код не верный
function fullAge() {
    const userYears = []
    let yearToday = new Date().getFullYear();
    persons.filter(person => {
        const bDaySplit = person.personal.birthday.split('.');
        const bDayYear = +bDaySplit[2]
        return userYears.push(bDayYear)
    });
    let getError = false;
    userYears.findIndex(year => {
        if ((yearToday - year) < 18) {
            return getError = true;
        } else {
            return getError = false;
        }
    });
    if (getError) {
        console.log('Есть несовершеннолетние');
    } else {
        console.log('Все совершеннолетние');
    }
}


// function location(userLoc) {
//     const userCity = cities.find(city => {
//         return city.name.toLowerCase() === userLoc;
//     });
//     if (userCity && userCity.id) {
//         return persons.filter(person => {
//             return person.personal.locationId === userCity.id;
//         });
//     }
// }


function userLocation(user, locName) {
    const loc = cities.find(city => {
        return city.name.toLowerCase() === locName;
    });
    if (loc && loc.name) {
        return user.filter(user => {
            return user.personal.locationId === loc.id;
        });
    }
}

function backendFullDay() {
    // const moscowUsers = userLocation('москва');
    const backendUsers = getUserSpecialization('backend')
    if (backendUsers && backendUsers.length > 0) {
        const backendMoscow = backendUsers.filter(user => {
            return userLocation(user, 'москва');
        });
        console.log(backendMoscow)
    }
    // console.log(backendUsers)
}












