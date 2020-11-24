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
newuser1 = new PaymentUser('Mads Hansen', 20, 'Male', 'Gaming', 'Mille', 'Image', 459833756980);
newuser2 = new FreeUser('Mille Larsen', 21, 'Female', 'Networking', 'Mads', 'Image');

// vi samler vores objekter i et array for dernæst at kunne eksportere begge objekter
let ArrayUser = [newuser1, newuser2];

// module.exports gør, at vi kan eksportere vores array, og anvende det i andre js.filer
module.exports = ArrayUser