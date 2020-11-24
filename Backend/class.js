// I denne fil foretager vi nedarvning, hvor vi starter med at lave en "super Class". Dernæst nedarver vi attributerne og tilføjer til vores underklasser

class User{
    constructor(Name, Birthday, Gender, Interest, Match, Image){
        this.Name = Name;
        this.Birthday = Birthday;
        this.Gender = Gender;
        this.Interest = Interest;
        this.Match = Match;
        this.Image = Image;
    }
    //Nedenfor ses en af funktionerne/operationerne, som vores User Classes kan udføre
    SwipeLeftOrRight(){

    }
}
// i PaymentUser har vi tilføjet creditcard
class PaymentUser extends User{ 
    constructor(Name, Birthday, Gender, Interest, Match, Image, CreditCard){
        super(Name, Birthday, Gender, Interest, Match, Image);
        this.CreditCard = CreditCard;
    }
}
// her har vi intet foretaget os
class FreeUser extends User{
    constructor(Name, Birthday, Gender, Interest, Match, Image){
        super(Name, Birthday, Gender, Interest, Match, Image);
    }
}

// i denne bid code hardcoder vi vores attributer for de to objekter
newuser1 = new PaymentUser('Mads Hansen', 20, 'Male', 'Gaming', 'Mille', 'Image', 459833756980);
newuser2 = new FreeUser('Mille Larsen', 21, 'Female', 'Networking', 'Mads', 'Image');

// vi samler vores objekter i et array for dernæst at kunne eksportere begge objekter
let ArrayUser = [newuser1, newuser2];

// module.exports gør, at vi kan eksportere vores array, og anvende det i andre js.filer
module.exports = ArrayUser