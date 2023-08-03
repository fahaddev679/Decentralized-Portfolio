// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Portfolio{

    struct Project{
        uint id;
        string name;
        string description;
        string image;
        string githubLink;
    }

    struct Education{
        uint id;
        string date;
        string degree;
        string knowledgeAcquired;
        string institutionName;
    }

    struct Experience{
        uint id;
        string date;
        string post;
        string knowledgeAcquired;
        string companyName;
    }

    Project[] public projects;
    Education[] public educationDetails;
    Experience[] public experienceDetails;

    string public imageLink = "";
    string public description = "";
    string public resumeLink = "";

    uint projectCount = 1;
    uint educationCount = 1;
    uint experienceCount = 1;
    address public manager;

    constructor(){
        manager = msg.sender;
    }

     modifier onlyManager(){
      require(manager==msg.sender,"You are not the manager");
      _;
  }

     function insertProject(string calldata _name,string calldata _description,string calldata _image,string calldata _githubLink) external onlyManager{
      projects.push(Project(projectCount,_name,_description,_image,_githubLink));
      projectCount++;
  }

    function updateProject(uint _projectCount, string calldata _name, string calldata _description, string calldata _image, string calldata _githubLink) external onlyManager{
        require(_projectCount > 0 && _projectCount < projectCount, "invalid project count");
        projects[_projectCount - 1] = Project(_projectCount, _name, _description, _image, _githubLink);
    }

    function allProject() external view returns(Project[] memory){
        return projects;
    }

    function insertEducation(string calldata _date, string calldata _degree, string calldata _knowledgeAcquired, string calldata _institutionName)external onlyManager{
        educationDetails.push(Education(educationCount, _date, _degree, _knowledgeAcquired, _institutionName));
        educationCount++;
    }

    function updateEducation(uint _educationCount, string calldata _date, string calldata _degree, string calldata _knowledgeAcquired, string calldata _institutionName)external onlyManager{
        require(_educationCount > 0 && _educationCount < educationCount, "invalid education count");
        educationDetails[_educationCount -1] = Education(_educationCount, _date,_degree,_knowledgeAcquired, _institutionName);
    }

    function allEducationDetails() external view returns(Education[] memory){
        return educationDetails;
    }

    function insertExperience(string calldata _date, string calldata _post, string calldata _knowledgeAcquired, string calldata _companyName) external onlyManager{
        experienceDetails.push(Experience(experienceCount, _date, _post, _knowledgeAcquired, _companyName));
        experienceCount++;
    }

    function updateExperience(uint _experienceCount, string calldata _date, string calldata _post, string calldata _knowledgeAcquired, string calldata _companyName)external onlyManager{
        require(_experienceCount > 0 && _experienceCount < experienceCount, "invalid experience count");
        experienceDetails[_experienceCount - 1] = Experience(_experienceCount, _date, _post, _knowledgeAcquired, _companyName);
    }

    function allExperiences() external view returns(Experience[] memory){
        return experienceDetails;
    }

    function changeDescription(string calldata _description) external onlyManager{
      description=_description;
  }

    function changeResumeLink(string calldata _resumeLink) external onlyManager{
      resumeLink=_resumeLink;
  }

    function changeImageLink(string calldata _imageLink) external onlyManager{
      imageLink=_imageLink;
  }

    function donate() public payable{
      payable(manager).transfer(msg.value);
  }


}