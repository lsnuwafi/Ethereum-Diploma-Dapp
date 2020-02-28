pragma solidity ^0.5.0;

contract Platform {

    // Fields of a diploma
    struct Diploma {  
        string degree;
        uint date; 
    } 

    // Fields of a Person
    struct Person {  
        string name;
        string email; 
        Diploma degree;
        uint lastUpdate;		
    } 

    // University Address => Student Address => Diploma
    mapping(address => mapping(address => Diploma)) universityMapping;

    // Person Address => Person Profile
    mapping(address => Person) personMapping;

    constructor () public { 
       
    } 

    // Add a new Diploma
    function addDipoloma(address _studentAddress, string memory _degree, uint _date) public {
        Diploma memory newDiploma = Diploma(_degree,_date); 
        universityMapping[msg.sender][_studentAddress] = newDiploma;
        personMapping[_studentAddress].degree = newDiploma;
        personMapping[_studentAddress].lastUpdate = now;
    }

    // View diploma of given person at an institution
    function viewDiploma(address _studentAddress, address _universityAddress) public view returns(string memory, uint) {
        Diploma storage diploma = universityMapping[_universityAddress][_studentAddress];
        return (diploma.degree, diploma.date);
    }

    // Add a new Person Profile
    function updatePerson(string memory _name, string memory _email) public{
        personMapping[msg.sender].name = _name;
        personMapping[msg.sender].email = _email;
        personMapping[msg.sender].lastUpdate = now;
    }

    // View the profile of a person
    function viewPerson(address _personAddress) public view returns(string memory,string memory, string memory,uint, uint) {
        Person storage person = personMapping[_personAddress];
        return(person.name,person.email,person.degree.degree,person.degree.date,person.lastUpdate);
    }

}

    
    
