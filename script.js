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






