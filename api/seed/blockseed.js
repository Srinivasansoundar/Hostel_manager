module.exports= [
    {
      blockName: "C Block",
      sharing: 4,
      totalFloors: 3,
      totalRooms: 30,
      yearRestrictions: [2], // Available for 2nd years only
      departmentRestrictions: ["CSE", "IT", "Civil"], // Departments that can access
      sharedBlock: false
    },
    {
      blockName: "A Block",
      sharing: 2,
      totalFloors: 3,
      totalRooms: 30,
      yearRestrictions: [3], // Available for 3rd years only
      departmentRestrictions: ["CSE", "IT", "Civil"], // Departments that can access
      sharedBlock: false
    },
    {
      blockName: "G3 Block",
      sharing: 4,
      totalFloors: 5,
      totalRooms: 50,
      sharedBlock: true // Available to all students (no year or department restriction)
    }
  ];
  