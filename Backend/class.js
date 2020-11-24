// I denne fil foretager vi nedarvning, hvor vi starter med at lave en "super Class". Dernæst nedarver vi attributerne og tilføjer til vores underklasser

class User{
    constructor(firstName, lastName, age, gender, username, password, email, like, disLike, matches){
        this.firstName = firstName;
        this.lastName = lastName;
        this.age = age;
        this.gender = gender;
        this.username = username;
        this.password = password;
        this.email = email;
        this.like = like;
        this.disLike = disLike;
        this.matches = matches;
    }

}

// i denne bid code hardcoder vi vores attributer for de to objekter
var Mads = new User("Mads", "Larsen", 18, "Hankøn", "Mads18", "hej12345", "mads@larsen.com", [Mille, Christian, Emilie], [Sofie], [Mille, Christian, Emilie])
var Mille = new User("Mille", "Hansen", 25, "Hunkøn", "Mille25", "hallo12345", "mille@gmail.com", [Mads, Sofie, Emilie], [Christian], [Mads, Sofie])
var Christian = new User("Christian", "Nielsen", 23, "Hankøn", "Christian23", "hi12345", "christian@hotmail.com", [Mads, Mille, Emilie], [Sofie], [Mads, Emilie])
var Emilie = new User("Emilie", "Mikkelsen", 19, "Hunkøn", "Emilie19", "EM1800", "emilie@yahoo.com", [Mads, Christian], [Mille, Sofie], [Mads, Christian])
var Sofie = new User("Sofie", "Svendsen", 22, "Hunkøn", "Mads18", "hej12345", "mads@larsen.com", [Mads, Mille, Christian, Emilie], [], [Mille])





// vi samler vores objekter i et array for dernæst at kunne eksportere begge objekter
let ArrayUser = [Mads, Mille, Christian, Emilie, Sofie];
console.log(ArrayUser)
// module.exports gør, at vi kan eksportere vores array, og anvende det i andre js.filer
module.exports = ArrayUser