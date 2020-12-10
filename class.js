// her er vores class defineret
class user {
    constructor(brugernavn, password2, email2, alder, fornavn1, efternavn1, gender, bio1){
    this.brugernavn = brugernavn;
    this.password2 = password2;
    this.email2 = email2;
    this.alder = alder
    this.fornavn1 = fornavn1;
    this.efternavn1 = efternavn1;
    this.gender = gender;
    this.bio1 = bio1;
}}

// module.exports gør, at vi kan eksportere vores array, og anvende det i andre js.filer
module.exports = user
