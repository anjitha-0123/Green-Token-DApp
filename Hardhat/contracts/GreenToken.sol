// SPDX-License-Identifier: MIT
pragma solidity 0.8.30;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract GreenToken is ERC20,Ownable{
    constructor(address initialOwner) 
    ERC20("GreenToken","GT")
    Ownable(initialOwner){}

    struct DeviceSubmission{
        address user;
        string deviceType;
        string ipfsCID;
        uint256 timestamp;
        bool verified;
    }

    DeviceSubmission[] public devices; 

    mapping (uint256=>DeviceSubmission) public submissions;
    uint256 public submissionCount;

    event DeviceSubmitted(address indexed user,string deviceType,string ipfsCID);
    event TokenMinted(address indexed user,uint256 amount,string deviceType);

    function addDevice(string memory _deviceType,string memory _ipfsCID) external {
        submissions[submissionCount]=DeviceSubmission({
            user:msg.sender,
            deviceType:_deviceType,
            ipfsCID:_ipfsCID,
            timestamp:block.timestamp,
            verified:false
        });
        emit DeviceSubmitted(msg.sender,_deviceType,_ipfsCID);
        submissionCount++;
    }
    function getAllSubmissions() public view returns (DeviceSubmission[] memory) {
    DeviceSubmission[] memory all = new DeviceSubmission[](submissionCount);
    for (uint256 i = 0; i < submissionCount; i++) {
        all[i] = submissions[i];
    }
    return all;
}

    function verifyAndReward(uint256 _id)external onlyOwner{
        require(_id<submissionCount,"Invalid ID");
        DeviceSubmission storage submission=submissions[_id];
        require(!submission.verified,"Already Verified");

        uint256 rewardAmount=getRewardAmount(submission.deviceType);
        _mint(submission.user,rewardAmount*1 ether);
        submission.verified=true;

        emit TokenMinted(submission.user,rewardAmount,submission.deviceType);
    }
    function getRewardAmount(string memory _deviceType)internal pure returns(uint256){
        if(compareStrings(_deviceType,"laptop"))return 20;
        if(compareStrings(_deviceType,"phone"))return 10;
        if(compareStrings(_deviceType,"computer"))return 20;
        return 5;
    }
    function compareStrings(string memory a,string memory b)internal pure returns (bool){
        return keccak256(bytes(a))==keccak256(bytes(b));
    }
}

