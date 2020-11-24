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
newuser1 = new User("Mads", "Larsen", 18, "Hankøn", "Mads18", "hej12345", "mads@larsen.com", ["Mille, Christian, Emilie, Sofie, Lone, Tobias"], ["Henrik, Hans, Mads"], ["Mille, Emilie, Christian, Sofie"])
newuser2 = new User("Mille", "Hansen", 25, "Hunkøn", "Mads18", "hej12345", "mads@larsen.com", ["Mads, Christian, Emilie, Sofie, Lone, Tobias"], ["Henrik, Hans, Mads"], ["Mads, Emilie, Christian, Sofie"])
newuser3 = new User("Christian", "Nielsen", 23, "Hankøn", "Mads18", "hej12345", "mads@larsen.com", ["Mille, Christian, Emilie, Sofie, Lone, Tobias"], ["Henrik, Hans, Mads"], ["Mille, Emilie, Christian, Sofie"])
newuser4 = new User("Emilie", "Mikkelsen", 19, "Hunkøn", "Mads18", "hej12345", "mads@larsen.com", ["Mille, Christian, Emilie, Sofie, Lone, Tobias"], ["Henrik, Hans, Mads"], ["Mille, Emilie, Christian, Sofie"])
newuser5 = new User("Sofie", "Svendsen", 22, "Hunkøn", "Mads18", "hej12345", "mads@larsen.com", ["Mille, Christian, Emilie, Sofie, Lone, Tobias"], ["Henrik, Hans, Mads"], ["Mille, Emilie, Christian, Sofie"])





// vi samler vores objekter i et array for dernæst at kunne eksportere begge objekter
let ArrayUser = [newuser1, newuser2];

// module.exports gør, at vi kan eksportere vores array, og anvende det i andre js.filer
module.exports = ArrayUser